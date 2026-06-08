export const levels = [
  {
    id: 1,
    title: "Level 1: JavaScript Fundamentals",
    color: "#10b981",
    icon: "🌱",
    chapters: [
      { id: "intro", title: "Introduction to JavaScript", emoji: "👋", time: "15 min" },
      { id: "history", title: "History of JavaScript", emoji: "📜", time: "10 min" },
      { id: "how-js-works", title: "How JavaScript Works", emoji: "⚙️", time: "20 min" },
      { id: "variables", title: "Variables", emoji: "📦", time: "25 min" },
      { id: "data-types", title: "Data Types", emoji: "🔢", time: "30 min" },
      { id: "operators", title: "Operators", emoji: "➕", time: "25 min" },
      { id: "type-conversion", title: "Type Conversion", emoji: "🔄", time: "20 min" },
      { id: "conditionals", title: "Conditionals", emoji: "🔀", time: "25 min" },
      { id: "loops", title: "Loops", emoji: "🔁", time: "30 min" },
    ]
  },
  {
    id: 2,
    title: "Level 2: Core JavaScript",
    color: "#3b82f6",
    icon: "⚡",
    chapters: [
      { id: "functions", title: "Functions", emoji: "🔧", time: "35 min" },
      { id: "scope", title: "Scope", emoji: "🔭", time: "25 min" },
      { id: "hoisting", title: "Hoisting", emoji: "🏗️", time: "20 min" },
      { id: "execution-context", title: "Execution Context", emoji: "🧠", time: "30 min" },
      { id: "closures", title: "Closures", emoji: "🔒", time: "35 min" },
      { id: "arrays", title: "Arrays", emoji: "📋", time: "40 min" },
      { id: "objects", title: "Objects", emoji: "🗂️", time: "35 min" },
      { id: "destructuring", title: "Destructuring", emoji: "📤", time: "25 min" },
      { id: "spread-rest", title: "Spread & Rest Operators", emoji: "✨", time: "20 min" },
    ]
  },
  {
    id: 3,
    title: "Level 3: Intermediate JavaScript",
    color: "#f59e0b",
    icon: "🚀",
    chapters: [
      { id: "dom", title: "DOM Manipulation", emoji: "🌐", time: "45 min" },
      { id: "events", title: "Events", emoji: "🎯", time: "35 min" },
      { id: "event-bubbling", title: "Event Bubbling & Capturing", emoji: "🫧", time: "25 min" },
      { id: "event-delegation", title: "Event Delegation", emoji: "📡", time: "20 min" },
      { id: "storage", title: "Local & Session Storage", emoji: "💾", time: "25 min" },
      { id: "json", title: "JSON", emoji: "📄", time: "20 min" },
      { id: "error-handling", title: "Error Handling", emoji: "🚨", time: "30 min" },
      { id: "classes-oop", title: "Classes & OOP", emoji: "🏛️", time: "45 min" },
      { id: "prototypes", title: "Prototypes & Prototype Chain", emoji: "🔗", time: "35 min" },
    ]
  },
  {
    id: 4,
    title: "Level 4: Advanced JavaScript",
    color: "#8b5cf6",
    icon: "💎",
    chapters: [
      { id: "async-js", title: "Asynchronous JavaScript", emoji: "⏳", time: "40 min" },
      { id: "callbacks", title: "Callbacks", emoji: "📞", time: "25 min" },
      { id: "promises", title: "Promises", emoji: "🤝", time: "35 min" },
      { id: "async-await", title: "Async / Await", emoji: "🎭", time: "35 min" },
      { id: "fetch-api", title: "Fetch API", emoji: "🌍", time: "30 min" },
      { id: "modules", title: "ES6 Modules", emoji: "📦", time: "25 min" },
      { id: "this-keyword", title: "The 'this' Keyword", emoji: "👆", time: "30 min" },
      { id: "call-apply-bind", title: "Call, Apply & Bind", emoji: "🎛️", time: "25 min" },
      { id: "hof", title: "Higher Order Functions", emoji: "🏔️", time: "30 min" },
      { id: "functional-programming", title: "Functional Programming", emoji: "🧩", time: "35 min" },
    ]
  },
  {
    id: 5,
    title: "Level 5: Expert JavaScript",
    color: "#ec4899",
    icon: "🏆",
    chapters: [
      { id: "event-loop", title: "Event Loop", emoji: "🔄", time: "35 min" },
      { id: "microtasks", title: "Microtasks & Macrotasks", emoji: "⚗️", time: "25 min" },
      { id: "memory", title: "Memory Management", emoji: "🧹", time: "30 min" },
      { id: "design-patterns", title: "Design Patterns", emoji: "🎨", time: "45 min" },
      { id: "debounce-throttle", title: "Debouncing & Throttling", emoji: "🎚️", time: "25 min" },
      { id: "security", title: "JS Security Best Practices", emoji: "🔐", time: "30 min" },
      { id: "performance", title: "Performance Optimization", emoji: "⚡", time: "35 min" },
      { id: "clean-code", title: "Clean Code Practices", emoji: "✨", time: "30 min" },
      { id: "mern-js", title: "JavaScript for MERN Stack", emoji: "🌿", time: "40 min" },
      { id: "interview", title: "Interview Master Guide", emoji: "🎤", time: "60 min" },
      { id: "projects", title: "Real-World Projects", emoji: "🏗️", time: "90 min" },
    ]
  }
];

export const allChapters = levels.flatMap(l => l.chapters.map(c => ({ ...c, levelId: l.id, levelTitle: l.title, levelColor: l.color })));

export const getChapterById = (id) => allChapters.find(c => c.id === id);
export const getLevelByChapterId = (id) => levels.find(l => l.chapters.some(c => c.id === id));
