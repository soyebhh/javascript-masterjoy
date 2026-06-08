import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EditorImport from 'react-simple-code-editor';
const Editor = EditorImport.default || EditorImport;
import Prism from 'prismjs';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import { useGame } from '../context/GameContext';
import { quests } from '../data/gridQuests';
import GridMap from '../components/GridMap';
import confetti from 'canvas-confetti';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { t } from '../data/translationEngine';

export default function Chapter() {
  const { chapterId, levelId } = useParams();
  const navigate = useNavigate();
  const { isCompleted, completeLevel, language } = useGame();
  
  const chapterData = quests[chapterId];
  const levelData = chapterData?.levels.find(l => l.levelId === levelId);
  
  // Phase state: 'LEARNING' (Sensei's Dojo) vs 'QUEST' (Grid Coding editor)
  const [currentPhase, setCurrentPhase] = useState('LEARNING');
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [filledBlank, setFilledBlank] = useState('');
  const [isDojoCleared, setIsDojoCleared] = useState(false);
  const [shakeDojo, setShakeDojo] = useState(false);
  const [dojoFeedback, setDojoFeedback] = useState(null);

  // Quest states
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [outputType, setOutputType] = useState('');
  const [dynamicCells, setDynamicCells] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [levelClear, setLevelClear] = useState(false);
  
  useEffect(() => {
    // If invalid route, go home
    if (!levelData) {
      navigate('/');
      return;
    }
    
    // Reset and initialize quest state
    setCode(levelData.starterCode);
    setOutput(t('awaitingCode', language));
    setOutputType('');
    setDynamicCells([...levelData.grid.cells]);
    setLevelClear(isCompleted(levelId));
    setIsAnimating(false);

    // Reset Dojo state for the new level
    setCurrentPhase('LEARNING');
    setCurrentStepIndex(0);
    setSelectedOption(null);
    setFilledBlank('');
    setIsDojoCleared(false);
    setDojoFeedback(null);
    setShakeDojo(false);
  }, [chapterId, levelId, levelData, isCompleted, language]);

  if (!levelData) return null;

  const handleNextDojoStep = () => {
    setDojoFeedback(null);
    setSelectedOption(null);
    setFilledBlank('');
    
    if (levelData.learningSteps && currentStepIndex < levelData.learningSteps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      setIsDojoCleared(true);
    }
  };

  const handleSelectOption = (option) => {
    if (dojoFeedback?.type === 'success') return; // already solved
    const currentStep = levelData.learningSteps[currentStepIndex];
    setSelectedOption(option);
    
    if (option === currentStep.answer) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 }, colors: ['#c084fc', '#34d399'] });
      setDojoFeedback({ type: 'success', msg: t(currentStep.successMsg, language) || "Shaandar! Sahi jawab. 🎉" });
    } else {
      setShakeDojo(true);
      setTimeout(() => setShakeDojo(false), 500);
      setDojoFeedback({ type: 'error', msg: t(currentStep.hint, language) || "Aray bhai! Yeh galat hai. Dobara koshish karo! 💡" });
    }
  };

  const handleSelectBlank = (pill) => {
    if (dojoFeedback?.type === 'success') return; // already solved
    const currentStep = levelData.learningSteps[currentStepIndex];
    setFilledBlank(pill);
    
    if (pill === currentStep.blankValue) {
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.8 }, colors: ['#c084fc', '#34d399'] });
      setDojoFeedback({ type: 'success', msg: t(currentStep.successMsg, language) || "Bilkul sahi code banaya! 🎉" });
    } else {
      setShakeDojo(true);
      setTimeout(() => setShakeDojo(false), 500);
      setDojoFeedback({ type: 'error', msg: t(currentStep.hint, language) || "Galat pill select kiya bhai, code run nahi hoga. Dobara try karo! 💡" });
    }
  };

  const handleRunCode = () => {
    if (isAnimating) return;
    
    try {
      let logs = [];
      const fakeConsole = {
        log: (...args) => logs.push(args.join(' ')),
        error: (...args) => logs.push('[ERROR] ' + args.join(' '))
      };
      
      // Execute the code securely
      // We prepend strict mode and append the return expression
      const fn = new Function('console', `"use strict";\n${code}\n${levelData.returnExpr}`);
      const result = fn(fakeConsole);
      
      if (logs.length > 0) {
        setOutput(logs.join(' | '));
        setOutputType('info');
      }

      // Run validation logic
      const validation = levelData.validate(result);
      
      if (!validation.ok) {
        setOutput(t(validation.msg, language));
        setOutputType('error');
        return;
      }
      
      // SUCCESS!
      setOutput(t(validation.msg, language));
      setOutputType('success');
      
      // Animate if there's a path
      if (validation.data?.path) {
        setIsAnimating(true);
        animatePath(validation.data.path, validation.data.gate);
      } else {
        triggerWin();
      }

    } catch (err) {
      setOutput(`[ERROR]: ${err.message}`);
      setOutputType('error');
    }
  };

  const animatePath = (path, openGate) => {
    let cells = [...levelData.grid.cells];
    
    // If gate opens, unlock it first
    if (openGate && levelData.grid.gateIdx) {
      cells[levelData.grid.gateIdx] = 'gate-open';
      setDynamicCells([...cells]);
    }

    let step = 1; // Start from second cell, since player is already at 0
    
    const tick = () => {
      if (step >= path.length) {
        setIsAnimating(false);
        triggerWin();
        return;
      }
      
      // Leave a trail on the previous cell
      const prevIdx = path[step - 1];
      const prevType = cells[prevIdx];
      const keepTypes = ['goal', 'right', 'treasure', 'gate-open', 'wrong'];
      
      if (!keepTypes.includes(prevType)) {
        cells[prevIdx] = 'trail';
      }
      
      // Move player to current step
      cells[path[step]] = 'player';
      
      setDynamicCells([...cells]);
      step++;
      
      setTimeout(tick, 300);
    };
    
    setTimeout(tick, 400); // Initial delay
  };

  const triggerWin = () => {
    confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 }, colors: ['#c084fc', '#34d399'] });
    completeLevel(levelId);
    setLevelClear(true);
  };

  const handleNextLevel = () => {
    // Find next level in chapter
    const currentIdx = chapterData.levels.findIndex(l => l.levelId === levelId);
    if (currentIdx < chapterData.levels.length - 1) {
      navigate(`/chapter/${chapterId}/${chapterData.levels[currentIdx + 1].levelId}`);
    } else {
      // Find next chapter
      const chapterKeys = Object.keys(quests);
      const currentChapIdx = chapterKeys.indexOf(chapterId);
      if (currentChapIdx < chapterKeys.length - 1) {
        const nextChapId = chapterKeys[currentChapIdx + 1];
        navigate(`/chapter/${nextChapId}/${quests[nextChapId].levels[0].levelId}`);
      } else {
        navigate('/'); // Completely done
      }
    }
  };

  const currentStep = levelData.learningSteps?.[currentStepIndex];

  return (
    <ErrorBoundary>
      {currentPhase === 'LEARNING' && levelData.learningSteps && levelData.learningSteps.length > 0 ? (
        <div className="dojo-layout">
          <div className={`dojo-card ${shakeDojo ? 'shake' : ''}`}>
            
            {/* Header: Progress bar */}
            <div className="dojo-header">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--brand)', textTransform: 'uppercase' }}>
                  🥋 {language === 'english' ? "Sensei's Dojo" : "Sensei's Dojo"} &bull; Level {levelData.levelId}
                </span>
                <button className="dojo-skip-btn" onClick={() => setCurrentPhase('QUEST')}>
                  {language === 'english' ? 'Skip to Quest ⏭️' : 'Quest par Chalo ⏭️'}
                </button>
              </div>
              
              {!isDojoCleared ? (
                <>
                  <div className="dojo-progress-track">
                    <div 
                      className="dojo-progress-fill" 
                      style={{ width: `${((currentStepIndex) / levelData.learningSteps.length) * 100}%` }}
                    />
                  </div>
                  <span style={{ fontSize: 12, color: 'var(--tx-3)', marginTop: 4 }}>
                    {t('step', language)} {currentStepIndex + 1} {t('of', language)} {levelData.learningSteps.length}
                  </span>
                </>
              ) : (
                <div className="dojo-progress-track">
                  <div className="dojo-progress-fill" style={{ width: '100%' }} />
                </div>
              )}
            </div>

            {/* Content area */}
            {!isDojoCleared ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Sensei Explanation */}
                <div className="dojo-sensei-box">
                  <div className="dojo-sensei-avatar">🌸</div>
                  <div className="dojo-speech-bubble">
                    <div style={{ fontWeight: 'bold', color: 'var(--brand)', marginBottom: 6 }}>{language === 'english' ? 'Sensei says:' : 'Sensei kehte hain:'}</div>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{t(currentStep.text, language)}</div>
                  </div>
                </div>

                {/* Interactive Question / Pill Game depending on step.type */}
                {currentStep.type === 'quiz' && (
                  <div className="dojo-interactive">
                    <div className="dojo-question-text">🎯 {t(currentStep.question, language)}</div>
                    <div className="dojo-options-grid">
                      {currentStep.options.map((option, i) => {
                        const isSelected = selectedOption === option;
                        const isCorrect = option === currentStep.answer;
                        let btnClass = "";
                        if (isSelected) {
                          btnClass = isCorrect ? "correct" : "incorrect";
                        }
                        return (
                          <button
                            key={i}
                            className={`dojo-option-btn ${btnClass}`}
                            onClick={() => handleSelectOption(option)}
                            disabled={dojoFeedback?.type === 'success'}
                          >
                            <span>{i + 1}.</span> {t(option, language)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {currentStep.type === 'fill-blank' && (
                  <div className="dojo-interactive">
                    <div className="dojo-question-text">📝 {t(currentStep.question, language)}</div>
                    
                    <div className="dojo-code-preview">
                      {currentStep.code.split("______").map((part, index, arr) => (
                        <span key={index}>
                          {part}
                          {index < arr.length - 1 && (
                            <span className={`dojo-blank-slot ${filledBlank ? 'filled' : ''}`}>
                              {t(filledBlank, language) || '______'}
                            </span>
                          )}
                        </span>
                      ))}
                    </div>

                    <div className="dojo-pills-row">
                      {currentStep.options.map((pill, idx) => (
                        <button
                          key={idx}
                          className={`dojo-word-pill ${filledBlank === pill ? 'selected' : ''}`}
                          onClick={() => handleSelectBlank(pill)}
                          disabled={dojoFeedback?.type === 'success'}
                        >
                          {t(pill, language)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {currentStep.type === 'dialogue' && (
                  <div style={{ textAlign: 'center', marginTop: 10 }}>
                    <button className="btn-run" style={{ width: '100%', padding: '12px 20px' }} onClick={handleNextDojoStep}>
                      {language === 'english' ? 'Next ⟶' : 'Aage ⟶'}
                    </button>
                  </div>
                )}

                {/* Success/Error Banner overlay */}
                {dojoFeedback && (
                  <div className={`dojo-feedback-banner ${dojoFeedback.type}`}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>
                      {dojoFeedback.type === 'success' ? '✅' : '❌'} {t(dojoFeedback.msg, language)}
                    </div>
                    {dojoFeedback.type === 'success' && (
                      <button className="btn-run" onClick={handleNextDojoStep} style={{ background: '#fff', color: '#000' }}>
                        {language === 'english' ? 'Continue ⟶' : 'Aage Chalo ⟶'}
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              // Dojo cleared screen
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: 64, animation: 'float 2s ease-in-out infinite' }}>⚔️</div>
                <h2 style={{ fontSize: 24, color: 'var(--brand)', textShadow: 'var(--brand-glow)', fontWeight: 800 }}>{t('dojoCleared', language)}</h2>
                <p style={{ color: 'var(--tx-2)', fontSize: 16, lineHeight: 1.6, maxWidth: 500 }}>
                  {t('dojoClearedStory', language)}
                </p>
                <button 
                  className="btn-run" 
                  style={{ width: '100%', maxWidth: 300, padding: '14px 20px', fontSize: 16 }}
                  onClick={() => setCurrentPhase('QUEST')}
                >
                  {t('startQuest', language)}
                </button>
              </div>
            )}

          </div>
        </div>
      ) : (
        // Quest phase (split-screen editor + map)
        <div style={{ display: 'flex', width: '100%', height: '100%' }} className="game-area">
          {/* LEFT PANEL: Mentor & Story */}
          <div className="mentor-panel">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
              <div>
                <span style={{ color: 'var(--brand)', fontWeight: 'bold' }}>{t(chapterData.title, language)}</span>
                <h1 style={{ fontSize: 24, margin: '5px 0 0 0' }}>{t(levelData.title, language)}</h1>
              </div>
              {levelData.learningSteps && levelData.learningSteps.length > 0 && (
                <button 
                  onClick={() => {
                    setCurrentPhase('LEARNING');
                    setCurrentStepIndex(0);
                    setIsDojoCleared(false);
                    setDojoFeedback(null);
                  }}
                  style={{
                    background: 'rgba(192, 132, 252, 0.15)',
                    border: '1px solid var(--brand)',
                    color: 'var(--brand)',
                    padding: '6px 12px',
                    borderRadius: 6,
                    fontSize: 12,
                    cursor: 'pointer',
                    fontWeight: 700,
                    whiteSpace: 'nowrap'
                  }}
                >
                  {t('backDojo', language)}
                </button>
              )}
            </div>

            <div className="story-box" dangerouslySetInnerHTML={{ __html: t(levelData.story, language) }} />
            
            <div className="scroll-card">
              <div className="scroll-title">{language === 'english' ? '📜 Concept' : '📜 Concept'}</div>
              <div dangerouslySetInnerHTML={{ __html: t(levelData.conceptHtml, language) }} style={{ fontSize: 15, lineHeight: 1.6 }} />
            </div>

            {levelClear && (
              <div style={{ marginTop: 'auto', background: 'rgba(52, 211, 153, 0.2)', border: '1px solid var(--success)', padding: 20, borderRadius: 8, textAlign: 'center' }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{t('levelCleared', language)}</div>
                <button 
                  className="btn-run" 
                  style={{ width: '100%' }}
                  onClick={handleNextLevel}
                >
                  {t('nextLevel', language)}
                </button>
              </div>
            )}
          </div>

          {/* RIGHT PANEL: Game & Code Editor */}
          <div className="game-panel">
            
            <div className="grid-section">
              <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                <span style={{ fontWeight: 'bold', color: 'var(--tx-2)' }}>{t('questMap', language)}</span>
              </div>
              <GridMap grid={levelData.grid} dynamicCells={dynamicCells} />
            </div>

            <div className="editor-section">
              <div className="editor-header">
                <span>{t('codeEditor', language)}</span>
                <button 
                  onClick={() => { setCode(levelData.starterCode); setDynamicCells([...levelData.grid.cells]); setOutput(t('awaitingCode', language)); }}
                  style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: '#fff', padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}
                >
                  {t('reset', language)}
                </button>
              </div>
              
              <div className="editor-inner">
                <Editor
                  value={code}
                  onValueChange={code => setCode(code)}
                  highlight={c => Prism.languages && Prism.languages.javascript ? Prism.highlight(c, Prism.languages.javascript, 'javascript') : c}
                  padding={20}
                  style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 16, outline: 'none', color: '#e2e8f0', minHeight: '100%' }}
                />
              </div>

              <div className="console-output">
                <div style={{ flex: 1, color: outputType === 'error' ? 'var(--error)' : outputType === 'success' ? 'var(--success)' : '#fff' }}>
                  <span style={{ color: 'var(--tx-3)', marginRight: 10 }}>▸</span>
                  {t(output, language)}
                </div>
                <button 
                  className="btn-run" 
                  onClick={handleRunCode}
                  disabled={isAnimating || levelClear}
                  style={{ opacity: isAnimating || levelClear ? 0.5 : 1 }}
                >
                  {t('runCode', language)}
                </button>
              </div>
            </div>

          </div>

        </div>
      )}
    </ErrorBoundary>
  );
}

