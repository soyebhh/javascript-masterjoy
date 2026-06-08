// src/data/translationEngine.js

const uiTranslations = {
  english: {
    syllabus: "📖 Syllabus",
    quest: "⚔️ Quest",
    timepass: "🎮 Timepass Gaming",
    settings: "⚙️ Settings",
    unlockAll: "Unlock All Levels",
    resetProgress: "Reset Progress",
    totalXp: "Total XP",
    levelsClear: "Levels Clear",
    progress: "Progress",
    resumeAdventure: "Resume Adventure ⚔️",
    dojoMap: "🗺️ DOJO MAP",
    readSyllabus: "📖 Read Syllabus",
    cleared: "Cleared",
    activities: "🎯 ACTIVITIES",
    dailySpell: "🪄 Daily Spell Challenge",
    senseiAsks: "Sensei asks:",
    submitSpell: "🚀 Submit Spell Answer",
    challengeSolved: "✓ Challenge Solved! Come back tomorrow for new daily spells. 🌟",
    dojoRules: "📜 Dojo Rules",
    rulesContent: "1. Chapters and levels unlock step by step.\n2. Learn the rules in the Dojo, and play activities to understand variables and logic.\n3. Write your code in the editor to clear the quest target!\n4. Complete daily challenges for bonus XP!",
    chapterNotFound: "Chapter Not Found",
    backDashboard: "Back to Dashboard",
    playQuest: "⚔️ Play Coding Quest",
    explanation: "Explanation",
    output: "Output",
    wrong: "WRONG",
    right: "RIGHT",
    reason: "Reason",
    commonMistakes: "🚨 Common Mistakes to Avoid",
    interviewQuestions: "💼 Technical Interview Questions",
    summaryChecklist: "📝 Summary Checklist",
    chapterTest: "🧠 Chapter Test Quest",
    nextChapter: "Next Chapter ⟶",
    retryQuestion: "↺ Retry Question",
    backDojo: "📖 Back to Dojo",
    step: "Step",
    of: "of",
    dojoCleared: "Dojo Training Complete!",
    dojoClearedStory: "Awesome job! The concepts are clear now. Now it's time to run the robot on the field using magic code commands!",
    startQuest: "LET'S START THE QUEST! 🗺️",
    questMap: "🗺️ Quest Map",
    codeEditor: "💻 Code Editor — JavaScript",
    reset: "↺ Reset",
    runCode: "▶ RUN CODE",
    levelCleared: "🎉 LEVEL CLEARED!",
    nextLevel: "NEXT LEVEL ⟶",
    awaitingCode: "Awaiting your code...",
    codeMode: "💻 Write AI Code",
    manualMode: "🖐️ Manual Click",
    snakeTitle: "🐍 Classic Retro Snake",
    snakeScore: "Score",
    snakeHigh: "High Score",
    snakeOver: "GAME OVER",
    snakeOverScore: "Score reached",
    snakeRestart: "Restart Game",
    snakePause: "Pause",
    snakeStart: "Start Game",
    snakeRules: "Use keyboard Arrow Keys to steer the snake. Eat food to grow!",
    candyTitle: "🍬 JS Data Types Crush",
    candyScore: "Crush Score",
    candyReset: "Reset Board 🍬",
    candyRules: "Match 3 or more variables of the same JS Data Type (e.g. String, Number, Boolean) to clear them! Click one, then an adjacent one to swap.",
    tictactoeTitle: "❌ Coding Tic-Tac-Toe",
    tictactoeRules: "Write an algorithm in the function below. It must find an empty cell and return its index (0-8).",
    tictactoeRun: "▶ Execute Script Turn",
    tictactoeReset: "Reset Tic-Tac-Toe",
    senseiClue: "Sensei's Clue",
    codeModeSnake: "🤖 Write AI steer function nextDirection(head, food, body) that returns 'UP', 'DOWN', 'LEFT', or 'RIGHT' to auto-pilot the snake!",
    senseiGuide: "🎓 Sensei's Guide (Baby Steps)",
    snakeStep0Title: "Step 0: Play like a Pro!",
    snakeStep0Desc: "First, use the arrow keys to eat the food. Understand how the snake moves before we code it!",
    snakeStep1Title: "Step 1: Magic Command",
    snakeStep1Desc: "Write `return 'UP';` in the code editor and click Run. Watch the snake go UP automatically!",
    snakeStep2Title: "Step 2: Smart Brain (If Condition)",
    snakeStep2Desc: "Check where the food is! If the food is above the snake (`food.y < head.y`), go UP.",
    snakeStep3Title: "Step 3: Full Auto-Pilot",
    snakeStep3Desc: "Use `if` and `else if` to check all directions (UP, DOWN, LEFT, RIGHT). Can you write the full AI?",
    candyStep0Title: "What is JS Crush?",
    candyStep0Desc: "In JavaScript, data comes in different forms. Let's learn them by crushing candies!",
    candyStep1Title: "Step 1: The 'String'",
    candyStep1Desc: "A String is just text, like your name. It always has quotes around it: `\"hello\"` or `'js'`.",
    candyStep2Title: "Step 2: The 'Number'",
    candyStep2Desc: "Numbers are for math: `42`, `-7`, `3.14`. No quotes needed for numbers!",
    candyStep3Title: "Step 3: The 'Boolean'",
    candyStep3Desc: "A Boolean is a simple YES or NO. In JavaScript, we write `true` or `false`.",
    ticTacStep1Title: "Step 1: Manual Click",
    ticTacStep1Desc: "Play Tic-Tac-Toe manually by clicking the boxes to understand the game.",
    ticTacStep2Title: "Step 2: Center Code",
    ticTacStep2Desc: "Write `return 4;` to make your AI always pick the middle box!",
    ticTacStep3Title: "Step 3: Smart Loop",
    ticTacStep3Desc: "Use a `for` loop to check every box (`board[i] === ''`) and return the first empty spot!"
  },
  hinglish: {
    syllabus: "📖 Syllabus",
    quest: "⚔️ Quest",
    timepass: "🎮 Timepass Gaming",
    settings: "⚙️ Settings",
    unlockAll: "Saare Levels Unlock Karo",
    resetProgress: "Progress Reset Karo",
    totalXp: "Total XP",
    levelsClear: "Levels Clear",
    progress: "Progress",
    resumeAdventure: "Adventure Shuru Karo ⚔️",
    dojoMap: "🗺️ DOJO MAP",
    readSyllabus: "📖 Syllabus Padho",
    cleared: "Clear Kiya",
    activities: "🎯 ACTIVITIES",
    dailySpell: "🪄 Daily Spell Challenge",
    senseiAsks: "Sensei poochte hain:",
    submitSpell: "🚀 Sahi Answer Submit Karo",
    challengeSolved: "✓ Challenge Solved! Kal naye daily spell ke liye aana. 🌟",
    dojoRules: "📜 Dojo ke Rules",
    rulesContent: "1. Har chapter ke levels serial wise unlock honge.\n2. Dojo mein rules seekho aur direct mini-game activities se variables aur operators run karo.\n3. Editor par logic codes likho aur quest target clear karo!\n4. Daily challenges complete karke extra XP earn karo!",
    chapterNotFound: "Chapter nahi mila",
    backDashboard: "Dashboard par wapas chalo",
    playQuest: "⚔️ Play Coding Quest",
    explanation: "Explanation",
    output: "Output",
    wrong: "GALAT",
    right: "SAHI",
    reason: "Karan",
    commonMistakes: "🚨 Aam Galtiyan jo Avoid karni hain",
    interviewQuestions: "💼 Technical Interview Questions",
    summaryChecklist: "📝 Summary Checklist",
    chapterTest: "🧠 Chapter Test Quest",
    nextChapter: "Agla Chapter ⟶",
    retryQuestion: "↺ Dobara Try Karo",
    backDojo: "📖 Dojo Wapas Chalo",
    step: "Step",
    of: "ka",
    dojoCleared: "Dojo Training Complete!",
    dojoClearedStory: "Shaandar kaam kiya tumne! Concept bilkul clear ho gaya. Ab ground par robot ko magic commands se run karne ka samay hai!",
    startQuest: "LET'S START THE QUEST! 🗺️",
    questMap: "🗺️ Quest Map",
    codeEditor: "💻 Code Editor — JavaScript",
    reset: "↺ Reset",
    runCode: "▶ RUN CODE",
    levelCleared: "🎉 LEVEL CLEAR HO GAYA!",
    nextLevel: "AGLA LEVEL ⟶",
    awaitingCode: "Code run karne ka wait ho raha hai...",
    codeMode: "💻 AI Bot Code Likho",
    manualMode: "🖐️ Khud Se Khelo",
    snakeTitle: "🐍 Snake Timepass",
    snakeScore: "Score",
    snakeHigh: "High Score",
    snakeOver: "GAME OVER",
    snakeOverScore: "Score reached",
    snakeRestart: "Restart Game",
    snakePause: "Roko",
    snakeStart: "Game Start Karo",
    snakeRules: "Keyboard ki Arrow Keys use karke snake ko modho. Laal apple khao aur grow karo!",
    candyTitle: "🍬 JS Data Types Crush",
    candyScore: "Crush Score",
    candyReset: "Board Reset Karo 🍬",
    candyRules: "Same JS Data Type (jaise String, Number, Boolean) ke 3 ya usse jyada items match karke blast karo! Swap karne ke liye ek element select karke padosi par click karo.",
    tictactoeTitle: "❌ Coding Tic-Tac-Toe",
    tictactoeRules: "Neeche wale function mein algorithm likho. Yeh function ek empty cell ka index (0-8) return karega.",
    tictactoeRun: "▶ Script Execute Karo",
    tictactoeReset: "Reset Tic-Tac-Toe",
    senseiClue: "Sensei ki Clue",
    codeModeSnake: "🤖 Ek JS function nextDirection(head, food, body) likho jo 'UP', 'DOWN', 'LEFT', ya 'RIGHT' return karega taaki snake khud hi chale!",
    senseiGuide: "🎓 Sensei's Guide (Baby Steps)",
    snakeStep0Title: "Step 0: Khud Khelo!",
    snakeStep0Desc: "Pehle arrow keys dabao aur food khao. Samajh lo snake kaise chalta hai code likhne se pehle!",
    snakeStep1Title: "Step 1: Magic Command",
    snakeStep1Desc: "Code editor mein bas `return 'UP';` likho aur Run dabao. Dekho snake apne aap UP jayega!",
    snakeStep2Title: "Step 2: Smart Dimaag (If Condition)",
    snakeStep2Desc: "Check karo food kahan hai! Agar food snake ke upar hai (`food.y < head.y`), toh UP jao.",
    snakeStep3Title: "Step 3: Full Auto-Pilot",
    snakeStep3Desc: "Ab `if` aur `else if` ka use karke saari disha (UP, DOWN, LEFT, RIGHT) check karo. AI banao!",
    candyStep0Title: "JS Crush kya hai?",
    candyStep0Desc: "JavaScript mein data ke alag-alag types hote hain. Chalo candy fod kar inko seekhte hain!",
    candyStep1Title: "Step 1: 'String' kya hai?",
    candyStep1Desc: "String bas text hai, jaise tumhara naam. Isko hamesha quotes mein likhte hain: `\"hello\"` ya `'js'`.",
    candyStep2Title: "Step 2: 'Number' kya hai?",
    candyStep2Desc: "Number maths ke liye hote hain: `42`, `-7`, `3.14`. Inme quotes nahi lagate!",
    candyStep3Title: "Step 3: 'Boolean' kya hai?",
    candyStep3Desc: "Boolean ka matlab hai YES ya NO. JavaScript mein ise `true` ya `false` likhte hain.",
    ticTacStep1Title: "Step 1: Manual Click",
    ticTacStep1Desc: "Pehle khud boxes par click karke Tic-Tac-Toe khelo aur samjho.",
    ticTacStep2Title: "Step 2: Center ka Code",
    ticTacStep2Desc: "Code mein `return 4;` likho taaki tumhara AI hamesha beech wala box chune!",
    ticTacStep3Title: "Step 3: Smart Loop",
    ticTacStep3Desc: "Ek `for` loop lagao jo har box check kare (`board[i] === ''`) aur jo khali ho, uspe chal de!"
  }
};

// Key translations for textbooks to Hinglish
const textbookHinglish = {
  // Introduction to JavaScript
  "JavaScript is the language of the web. It is a programming language that makes websites **interactive, dynamic, and alive**. Without JavaScript, websites would be static — just plain text and images with no movement or response.":
    "JavaScript pure web ki language hai, bhai! Yeh ek programming language hai jo websites ko **interactive, dynamic aur alive** banati hai. JS ke bina websites bilkul static hongi — bas plain text aur images jinme koi response nahi hoga.",

  "JavaScript (JS) is a lightweight, interpreted programming language. It runs directly in the browser — no installation needed. It lets you add **interactivity** to web pages like button clicks, form validation, animations, pop-ups, and much more.":
    "JavaScript (JS) ek lightweight, interpreted programming language hai jo seedhe browser mein run hoti hai — koi install karne ki jhanjhat nahi! Isse tum buttons clicks, form validation, animations aur badhiya pop-ups laga sakte ho.",

  "Without JavaScript:\n- Websites cannot respond to clicks\n- Forms cannot be validated before sending\n- Pages cannot update without full reload\n- No animations, games, or real-time updates\n\n**JavaScript powers everything** — Google, YouTube, Facebook, Netflix all use JavaScript.":
    "JS ke bina:\n- Websites click ka jawab nahi dengi\n- Forms server par bhejne se pehle check nahi honge\n- Har click par page refresh hoga\n- Koi games, animations ya live chat nahi chalegi\n\n**JS sab kuch power karta hai** — Google, YouTube, Facebook, Netflix sab use karte hain.",

  "JavaScript runs:\n- In the **browser** (Frontend — Chrome, Firefox, Edge)\n- On the **server** (Backend — Node.js)\n- In **mobile apps** (React Native)\n- In **desktop apps** (Electron)\n- In **IoT devices** (Internet of Things)":
    "JavaScript kahan-kahan chalta hai:\n- **Browser mein** (Frontend — Chrome, Edge)\n- **Server par** (Backend — Node.js)\n- **Mobile apps mein** (React Native)\n- **Desktop apps mein** (Electron)\n- **IoT devices** (smart devices mein)",

  "Use JavaScript when you want:\n- Interactive UI (dropdowns, modals, tabs)\n- Real-time updates (live chat, notifications)\n- Form validation (check email format)\n- Animations & transitions\n- Fetching data from APIs (weather, maps)":
    "JavaScript tab use karo jab:\n- Interactive UI banana ho (dropdowns, modals)\n- Real-time updates chahiye hon (live chat)\n- Form validate karna ho\n- Animations add karne hon\n- Kisi API se data laana ho",

  // Variables
  "Imagine you have a new toy car. You don't want to lose it, so you put it inside a nice cardboard box and write 'My Car' on the outside.":
    "Mano tumhare paas ek naya toy car hai. Tum use khona nahi chahte, toh tum use ek box mein band karke upar 'My Car' likh dete ho.",

  "In JavaScript, a VARIABLE is just a magic box where we store things! Instead of cardboard, we use the magic word 'let'.":
    "JavaScript mein VARIABLE bhi ek magic box ki tarah hota hai jismein hum data store karte hain! Cardboard ki jagah hum 'let' likhte hain.",

  "How do we create a new magic box named 'toy'?":
    "Hum ek naya box jiska naam 'toy' ho kaise banayenge?",

  "Now our box is created! `let toy = 'car';` means we put the 'car' inside the box called 'toy'.":
    "Hamara box ban gaya! `let toy = 'car';` ka matlab humne 'car' ko 'toy' naam ke box mein daal diya.",

  "If I say `let pet = 'dog';`, what is inside the box named 'pet'?":
    "Agar main likhu `let pet = 'dog';`, toh 'pet' naam ke box ke andar kya milega?"
};

// Daily Spells translations
const dailySpellsTranslations = {
  english: [
    {
      question: "What is the output of `typeof null` in JavaScript?",
      hint: "This is a famous JavaScript bug! JS treats null as an object.",
      successMsg: "Kya baat hai! Sahi pakde hain. `typeof null` is indeed 'object'! 🎉"
    },
    {
      question: "Which keyword creates a variable that CANNOT be changed later?",
      hint: "Think of constant (unchanging).",
      successMsg: "Sahi jawab! `const` (constant) values cannot be reassigned! 🔒"
    },
    {
      question: "What is the output of `2 + '2'` in JavaScript?",
      hint: "When you add a number and a string, JS converts the number to string and joins them (coercion)!",
      successMsg: "Ekdum mast! Number and String add karne par string concatenation ho jata hai. Output is '22'! 🪄"
    }
  ],
  hinglish: [
    {
      question: "JavaScript mein `typeof null` ka output kya hota hai?",
      hint: "Yeh ek bahut famous JS bug hai! JS null ko object treat karta hai.",
      successMsg: "Kya baat hai! Sahi pakde hain. `typeof null` sach mein 'object' hai! 🎉"
    },
    {
      question: "Kaun sa keyword variable banata hai jo baad me change NAHI kiya ja sakta?",
      hint: "Constant (unchanging) ke baare me socho.",
      successMsg: "Sahi jawab! `const` (constant) variables ko dobara reassign nahi kar sakte! 🔒"
    },
    {
      question: "JavaScript mein `2 + '2'` ka kya output hoga?",
      hint: "Jab tum number aur string ko add karte ho, JS number ko string banakar dono ko chipka deta hai!",
      successMsg: "Ekdum mast! Number aur String add karne par string concatenation ho jata hai. Output milega '22'! 🪄"
    }
  ]
};

// Rule-based text translations (converts key phrases into Hinglish dynamically)
const wordReplacements = [
  [/\bJavaScript is a\b/gi, "JavaScript ek"],
  [/\bJavaScript is/gi, "JavaScript"],
  [/\bprogramming language\b/gi, "programming language"],
  [/\bwithout\b/gi, "ke bina"],
  [/\bWithout JavaScript\b/gi, "JS ke bina"],
  [/\bWebsites cannot\b/gi, "Websites nahi"],
  [/\bCommon Mistakes to Avoid\b/gi, "Aam Galtiyan jo nahi karni hain"],
  [/\bTechnical Interview Questions\b/gi, "Interview ke important sawal"],
  [/\bSummary Checklist\b/gi, "Summary Checklist"],
  [/\bExplanation:\b/gi, "Explanation:"],
  [/\bOutput:\b/gi, "Output:"],
  [/\bCorrect!\b/gi, "Sahi Jawab!"],
  [/\bWrong\b/gi, "Galat"],
  [/\bRight\b/gi, "Sahi"],
  [/\bReason:\b/gi, "Reason:"],
  [/\bA variable is\b/gi, "Variable ek"],
  [/\bUse let to\b/gi, "let ka use karo to"],
  [/\bWhat is the output of\b/gi, "Iska output kya hoga:"],
  [/\bWhich of the following\b/gi, "Inmein se kaun sa"],
  [/\bis true about\b/gi, "ke baare mein sahi hai"],
  [/\bIt runs in browsers\b/gi, "Yeh browser mein run hota hai"],
  [/\bIt was created in\b/gi, "Yeh bana tha"],
  [/\bby\b/gi, "ke dwara"],
  [/\bfirst\b/gi, "pehla"],
  [/\bsecond\b/gi, "dusra"],
  [/\bthird\b/gi, "teesra"],
  [/\bold\b/gi, "purana"],
  [/\bnew\b/gi, "naya"],
  [/\bInside\b/gi, "Ke andar"],
  [/\bHow to\b/gi, "Kaise"]
];

function ruleBasedTranslate(text) {
  if (typeof text !== "string") return text;
  let translated = text;
  for (const [regex, replacement] of wordReplacements) {
    translated = translated.replace(regex, replacement);
  }
  return translated;
}

export function t(key, lang) {
  const currentLang = lang || "hinglish";
  
  // Look in UI Translations
  if (uiTranslations[currentLang] && uiTranslations[currentLang][key]) {
    return uiTranslations[currentLang][key];
  }

  // Look in hand-crafted textbook translations
  if (currentLang === "hinglish" && textbookHinglish[key]) {
    return textbookHinglish[key];
  }

  // If in Hinglish, apply rule-based modifications for general vibe
  if (currentLang === "hinglish") {
    return ruleBasedTranslate(key);
  }

  return key;
}

export function getDailySpell(idx, lang) {
  const currentLang = lang || "hinglish";
  const defaults = dailySpellsTranslations[currentLang];
  return defaults[idx] || dailySpellsTranslations.english[idx];
}
