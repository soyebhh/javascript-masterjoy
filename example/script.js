// ========================================================
// JS MASTER QUEST — script.js
// Game engine + Chapter data for Chapters 1, 2, 3
// Modular: add chapters by pushing to CHAPTERS array
// ========================================================

// ── Shorthand DOM selector ──────────────────────────────
const $ = id => document.getElementById(id);

// ── Cell visual config ──────────────────────────────────
const CELL_CSS = {
  wall: 'c-wall', path: 'c-path', trail: 'c-trail',
  player: 'c-player', goal: 'c-goal',
  wrong: 'c-wrong', right: 'c-right',
  'gate-locked': 'c-gate-locked', 'gate-open': 'c-gate-open',
  treasure: 'c-treasure'
};
const CELL_EMOJI = {
  player: '🤖', goal: '⭐', wrong: '❌', right: '🟢',
  'gate-locked': '🔒', 'gate-open': '🔓', treasure: '💎'
};

// ========================================================
// CHAPTER DEFINITIONS  (add Ch4–Ch10 by pushing here)
// ========================================================
const CHAPTERS = [

  // ──────────────────────────────────────────────────────
  // CHAPTER 1 — Variables
  // ──────────────────────────────────────────────────────
  {
    id: 1, badge: '📦', tabLabel: 'Ch.1 Variables',
    title: 'The Outpost of Variables',
    xpReward: 100,
    story: `You arrive at the ancient code outpost. Guard robot <strong>ROBO-X</strong> blocks the path.<br><br><em>"Program me with the correct number of steps using a <strong>variable</strong> and I shall let you through."</em>`,
    conceptHtml: `A <strong>variable</strong> is a named container for storing data.<br><br>
• Use <code>let</code> for values that <em>can change</em><br>
• Use <code>const</code> for values that are <em>fixed</em><br>
• Assign a value with the <strong>=</strong> sign`,
    codeExample: `// Creating variables
let score = 0;         // can change later
const maxLives = 3;    // fixed forever

score = score + 10;    // change it
console.log(score);    // prints: 10`,
    challengeHtml: `ROBO-X needs exactly <strong>6 steps</strong> to reach the gate.<br><br>Create a variable named <code>steps</code> and set it to the number <code>6</code>.`,
    hints: [
      "💡 Use `let` to create a variable:  `let variableName = value;`",
      "💡 The name must be exactly `steps` and the value must be the number `6`:  `let steps = 6;`"
    ],
    starterCode: `// 📦 Chapter 1: Variables
// Create a variable called 'steps' and set it to 6
// That tells ROBO-X how many blocks to walk!

`,
    // Grid: 10×4. Player=col0 row2, Goal=col6 row2
    grid: {
      rows: 4, cols: 10,
      cells: [
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall',
        'wall','path','path','path','path','path','path','wall','wall','wall',
        'player','path','path','path','path','path','goal','wall','wall','wall',
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'
      ],
      playerIdx: 20, goalIdx: 26
    },
    // returnExpr: last JS expression evaluated inside the sandbox
    returnExpr: `
      try { return (typeof steps !== 'undefined') ? steps : '__missing__'; }
      catch(e) { return '__missing__'; }`,
    validate(val, err) {
      if (err) return { ok:false, msg:`❌ Syntax Error: ${err}` };
      if (val === '__missing__') return { ok:false, msg:`I can't find a variable called \`steps\`. Did you write \`let steps = ...;\`?` };
      if (typeof val !== 'number') return { ok:false, msg:`\`steps\` is "${val}" (a ${typeof val}), not a number. Try: let steps = 6;` };
      if (val !== 6) return { ok:false, msg:`\`steps\` is ${val}, but ROBO-X needs exactly 6 steps! Hint: the goal is 6 blocks away.` };
      return { ok:true, msg:`✅ steps = 6! ROBO-X is marching forward!`, data:{ path:[20,21,22,23,24,25,26] } };
    }
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 2 — If / Else
  // ──────────────────────────────────────────────────────
  {
    id: 2, badge: '🔀', tabLabel: 'Ch.2 If/Else',
    title: 'The Twin Gates',
    xpReward: 150,
    story: `You reach the Twin Gates. Gatekeeper <strong>CONDA</strong> speaks:<br><br><em>"One gate leads to the village 🟢. One leads to the dungeon ❌. Write an <strong>if/else</strong> to choose. The password is already stored in <code>password</code>."</em>`,
    conceptHtml: `An <strong>if/else</strong> statement lets your code make a <em>decision</em>.<br><br>
• If the condition is <code>true</code> → first block runs<br>
• If the condition is <code>false</code> → else block runs<br>
• Use <code>===</code> to compare two values exactly`,
    codeExample: `let weather = "sunny";
let activity;

if (weather === "sunny") {
  activity = "go outside";   // runs if TRUE
} else {
  activity = "stay inside";  // runs if FALSE
}

console.log(activity); // "go outside"`,
    challengeHtml: `The variable <code>password</code> is already set to <code>"open"</code>.<br><br>
Write an <strong>if/else</strong>:<br>
• If <code>password === "open"</code>, set <code>direction = "right"</code><br>
• Otherwise, set <code>direction = "left"</code><br><br>
The correct gate is to the <strong>right 🟢</strong>!`,
    hints: [
      `💡 Compare strings with ===:  if (password === "open") { ... }`,
      `💡 Set direction inside each block:  direction = "right";  and  direction = "left";`
    ],
    starterCode: `// 🔀 Chapter 2: If / Else
// The password is already set for you below ↓
let password = "open";

// Step 1: Declare the direction variable
let direction;

// Step 2: Write your if/else statement here:
// If password equals "open", set direction to "right"
// Otherwise, set direction to "left"

`,
    // Grid: 10×4. Wrong=col0 row1, Player=col4 row1, Right=col8 row1
    grid: {
      rows: 4, cols: 10,
      cells: [
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall',
        'wrong','path','path','path','player','path','path','path','right','wall',
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall',
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'
      ],
      playerIdx: 14, rightIdx: 18, wrongIdx: 10
    },
    returnExpr: `
      try { return (typeof direction !== 'undefined') ? direction : '__missing__'; }
      catch(e) { return '__missing__'; }`,
    validate(val, err) {
      if (err) return { ok:false, msg:`❌ Syntax Error: ${err}` };
      if (val === '__missing__') return { ok:false, msg:`The variable \`direction\` was never set. Did you write the if/else body?` };
      if (val === 'left') return { ok:false, msg:`You set direction = "left" but the correct gate is on the RIGHT! Does your condition check password === "open"?` };
      if (val !== 'right') return { ok:false, msg:`direction is "${val}". It should be "right" or "left". Check your spelling!` };
      return { ok:true, msg:`✅ direction = "right"! The green gate opens!`, data:{ path:[14,15,16,17,18] } };
    }
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 3 — Functions
  // ──────────────────────────────────────────────────────
  {
    id: 3, badge: '⚙️', tabLabel: 'Ch.3 Functions',
    title: 'The Factory of Functions',
    xpReward: 200,
    story: `You stand before the <strong>Gate of Functions</strong>. Sage <strong>ARITY</strong> speaks:<br><br><em>"A function is a reusable spell. Define a function called <code>openGate</code> that <code>return</code>s the magic number <code>42</code>. Call it. Store the result in <code>key</code>. Only then will the gate open!"</em>`,
    conceptHtml: `A <strong>function</strong> is a named, reusable block of code.<br><br>
• <strong>Define</strong> it once with the <code>function</code> keyword<br>
• <strong>Call</strong> it by writing its name followed by <code>()</code><br>
• It can <code>return</code> a value back to the caller`,
    codeExample: `// 1. Define a function
function greet(name) {
  return "Hello, " + name + "!";
}

// 2. Call the function
let message = greet("Hero");
console.log(message); // "Hello, Hero!"`,
    challengeHtml: `
<strong>Step 1:</strong> Define a function named <code>openGate</code> with no parameters. It must <code>return</code> the number <code>42</code>.<br><br>
<strong>Step 2:</strong> Call <code>openGate()</code> and store its return value in a variable called <code>key</code>.<br><br>
If <code>key === 42</code>, the gate opens! 🔓`,
    hints: [
      "💡 Define the function:  function openGate() { return 42; }",
      "💡 Call it and store the result:  let key = openGate();"
    ],
    starterCode: `// ⚙️ Chapter 3: Functions

// Step 1: Define a function named 'openGate'
//         It should return the number 42


// Step 2: Call openGate() and store
//         the result in a variable called 'key'

`,
    // Grid: 10×4. Player=col0 row1, Gate=col3 row1, Treasure=col7 row1
    grid: {
      rows: 4, cols: 10,
      cells: [
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall',
        'player','path','path','gate-locked','path','path','path','treasure','wall','wall',
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall',
        'wall','wall','wall','wall','wall','wall','wall','wall','wall','wall'
      ],
      playerIdx: 10, gateIdx: 13, treasureIdx: 17
    },
    returnExpr: `
      try {
        return {
          hasFunc: (typeof openGate === 'function'),
          key: (typeof key !== 'undefined') ? key : '__missing__'
        };
      } catch(e) { return { hasFunc: false, key: '__missing__' }; }`,
    validate(val, err) {
      if (err) return { ok:false, msg:`❌ Syntax Error: ${err}` };
      if (!val.hasFunc) return { ok:false, msg:`I don't see a function named \`openGate\`. Start with:  function openGate() { ... }` };
      if (val.key === '__missing__') return { ok:false, msg:`You defined the function but never called it! Add:  let key = openGate();` };
      if (val.key !== 42) return { ok:false, msg:`\`key\` is ${val.key}, but the gate needs 42! Make sure your function returns 42.` };
      return { ok:true, msg:`✅ key = 42! The gate unlocks — treasure awaits!`, data:{ gate:true, path:[10,11,12,13,14,15,16,17] } };
    }
  }

  // ── ADD CHAPTER 4–10 HERE ──────────────────────────────
  // To add a new chapter, push an object with the same shape
  // as the chapters above into the CHAPTERS array.
  // ──────────────────────────────────────────────────────
];

// ========================================================
// GAME STATE
// ========================================================
const state = {
  chap:        0,        // current chapter index
  unlocked:    new Set([0,1,2]),  // unlocked chapter indices
  completed:   new Set(),         // completed chapter indices
  xp:          0,
  hintsLeft:   2,
  hintsUsed:   0,
  animating:   false,
  gridCells:   [],       // working copy of the grid cell types
  gridMeta:    null      // reference to the current chapter's grid config
};

// ========================================================
// GRID ENGINE
// ========================================================
function buildGrid(chap) {
  state.gridCells = [...chap.grid.cells];
  state.gridMeta  = chap.grid;
  renderGrid();
}

function renderGrid() {
  const { rows, cols } = state.gridMeta;
  const g = $('game-grid');
  g.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  g.innerHTML = '';
  state.gridCells.forEach((type, i) => {
    const div = document.createElement('div');
    div.id = `cell-${i}`;
    div.className = `cell ${CELL_CSS[type] || 'c-wall'}`;
    div.textContent = CELL_EMOJI[type] || '';
    g.appendChild(div);
  });
}

function setCellType(idx, type) {
  state.gridCells[idx] = type;
  const div = $(`cell-${idx}`);
  if (!div) return;
  div.className = `cell ${CELL_CSS[type] || 'c-wall'}`;
  div.textContent = CELL_EMOJI[type] || '';
}

// Animate player walking along a path (array of cell indices)
function animatePath(path, callback) {
  let step = 1; // start from the second cell; first is where player already is
  function tick() {
    if (step >= path.length) { callback && callback(); return; }
    // Leave a trail on the previous cell (unless it's special)
    const prevType = state.gridCells[path[step - 1]];
    const keep = ['goal','right','treasure','gate-open','wrong'];
    if (!keep.includes(prevType)) setCellType(path[step - 1], 'trail');
    // Move player
    setCellType(path[step], 'player');
    step++;
    setTimeout(tick, 280);
  }
  tick();
}

// ========================================================
// CODE EVALUATOR (sandboxed via new Function)
// ========================================================
function runCode(userCode, chap) {
  const logs = [];
  const fakeConsole = {
    log:   (...a) => logs.push(a.map(x => typeof x === 'object' ? JSON.stringify(x) : String(x)).join(' ')),
    warn:  (...a) => logs.push('[warn] ' + a.join(' ')),
    error: (...a) => logs.push('[error] ' + a.join(' '))
  };
  try {
    const fn = new Function('console', `"use strict";\n${userCode}\n${chap.returnExpr}`);
    const result = fn(fakeConsole);
    return { result, logs, error: null };
  } catch(e) {
    return { result: null, logs, error: e.message };
  }
}

// ========================================================
// UI HELPERS
// ========================================================
function setConsole(msg, type = '') {
  $('console-out').className = `console-out${type ? ' ' + type : ''}`;
  $('console-text').textContent = msg;
}
function setMapStatus(msg) { $('map-status').textContent = msg; }
function showGridMsg(msg, isErr) {
  const el = $('grid-msg');
  el.textContent = msg;
  el.className = `grid-msg${isErr ? ' err' : ''}`;
  el.classList.remove('hidden');
}
function hideGridMsg() { $('grid-msg').classList.add('hidden'); }

function addXP(amount) {
  state.xp += amount;
  $('xp-val').textContent = state.xp;
}

function updateLineNums() {
  const lines = $('code-editor').value.split('\n').length;
  $('line-nums').innerHTML = Array.from({length: lines}, (_, i) =>
    `<div>${i + 1}</div>`
  ).join('');
}

function renderTabs() {
  const nav = $('chapter-nav');
  nav.innerHTML = '';
  CHAPTERS.forEach((ch, i) => {
    const btn = document.createElement('button');
    btn.className = 'ch-tab';
    btn.textContent = ch.tabLabel;
    if (i === state.chap)        btn.classList.add('active');
    else if (state.completed.has(i)) btn.classList.add('done');
    else if (!state.unlocked.has(i)) btn.classList.add('locked');
    btn.addEventListener('click', () => {
      if (state.unlocked.has(i) || state.completed.has(i)) loadChapter(i);
    });
    nav.appendChild(btn);
  });
}

// ========================================================
// LOAD CHAPTER
// ========================================================
function loadChapter(idx) {
  state.chap      = idx;
  state.hintsLeft = 2;
  state.hintsUsed = 0;
  state.animating = false;
  const ch = CHAPTERS[idx];

  // Mentor panel
  $('mentor-badge').textContent = ch.badge;
  $('ch-label').textContent     = `CHAPTER ${ch.id}`;
  $('ch-title').textContent     = ch.title;
  $('story-text').innerHTML     = ch.story;
  $('concept-text').innerHTML   = ch.conceptHtml;
  $('concept-code').textContent = ch.codeExample;
  $('challenge-text').innerHTML = ch.challengeHtml;

  // Editor
  $('code-editor').value = ch.starterCode;
  updateLineNums();
  setConsole('Ready. Write your code and click Run!');

  // Grid
  buildGrid(ch);
  setMapStatus('Awaiting your code...');
  hideGridMsg();

  // Controls
  $('run-btn').disabled = false;
  $('hint-btn').textContent = `💡 Hint (${state.hintsLeft})`;

  renderTabs();
}

// ========================================================
// LEVEL CLEAR SCREEN
// ========================================================
function showLevelClear(ch) {
  const stars = state.hintsUsed === 0 ? '⭐⭐⭐' : state.hintsUsed === 1 ? '⭐⭐' : '⭐';
  $('clear-trophy').textContent = state.hintsUsed === 0 ? '🏆' : '🎉';
  $('clear-title').textContent  = `${ch.badge} ${ch.title} — Complete!`;
  $('stars-display').textContent = stars;
  $('clear-info').textContent   = `+${ch.xpReward} XP earned  •  Hints used: ${state.hintsUsed}`;
  const nextExists = state.chap + 1 < CHAPTERS.length;
  $('next-btn').style.display   = nextExists ? 'inline-flex' : 'none';
  $('clear-overlay').classList.remove('hidden');
}

// ========================================================
// RUN CODE HANDLER (core game loop)
// ========================================================
function handleRunCode() {
  if (state.animating) return;
  const ch   = CHAPTERS[state.chap];
  const code = $('code-editor').value;
  const { result, logs, error } = runCode(code, ch);

  // Show any console.log output
  if (logs.length > 0) setConsole(logs.join('  |  '), 'info');

  // Validate
  const v = ch.validate(result, error);
  if (!v.ok) {
    setConsole(v.msg, 'error');
    showGridMsg(v.msg, true);
    $('game-grid').classList.add('shake');
    setTimeout(() => $('game-grid').classList.remove('shake'), 450);
    return;
  }

  // ── SUCCESS ──
  setConsole(v.msg, 'success');
  setMapStatus('🏃 Running...');
  hideGridMsg();
  state.animating = true;
  $('run-btn').disabled = true;

  // Chapter 3 needs gate to open before walking
  function doAnimation() {
    animatePath(v.data.path, () => {
      state.animating = false;
      setMapStatus('✅ Challenge Complete!');
      showGridMsg('🎉 Level Complete!', false);
      addXP(ch.xpReward);
      state.completed.add(state.chap);
      const next = state.chap + 1;
      if (next < CHAPTERS.length) state.unlocked.add(next);
      setTimeout(() => showLevelClear(ch), 900);
    });
  }

  if (v.data.gate) {
    setCellType(state.gridMeta.gateIdx, 'gate-open');
    setTimeout(doAnimation, 550);
  } else {
    doAnimation();
  }
}

// ========================================================
// EVENT LISTENERS
// ========================================================

// Start / intro
$('start-btn').addEventListener('click', () => {
  $('intro-overlay').classList.add('hidden');
  $('app').classList.remove('hidden');
  loadChapter(0);
});

// Run code
$('run-btn').addEventListener('click', handleRunCode);

// Ctrl+Enter to run
$('code-editor').addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); handleRunCode(); }
  if (e.key === 'Tab') {
    e.preventDefault();
    const s = e.target.selectionStart, end = e.target.selectionEnd;
    e.target.value = e.target.value.substring(0, s) + '  ' + e.target.value.substring(end);
    e.target.selectionStart = e.target.selectionEnd = s + 2;
  }
  setTimeout(updateLineNums, 0);
});
$('code-editor').addEventListener('input', updateLineNums);
$('code-editor').addEventListener('scroll', () => {
  $('line-nums').scrollTop = $('code-editor').scrollTop;
});

// Hint button
$('hint-btn').addEventListener('click', () => {
  if (state.hintsLeft === 0) { setConsole('No hints remaining for this chapter!', 'error'); return; }
  const ch = CHAPTERS[state.chap];
  const i  = ch.hints.length - state.hintsLeft; // 0 first, then 1
  setConsole(ch.hints[i] || 'No more hints!', 'info');
  state.hintsUsed++;
  state.hintsLeft--;
  $('hint-btn').textContent = state.hintsLeft === 0 ? '💡 No Hints Left' : `💡 Hint (${state.hintsLeft})`;
});

// Reset code editor
$('reset-btn').addEventListener('click', () => {
  const ch = CHAPTERS[state.chap];
  $('code-editor').value = ch.starterCode;
  updateLineNums();
  buildGrid(ch);
  setConsole('Code reset. Give it another try!');
  hideGridMsg();
  setMapStatus('Awaiting your code...');
  state.animating = false;
  $('run-btn').disabled = false;
});

// Level clear — Next Chapter
$('next-btn').addEventListener('click', () => {
  $('clear-overlay').classList.add('hidden');
  const next = state.chap + 1;
  if (next < CHAPTERS.length) loadChapter(next);
});

// Level clear — Retry (go for better star rating)
$('retry-btn').addEventListener('click', () => {
  $('clear-overlay').classList.add('hidden');
  const ch = CHAPTERS[state.chap];
  $('code-editor').value = ch.starterCode;
  updateLineNums();
  buildGrid(ch);
  state.hintsLeft = 2; state.hintsUsed = 0;
  $('hint-btn').textContent = '💡 Hint (2)';
  setConsole('Go for 3 stars — no hints this time! 💪');
  hideGridMsg();
  setMapStatus('Awaiting your code...');
  state.animating = false;
  $('run-btn').disabled = false;
});
