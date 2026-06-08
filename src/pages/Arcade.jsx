import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import EditorImport from 'react-simple-code-editor';
const Editor = EditorImport.default || EditorImport;
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useGame } from '../context/GameContext';
import { t } from '../data/translationEngine';

// 8-bit Web Audio Sound Synthesizer
const playSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'beep') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else if (type === 'hit') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      osc.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    // Audio Context not allowed or failed
  }
};

export default function Arcade() {
  const { addXp, language } = useGame();
  const [activeGame, setActiveGame] = useState('snake');

  // Baby Steps Learning States
  const [snakeLearningStep, setSnakeLearningStep] = useState(0);
  const [candyLearningStep, setCandyLearningStep] = useState(0);
  const [ticTacLearningStep, setTicTacLearningStep] = useState(0);

  // =========================================================================
  // GAME 1: SNAKE GAME STATE & LOGIC (WITH CODE BOT OPTION)
  // =========================================================================
  const snakeCanvasRef = useRef(null);
  const [snakeScore, setSnakeScore] = useState(0);
  const [snakeHighScore, setSnakeHighScore] = useState(() => parseInt(localStorage.getItem('arcade_snake_highscore') || '0', 10));
  const [snakeGameOver, setSnakeGameOver] = useState(false);
  const [snakePlaying, setSnakePlaying] = useState(false);
  const snakeDirRef = useRef({ x: 1, y: 0 });
  const snakeSegmentsRef = useRef([{ x: 10, y: 10 }]);
  const snakeFoodRef = useRef({ x: 5, y: 5 });
  const gameIntervalRef = useRef(null);
  
  const [snakeCodeMode, setSnakeCodeMode] = useState(false);
  const [snakeFeedback, setSnakeFeedback] = useState('');
  
  const defaultSnakeCodes = [
    `// Step 0: Just play manually using arrow keys!`,
    `function nextDirection(head, food, body) {\n  // Let's just go UP!\n  return 'UP';\n}`,
    `function nextDirection(head, food, body) {\n  // Go UP if food is above the snake!\n  if (food.y < head.y) {\n    return 'UP';\n  }\n  return 'RIGHT';\n}`,
    `function nextDirection(head, food, body) {\n  // Full AI auto-pilot\n  if (food.x > head.x && head.x + 1 !== body[1]?.x) return 'RIGHT';\n  if (food.x < head.x && head.x - 1 !== body[1]?.x) return 'LEFT';\n  if (food.y > head.y && head.y + 1 !== body[1]?.y) return 'DOWN';\n  if (food.y < head.y && head.y - 1 !== body[1]?.y) return 'UP';\n  return 'RIGHT';\n}`
  ];
  
  const [snakeCode, setSnakeCode] = useState(defaultSnakeCodes[0]);

  useEffect(() => {
    if (activeGame !== 'snake') {
      clearInterval(gameIntervalRef.current);
      setSnakePlaying(false);
      return;
    }
    initSnakeGame();
    return () => clearInterval(gameIntervalRef.current);
  }, [activeGame]);

  useEffect(() => {
    setSnakeCode(defaultSnakeCodes[snakeLearningStep]);
    if (snakeLearningStep === 0) setSnakeCodeMode(false);
    else setSnakeCodeMode(true);
  }, [snakeLearningStep]);

  const initSnakeGame = () => {
    snakeSegmentsRef.current = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
    snakeDirRef.current = { x: 1, y: 0 };
    setSnakeScore(0);
    setSnakeGameOver(false);
    setSnakeFeedback('');
    spawnSnakeFood();
    drawSnakeBoard();
  };

  const spawnSnakeFood = () => {
    const cols = 20;
    const rows = 20;
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
      };
      if (!snakeSegmentsRef.current.some(s => s.x === newFood.x && s.y === newFood.y)) break;
    }
    snakeFoodRef.current = newFood;
  };

  const handleSnakeKeyDown = (e) => {
    if (!snakePlaying || snakeCodeMode) return;
    const key = e.key;
    const dir = snakeDirRef.current;
    if (key === 'ArrowUp' && dir.y === 0) snakeDirRef.current = { x: 0, y: -1 };
    else if (key === 'ArrowDown' && dir.y === 0) snakeDirRef.current = { x: 0, y: 1 };
    else if (key === 'ArrowLeft' && dir.x === 0) snakeDirRef.current = { x: -1, y: 0 };
    else if (key === 'ArrowRight' && dir.x === 0) snakeDirRef.current = { x: 1, y: 0 };
  };

  useEffect(() => {
    window.addEventListener('keydown', handleSnakeKeyDown);
    return () => window.removeEventListener('keydown', handleSnakeKeyDown);
  }, [snakePlaying, snakeCodeMode]);

  const startSnakeGame = () => {
    if (snakeGameOver) initSnakeGame();
    setSnakePlaying(true);
    setSnakeFeedback('');
    clearInterval(gameIntervalRef.current);
    gameIntervalRef.current = setInterval(updateSnake, 130);
  };

  const pauseSnakeGame = () => {
    setSnakePlaying(false);
    clearInterval(gameIntervalRef.current);
  };

  const updateSnake = () => {
    const head = { ...snakeSegmentsRef.current[0] };

    // AI AUTO-PILOT CODE EXECUTION
    if (snakeCodeMode) {
      try {
        const fn = new Function('head', 'food', 'body', `${snakeCode}\nreturn nextDirection(head, food, body);`);
        const nextDir = fn({ ...head }, { ...snakeFoodRef.current }, [...snakeSegmentsRef.current]);

        let targetDir = null;
        if (nextDir === 'UP') targetDir = { x: 0, y: -1 };
        else if (nextDir === 'DOWN') targetDir = { x: 0, y: 1 };
        else if (nextDir === 'LEFT') targetDir = { x: -1, y: 0 };
        else if (nextDir === 'RIGHT') targetDir = { x: 1, y: 0 };

        if (targetDir) {
          const currentDir = snakeDirRef.current;
          // Prevent backwards self-destruction
          const isReverse = (targetDir.x === -currentDir.x && targetDir.y === -currentDir.y);
          if (!isReverse) {
            snakeDirRef.current = targetDir;
          }
        }
      } catch (err) {
        setSnakePlaying(false);
        clearInterval(gameIntervalRef.current);
        setSnakeGameOver(true);
        setSnakeFeedback(`⚠️ AI Script Error: ${err.message}`);
        playSound('hit');
        return;
      }
    }

    const dir = snakeDirRef.current;
    head.x += dir.x;
    head.y += dir.y;

    // Boundary check
    if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20) {
      triggerSnakeGameOver();
      return;
    }
    // Body collision check
    if (snakeSegmentsRef.current.some(s => s.x === head.x && s.y === head.y)) {
      triggerSnakeGameOver();
      return;
    }

    // Insert new head
    snakeSegmentsRef.current.unshift(head);

    // Food check
    if (head.x === snakeFoodRef.current.x && head.y === snakeFoodRef.current.y) {
      playSound('beep');
      setSnakeScore(prev => {
        const next = prev + 10;
        if (next > snakeHighScore) {
          setSnakeHighScore(next);
          localStorage.setItem('arcade_snake_highscore', next.toString());
        }
        return next;
      });
      spawnSnakeFood();
    } else {
      snakeSegmentsRef.current.pop();
    }

    drawSnakeBoard();
  };

  const triggerSnakeGameOver = () => {
    playSound('hit');
    setSnakeGameOver(true);
    setSnakePlaying(false);
    clearInterval(gameIntervalRef.current);
  };

  const drawSnakeBoard = () => {
    const canvas = snakeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 300 / 20;

    // Clear background
    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, 300, 300);

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= 20; i++) {
      ctx.beginPath();
      ctx.moveTo(i * size, 0);
      ctx.lineTo(i * size, 300);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * size);
      ctx.lineTo(300, i * size);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#f43f5e';
    ctx.shadowBlur = 8;
    ctx.shadowColor = '#f43f5e';
    ctx.beginPath();
    ctx.arc(
      snakeFoodRef.current.x * size + size / 2,
      snakeFoodRef.current.y * size + size / 2,
      size / 2.4,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Reset shadow
    ctx.shadowBlur = 0;

    // Snake
    snakeSegmentsRef.current.forEach((seg, index) => {
      ctx.fillStyle = index === 0 ? '#c084fc' : '#a855f7';
      ctx.fillRect(seg.x * size + 1, seg.y * size + 1, size - 2, size - 2);
    });
  };


  // =========================================================================
  // GAME 2: JS DATA TYPES CRUSH STATE & LOGIC
  // =========================================================================
  const DATA_TYPES = ['str', 'num', 'bool', 'null', 'arr', 'obj'];
  const TYPE_VALUES = {
    str: ['"js"', "'hey'", '"bhai"', '"star"', '"code"'],
    num: ['42', '-7', '3.14', '0', '99'],
    bool: ['true', 'false'],
    null: ['null'],
    arr: ['[1, 2]', '[]', '["x"]', '[5]'],
    obj: ['{x:1}', '{}', '{y:0}', '{a:9}']
  };

  const TYPE_DESCRIPTIONS = {
    str: {
      english: "String: Represents textual data. Declared inside quotes, e.g. \"js\" or 'hey'.",
      hinglish: "String: Textual data store karne ke liye use hota hai. Humesha quotes ke andar likhte hain, jaise \"js\" ya 'hey'."
    },
    num: {
      english: "Number: Represents positive, negative, integer, or floating-point numbers, e.g. 42 or -7.",
      hinglish: "Number: Integers aur decimal numbers dono ko represent karta hai, jaise 42 ya -7."
    },
    bool: {
      english: "Boolean: Logical data type that can only be true or false. Crucial for conditions.",
      hinglish: "Boolean: Ek hi logical value ho sakti hai: true ya false. Conditions lagane ke liye important hai."
    },
    null: {
      english: "Null: Represents the intentional absence of any object value. It means empty box.",
      hinglish: "Null: Jaanbujhkar kisi empty value ko refer karne ke liye use hota hai. Iska matlab hai box khali hai."
    },
    arr: {
      english: "Array: An ordered list of elements written inside square brackets, e.g. [1, 2] or [].",
      hinglish: "Array: Kaafi saare items ka list hota hai jise square brackets [] ke andar likhte hain, jaise [1, 2]."
    },
    obj: {
      english: "Object: Key-value pairs inside curly braces. Represents complex data structures, e.g. {x:1}.",
      hinglish: "Object: Curly braces {} ke andar key-value pairs ka group hota hai, jaise {x:1}."
    }
  };

  const [candyBoard, setCandyBoard] = useState([]);
  const [selectedCandyIndex, setSelectedCandyIndex] = useState(null);
  const [candyScore, setCandyScore] = useState(0);
  const [senseiBubble, setSenseiBubble] = useState(null);

  useEffect(() => {
    if (activeGame === 'candy') {
      initCandyBoard();
    }
  }, [activeGame]);

  const initCandyBoard = () => {
    let board = [];
    for (let i = 0; i < 36; i++) {
      const type = DATA_TYPES[Math.floor(Math.random() * DATA_TYPES.length)];
      const possibleVals = TYPE_VALUES[type];
      const value = possibleVals[Math.floor(Math.random() * possibleVals.length)];
      board.push({ type, value });
    }
    setCandyBoard(board);
    setSelectedCandyIndex(null);
    setCandyScore(0);
    setSenseiBubble(null);
  };

  const handleCandyClick = (index) => {
    if (selectedCandyIndex === null) {
      setSelectedCandyIndex(index);
    } else {
      const prev = selectedCandyIndex;
      const r1 = Math.floor(prev / 6);
      const c1 = prev % 6;
      const r2 = Math.floor(index / 6);
      const c2 = index % 6;

      const adjacent = (Math.abs(r1 - r2) === 1 && c1 === c2) || (Math.abs(c1 - c2) === 1 && r1 === r2);

      if (adjacent) {
        const board = [...candyBoard];
        const temp = board[prev];
        board[prev] = board[index];
        board[index] = temp;

        const matches = checkCandyMatches(board);
        if (matches.length > 0) {
          playSound('beep');
          processCandyMatches(board, matches);
        } else {
          playSound('hit');
        }
      }
      setSelectedCandyIndex(null);
    }
  };

  const checkCandyMatches = (board) => {
    const matches = new Set();
    // Check rows
    for (let r = 0; r < 6; r++) {
      for (let c = 0; c < 4; c++) {
        const idx = r * 6 + c;
        if (board[idx] && board[idx + 1] && board[idx + 2] &&
            board[idx].type === board[idx + 1].type &&
            board[idx].type === board[idx + 2].type) {
          matches.add(idx);
          matches.add(idx + 1);
          matches.add(idx + 2);
        }
      }
    }
    // Check cols
    for (let c = 0; c < 6; c++) {
      for (let r = 0; r < 4; r++) {
        const idx = r * 6 + c;
        if (board[idx] && board[idx + 6] && board[idx + 12] &&
            board[idx].type === board[idx + 6].type &&
            board[idx].type === board[idx + 12].type) {
          matches.add(idx);
          matches.add(idx + 6);
          matches.add(idx + 12);
        }
      }
    }
    return Array.from(matches);
  };

  const processCandyMatches = (board, matches) => {
    setCandyScore(prev => prev + matches.length * 10);
    
    // Sensei Clue display based on match type
    const firstMatchedIdx = matches[0];
    const matchedType = board[firstMatchedIdx]?.type;
    if (matchedType && TYPE_DESCRIPTIONS[matchedType]) {
      setSenseiBubble({
        type: matchedType,
        text: language === 'english' ? TYPE_DESCRIPTIONS[matchedType].english : TYPE_DESCRIPTIONS[matchedType].hinglish
      });
    }

    // Explode matched cells
    matches.forEach(idx => {
      board[idx] = null;
    });

    setTimeout(() => {
      // Shift down
      for (let c = 0; c < 6; c++) {
        for (let r = 5; r >= 0; r--) {
          const idx = r * 6 + c;
          if (board[idx] === null) {
            let found = false;
            for (let r2 = r - 1; r2 >= 0; r2--) {
              const idx2 = r2 * 6 + c;
              if (board[idx2] !== null) {
                board[idx] = board[idx2];
                board[idx2] = null;
                found = true;
                break;
              }
            }
            if (!found) {
              const type = DATA_TYPES[Math.floor(Math.random() * DATA_TYPES.length)];
              const possibleVals = TYPE_VALUES[type];
              board[idx] = {
                type,
                value: possibleVals[Math.floor(Math.random() * possibleVals.length)]
              };
            }
          }
        }
      }
      setCandyBoard([...board]);

      const cascade = checkCandyMatches(board);
      if (cascade.length > 0) {
        setTimeout(() => processCandyMatches(board, cascade), 300);
      }
    }, 250);
  };

  const getCellBg = (type) => {
    switch (type) {
      case 'str': return 'rgba(52, 211, 153, 0.08)';
      case 'num': return 'rgba(96, 165, 250, 0.08)';
      case 'bool': return 'rgba(251, 191, 36, 0.08)';
      case 'null': return 'rgba(244, 63, 94, 0.08)';
      case 'arr': return 'rgba(192, 132, 252, 0.08)';
      case 'obj': return 'rgba(236, 72, 153, 0.08)';
      default: return 'rgba(255,255,255,0.03)';
    }
  };

  const getCellColor = (type) => {
    switch (type) {
      case 'str': return '#34d399';
      case 'num': return '#60a5fa';
      case 'bool': return '#fbbf24';
      case 'null': return '#f43f5e';
      case 'arr': return '#c084fc';
      case 'obj': return '#ec4899';
      default: return '#fff';
    }
  };


  // =========================================================================
  // GAME 3: TIC-TAC-TOE WITH CODING EDITOR STATE & LOGIC
  // =========================================================================
  const [boardState, setBoardState] = useState(Array(9).fill(''));
  const [tictactoeWinner, setTictactoeWinner] = useState(null); // 'X', 'O', 'Draw'
  const [codeMode, setCodeMode] = useState(true);
  
  const defaultTicTacCodes = [
    `// Step 0: Play manually by clicking the grid!`,
    `function nextMove(board) {\n  // Always pick the center box (index 4)!\n  return 4;\n}`,
    `function nextMove(board) {\n  // Find the first empty spot!\n  for (let i = 0; i < board.length; i++) {\n    if (board[i] === '') return i;\n  }\n  return -1;\n}`
  ];

  const [scriptCode, setScriptCode] = useState(defaultTicTacCodes[0]);
  const [tictactoeFeedback, setTictactoeFeedback] = useState('');

  useEffect(() => {
    setScriptCode(defaultTicTacCodes[ticTacLearningStep]);
    if (ticTacLearningStep === 0) setCodeMode(false);
    else setCodeMode(true);
  }, [ticTacLearningStep]);

  const initTictactoe = () => {
    setBoardState(Array(9).fill(''));
    setTictactoeWinner(null);
    setTictactoeFeedback('');
  };

  const checkWinner = (b) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, c, d] = lines[i];
      if (b[a] && b[a] === b[c] && b[a] === b[d]) {
        return b[a];
      }
    }
    if (b.every(cell => cell !== '')) return 'Draw';
    return null;
  };

  const handleCellClick = (index) => {
    if (codeMode) {
      setTictactoeFeedback(language === 'english' ? '⚠️ Turn code mode OFF to play manually by clicking cells!' : '⚠️ Manual khelne ke liye code mode ko OFF karo!');
      return;
    }
    if (boardState[index] !== '' || tictactoeWinner) return;

    makeMove(index, 'X');
  };

  const makeMove = (index, symbol) => {
    const nextBoard = [...boardState];
    nextBoard[index] = symbol;
    setBoardState(nextBoard);

    const win = checkWinner(nextBoard);
    if (win) {
      handleGameEnd(win);
      return;
    }

    if (symbol === 'X') {
      setTimeout(() => playCpuMove(nextBoard), 400);
    }
  };

  const playCpuMove = (currentBoard) => {
    const emptyIndices = currentBoard.map((c, i) => c === '' ? i : null).filter(c => c !== null);
    if (emptyIndices.length === 0) return;

    const boardCopy = [...currentBoard];
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    let blockIndex = -1;
    for (let line of lines) {
      const symbols = line.map(idx => boardCopy[idx]);
      const xCount = symbols.filter(s => s === 'X').length;
      const emptyCount = symbols.filter(s => s === '').length;
      if (xCount === 2 && emptyCount === 1) {
        blockIndex = line[symbols.indexOf('')];
        break;
      }
    }

    const cpuMoveIdx = blockIndex !== -1 ? blockIndex : emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    boardCopy[cpuMoveIdx] = 'O';
    setBoardState(boardCopy);
    playSound('beep');

    const win = checkWinner(boardCopy);
    if (win) {
      handleGameEnd(win);
    }
  };

  const handleGameEnd = (winner) => {
    setTictactoeWinner(winner);
    if (winner === 'X') {
      confetti({ particleCount: 100, spread: 60, origin: { y: 0.8 } });
      playSound('success');
      addXp(20);
      setTictactoeFeedback(language === 'english' ? '🎉 Victory! You defeated the CPU. +20 XP Added!' : '🎉 Jeet gaye! Apne code se CPU ko hara diya. +20 XP Added!');
    } else if (winner === 'O') {
      playSound('hit');
      setTictactoeFeedback(language === 'english' ? '❌ Defeat! The CPU outsmarted your code/moves.' : '❌ Haar gaye! CPU ne aapke code/moves ko hara diya.');
    } else {
      setTictactoeFeedback(language === 'english' ? '🤝 Draw! Balanced strategy.' : '🤝 Draw ho gaya! Dono barabar.');
    }
  };

  const handleRunCodeMove = () => {
    if (tictactoeWinner) return;
    setTictactoeFeedback('');

    try {
      const boardStateCopy = [...boardState];
      const fn = new Function(`${scriptCode}\nreturn nextMove(arguments[0]);`);
      const moveIndex = fn(boardStateCopy);

      if (typeof moveIndex !== 'number' || moveIndex < 0 || moveIndex > 8) {
        throw new Error('Your function must return a valid grid index number from 0 to 8.');
      }
      if (boardState[moveIndex] !== '') {
        throw new Error(`Invalid move! Cell ${moveIndex} is already occupied by '${boardState[moveIndex]}'.`);
      }

      setTictactoeFeedback(language === 'english' ? `🤖 AI Script selected Cell ${moveIndex}!` : `🤖 AI Script ne Cell ${moveIndex} select kiya!`);
      makeMove(moveIndex, 'X');

    } catch (err) {
      setTictactoeFeedback(`⚠️ Script Error: ${err.message}`);
      playSound('hit');
    }
  };

  return (
    <div className="lobby-container">
      
      {/* Portals Selector */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 15, flexWrap: 'wrap' }}>
        <button 
          className={`btn-lobby-action ${activeGame === 'snake' ? '' : 'btn-outline'}`}
          onClick={() => setActiveGame('snake')}
          style={{ padding: '10px 20px', background: activeGame === 'snake' ? 'var(--brand)' : 'transparent', color: activeGame === 'snake' ? '#000' : 'var(--brand)', border: '1px solid var(--brand)' }}
        >
          {t('snakeTitle', language)}
        </button>
        <button 
          className={`btn-lobby-action ${activeGame === 'candy' ? '' : 'btn-outline'}`}
          onClick={() => setActiveGame('candy')}
          style={{ padding: '10px 20px', background: activeGame === 'candy' ? 'var(--brand)' : 'transparent', color: activeGame === 'candy' ? '#000' : 'var(--brand)', border: '1px solid var(--brand)' }}
        >
          {t('candyTitle', language)}
        </button>
        <button 
          className={`btn-lobby-action ${activeGame === 'tictactoe' ? '' : 'btn-outline'}`}
          onClick={() => setActiveGame('tictactoe')}
          style={{ padding: '10px 20px', background: activeGame === 'tictactoe' ? 'var(--brand)' : 'transparent', color: activeGame === 'tictactoe' ? '#000' : 'var(--brand)', border: '1px solid var(--brand)' }}
        >
          {t('tictactoeTitle', language)}
        </button>
      </div>

      {/* =========================================================================
         GAME 1: SNAKE RENDER
         ========================================================================= */}
      {activeGame === 'snake' && (
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', marginTop: 20, flexWrap: 'wrap' }} className="fadeIn animate">
          
          {/* Sensei Guide Panel (Baby Steps) */}
          <div className="daily-spell-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
            <div className="daily-spell-header" style={{ color: 'var(--brand)', fontSize: 16 }}>{t('senseiGuide', language)}</div>
            
            <div style={{ display: 'flex', gap: 5, marginTop: 15, marginBottom: 20 }}>
              {[0, 1, 2, 3].map(step => (
                <button
                  key={step}
                  onClick={() => setSnakeLearningStep(step)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: snakeLearningStep === step ? 'var(--brand)' : '#334155',
                    color: snakeLearningStep === step ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 800
                  }}
                >
                  {step}
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--brand)', marginTop: 0 }}>{t(`snakeStep${snakeLearningStep}Title`, language)}</h3>
              <p style={{ color: 'var(--text-ink-light)', fontSize: 14, lineHeight: 1.6 }}>
                {t(`snakeStep${snakeLearningStep}Desc`, language)}
              </p>
            </div>

            {/* Sensei Mascot */}
            <div style={{ textAlign: 'center', fontSize: 50, marginTop: 20 }}>🧑‍🏫</div>
          </div>

          {/* Game Canvas & Editor */}
          <div className="daily-spell-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="daily-spell-header" style={{ color: 'var(--brand)' }}>{t('snakeTitle', language).replace('🐍 ', '')}</div>
            
            <div style={{ display: 'flex', gap: 20, margin: '10px 0' }}>
              <div className="lobby-stat-box">
                <span className="lobby-stat-val" style={{ color: 'var(--text-ink)' }}>{snakeScore}</span>
                <span className="lobby-stat-lbl">{t('snakeScore', language)}</span>
              </div>
              <div className="lobby-stat-box">
                <span className="lobby-stat-val">{snakeHighScore}</span>
                <span className="lobby-stat-lbl">{t('snakeHigh', language)}</span>
              </div>
            </div>

            <div style={{ position: 'relative', width: 300, height: 300, border: '2px solid var(--brand)', borderRadius: 8, overflow: 'hidden', margin: '10px 0' }}>
              <canvas ref={snakeCanvasRef} width={300} height={300} />
              
              {snakeGameOver && (
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 40 }}>💀</span>
                  <h3 style={{ margin: 0, color: 'var(--error)', fontWeight: 800 }}>{t('snakeOver', language)}</h3>
                  <p style={{ margin: 0, fontSize: 13, color: 'var(--tx-2)' }}>{t('snakeOverScore', language)}: {snakeScore}</p>
                  <button className="btn-run" onClick={initSnakeGame}>{t('snakeRestart', language)}</button>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              {!snakePlaying ? (
                <button className="btn-run" onClick={startSnakeGame}>{t('snakeStart', language)}</button>
              ) : (
                <button className="btn-run" onClick={pauseSnakeGame} style={{ background: 'var(--warning)' }}>{t('snakePause', language)}</button>
              )}
              <button className="btn-run" onClick={initSnakeGame} style={{ background: '#475569' }}>{t('reset', language)}</button>
            </div>

            {snakeFeedback && (
              <div style={{ fontSize: 12, color: 'var(--error)', marginTop: 8, fontWeight: 700 }}>
                {snakeFeedback}
              </div>
            )}
            
            {snakeCodeMode && (
              <div style={{ width: '100%', marginTop: 20 }}>
                <div className="daily-spell-header" style={{ color: 'var(--brand)', fontSize: 14 }}>JAVASCRIPT AUTO-STEER CODE</div>
                <div className="editor-inner" style={{ minHeight: 120, border: '1px solid var(--glass-border)', borderRadius: 8, marginTop: 10 }}>
                  <Editor
                    value={snakeCode}
                    onValueChange={c => setSnakeCode(c)}
                    highlight={c => Prism.languages && Prism.languages.javascript ? Prism.highlight(c, Prism.languages.javascript, 'javascript') : c}
                    padding={12}
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--text-ink-light)' }}
                  />
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* =========================================================================
         GAME 2: JS DATA TYPES CRUSH RENDER
         ========================================================================= */}
      {activeGame === 'candy' && (
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', marginTop: 20, flexWrap: 'wrap' }} className="fadeIn animate">
          
          {/* Sensei Guide Panel */}
          <div className="daily-spell-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
            <div className="daily-spell-header" style={{ color: 'var(--brand)', fontSize: 16 }}>{t('senseiGuide', language)}</div>
            
            <div style={{ display: 'flex', gap: 5, marginTop: 15, marginBottom: 20 }}>
              {[0, 1, 2, 3].map(step => (
                <button
                  key={step}
                  onClick={() => setCandyLearningStep(step)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: candyLearningStep === step ? 'var(--brand)' : '#334155',
                    color: candyLearningStep === step ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 800
                  }}
                >
                  {step}
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--brand)', marginTop: 0 }}>{t(`candyStep${candyLearningStep}Title`, language)}</h3>
              <p style={{ color: 'var(--text-ink-light)', fontSize: 14, lineHeight: 1.6 }}>
                {t(`candyStep${candyLearningStep}Desc`, language)}
              </p>
            </div>

            {senseiBubble && (
              <div style={{ background: 'rgba(192, 132, 252, 0.15)', padding: 12, borderRadius: 10, border: '1px solid var(--brand)', marginTop: 15 }}>
                <div style={{ fontWeight: 800, color: 'var(--brand)', fontSize: 12, marginBottom: 5 }}>YOU CRUSHED A MATCH!</div>
                <div style={{ fontSize: 13, color: 'var(--text-ink-light)', lineHeight: 1.4 }}>{senseiBubble.text}</div>
              </div>
            )}
          </div>

          {/* Game Container */}
          <div className="daily-spell-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="daily-spell-header" style={{ color: 'var(--brand)' }}>{t('candyTitle', language).replace('🍬 ', '')}</div>
            
            <div className="lobby-stat-box" style={{ margin: '10px 0' }}>
              <span className="lobby-stat-val" style={{ color: 'var(--text-ink)' }}>{candyScore}</span>
              <span className="lobby-stat-lbl">{t('candyScore', language)}</span>
            </div>

            {/* 6x6 Data Types Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 68px)',
              gridTemplateRows: 'repeat(6, 68px)',
              gap: 6,
              background: 'rgba(0,0,0,0.4)',
              padding: 10,
              borderRadius: 12,
              border: '1px solid var(--glass-border)',
              justifyContent: 'center'
            }}>
              {candyBoard.map((candy, idx) => {
                const isSelected = selectedCandyIndex === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleCandyClick(idx)}
                    style={{
                      background: isSelected ? 'rgba(192, 132, 252, 0.4)' : getCellBg(candy?.type),
                      border: isSelected ? '2px solid var(--brand)' : '1px solid var(--glass-border)',
                      borderRadius: 8,
                      fontSize: 12,
                      fontWeight: 800,
                      fontFamily: '"JetBrains Mono", monospace',
                      color: getCellColor(candy?.type),
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                      textShadow: '0 0 4px rgba(0,0,0,0.5)',
                      padding: 2,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {candy?.value}
                  </button>
                );
              })}
            </div>

            <button className="btn-run" onClick={initCandyBoard} style={{ marginTop: 15 }}>
              {t('candyReset', language)}
            </button>
          </div>
        </div>
      )}

      {/* =========================================================================
         GAME 3: TIC-TAC-TOE RENDER
         ========================================================================= */}
      {activeGame === 'tictactoe' && (
        <div style={{ display: 'flex', gap: 20, alignItems: 'stretch', marginTop: 20, flexWrap: 'wrap' }} className="fadeIn animate">
          
          {/* Sensei Guide Panel */}
          <div className="daily-spell-card" style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
            <div className="daily-spell-header" style={{ color: 'var(--brand)', fontSize: 16 }}>{t('senseiGuide', language)}</div>
            
            <div style={{ display: 'flex', gap: 5, marginTop: 15, marginBottom: 20 }}>
              {[0, 1, 2].map(step => (
                <button
                  key={step}
                  onClick={() => setTicTacLearningStep(step)}
                  style={{
                    flex: 1,
                    padding: '8px 0',
                    background: ticTacLearningStep === step ? 'var(--brand)' : '#334155',
                    color: ticTacLearningStep === step ? '#000' : '#fff',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontWeight: 800
                  }}
                >
                  {step}
                </button>
              ))}
            </div>

            <div style={{ flex: 1 }}>
              <h3 style={{ color: 'var(--brand)', marginTop: 0 }}>{t(`ticTacStep${ticTacLearningStep}Title`, language)}</h3>
              <p style={{ color: 'var(--text-ink-light)', fontSize: 14, lineHeight: 1.6 }}>
                {t(`ticTacStep${ticTacLearningStep}Desc`, language)}
              </p>
            </div>

            <div style={{ textAlign: 'center', fontSize: 50, marginTop: 20 }}>🤖</div>
          </div>
          
          <div className="lobby-main-grid" style={{ gap: 20, flex: '1 1 300px' }}>
            
            {/* Playable Grid */}
            <div className="daily-spell-card" style={{ alignItems: 'center', textAlign: 'center' }}>
              <div className="daily-spell-header">{t('tictactoeTitle', language).replace('❌ ', '')}</div>

              {/* 3x3 Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 80px)',
                gridTemplateRows: 'repeat(3, 80px)',
                gap: 10,
                background: 'rgba(0,0,0,0.3)',
                padding: 12,
                borderRadius: 12,
                margin: '15px 0'
              }}>
                {boardState.map((cell, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleCellClick(idx)}
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid var(--glass-border)',
                      borderRadius: 8,
                      fontSize: 32,
                      fontWeight: 800,
                      color: cell === 'X' ? 'var(--brand)' : 'var(--success)',
                      cursor: (cell !== '' || tictactoeWinner) ? 'default' : 'pointer'
                    }}
                  >
                    {cell}
                  </button>
                ))}
              </div>

              {tictactoeFeedback && (
                <div style={{ fontSize: 13, color: tictactoeFeedback.includes('❌') || tictactoeFeedback.includes('⚠️') ? 'var(--error)' : 'var(--success)', fontWeight: 700, margin: '5px 0' }}>
                  {tictactoeFeedback}
                </div>
              )}

              <button className="btn-run" onClick={initTictactoe} style={{ width: '100%', marginTop: 10 }}>
                {t('tictactoeReset', language)}
              </button>
            </div>

            {/* AI Code Editor */}
            {codeMode && (
              <div className="daily-spell-card" style={{ minHeight: 350 }}>
                <div className="daily-spell-header" style={{ color: 'var(--brand)' }}>JAVASCRIPT AI BOT SCRIPT</div>
                
                <p style={{ fontSize: 12, color: 'var(--tx-2)', margin: '10px 0' }}>
                  {t('tictactoeRules', language)}
                </p>

                <div className="editor-inner" style={{ minHeight: 180, border: '1px solid var(--glass-border)', borderRadius: 8 }}>
                  <Editor
                    value={scriptCode}
                    onValueChange={c => setScriptCode(c)}
                    highlight={c => Prism.languages && Prism.languages.javascript ? Prism.highlight(c, Prism.languages.javascript, 'javascript') : c}
                    padding={12}
                    style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 13, color: 'var(--terminal-green)' }}
                  />
                </div>

                <button
                  className="btn-run"
                  onClick={handleRunCodeMove}
                  disabled={tictactoeWinner || !codeMode}
                  style={{ width: '100%', marginTop: 15, opacity: (tictactoeWinner || !codeMode) ? 0.5 : 1 }}
                >
                  {t('tictactoeRun', language)}
                </button>
              </div>
            )}

          </div>

        </div>
      )}

    </div>
  );
}
