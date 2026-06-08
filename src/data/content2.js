// src/data/content2.js — Level 3-5 content

const content2 = {

  dom: {
    title: "DOM Manipulation",
    emoji: "🌐",
    sections: [
      { type: "intro", content: "The **DOM (Document Object Model)** is the browser's representation of your HTML page as a JavaScript object. You can use JS to read, create, update, and delete any HTML element." },
      { type: "what", content: "DOM = a tree structure of all HTML elements. Each element is a **node**. JavaScript can interact with every node — change text, style, add/remove elements." },
      {
        type: "code",
        title: "DOM Selection & Manipulation",
        basic: {
          code: `// SELECT elements\nconst title = document.getElementById("title");\nconst buttons = document.querySelectorAll(".btn");\nconst firstItem = document.querySelector("li");\n\n// READ & CHANGE content\ntitle.textContent = "New Title";     // change text\ntitle.innerHTML = "<em>Italic</em>"; // change HTML\n\n// CHANGE styles\ntitle.style.color = "purple";\ntitle.style.fontSize = "2rem";\n\n// CHANGE classes\ntitle.classList.add("active");\ntitle.classList.remove("hidden");\ntitle.classList.toggle("dark");`,
          explanation: "getElementById: by ID. querySelector: CSS selector (first match). querySelectorAll: all matches. textContent for text, innerHTML for HTML.",
          output: "[DOM updated visually in browser]"
        },
        intermediate: {
          code: `// CREATE and INSERT elements\nconst ul = document.querySelector("ul");\n\nconst newItem = document.createElement("li");\nnewItem.textContent = "New Item";\nnewItem.classList.add("list-item");\nnewItem.setAttribute("data-id", "42");\n\nul.appendChild(newItem);       // add to END\nul.prepend(newItem);           // add to START\nul.insertBefore(newItem, ul.firstChild); // specific position\n\n// READ attributes\nconsole.log(newItem.getAttribute("data-id")); // "42"\n\n// REMOVE elements\nnewItem.remove(); // remove from DOM`,
          explanation: "createElement creates a new element in memory. appendChild/prepend/insertBefore adds it to the DOM. remove() deletes it.",
          output: "[DOM updated — new list item added/removed]"
        },
        realworld: {
          code: `// Real app: Dynamic Todo List\nfunction renderTodos(todos) {\n  const list = document.getElementById("todo-list");\n  list.innerHTML = ""; // clear existing\n\n  todos.forEach(todo => {\n    const li = document.createElement("li");\n    li.className = \`todo-item \${todo.done ? "done" : ""}\`;\n    li.innerHTML = \`\n      <span>\${todo.text}</span>\n      <button onclick="deleteTodo(\${todo.id})">🗑️</button>\n    \`;\n    list.appendChild(li);\n  });\n}\n\nconst todos = [\n  { id: 1, text: "Learn JavaScript", done: true },\n  { id: 2, text: "Build a project", done: false },\n];\nrenderTodos(todos);`,
          explanation: "Real todo apps: clear list then re-render all items. innerHTML = '' is faster than removing children one by one.",
          output: "[Todo list rendered in browser]"
        }
      },
      { type: "interview", questions: ["What is the DOM?", "What is the difference between innerHTML and textContent?", "How do you select multiple elements?", "What is the difference between append and appendChild?", "How do you add/remove CSS classes with JavaScript?"] },
      { type: "summary", points: ["DOM = tree of all HTML elements as JS objects", "getElementById, querySelector, querySelectorAll for selection", "textContent (safe), innerHTML (can inject HTML)", "createElement → set properties → appendChild to add", "classList.add/remove/toggle for CSS classes"] }
    ]
  },

  events: {
    title: "Events",
    emoji: "🎯",
    sections: [
      { type: "intro", content: "Events are **actions that happen in the browser** — clicks, keypresses, form submissions, mouse movements, page loads. JavaScript listens for these and runs code in response." },
      {
        type: "code",
        title: "Event Listeners",
        basic: {
          code: `// Method 1: addEventListener (BEST — use this)\nconst btn = document.getElementById("myBtn");\nbtn.addEventListener("click", function() {\n  console.log("Button clicked!");\n});\n\n// Arrow function version\nbtn.addEventListener("click", () => {\n  console.log("Clicked! ✅");\n});\n\n// Common events:\n// click, dblclick, mouseover, mouseout\n// keydown, keyup, keypress\n// submit, change, input, focus, blur\n// load, DOMContentLoaded, scroll, resize`,
          explanation: "addEventListener is the modern way. You can add multiple listeners to same element. Remove with removeEventListener.",
          output: "[Click button → 'Clicked! ✅' in console]"
        },
        intermediate: {
          code: `// Event Object — has info about the event\ndocument.addEventListener("keydown", (event) => {\n  console.log("Key:", event.key);\n  console.log("Code:", event.code);\n  if (event.key === "Enter") {\n    console.log("Enter pressed!");\n  }\n  if (event.ctrlKey && event.key === "s") {\n    event.preventDefault(); // stop default browser save\n    console.log("Custom Ctrl+S action!");\n  }\n});\n\n// Form submit\ndocument.querySelector("form").addEventListener("submit", (e) => {\n  e.preventDefault(); // stop page reload!\n  const input = document.getElementById("name").value;\n  console.log("Submitted:", input);\n});`,
          explanation: "Event object has key, target, preventDefault(), stopPropagation() etc. preventDefault() stops default browser behavior.",
          output: "[Press keys → logs key info]"
        },
        realworld: {
          code: `// Real app: Search with input event\nconst searchInput = document.getElementById("search");\nconst productList = document.getElementById("products");\nconst products = ["Laptop","Phone","Tablet","Watch","Camera"];\n\nsearchInput.addEventListener("input", (e) => {\n  const query = e.target.value.toLowerCase();\n  const filtered = products.filter(p =>\n    p.toLowerCase().includes(query)\n  );\n  productList.innerHTML = filtered\n    .map(p => \`<li>\${p}</li>\`)\n    .join("");\n});\n\n// Input type shows real-time results (like Amazon search)`,
          explanation: "The 'input' event fires on every keystroke. Real-time search used on Amazon, Google — filters products as you type.",
          output: "[Search filters products in real-time]"
        }
      },
      { type: "interview", questions: ["What is an event listener?", "What is the event object?", "What does preventDefault() do?", "What is the difference between onclick and addEventListener?", "What events fire on form inputs?"] },
      { type: "summary", points: ["Events: user/browser actions (click, keydown, submit)", "addEventListener('event', callback) — modern way", "Event object: target, key, preventDefault(), etc.", "preventDefault(): stops default behavior (e.g., form submit, link)", "Remove listener: removeEventListener (same function reference needed)"] }
    ]
  },

  "event-bubbling": {
    title: "Event Bubbling & Capturing",
    emoji: "🫧",
    sections: [
      { type: "intro", content: "When you click an element, the event doesn't just fire on that element — it **travels through the DOM tree**. This travel happens in two phases: **Capturing** (top-down) and **Bubbling** (bottom-up)." },
      {
        type: "code",
        title: "Bubbling & Capturing",
        basic: {
          code: `// HTML structure:\n// <div id="grandparent">\n//   <div id="parent">\n//     <button id="child">Click</button>\n//   </div>\n// </div>\n\ndocument.getElementById("grandparent").addEventListener("click", () => {\n  console.log("Grandparent clicked");\n});\ndocument.getElementById("parent").addEventListener("click", () => {\n  console.log("Parent clicked");\n});\ndocument.getElementById("child").addEventListener("click", () => {\n  console.log("Child (button) clicked");\n});\n\n// When button is clicked:\n// Output: Child → Parent → Grandparent (BUBBLING up)`,
          explanation: "Events bubble UP from child to parent. Clicking the button triggers ALL parent listeners too.",
          output: "Child (button) clicked\nParent clicked\nGrandparent clicked"
        },
        intermediate: {
          code: `// stopPropagation — stop bubbling\ndocument.getElementById("parent").addEventListener("click", () => {\n  console.log("Parent clicked");\n});\n\ndocument.getElementById("child").addEventListener("click", (e) => {\n  e.stopPropagation(); // stop! don't bubble up\n  console.log("Only child — no bubbling!");\n});\n// Now clicking child only logs: "Only child — no bubbling!"\n\n// Capturing phase (top-down) — use third argument: true\ndocument.getElementById("grandparent").addEventListener(\n  "click", () => console.log("Capturing: Grandparent"), true\n);`,
          explanation: "stopPropagation() stops the event from going up. Third argument 'true' enables capturing phase (fires top-down before bubbling).",
          output: "Capturing: Grandparent\nOnly child — no bubbling!"
        },
        realworld: {
          code: `// Real app: Modal close on outside click\nconst modal = document.getElementById("modal");\nconst modalContent = document.getElementById("modal-content");\n\n// Close modal when clicking backdrop (not the content)\nmodal.addEventListener("click", () => {\n  modal.style.display = "none";\n  console.log("Modal closed!");\n});\n\nmodalContent.addEventListener("click", (e) => {\n  e.stopPropagation(); // prevent closing when clicking inside\n  console.log("Clicked inside modal — stays open");\n});\n// This exact pattern is used by Bootstrap, MUI modals!`,
          explanation: "Classic real-world pattern: click backdrop = close modal, click inside = stay open. stopPropagation prevents the close from triggering.",
          output: "[Click backdrop → modal closes]\n[Click inside → stays open]"
        }
      },
      { type: "interview", questions: ["What is event bubbling?", "What is event capturing?", "What is the difference between stopPropagation and preventDefault?", "In what order do events fire?", "How do you use the capturing phase?"] },
      { type: "summary", points: ["Events travel: Capture (top↓) → Target → Bubble (↑up)", "Default is bubbling — events go from child UP to parent", "stopPropagation(): stops event from going further", "Third arg true in addEventListener enables capturing", "Real use: modals, dropdowns, click-outside-to-close"] }
    ]
  },

  "event-delegation": {
    title: "Event Delegation",
    emoji: "📡",
    sections: [
      { type: "intro", content: "Event Delegation uses **bubbling** to handle events efficiently. Instead of adding listeners to each child, add ONE listener to the parent — it catches all child events." },
      {
        type: "code",
        title: "Event Delegation Pattern",
        basic: {
          code: `// ❌ Bad: listener on every button (100 buttons = 100 listeners)\ndocument.querySelectorAll(".btn").forEach(btn => {\n  btn.addEventListener("click", () => console.log("clicked"));\n});\n\n// ✅ Good: ONE listener on parent\ndocument.getElementById("btn-container").addEventListener("click", (e) => {\n  if (e.target.classList.contains("btn")) {\n    console.log("Button clicked:", e.target.textContent);\n  }\n});\n// Works for buttons added LATER too!`,
          explanation: "e.target is the actual element clicked. Check if it matches what you care about. One listener handles ALL buttons including dynamically added ones!",
          output: "[Click any .btn → logs its text]"
        },
        realworld: {
          code: `// Real app: Dynamic Todo with delegation\nconst list = document.getElementById("todo-list");\n\n// ONE listener handles ALL todo actions\nlist.addEventListener("click", (e) => {\n  const item = e.target.closest(".todo-item");\n  if (!item) return;\n\n  const id = item.dataset.id;\n\n  if (e.target.classList.contains("complete-btn")) {\n    item.classList.toggle("completed");\n    console.log(\`Todo \${id} toggled\`);\n  }\n\n  if (e.target.classList.contains("delete-btn")) {\n    item.remove();\n    console.log(\`Todo \${id} deleted\`);\n  }\n});\n// Adding new todos later? Delegation handles them automatically!`,
          explanation: "closest() walks up DOM to find parent with class. One listener manages complete AND delete for ALL todos including future ones. Pattern used in React, Vue list rendering.",
          output: "[Click complete → toggles done state]\n[Click delete → removes item]"
        }
      },
      { type: "interview", questions: ["What is event delegation?", "Why is event delegation better for dynamic elements?", "What is e.target vs e.currentTarget?", "What is event.target.closest()?", "When should you use event delegation?"] },
      { type: "summary", points: ["Delegation: one listener on parent handles all child events", "Uses event bubbling — events rise up to parent", "e.target: element that was actually clicked", "e.currentTarget: element with the listener attached", "Best for: dynamic lists, tables, tabs, any repeating elements"] }
    ]
  },

  storage: {
    title: "Local Storage & Session Storage",
    emoji: "💾",
    sections: [
      { type: "intro", content: "Web Storage lets you **save data in the browser** — it stays even after page refresh (localStorage) or until tab closes (sessionStorage)." },
      {
        type: "comparison",
        title: "localStorage vs sessionStorage",
        table: {
          headers: ["Feature", "localStorage", "sessionStorage"],
          rows: [
            ["Persists after tab close", "✅ Yes", "❌ No"],
            ["Shared across tabs", "✅ Yes", "❌ No (tab-specific)"],
            ["Capacity", "~5-10MB", "~5-10MB"],
            ["Data type", "String only", "String only"],
            ["Use case", "User preferences, auth tokens", "Form data, temp session"]
          ]
        }
      },
      {
        type: "code",
        title: "Storage API",
        basic: {
          code: `// localStorage — persists forever until cleared\nlocalStorage.setItem("username", "Soyeb");\nlocalStorage.setItem("theme", "dark");\n\nconsole.log(localStorage.getItem("username")); // "Soyeb"\nconsole.log(localStorage.getItem("theme"));    // "dark"\nconsole.log(localStorage.getItem("unknown")); // null\n\nlocalStorage.removeItem("username"); // remove one\nlocalStorage.clear();                // remove all`,
          explanation: "setItem(key, value) stores. getItem(key) retrieves (returns null if not found). removeItem/clear delete.",
          output: "Soyeb\ndark\nnull"
        },
        intermediate: {
          code: `// IMPORTANT: only stores strings!\n// Use JSON.stringify/parse for objects and arrays\n\nconst user = { name: "Soyeb", age: 22, isPremium: true };\n\n// Save object\nlocalStorage.setItem("user", JSON.stringify(user));\n\n// Retrieve object\nconst savedUser = JSON.parse(localStorage.getItem("user"));\nconsole.log(savedUser.name);      // "Soyeb"\nconsole.log(savedUser.isPremium); // true\nconsole.log(typeof savedUser);    // "object"\n\n// Save array\nconst todos = ["Learn JS", "Build project"];\nlocalStorage.setItem("todos", JSON.stringify(todos));\nconst savedTodos = JSON.parse(localStorage.getItem("todos"));\nconsole.log(savedTodos[0]); // "Learn JS"`,
          explanation: "JSON.stringify converts object/array to string for storage. JSON.parse converts back. This is the standard pattern.",
          output: "Soyeb\ntrue\nobject\nLearn JS"
        },
        realworld: {
          code: `// Real app: Shopping cart persistence\nconst Cart = {\n  getItems() {\n    return JSON.parse(localStorage.getItem("cart")) || [];\n  },\n  addItem(product) {\n    const items = this.getItems();\n    const existing = items.find(i => i.id === product.id);\n    if (existing) {\n      existing.qty++;\n    } else {\n      items.push({ ...product, qty: 1 });\n    }\n    localStorage.setItem("cart", JSON.stringify(items));\n    console.log(\`Added: \${product.name}\`);\n  },\n  removeItem(id) {\n    const items = this.getItems().filter(i => i.id !== id);\n    localStorage.setItem("cart", JSON.stringify(items));\n  },\n  getTotal() {\n    return this.getItems().reduce((sum, i) => sum + i.price * i.qty, 0);\n  }\n};\n\nCart.addItem({ id: 1, name: "Laptop", price: 60000 });\nCart.addItem({ id: 2, name: "Mouse", price: 800 });\nconsole.log("Total: ₹" + Cart.getTotal());\n// Cart survives page refresh!`,
          explanation: "Real e-commerce cart persisted in localStorage. Refreshing the page won't lose cart. This is how Amazon keeps your cart.",
          output: "Added: Laptop\nAdded: Mouse\nTotal: ₹60800"
        }
      },
      { type: "interview", questions: ["What is the difference between localStorage and sessionStorage?", "How do you store objects in localStorage?", "What is the storage limit?", "Is localStorage secure for sensitive data?", "How do you check if an item exists in localStorage?"] },
      { type: "summary", points: ["localStorage: persists forever. sessionStorage: clears on tab close", "Both: key-value string storage (~5-10MB)", "Store objects: JSON.stringify(). Retrieve: JSON.parse()", "Never store passwords/tokens in localStorage (XSS risk)", "Use for: dark mode, cart, language preference, form drafts"] }
    ]
  },

  json: {
    title: "JSON",
    emoji: "📄",
    sections: [
      { type: "intro", content: "JSON (JavaScript Object Notation) is a **text format for storing and sharing data**. It looks like a JS object but is actually a string. Used to send data between frontend and backend (APIs)." },
      {
        type: "code",
        title: "JSON Basics",
        basic: {
          code: `// JSON string (what APIs send)\nconst jsonString = '{"name":"Soyeb","age":22,"city":"Mumbai"}';\n\n// Parse: JSON string → JS object\nconst jsObject = JSON.parse(jsonString);\nconsole.log(jsObject.name); // "Soyeb"\nconsole.log(typeof jsObject); // "object"\n\n// Stringify: JS object → JSON string\nconst user = { name: "Ali", skills: ["JS", "React"], active: true };\nconst json = JSON.stringify(user);\nconsole.log(json);\n// '{"name":"Ali","skills":["JS","React"],"active":true}'\nconsole.log(typeof json); // "string"\n\n// Pretty print (for debugging)\nconsole.log(JSON.stringify(user, null, 2));`,
          explanation: "JSON.parse() converts JSON string to JS object. JSON.stringify() converts JS object to JSON string. Second argument null, third 2 = indent 2 spaces.",
          output: `Soyeb\nobject\n'{"name":"Ali","skills":["JS","React"],"active":true}'\nstring`
        },
        realworld: {
          code: `// Real app: Using JSON with fetch API\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(response => response.json()) // parse JSON response\n  .then(user => {\n    console.log(user.name);     // "Leanne Graham"\n    console.log(user.email);    // "Sincere@april.biz"\n    console.log(user.address.city); // "Gwenborough"\n  })\n  .catch(err => console.error("Error:", err));\n\n// Sending JSON to server\nfetch("/api/create-user", {\n  method: "POST",\n  headers: { "Content-Type": "application/json" },\n  body: JSON.stringify({ name: "Soyeb", email: "s@mail.com" })\n});`,
          explanation: "response.json() parses the JSON. When sending data, JSON.stringify() converts it. Content-Type header tells server it's JSON.",
          output: "[Leanne Graham, Sincere@april.biz, Gwenborough]"
        }
      },
      { type: "interview", questions: ["What is JSON?", "What is the difference between JSON.parse and JSON.stringify?", "What data types does JSON support?", "Can functions be in JSON?", "What happens if JSON is invalid?"] },
      { type: "summary", points: ["JSON: text format for data exchange (looks like JS object)", "JSON.parse(string) → JS object", "JSON.stringify(object) → JSON string", "JSON supports: string, number, boolean, null, array, object", "No: undefined, functions, Dates (converted to string)"] }
    ]
  },

  "error-handling": {
    title: "Error Handling",
    emoji: "🚨",
    sections: [
      { type: "intro", content: "Errors will happen in your code. Error handling lets you **catch and handle errors gracefully** instead of crashing your app." },
      {
        type: "code",
        title: "try / catch / finally",
        basic: {
          code: `// try: code that might fail\n// catch: runs if try throws an error\n// finally: ALWAYS runs (cleanup)\n\ntry {\n  const data = JSON.parse("INVALID JSON!");\n  console.log(data); // never runs\n} catch (error) {\n  console.log("Error caught!");\n  console.log("Name:", error.name);    // SyntaxError\n  console.log("Message:", error.message); // Unexpected token\n} finally {\n  console.log("This always runs!");\n}`,
          explanation: "try contains risky code. catch receives the Error object with name and message. finally runs regardless of success/failure.",
          output: "Error caught!\nName: SyntaxError\nMessage: Unexpected token...\nThis always runs!"
        },
        intermediate: {
          code: `// Throwing custom errors\nfunction divide(a, b) {\n  if (typeof a !== "number" || typeof b !== "number") {\n    throw new TypeError("Both arguments must be numbers");\n  }\n  if (b === 0) {\n    throw new Error("Cannot divide by zero!");\n  }\n  return a / b;\n}\n\ntry {\n  console.log(divide(10, 2));   // 5\n  console.log(divide(10, 0));   // throws!\n} catch (err) {\n  console.log("Caught:", err.message);\n}\n\n// Custom Error class\nclass ValidationError extends Error {\n  constructor(field, message) {\n    super(message);\n    this.name = "ValidationError";\n    this.field = field;\n  }\n}\n\ntry {\n  throw new ValidationError("email", "Invalid email format");\n} catch (err) {\n  console.log(\`\${err.name} on '\${err.field}': \${err.message}\`);\n}`,
          explanation: "throw creates an error. Custom error classes extend Error. You can add extra properties like 'field' to give more context.",
          output: "5\nCaught: Cannot divide by zero!\nValidationError on 'email': Invalid email format"
        },
        realworld: {
          code: `// Real app: API call with error handling\nasync function fetchUser(id) {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n\n    if (!response.ok) {\n      throw new Error(\`HTTP error! Status: \${response.status}\`);\n    }\n\n    const user = await response.json();\n    return user;\n\n  } catch (error) {\n    if (error.name === "TypeError") {\n      console.log("Network error — check internet connection");\n    } else {\n      console.log("API Error:", error.message);\n    }\n    return null; // return fallback instead of crashing\n  } finally {\n    console.log("Loading complete (success or fail)");\n  }\n}\n\nfetchUser(1).then(user => console.log(user?.name ?? "No user"));`,
          explanation: "Real apps always handle fetch errors. Check response.ok for HTTP errors (4xx, 5xx). TypeError means network failed. Always return fallback.",
          output: "Loading complete (success or fail)\n[user name or 'No user']"
        }
      },
      { type: "interview", questions: ["What is try/catch?", "What is the finally block used for?", "How do you create a custom error?", "What is the Error object?", "What is the difference between syntax error and runtime error?"] },
      { type: "summary", points: ["try: risky code. catch: handle errors. finally: always runs", "Error object has: name, message, stack", "throw: create custom errors", "Extend Error class for custom error types", "Always handle async errors with try/catch or .catch()"] }
    ]
  },

  "classes-oop": {
    title: "Classes & OOP",
    emoji: "🏛️",
    sections: [
      { type: "intro", content: "**OOP (Object-Oriented Programming)** is a way of organizing code around **objects** that combine data and behavior. Classes are **blueprints** for creating objects." },
      {
        type: "comparison",
        title: "4 Pillars of OOP",
        table: {
          headers: ["Pillar", "Meaning", "JS Example"],
          rows: [
            ["Encapsulation", "Data + methods bundled together, internal details hidden", "Private fields (#balance)"],
            ["Inheritance", "Child class inherits from parent class", "class Admin extends User"],
            ["Polymorphism", "Same method name, different behavior in child", "child overrides parent method"],
            ["Abstraction", "Hide complexity, show only what's needed", "public API, private implementation"]
          ]
        }
      },
      {
        type: "code",
        title: "Classes in JavaScript",
        basic: {
          code: `class Person {\n  // Constructor: runs when new Person() is called\n  constructor(name, age) {\n    this.name = name;\n    this.age = age;\n  }\n\n  // Method\n  greet() {\n    return \`Hi! I'm \${this.name}, \${this.age} years old.\`;\n  }\n\n  // Getter\n  get isAdult() {\n    return this.age >= 18;\n  }\n\n  // Static method — called on class, not instance\n  static species() {\n    return "Homo Sapiens";\n  }\n}\n\nconst soyeb = new Person("Soyeb", 22);\nconsole.log(soyeb.greet());      // "Hi! I'm Soyeb, 22 years old."\nconsole.log(soyeb.isAdult);      // true\nconsole.log(Person.species());   // "Homo Sapiens"`,
          explanation: "constructor initializes the object. Methods defined in class body. Getters accessed like properties. Static called on class itself.",
          output: "Hi! I'm Soyeb, 22 years old.\ntrue\nHomo Sapiens"
        },
        intermediate: {
          code: `// Inheritance with extends\nclass Animal {\n  constructor(name, sound) {\n    this.name = name;\n    this.sound = sound;\n  }\n  speak() {\n    return \`\${this.name} says \${this.sound}\`;\n  }\n}\n\nclass Dog extends Animal {\n  constructor(name) {\n    super(name, "Woof!"); // call parent constructor\n    this.tricks = [];\n  }\n  learn(trick) {\n    this.tricks.push(trick);\n    return \`\${this.name} learned: \${trick}!\`;\n  }\n  // Override parent method\n  speak() {\n    return super.speak() + " 🐕";\n  }\n}\n\nconst rex = new Dog("Rex");\nconsole.log(rex.speak());           // Rex says Woof! 🐕\nconsole.log(rex.learn("sit"));      // Rex learned: sit!\nconsole.log(rex instanceof Dog);    // true\nconsole.log(rex instanceof Animal); // true`,
          explanation: "extends inherits from parent. super() calls parent constructor. super.method() calls parent method. instanceof checks the class hierarchy.",
          output: "Rex says Woof! 🐕\nRex learned: sit!\ntrue\ntrue"
        },
        realworld: {
          code: `// Real app: User system with private fields\nclass User {\n  #password; // private field (ES2022)\n\n  constructor(name, email, password) {\n    this.name = name;\n    this.email = email;\n    this.#password = this.#hash(password);\n    this.createdAt = new Date();\n  }\n\n  #hash(pwd) { // private method\n    return "hashed_" + pwd; // simplified\n  }\n\n  checkPassword(attempt) {\n    return this.#hash(attempt) === this.#password;\n  }\n\n  toJSON() {\n    return { name: this.name, email: this.email }; // no password!\n  }\n}\n\nclass Admin extends User {\n  constructor(name, email, password) {\n    super(name, email, password);\n    this.permissions = ["read","write","delete"];\n  }\n  deleteUser(id) { console.log(\`Admin \${this.name} deleted user \${id}\`); }\n}\n\nconst admin = new Admin("Soyeb","s@mail.com","secret123");\nconsole.log(admin.checkPassword("secret123")); // true\nconsole.log(admin.toJSON());                   // no password\nadmin.deleteUser(5);`,
          explanation: "# prefix = private (only accessible inside class). #password can't be read from outside. toJSON hides sensitive data. Admin extends User with extra permissions.",
          output: "true\n{name:'Soyeb',email:'s@mail.com'}\nAdmin Soyeb deleted user 5"
        }
      },
      { type: "interview", questions: ["What are the 4 pillars of OOP?", "What is the difference between a class and an object?", "What does the super keyword do?", "What are private class fields (#)?", "What is the difference between static and instance methods?"] },
      { type: "summary", points: ["Class: blueprint. Object (instance): actual thing created with new", "constructor(): runs when new ClassName() is called", "extends: inherit from parent class. super(): call parent", "# prefix: private fields/methods (ES2022)", "Static: called on class. Instance: called on object"] }
    ]
  },

  prototypes: {
    title: "Prototypes & Prototype Chain",
    emoji: "🔗",
    sections: [
      { type: "intro", content: "Every JavaScript object has a hidden link to another object called its **prototype**. If you try to access a property that doesn't exist on an object, JS automatically looks up the prototype chain." },
      {
        type: "code",
        title: "Prototypes",
        basic: {
          code: `// Every function has a .prototype object\nfunction Person(name) {\n  this.name = name;\n}\n\n// Add to prototype — shared by ALL instances\nPerson.prototype.greet = function() {\n  return \`Hello, I'm \${this.name}\`;\n};\n\nconst alice = new Person("Alice");\nconst bob = new Person("Bob");\n\nconsole.log(alice.greet()); // "Hello, I'm Alice"\nconsole.log(bob.greet());   // "Hello, I'm Bob"\n\n// greet is NOT copied to each object — shared!\nconsole.log(alice.hasOwnProperty("name"));  // true\nconsole.log(alice.hasOwnProperty("greet")); // false — it's on prototype`,
          explanation: "Methods on prototype are shared among all instances — saves memory. hasOwnProperty checks if property is directly on object.",
          output: "Hello, I'm Alice\nHello, I'm Bob\ntrue\nfalse"
        },
        intermediate: {
          code: `// Prototype Chain\nconst animal = { breathes: true };\nconst dog = { sound: "woof" };\nconst myDog = { name: "Rex" };\n\n// Set prototype chain: myDog → dog → animal → Object.prototype\nObject.setPrototypeOf(dog, animal);\nObject.setPrototypeOf(myDog, dog);\n\nconsole.log(myDog.name);    // "Rex" (own property)\nconsole.log(myDog.sound);   // "woof" (from dog prototype)\nconsole.log(myDog.breathes); // true (from animal prototype)\n\n// Check chain\nconsole.log(Object.getPrototypeOf(myDog) === dog);    // true\nconsole.log(myDog instanceof Object); // true (all objects are)`,
          explanation: "JS looks for property on object first, then prototype, then prototype's prototype, until null. This is the prototype chain.",
          output: "Rex\nwoof\ntrue\ntrue\ntrue"
        },
        realworld: {
          code: `// Classes are syntactic sugar over prototypes!\nclass Vehicle {\n  constructor(brand) { this.brand = brand; }\n  drive() { return \`\${this.brand} is driving!\`; }\n}\n\nclass Car extends Vehicle {\n  constructor(brand, model) {\n    super(brand);\n    this.model = model;\n  }\n}\n\nconst tesla = new Car("Tesla", "Model 3");\nconsole.log(tesla.drive()); // "Tesla is driving!"\n\n// What's actually happening:\nconsole.log(Object.getPrototypeOf(Car) === Vehicle); // true\nconsole.log(Object.getPrototypeOf(tesla) === Car.prototype); // true\n// chain: tesla → Car.prototype → Vehicle.prototype → Object.prototype → null`,
          explanation: "ES6 classes are prototype chains under the hood. Understanding prototypes helps you understand class inheritance deeply.",
          output: "Tesla is driving!\ntrue\ntrue"
        }
      },
      { type: "interview", questions: ["What is a prototype in JavaScript?", "What is the prototype chain?", "What is __proto__ vs prototype?", "How do classes relate to prototypes?", "What happens when a property is not found on an object?"] },
      { type: "summary", points: ["Every object has a hidden prototype link", "Property lookup: own → prototype → prototype's prototype → null", "prototype: on constructor functions. __proto__: on instances", "Classes are syntactic sugar over prototypes", "Methods on prototype are shared — saves memory vs copying"] }
    ]
  },

  "async-js": {
    title: "Asynchronous JavaScript",
    emoji: "⏳",
    sections: [
      { type: "intro", content: "JavaScript is **single-threaded** — it can only do one thing at a time. But async programming lets it **start a task, move on**, and come back when done. Like ordering food at a restaurant — you don't wait at the counter!" },
      { type: "what", content: "**Synchronous**: code runs line by line, each line waits for the previous to finish.\n**Asynchronous**: some tasks (like fetching data, reading files) are started and JS moves on, coming back when the task completes." },
      {
        type: "code",
        title: "Sync vs Async",
        basic: {
          code: `// Synchronous — blocks everything\nconsole.log("1 - Start");\nconsole.log("2 - Middle");\nconsole.log("3 - End");\n// Output: 1, 2, 3 in order\n\n// Asynchronous — non-blocking\nconsole.log("1 - Start");\n\nsetTimeout(() => {\n  console.log("2 - Async (fires later)");\n}, 2000);\n\nconsole.log("3 - End");\n// Output: 1 → 3 → 2 (after 2 seconds)`,
          explanation: "Async tasks (setTimeout, fetch, file read) don't block. JS continues running and comes back to async results later.",
          output: "1 - Start\n3 - End\n[2 seconds later...]\n2 - Async (fires later)"
        },
        realworld: {
          code: `// Three ways to handle async in JS:\n// 1. Callbacks (old way)\nfunction fetchUserCB(id, callback) {\n  setTimeout(() => { // simulating API call\n    callback(null, { id, name: "Soyeb" });\n  }, 1000);\n}\n\n// 2. Promises (better)\nfunction fetchUserPromise(id) {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => resolve({ id, name: "Soyeb" }), 1000);\n  });\n}\n\n// 3. Async/Await (best — looks synchronous!)\nasync function loadUser(id) {\n  const user = await fetchUserPromise(id);\n  console.log(user.name);\n}\n\nloadUser(1); // "Soyeb" (after 1 second)`,
          explanation: "Evolution of async: Callbacks → Promises → Async/Await. Each solved problems of the previous. Use async/await in modern code.",
          output: "[after 1 second]\nSoyeb"
        }
      },
      { type: "summary", points: ["JS is single-threaded but handles async via event loop", "Async = start task, move on, return when done", "3 patterns: Callbacks → Promises → Async/Await", "Use async/await for modern code (cleanest)", "Async tasks: fetch, setTimeout, file I/O, database queries"] }
    ]
  },

  promises: {
    title: "Promises",
    emoji: "🤝",
    sections: [
      { type: "intro", content: "A **Promise** is an object representing a future value — it's a commitment that 'I'll give you data... eventually'. It can be **fulfilled** (success), **rejected** (error), or **pending** (waiting)." },
      {
        type: "code",
        title: "Promises",
        basic: {
          code: `// Create a promise\nconst myPromise = new Promise((resolve, reject) => {\n  const success = true;\n  if (success) {\n    resolve("Data received! ✅"); // success\n  } else {\n    reject("Something failed! ❌"); // error\n  }\n});\n\n// Use the promise\nmyPromise\n  .then(data => console.log(data))    // runs on resolve\n  .catch(err => console.log(err))     // runs on reject\n  .finally(() => console.log("Done")); // always runs`,
          explanation: "Promise constructor takes (resolve, reject). .then() handles success. .catch() handles errors. .finally() always runs.",
          output: "Data received! ✅\nDone"
        },
        intermediate: {
          code: `// Promise chaining\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(res => {\n    if (!res.ok) throw new Error("Request failed");\n    return res.json(); // returns another promise\n  })\n  .then(user => {\n    console.log("User:", user.name);\n    return fetch(\`/posts?userId=\${user.id}\`); // chain!\n  })\n  .then(res => res.json())\n  .then(posts => console.log("Posts:", posts.length))\n  .catch(err => console.error("Error:", err.message));\n\n// Promise.all — run multiple in parallel\nconst p1 = fetch("/api/users").then(r => r.json());\nconst p2 = fetch("/api/products").then(r => r.json());\n\nPromise.all([p1, p2])\n  .then(([users, products]) => {\n    console.log("Both loaded!");\n  });`,
          explanation: "Promise chaining: each .then() can return a new promise. Promise.all runs all in parallel — waits for ALL to finish.",
          output: "User: Leanne Graham\nPosts: [count]\nBoth loaded!"
        },
        realworld: {
          code: `// Promise.allSettled — even if some fail\nconst apis = [\n  fetch("/api/users"),\n  fetch("/api/products"),\n  fetch("/api/INVALID"),  // this will fail\n];\n\nPromise.allSettled(apis)\n  .then(results => {\n    results.forEach((result, i) => {\n      if (result.status === "fulfilled") {\n        console.log(\`API \${i}: ✅ Success\`);\n      } else {\n        console.log(\`API \${i}: ❌ Failed - \${result.reason}\`);\n      }\n    });\n  });\n// Used in dashboards that load multiple widgets`,
          explanation: "allSettled waits for ALL, regardless of success/failure. Real dashboards use this to load multiple sections independently.",
          output: "API 0: ✅ Success\nAPI 1: ✅ Success\nAPI 2: ❌ Failed - ..."
        }
      },
      { type: "interview", questions: ["What is a Promise?", "What are the states of a Promise?", "What is Promise chaining?", "What is the difference between Promise.all and Promise.allSettled?", "What is Promise.race?"] },
      { type: "summary", points: ["Promise: represents future value. States: pending → fulfilled/rejected", ".then(success), .catch(error), .finally(always)", "Promise.all: all must succeed. Promise.allSettled: wait for all", "Promise.race: first to finish wins. Promise.any: first success", "Promises replaced callback hell with chainable syntax"] }
    ]
  },

  "async-await": {
    title: "Async / Await",
    emoji: "🎭",
    sections: [
      { type: "intro", content: "**Async/Await** is the modern way to write asynchronous code that **reads like synchronous code**. It's built on top of Promises but much easier to read and write." },
      {
        type: "code",
        title: "Async/Await",
        basic: {
          code: `// async: makes function return a promise\n// await: pauses until promise resolves\n\nasync function fetchUser() {\n  const response = await fetch("https://jsonplaceholder.typicode.com/users/1");\n  const user = await response.json();\n  console.log(user.name); // "Leanne Graham"\n  return user;\n}\n\nfetchUser(); // Call it like a regular function\n\n// Compare with .then() version:\nfetch("https://jsonplaceholder.typicode.com/users/1")\n  .then(res => res.json())\n  .then(user => console.log(user.name));`,
          explanation: "async before function makes it return a Promise. await pauses execution until Promise resolves. Same result, cleaner code.",
          output: "Leanne Graham"
        },
        intermediate: {
          code: `// Error handling with try/catch\nasync function loadProfile(userId) {\n  try {\n    const res = await fetch(\`/api/users/\${userId}\`);\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n\n    const user = await res.json();\n    const postsRes = await fetch(\`/api/posts?userId=\${userId}\`);\n    const posts = await postsRes.json();\n\n    return { user, posts };\n  } catch (error) {\n    console.error("Failed to load:", error.message);\n    return null;\n  }\n}\n\n// Run async in parallel (not sequential)\nasync function loadDashboard() {\n  // ❌ Sequential (slow):\n  // const users = await fetchUsers();\n  // const posts = await fetchPosts();\n\n  // ✅ Parallel (fast):\n  const [users, posts] = await Promise.all([\n    fetchUsers(),\n    fetchPosts()\n  ]);\n  console.log({ users, posts });\n}`,
          explanation: "try/catch handles errors in async/await. For parallel operations, use Promise.all with await — don't await sequentially!",
          output: "[Dashboard data loaded in parallel]"
        },
        realworld: {
          code: `// Real app: Complete user dashboard loader\nasync function loadDashboard(userId) {\n  const loadingEl = document.getElementById("loading");\n  const contentEl = document.getElementById("content");\n\n  try {\n    loadingEl.style.display = "block";\n\n    const [user, posts, notifications] = await Promise.all([\n      fetch(\`/api/users/\${userId}\`).then(r => r.json()),\n      fetch(\`/api/posts?userId=\${userId}\`).then(r => r.json()),\n      fetch(\`/api/notifications/\${userId}\`).then(r => r.json())\n    ]);\n\n    contentEl.innerHTML = \`\n      <h1>Welcome, \${user.name}! 👋</h1>\n      <p>You have \${posts.length} posts</p>\n      <p>🔔 \${notifications.length} notifications</p>\n    \`;\n  } catch (error) {\n    contentEl.innerHTML = "❌ Failed to load dashboard";\n    console.error(error);\n  } finally {\n    loadingEl.style.display = "none";\n  }\n}`,
          explanation: "Real dashboard: show loader, load all data in parallel, display content, hide loader. Error shows friendly message. This pattern is in every modern web app.",
          output: "[Dashboard rendered with user data]"
        }
      },
      { type: "interview", questions: ["What is async/await?", "What does await do?", "How do you handle errors in async/await?", "How do you run multiple async operations in parallel?", "What does an async function return?"] },
      { type: "summary", points: ["async function always returns a Promise", "await pauses until Promise resolves (inside async functions only)", "try/catch handles errors in async/await", "Don't await sequentially — use Promise.all for parallel", "async/await is syntactic sugar over Promises"] }
    ]
  },

  "fetch-api": {
    title: "Fetch API",
    emoji: "🌍",
    sections: [
      { type: "intro", content: "The **Fetch API** lets you make **HTTP requests** from the browser — GET data from servers, POST data, update, delete. It's how websites communicate with backends." },
      {
        type: "code",
        title: "Fetch API Methods",
        basic: {
          code: `// GET request (fetch data)\nasync function getUser(id) {\n  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);\n  const user = await res.json();\n  console.log(user.name, user.email);\n}\ngetUser(1);\n\n// POST request (send data)\nasync function createPost(data) {\n  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {\n    method: "POST",\n    headers: { "Content-Type": "application/json" },\n    body: JSON.stringify(data)\n  });\n  const post = await res.json();\n  console.log("Created post ID:", post.id);\n}\ncreatePost({ title: "JS Tips", body: "Use const!", userId: 1 });`,
          explanation: "GET is default. POST needs method, headers (Content-Type), and body (JSON.stringify). Response always needs .json() to parse.",
          output: "Leanne Graham sincere@april.biz\nCreated post ID: 101"
        },
        intermediate: {
          code: `// PUT (full update), PATCH (partial), DELETE\nasync function updateUser(id, updates) {\n  const res = await fetch(\`/api/users/\${id}\`, {\n    method: "PATCH", // partial update\n    headers: { "Content-Type": "application/json", "Authorization": "Bearer TOKEN" },\n    body: JSON.stringify(updates)\n  });\n  if (!res.ok) throw new Error(\`Update failed: \${res.status}\`);\n  return res.json();\n}\n\nasync function deleteUser(id) {\n  const res = await fetch(\`/api/users/\${id}\`, {\n    method: "DELETE",\n    headers: { "Authorization": "Bearer TOKEN" }\n  });\n  return res.ok;\n}\n\n// Using them\nawait updateUser(1, { city: "Mumbai" });\nconst deleted = await deleteUser(5);\nconsole.log("Deleted:", deleted); // true`,
          explanation: "CRUD: Create(POST), Read(GET), Update(PUT/PATCH), Delete(DELETE). Authorization header sends authentication token.",
          output: "[user updated]\nDeleted: true"
        },
        realworld: {
          code: `// Real app: API service class\nclass ApiService {\n  constructor(baseUrl) {\n    this.baseUrl = baseUrl;\n  }\n\n  async request(path, options = {}) {\n    const token = localStorage.getItem("authToken");\n    const config = {\n      ...options,\n      headers: {\n        "Content-Type": "application/json",\n        ...(token ? { Authorization: \`Bearer \${token}\` } : {}),\n        ...options.headers\n      }\n    };\n    const res = await fetch(\`\${this.baseUrl}\${path}\`, config);\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n    return res.json();\n  }\n\n  get(path) { return this.request(path); }\n  post(path, data) { return this.request(path, { method: "POST", body: JSON.stringify(data) }); }\n  patch(path, data) { return this.request(path, { method: "PATCH", body: JSON.stringify(data) }); }\n  delete(path) { return this.request(path, { method: "DELETE" }); }\n}\n\nconst api = new ApiService("https://api.myapp.com");\nawait api.get("/users/1");\nawait api.post("/posts", { title: "Hello World" });`,
          explanation: "Real apps create a reusable API class to avoid repeating fetch code everywhere. Handles auth tokens, error checking, JSON headers automatically.",
          output: "[API calls made with consistent config]"
        }
      },
      { type: "interview", questions: ["What is the Fetch API?", "What is the difference between GET and POST?", "Why do you need to call .json() on a fetch response?", "How do you send authentication headers?", "What is CORS?"] },
      { type: "summary", points: ["fetch() returns a Promise — use async/await or .then()", "Always check response.ok before calling .json()", "GET: read data. POST: create. PUT/PATCH: update. DELETE: remove", "Set Content-Type: application/json when sending data", "Authorization: Bearer TOKEN for protected endpoints"] }
    ]
  },

  modules: {
    title: "ES6 Modules",
    emoji: "📦",
    sections: [
      { type: "intro", content: "Modules let you **split code into separate files** and **import/export** what you need. This keeps code organized, maintainable, and reusable." },
      {
        type: "code",
        title: "Import & Export",
        basic: {
          code: `// math.js — exporting\nexport const PI = 3.14159;\nexport function add(a, b) { return a + b; }\nexport function multiply(a, b) { return a * b; }\nexport default class Calculator {\n  add(a, b) { return a + b; }\n}\n\n// main.js — importing\nimport Calculator from "./math.js";      // default import\nimport { PI, add, multiply } from "./math.js"; // named imports\nimport { add as sum } from "./math.js";  // rename\nimport * as Math from "./math.js";       // import all\n\nconsole.log(PI);        // 3.14159\nconsole.log(add(2, 3)); // 5\nconsole.log(Math.multiply(4, 5)); // 20`,
          explanation: "Named exports: export function/const/class. Default export: one per file, no braces on import. Import as renames.",
          output: "3.14159\n5\n20"
        },
        realworld: {
          code: `// Real project structure:\n// utils/api.js\nexport const API_URL = "https://api.myapp.com";\nexport async function fetchData(endpoint) {\n  const res = await fetch(API_URL + endpoint);\n  return res.json();\n}\n\n// utils/helpers.js\nexport const formatPrice = (price) => \`₹\${price.toLocaleString()}\`;\nexport const formatDate = (date) => new Date(date).toLocaleDateString();\nexport const debounce = (fn, delay) => {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n};\n\n// components/ProductCard.js\nimport { fetchData } from "../utils/api.js";\nimport { formatPrice } from "../utils/helpers.js";\n\nexport default function ProductCard(product) {\n  return \`<div>\${product.name}: \${formatPrice(product.price)}</div>\`;\n}`,
          explanation: "Real projects: utils folder with shared functions, each file exports what it provides. Components import only what they need.",
          output: "[Modular project structure]"
        }
      },
      { type: "summary", points: ["Modules: split code across files for organization", "Named export: export const/function. Import with {}",  "Default export: one per file. Import without {}", "Import aliases: import { fn as alias }", "In Vite/React: .js extension often omitted in imports"] }
    ]
  },

  "this-keyword": {
    title: "The 'this' Keyword",
    emoji: "👆",
    sections: [
      { type: "intro", content: "'**this**' refers to the **object that is calling the function**. Its value depends on HOW a function is called, not WHERE it's written." },
      {
        type: "comparison",
        title: "'this' in Different Contexts",
        table: {
          headers: ["Context", "Value of 'this'"],
          rows: [
            ["Global scope (browser)", "window object"],
            ["Global scope (strict mode)", "undefined"],
            ["Object method", "The object calling the method"],
            ["Constructor function (new)", "The new object being created"],
            ["Arrow function", "Inherits 'this' from surrounding scope"],
            ["Event listener", "The element that triggered the event"],
            ["call/apply/bind", "Whatever you specify"]
          ]
        }
      },
      {
        type: "code",
        title: "'this' Examples",
        basic: {
          code: `// Object method: 'this' = the object\nconst user = {\n  name: "Soyeb",\n  greet() {\n    return \`Hello, I'm \${this.name}\`; // this = user\n  }\n};\nconsole.log(user.greet()); // "Hello, I'm Soyeb"\n\n// Problem: 'this' changes when function is assigned\nconst greetFn = user.greet;\n// greetFn(); // this = window/undefined in strict mode!\n\n// Arrow function: inherits 'this' from outside\nconst timer = {\n  name: "Timer",\n  start() {\n    setTimeout(() => {\n      console.log(this.name); // 'this' = timer object ✅\n    }, 100);\n  }\n};\ntimer.start(); // "Timer"`,
          explanation: "In regular functions, 'this' depends on caller. Arrow functions DON'T have own 'this' — they inherit from surrounding scope.",
          output: "Hello, I'm Soyeb\nTimer"
        },
        realworld: {
          code: `// Real app: class with event handling\nclass FormValidator {\n  constructor(formId) {\n    this.form = document.getElementById(formId);\n    this.errors = [];\n\n    // ❌ Problem: 'this' loses context\n    // this.form.addEventListener('submit', this.validate);\n\n    // ✅ Fix 1: Arrow function wrapper\n    this.form.addEventListener("submit", (e) => this.validate(e));\n\n    // ✅ Fix 2: bind()\n    // this.form.addEventListener('submit', this.validate.bind(this));\n  }\n\n  validate(e) {\n    e.preventDefault();\n    // 'this' correctly refers to FormValidator instance\n    this.errors = [];\n    console.log("Validating form:", this.form.id);\n  }\n}\n\nnew FormValidator("login-form");`,
          explanation: "Common React/class bug: event handler loses 'this'. Fix: use arrow function or bind(). This pattern is used in every class-based component.",
          output: "Validating form: login-form"
        }
      },
      { type: "summary", points: ["'this' = object that called the function", "In methods: the object. In global: window/undefined (strict)", "Arrow functions: inherit 'this' from enclosing scope", "Fix 'this' loss: arrow function wrapper or .bind(this)", "'this' is determined at call time, not definition time"] }
    ]
  },

  "call-apply-bind": {
    title: "Call, Apply & Bind",
    emoji: "🎛️",
    sections: [
      { type: "intro", content: "call, apply, and bind let you **manually set what 'this' refers to** when calling a function — giving you full control over context." },
      {
        type: "code",
        title: "call / apply / bind",
        basic: {
          code: `function greet(greeting, punctuation) {\n  return \`\${greeting}, I'm \${this.name}\${punctuation}\`;\n}\n\nconst user = { name: "Soyeb" };\nconst admin = { name: "Admin" };\n\n// call — invoke immediately, args as comma-separated\nconsole.log(greet.call(user, "Hello", "!"));\n// "Hello, I'm Soyeb!"\n\n// apply — invoke immediately, args as array\nconsole.log(greet.apply(admin, ["Hi", "."]));\n// "Hi, I'm Admin."\n\n// bind — returns NEW function with 'this' fixed\nconst greetSoyeb = greet.bind(user);\nconsole.log(greetSoyeb("Hey", "!!"));\n// "Hey, I'm Soyeb!!"`,
          explanation: "call: invoke now, args listed. apply: invoke now, args as array. bind: returns new function with locked 'this'.",
          output: "Hello, I'm Soyeb!\nHi, I'm Admin.\nHey, I'm Soyeb!!"
        },
        realworld: {
          code: `// Real use: Borrowing methods\nconst arrayLike = { 0: "a", 1: "b", 2: "c", length: 3 };\n// arrayLike is not a real array, can't use array methods\nconst realArray = Array.prototype.slice.call(arrayLike);\nconsole.log(realArray); // ["a","b","c"]\n\n// Partial application with bind\nfunction multiply(a, b) { return a * b; }\nconst double = multiply.bind(null, 2);  // a=2 fixed\nconst triple = multiply.bind(null, 3);  // a=3 fixed\nconsole.log(double(5));  // 10\nconsole.log(triple(5));  // 15\n\n// React class: bind in constructor\nclass Counter {\n  constructor() {\n    this.count = 0;\n    this.increment = this.increment.bind(this); // fix 'this'\n  }\n  increment() { this.count++; console.log(this.count); }\n}\nconst c = new Counter();\nc.increment(); // 1`,
          explanation: "Method borrowing: use one object's method on another. Partial application: pre-fill some arguments. React class binding: fix 'this' for event handlers.",
          output: '["a","b","c"]\n10\n15\n1'
        }
      },
      { type: "summary", points: ["call(thisArg, arg1, arg2): invoke with custom 'this', args comma-separated", "apply(thisArg, [args]): invoke with custom 'this', args as array", "bind(thisArg): returns new function with fixed 'this'", "Real uses: method borrowing, partial application, event handler binding", "Difference: call/apply invoke immediately; bind returns a new function"] }
    ]
  },

  "event-loop": {
    title: "Event Loop",
    emoji: "🔄",
    sections: [
      { type: "intro", content: "The **Event Loop** is the mechanism that lets JavaScript handle async operations even though it's single-threaded. It's the heart of how JS works." },
      { type: "what", content: "The Event Loop constantly checks:\n1. Is the **Call Stack** empty?\n2. If yes → take next task from **Queue** and push to Stack\n3. Repeat forever\n\nThis is how JS is 'non-blocking' despite being single-threaded." },
      {
        type: "code",
        title: "Event Loop in Action",
        basic: {
          code: `console.log("1 - Script start");\n\nsetTimeout(() => console.log("4 - setTimeout (0ms)"), 0);\n\nPromise.resolve().then(() => console.log("3 - Promise microtask"));\n\nconsole.log("2 - Script end");\n\n// Output order:\n// 1 - Script start      (sync — call stack)\n// 2 - Script end        (sync — call stack)\n// 3 - Promise microtask (microtask queue — runs BEFORE setTimeout)\n// 4 - setTimeout        (macrotask queue)`,
          explanation: "Sync code runs first. Then microtasks (Promises) run. Then macrotasks (setTimeout, setInterval). Order: Sync → Microtasks → Macrotasks.",
          output: "1 - Script start\n2 - Script end\n3 - Promise microtask\n4 - setTimeout (0ms)"
        },
        intermediate: {
          code: `// Visualization of Event Loop\n// Call Stack → Web APIs → Callback/Microtask Queue → Event Loop\n\nasync function fetchData() {\n  console.log("2 - fetchData start"); // sync\n  const data = await Promise.resolve("API data"); // suspends!\n  console.log("4 - fetchData resume:", data); // microtask\n}\n\nconsole.log("1 - Before call");\nfetchData();\nconsole.log("3 - After call"); // runs before await resumes!\n\n// Output: 1, 2, 3, 4\n// 'await' suspends function, rest of code runs, then microtask resumes`,
          explanation: "await suspends the async function. Code after the await call continues synchronously. When promise resolves, it's put in microtask queue.",
          output: "1 - Before call\n2 - fetchData start\n3 - After call\n4 - fetchData resume: API data"
        },
        realworld: {
          code: `// Why UI doesn't freeze with async operations\nasync function loadAndDisplay() {\n  console.log("🔄 Loading...");\n  // document.getElementById("btn").disabled = true; // UI can update!\n\n  const user = await fetch("/api/user").then(r => r.json());\n  // While fetching, browser can render, handle clicks, etc.\n\n  // document.getElementById("btn").disabled = false;\n  console.log("✅ Loaded:", user.name);\n}\n\n// This is why websites don't freeze when loading data!\n// The browser's rendering engine runs in between event loop ticks`,
          explanation: "Event loop allows browser to render and handle user input while JS awaits data. Without event loop, every fetch would freeze the page.",
          output: "🔄 Loading...\n[UI remains responsive]\n✅ Loaded: Leanne Graham"
        }
      },
      { type: "interview", questions: ["What is the event loop?", "What is the call stack?", "What is the difference between microtasks and macrotasks?", "Why does setTimeout(fn, 0) not run immediately?", "What happens when the call stack overflows?"] },
      { type: "summary", points: ["Event Loop: checks call stack → if empty, runs next queued task", "Order: Sync code → Microtasks (Promises) → Macrotasks (setTimeout)", "Allows JS to be async despite being single-threaded", "Call Stack overflow = 'Maximum call stack size exceeded'", "This is why Promises resolve before setTimeout even at 0ms"] }
    ]
  },

  microtasks: {
    title: "Microtasks & Macrotasks",
    emoji: "⚗️",
    sections: [
      { type: "intro", content: "Async tasks in JavaScript are split into two queues: **Microtask queue** (high priority) and **Macrotask queue** (normal priority). Microtasks always run before macrotasks." },
      {
        type: "comparison",
        title: "Microtasks vs Macrotasks",
        table: {
          headers: ["Type", "Examples", "Priority"],
          rows: [
            ["Microtasks", "Promise.then/catch, queueMicrotask, MutationObserver", "HIGH — runs after current task, before next macrotask"],
            ["Macrotasks", "setTimeout, setInterval, setImmediate, I/O events, UI rendering", "NORMAL — runs in event loop cycle"]
          ]
        }
      },
      {
        type: "code",
        title: "Microtask vs Macrotask Order",
        basic: {
          code: `console.log("1 - Sync");\n\nsetTimeout(() => console.log("5 - Macro 1 (100ms)"), 100);\nsetTimeout(() => console.log("4 - Macro 2 (0ms)"), 0);\n\nPromise.resolve().then(() => console.log("3 - Micro 1"));\nPromise.resolve().then(() => {\n  console.log("3b - Micro 2");\n  // Microtask creating another microtask!\n  Promise.resolve().then(() => console.log("3c - Micro 3"));\n});\n\nconsole.log("2 - Sync end");\n\n// Order: 1 → 2 → 3 → 3b → 3c → 4 → 5\n// All microtasks drain before any macrotask runs!`,
          explanation: "All microtasks drain before the next macrotask. Even microtasks created inside microtasks run before macrotasks.",
          output: "1 - Sync\n2 - Sync end\n3 - Micro 1\n3b - Micro 2\n3c - Micro 3\n4 - Macro 2 (0ms)\n5 - Macro 1 (100ms)"
        },
        realworld: {
          code: `// Real impact: rendering happens between macrotasks\n// Update loading spinner timing\n\nasync function processData(items) {\n  // Microtask (Promise.then) runs before next render cycle\n  // Good for data transformation that should be instant\n  const processed = await Promise.resolve(\n    items.map(item => ({ ...item, processed: true }))\n  );\n\n  // setTimeout = macrotask = after render\n  // Good for deferring non-critical work\n  setTimeout(() => {\n    console.log("Analytics sent (non-blocking)");\n  }, 0);\n\n  return processed;\n}\n\n// Browser rendering happens between macrotasks\n// This is why smooth animations use requestAnimationFrame (macrotask)`,
          explanation: "Microtasks for critical immediate work. setTimeout/requestAnimationFrame for deferred or render-cycle-aware work.",
          output: "[data processed immediately]\nAnalytics sent (non-blocking)"
        }
      },
      { type: "summary", points: ["Microtasks: Promise.then, queueMicrotask — run FIRST after current code", "Macrotasks: setTimeout, setInterval — run in event loop cycles", "All microtasks drain before next macrotask runs", "Promise callbacks are microtasks — that's why they beat setTimeout", "queueMicrotask(fn) explicitly adds to microtask queue"] }
    ]
  },

  "design-patterns": {
    title: "Design Patterns",
    emoji: "🎨",
    sections: [
      { type: "intro", content: "**Design Patterns** are proven solutions to common programming problems. They are best practices that experienced developers follow to write clean, reusable, maintainable code." },
      {
        type: "code",
        title: "Key JavaScript Patterns",
        basic: {
          code: `// 1. SINGLETON — only one instance\nclass Database {\n  static #instance = null;\n  #connection;\n  constructor() {\n    if (Database.#instance) return Database.#instance;\n    this.#connection = "Connected!";\n    Database.#instance = this;\n  }\n  query(sql) { return \`Executing: \${sql}\`; }\n}\nconst db1 = new Database();\nconst db2 = new Database();\nconsole.log(db1 === db2); // true — same instance!\n\n// 2. OBSERVER — subscribe/notify\nclass EventEmitter {\n  #events = {};\n  on(event, listener) {\n    (this.#events[event] ??= []).push(listener);\n  }\n  emit(event, data) {\n    (this.#events[event] ?? []).forEach(l => l(data));\n  }\n}\nconst emitter = new EventEmitter();\nemitter.on("login", user => console.log("User logged in:", user.name));\nemitter.emit("login", { name: "Soyeb" }); // "User logged in: Soyeb"`,
          explanation: "Singleton ensures one instance. Observer (event-driven) decouples code — publishers don't need to know about subscribers.",
          output: "true\nUser logged in: Soyeb"
        },
        intermediate: {
          code: `// 3. FACTORY — create objects without 'new'\nfunction createShape(type, options) {\n  const shapes = {\n    circle: { area: () => Math.PI * options.radius ** 2 },\n    square: { area: () => options.side ** 2 },\n    rect: { area: () => options.width * options.height }\n  };\n  if (!shapes[type]) throw new Error(\`Unknown shape: \${type}\`);\n  return { type, ...shapes[type] };\n}\nconsole.log(createShape("circle", { radius: 5 }).area().toFixed(2)); // 78.54\n\n// 4. MODULE — encapsulation\nconst UserModule = (() => {\n  const users = []; // private\n  return {\n    add: (user) => { users.push(user); console.log("Added:", user.name); },\n    count: () => users.length,\n    find: (id) => users.find(u => u.id === id)\n  };\n})();\nUserModule.add({ id: 1, name: "Soyeb" });\nconsole.log(UserModule.count()); // 1`,
          explanation: "Factory: create objects based on type without caller knowing implementation. Module: IIFE-based privacy pattern.",
          output: "78.54\nAdded: Soyeb\n1"
        },
        realworld: {
          code: `// 5. STRATEGY — swap algorithms at runtime\nconst sorters = {\n  bubble: (arr) => { /* bubble sort */ return [...arr].sort((a,b)=>a-b); },\n  quick: (arr) => [...arr].sort((a,b)=>a-b),  // simplified\n  merge: (arr) => [...arr].sort((a,b)=>a-b),  // simplified\n};\n\nclass DataSorter {\n  constructor(strategy = "quick") {\n    this.strategy = sorters[strategy];\n  }\n  setStrategy(name) { this.strategy = sorters[name]; }\n  sort(data) { return this.strategy(data); }\n}\n\nconst sorter = new DataSorter("quick");\nconsole.log(sorter.sort([3,1,4,1,5,9])); // [1,1,3,4,5,9]\nsorter.setStrategy("bubble");\nconsole.log(sorter.sort([9,7,5,3,1]));   // [1,3,5,7,9]`,
          explanation: "Strategy pattern: swap algorithms without changing the class. Used in payment systems (creditCard, paypal, upi strategies), sorting, compression.",
          output: "[1,1,3,4,5,9]\n[1,3,5,7,9]"
        }
      },
      { type: "interview", questions: ["What is a design pattern?", "What is the Singleton pattern?", "What is the Observer pattern?", "What is the Factory pattern?", "What is the Module pattern?"] },
      { type: "summary", points: ["Design patterns: proven solutions to common code problems", "Singleton: ensure only one instance of a class", "Observer: publish/subscribe, event-driven architecture", "Factory: create objects without knowing implementation details", "Module: use IIFE or ES6 modules for encapsulation"] }
    ]
  },

  "debounce-throttle": {
    title: "Debouncing & Throttling",
    emoji: "🎚️",
    sections: [
      { type: "intro", content: "Both techniques **limit how often a function runs** — essential for performance when handling rapid events like scroll, resize, or typing." },
      {
        type: "comparison",
        title: "Debounce vs Throttle",
        table: {
          headers: ["Technique", "Behavior", "Best For"],
          rows: [
            ["Debounce", "Waits until events STOP, then fires ONCE", "Search input, form validation, resize"],
            ["Throttle", "Fires at most ONCE per time interval", "Scroll events, mousemove, API rate limiting"]
          ]
        }
      },
      {
        type: "code",
        title: "Implementations",
        basic: {
          code: `// DEBOUNCE — delay execution until user stops\nfunction debounce(fn, delay) {\n  let timer;\n  return function(...args) {\n    clearTimeout(timer); // reset timer on each call\n    timer = setTimeout(() => fn.apply(this, args), delay);\n  };\n}\n\nconst searchInput = document.getElementById("search");\nconst handleSearch = debounce((e) => {\n  console.log("Searching:", e.target.value);\n  // API call here — only fires 300ms AFTER typing stops!\n}, 300);\n\nsearchInput.addEventListener("input", handleSearch);\n// User types "Hello" fast → only ONE API call!`,
          explanation: "Debounce: every keystroke resets the timer. API only called when user STOPS typing for 300ms. Prevents 10 API calls for 10 keystrokes.",
          output: "[User types 'H','e','l','l','o']\n[300ms after last key...]\nSearching: Hello  ← only once!"
        },
        intermediate: {
          code: `// THROTTLE — limit rate of execution\nfunction throttle(fn, limit) {\n  let inThrottle = false;\n  return function(...args) {\n    if (!inThrottle) {\n      fn.apply(this, args);\n      inThrottle = true;\n      setTimeout(() => inThrottle = false, limit);\n    }\n  };\n}\n\n// Scroll handler — fires max once per 200ms\nconst handleScroll = throttle(() => {\n  const scrollY = window.scrollY;\n  console.log("Scroll Y:", scrollY);\n  // Update navbar, sticky elements, etc.\n}, 200);\n\nwindow.addEventListener("scroll", handleScroll);\n// User scrolls fast: fires every 200ms max, not 60fps`,
          explanation: "Throttle: after firing, ignores calls for 'limit' ms. Scroll fires 60 times/second — throttle reduces to 5 times/second.",
          output: "Scroll Y: 0\n[200ms wait]\nScroll Y: 847\n[200ms wait]\nScroll Y: 1543"
        },
        realworld: {
          code: `// Real app: Google-style autocomplete\nclass SearchBox {\n  constructor(inputId) {\n    this.input = document.getElementById(inputId);\n    this.results = [];\n\n    // Debounce API calls — wait 400ms after typing stops\n    this.search = debounce(this.fetchResults.bind(this), 400);\n    this.input.addEventListener("input", this.search);\n\n    // Throttle scroll in results (if showing many items)\n    this.handleScroll = throttle(this.loadMore.bind(this), 300);\n  }\n\n  async fetchResults(e) {\n    const query = e.target.value.trim();\n    if (query.length < 2) return;\n    const results = await fetch(\`/api/search?q=\${query}\`).then(r=>r.json());\n    this.renderResults(results);\n  }\n\n  renderResults(data) {\n    console.log(\`Showing \${data.length} results\`);\n  }\n\n  loadMore() { console.log("Loading more..."); }\n}`,
          explanation: "Real search: debounce prevents spamming API. Throttle handles infinite scroll. Both together = efficient, smooth UX.",
          output: "[Search box with debounced API and throttled scroll]"
        }
      },
      { type: "interview", questions: ["What is debouncing?", "What is throttling?", "When should you use debounce vs throttle?", "How do you implement debounce from scratch?", "What is requestAnimationFrame?"] },
      { type: "summary", points: ["Debounce: waits for events to stop, then fires once (search, resize)", "Throttle: fires at most once per interval (scroll, mousemove)", "Both reduce unnecessary function calls for performance", "Debounce = 'wait until done'. Throttle = 'fire periodically'", "Libraries: Lodash has _.debounce and _.throttle built-in"] }
    ]
  },

  performance: {
    title: "Performance Optimization",
    emoji: "⚡",
    sections: [
      { type: "intro", content: "Fast websites get more users, better SEO, and higher conversions. Learn how to write JavaScript that runs fast and doesn't make pages slow." },
      {
        type: "code",
        title: "Performance Best Practices",
        basic: {
          code: `// 1. Minimize DOM manipulation — batch updates\n// ❌ Bad: multiple DOM writes (triggers reflow each time)\nfor (let i = 0; i < 1000; i++) {\n  document.getElementById("list").innerHTML += \`<li>\${i}</li>\`;\n}\n\n// ✅ Good: build string then insert once\nconst items = Array.from({length: 1000}, (_, i) => \`<li>\${i}</li>\`);\ndocument.getElementById("list").innerHTML = items.join("");\n\n// 2. Use DocumentFragment for large insertions\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 1000; i++) {\n  const li = document.createElement("li");\n  li.textContent = i;\n  fragment.appendChild(li); // adds to memory, not DOM\n}\ndocument.getElementById("list").appendChild(fragment); // ONE reflow`,
          explanation: "Every DOM change can trigger reflow (recalculate layout) — expensive! Build content first, insert once.",
          output: "[List rendered efficiently with one reflow]"
        },
        intermediate: {
          code: `// 3. Memoization — cache expensive calculations\nfunction memoize(fn) {\n  const cache = new Map();\n  return function(...args) {\n    const key = JSON.stringify(args);\n    if (cache.has(key)) {\n      console.log("Cache hit!");\n      return cache.get(key);\n    }\n    const result = fn.apply(this, args);\n    cache.set(key, result);\n    return result;\n  };\n}\n\nconst expensiveCalc = memoize((n) => {\n  console.log("Calculating...");\n  return n * n * Math.PI; // simulate complex calculation\n});\n\nconsole.log(expensiveCalc(5)); // Calculating... 78.54\nconsole.log(expensiveCalc(5)); // Cache hit! 78.54 (instant!)\nconsole.log(expensiveCalc(10)); // Calculating... 314.16`,
          explanation: "Memoize caches results. Same input = return cached result instantly. Used in React with useMemo/useCallback.",
          output: "Calculating... 78.54\nCache hit! 78.54\nCalculating... 314.16"
        },
        realworld: {
          code: `// 4. Lazy loading images\nconst images = document.querySelectorAll("img[data-src]");\n\nconst imageObserver = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      const img = entry.target;\n      img.src = img.dataset.src; // load image when visible\n      imageObserver.unobserve(img); // stop observing\n    }\n  });\n});\n\nimages.forEach(img => imageObserver.observe(img));\n\n// HTML: <img data-src="actual.jpg" src="placeholder.jpg">\n// Image only loads when it enters viewport — saves bandwidth!\n\n// 5. Web Workers for heavy computation\n// const worker = new Worker("heavy-calc.js");\n// worker.postMessage({data: largeArray});\n// worker.onmessage = (e) => console.log(e.data);`,
          explanation: "IntersectionObserver detects when elements enter viewport. Lazy loading images saves initial page load time. Used by YouTube, Instagram.",
          output: "[Images load as user scrolls — saves bandwidth]"
        }
      },
      { type: "summary", points: ["Minimize DOM manipulation — batch updates with fragments", "Debounce/throttle event handlers", "Memoize expensive function calls", "Lazy load images and components", "Use async/await to avoid blocking the main thread"] }
    ]
  },

  "clean-code": {
    title: "Clean Code Practices",
    emoji: "✨",
    sections: [
      { type: "intro", content: "Clean code is code that is **easy to read, understand, and maintain**. Code is read more often than written — write for humans, not just computers." },
      {
        type: "code",
        title: "Clean Code Principles",
        basic: {
          code: `// 1. Meaningful names\n// ❌ Bad\nconst d = new Date();\nconst x = users.filter(u => u.a > 18);\n\n// ✅ Good\nconst currentDate = new Date();\nconst adultUsers = users.filter(user => user.age > 18);\n\n// 2. Small, focused functions (Single Responsibility)\n// ❌ Bad — does too many things\nfunction processUser(user) {\n  if (!user.email.includes('@')) throw new Error('Invalid');\n  user.email = user.email.toLowerCase();\n  db.save(user);\n  email.send(user.email, 'Welcome!');\n}\n\n// ✅ Good — each function does ONE thing\nconst validateEmail = (email) => email.includes('@');\nconst normalizeEmail = (email) => email.toLowerCase();\nconst saveUser = (user) => db.save(user);\nconst sendWelcome = (email) => email.send(email, 'Welcome!');`,
          explanation: "Meaningful names: anyone reading the code understands it instantly. Single Responsibility: each function does ONE thing — easier to test and debug.",
          output: "[Code is readable and maintainable]"
        },
        intermediate: {
          code: `// 3. Early returns — reduce nesting\n// ❌ Bad — deeply nested\nfunction getDiscount(user) {\n  if (user) {\n    if (user.isPremium) {\n      if (user.yearsActive > 2) {\n        return 0.3;\n      } else { return 0.2; }\n    } else { return 0.1; }\n  } else { return 0; }\n}\n\n// ✅ Good — early returns\nfunction getDiscount(user) {\n  if (!user) return 0;\n  if (!user.isPremium) return 0.1;\n  if (user.yearsActive > 2) return 0.3;\n  return 0.2;\n}\n\n// 4. Constants for magic numbers\n// ❌ Bad\nif (user.age >= 18 && cart.total > 500) { /* why 18? why 500? */ }\n\n// ✅ Good\nconst MINIMUM_AGE = 18;\nconst FREE_SHIPPING_THRESHOLD = 500;\nif (user.age >= MINIMUM_AGE && cart.total > FREE_SHIPPING_THRESHOLD) {}`,
          explanation: "Early returns eliminate nesting (arrow anti-pattern). Named constants explain WHY a value is used.",
          output: "[Cleaner, more readable code]"
        },
        realworld: {
          code: `// 5. Real project: clean vs messy\n\n// ❌ Messy\nfunction p(u, i) {\n  let r = [];\n  for(let j=0;j<u.length;j++) {\n    if(u[j].active==true&&u[j].age>17) { r.push(u[j]); }\n  }\n  return r;\n}\n\n// ✅ Clean\nconst MINIMUM_AGE = 18;\n\nconst isActiveAdult = (user) =>\n  user.isActive && user.age >= MINIMUM_AGE;\n\nconst getActiveAdultUsers = (users) =>\n  users.filter(isActiveAdult);\n\n// Self-documenting, testable, readable\nconst eligibleUsers = getActiveAdultUsers(allUsers);`,
          explanation: "Same logic, completely different readability. Clean code is self-documenting — you don't need comments to understand what it does.",
          output: "[Readable code that documents itself]"
        }
      },
      { type: "summary", points: ["Use meaningful, descriptive names (functions as verbs)", "Each function does ONE thing (single responsibility)", "Early returns reduce nesting depth", "No magic numbers — use named constants", "DRY: Don't Repeat Yourself — extract repeated code to functions"] }
    ]
  },

  "mern-js": {
    title: "JavaScript for MERN Stack",
    emoji: "🌿",
    sections: [
      { type: "intro", content: "MERN = **MongoDB, Express, React, Node.js** — all JavaScript! The same language runs the frontend, backend, and database queries. This makes JavaScript developers extremely valuable." },
      {
        type: "comparison",
        title: "MERN Stack Overview",
        table: {
          headers: ["Layer", "Technology", "Role"],
          rows: [
            ["Frontend", "React.js", "User Interface — what users see"],
            ["Backend", "Node.js + Express", "Server — handles requests, business logic"],
            ["Database", "MongoDB + Mongoose", "Data storage and querying"],
            ["API", "REST or GraphQL", "Frontend ↔ Backend communication"]
          ]
        }
      },
      {
        type: "code",
        title: "MERN Concepts",
        basic: {
          code: `// Node.js — JS on the server\n// Express — web framework for Node\n\n// server.js\nconst express = require('express');\nconst app = express();\napp.use(express.json());\n\n// Route: GET /api/users\napp.get('/api/users', async (req, res) => {\n  try {\n    const users = await User.find(); // MongoDB query\n    res.json({ success: true, data: users });\n  } catch (error) {\n    res.status(500).json({ success: false, error: error.message });\n  }\n});\n\n// Route: POST /api/users\napp.post('/api/users', async (req, res) => {\n  const { name, email } = req.body;\n  const user = new User({ name, email });\n  await user.save();\n  res.status(201).json({ success: true, data: user });\n});\n\napp.listen(5000, () => console.log('Server running on port 5000'));`,
          explanation: "Node runs JS on server. Express handles HTTP routes. MongoDB stores data. Same JS skills work for both frontend and backend.",
          output: "Server running on port 5000"
        },
        realworld: {
          code: `// React Frontend calling the API\n// components/UserList.jsx\nimport { useState, useEffect } from 'react';\n\nexport default function UserList() {\n  const [users, setUsers] = useState([]);\n  const [loading, setLoading] = useState(true);\n\n  useEffect(() => {\n    fetch('/api/users')\n      .then(res => res.json())\n      .then(data => {\n        setUsers(data.data);\n        setLoading(false);\n      });\n  }, []);\n\n  if (loading) return <div>Loading...</div>;\n\n  return (\n    <ul>\n      {users.map(user => (\n        <li key={user._id}>{user.name} - {user.email}</li>\n      ))}\n    </ul>\n  );\n}\n\n// All the JS concepts you learned apply here:\n// - async/await, fetch, .then()\n// - array methods: .map()\n// - destructuring: const { name, email }\n// - closures: setUsers inside useEffect\n// - Event Loop: non-blocking data loading`,
          explanation: "React component uses fetch (async JS), .then (promises), .map (array method), destructuring — all the JS you learned applied in React.",
          output: "[React renders user list from API]"
        }
      },
      { type: "summary", points: ["MERN: MongoDB + Express + React + Node.js (all JavaScript!)", "Node.js: run JS on server. Express: HTTP routes and middleware", "React: component-based UI with hooks (useState, useEffect)", "MongoDB: NoSQL database, stores JSON-like documents", "Every JS concept you learned is used daily in MERN development"] }
    ]
  },

  hof: {
    title: "Higher Order Functions",
    emoji: "🏔️",
    sections: [
      { type: "intro", content: "A **Higher-Order Function (HOF)** is a function that either **takes another function as an argument** or **returns a function** (or both). This is one of the most powerful patterns in JavaScript." },
      {
        type: "code",
        title: "Higher Order Functions",
        basic: {
          code: `// Takes a function as argument\nfunction applyOperation(a, b, operation) {\n  return operation(a, b);\n}\n\nconst add = (x, y) => x + y;\nconst multiply = (x, y) => x * y;\n\nconsole.log(applyOperation(5, 3, add));      // 8\nconsole.log(applyOperation(5, 3, multiply)); // 15\n\n// Returns a function\nfunction createMultiplier(factor) {\n  return (number) => number * factor; // closure!\n}\n\nconst double = createMultiplier(2);\nconst triple = createMultiplier(3);\nconsole.log(double(7));  // 14\nconsole.log(triple(7));  // 21`,
          explanation: "HOFs enable abstraction — you describe WHAT to do, not HOW. This is used in every modern JS codebase.",
          output: "8\n15\n14\n21"
        },
        intermediate: {
          code: `// Built-in HOFs you use every day\nconst nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];\n\n// map — transform\nconst squared = nums.map(n => n ** 2);\nconsole.log(squared); // [1,4,9,16,25,36,49,64,81,100]\n\n// filter — select\nconst evens = nums.filter(n => n % 2 === 0);\nconsole.log(evens); // [2,4,6,8,10]\n\n// reduce — aggregate\nconst sum = nums.reduce((acc, n) => acc + n, 0);\nconsole.log(sum); // 55\n\n// Chaining HOFs\nconst result = nums\n  .filter(n => n % 2 === 0) // [2,4,6,8,10]\n  .map(n => n * n)           // [4,16,36,64,100]\n  .reduce((sum, n) => sum + n, 0); // 220\nconsole.log(result); // 220`,
          explanation: "map, filter, reduce are HOFs — they take a function as argument. Chaining them creates powerful data pipelines.",
          output: "[1,4,9,16,25,36,49,64,81,100]\n[2,4,6,8,10]\n55\n220"
        },
        realworld: {
          code: `// Real app: Data pipeline\nconst orders = [\n  { id: 1, customer: "Soyeb", total: 1500, status: "delivered" },\n  { id: 2, customer: "Alice", total: 800,  status: "pending" },\n  { id: 3, customer: "Bob",   total: 3000, status: "delivered" },\n  { id: 4, customer: "Carol", total: 250,  status: "cancelled" },\n];\n\n// Get total revenue from delivered orders\nconst revenue = orders\n  .filter(o => o.status === "delivered")\n  .map(o => o.total)\n  .reduce((sum, total) => sum + total, 0);\n\nconsole.log("Total Revenue: ₹" + revenue); // ₹4500\n\n// Customers with orders > ₹1000\nconst bigSpenders = orders\n  .filter(o => o.total > 1000)\n  .map(o => o.customer);\nconsole.log("Big spenders:", bigSpenders); // ["Soyeb","Bob"]`,
          explanation: "Real analytics: chain HOFs to transform and aggregate order data. This pattern is in every data dashboard.",
          output: "Total Revenue: ₹4500\nBig spenders: [\"Soyeb\",\"Bob\"]"
        }
      },
      { type: "summary", points: ["HOF: takes function as arg OR returns a function", "Built-in HOFs: map, filter, reduce, forEach, find, sort", "Enables functional programming and reusable abstractions", "Chain HOFs for powerful data transformations", "Foundation of React (components are functions, hooks are HOFs)"] }
    ]
  },

  "functional-programming": {
    title: "Functional Programming",
    emoji: "🧩",
    sections: [
      { type: "intro", content: "**Functional Programming (FP)** is a programming style that treats computation as the evaluation of mathematical functions. It emphasizes: **pure functions, immutability, and no side effects**." },
      {
        type: "comparison",
        title: "FP Core Principles",
        table: {
          headers: ["Principle", "Meaning", "Why it matters"],
          rows: [
            ["Pure Functions", "Same input → always same output, no side effects", "Predictable, easy to test"],
            ["Immutability", "Never modify original data — create new copies", "Prevents bugs from shared state"],
            ["No Side Effects", "Function doesn't change anything outside itself", "Easier to reason about code"],
            ["Function Composition", "Combine small functions to create complex behavior", "Reusable, modular code"]
          ]
        }
      },
      {
        type: "code",
        title: "Functional Programming",
        basic: {
          code: `// Pure function — no side effects\n// Same input ALWAYS gives same output\nconst add = (a, b) => a + b;\nconsole.log(add(2, 3)); // Always 5\nconsole.log(add(2, 3)); // Always 5\n\n// Impure — depends on external state\nlet tax = 0.18;\nconst calcTotal = (price) => price + (price * tax); // depends on tax!\ntax = 0.28; // now calcTotal gives DIFFERENT result!\n\n// Immutability — don't mutate, create new\nconst arr = [1, 2, 3];\n// ❌ Mutates\n// arr.push(4);\n// ✅ Creates new (immutable style)\nconst newArr = [...arr, 4];\nconsole.log(arr);    // [1, 2, 3] — unchanged\nconsole.log(newArr); // [1, 2, 3, 4]`,
          explanation: "Pure functions: predictable, testable. Immutability: prevents shared state bugs. Foundation of React — state should never be mutated directly.",
          output: "5\n5\n[1,2,3]\n[1,2,3,4]"
        },
        intermediate: {
          code: `// Function composition — combine small functions\nconst pipe = (...fns) => (value) =>\n  fns.reduce((acc, fn) => fn(acc), value);\n\nconst double = x => x * 2;\nconst addTen = x => x + 10;\nconst square = x => x * x;\n\nconst transform = pipe(double, addTen, square);\nconsole.log(transform(3));\n// 3 → double → 6 → addTen → 16 → square → 256\n\n// Currying — one argument at a time\nconst multiply = (a) => (b) => a * b;\nconst times3 = multiply(3);\nconsole.log(times3(4)); // 12\nconsole.log(times3(7)); // 21\n\n// Practical currying\nconst createFilter = (key) => (value) => (arr) =>\n  arr.filter(item => item[key] === value);\n\nconst byStatus = createFilter("status");\nconst getDelivered = byStatus("delivered");\nconsole.log(getDelivered(orders).length);`,
          explanation: "pipe composes functions left to right. Currying: multi-argument function into chain of single-argument functions. Used in Ramda, Redux, and functional libraries.",
          output: "256\n12\n21\n[count of delivered orders]"
        },
        realworld: {
          code: `// React-style: functional, immutable state\nconst initialState = { count: 0, items: [], loading: false };\n\n// Pure reducer — given state + action → new state\nfunction reducer(state, action) {\n  switch (action.type) {\n    case "INCREMENT":\n      return { ...state, count: state.count + 1 };\n    case "ADD_ITEM":\n      return { ...state, items: [...state.items, action.payload] };\n    case "SET_LOADING":\n      return { ...state, loading: action.payload };\n    default:\n      return state;\n  }\n}\n\nconst state1 = reducer(initialState, { type: "INCREMENT" });\nconst state2 = reducer(state1, { type: "ADD_ITEM", payload: "Laptop" });\nconsole.log(state2);\n// { count: 1, items: ["Laptop"], loading: false }\nconsole.log(initialState.count); // 0 — never mutated!`,
          explanation: "Redux reducer pattern: pure function, always returns NEW state object using spread. initialState never mutated. This is exactly how Redux and React Context work.",
          output: "{ count: 1, items: ['Laptop'], loading: false }\n0"
        }
      },
      { type: "summary", points: ["Pure functions: same input = same output, no side effects", "Immutability: never mutate, create new data", "Function composition: combine small functions", "Currying: function that returns functions", "FP is the foundation of React (hooks, Redux, state management)"] }
    ]
  },

  memory: {
    title: "Memory Management",
    emoji: "🧹",
    sections: [
      { type: "intro", content: "JavaScript automatically manages memory using **Garbage Collection**. But as a developer, understanding memory helps you avoid **memory leaks** that cause apps to slow down and crash." },
      {
        type: "code",
        title: "Memory & Garbage Collection",
        basic: {
          code: `// Memory lifecycle:\n// 1. Allocate — when you declare variables\nconst name = "Soyeb";       // string allocated\nconst user = { age: 22 };  // object allocated\n\n// 2. Use — read/write the values\nconsole.log(name);\n\n// 3. Release — garbage collector frees memory\n// GC uses "mark and sweep" algorithm:\n// - Mark all reachable (connected to root) objects\n// - Sweep (delete) unreachable objects\n\nfunction createObject() {\n  const obj = { data: new Array(1000).fill(0) }; // big object!\n  return obj.data[0]; // only returning a number\n} // obj is now UNREACHABLE → garbage collected!\n\nconst val = createObject(); // only the number stays`,
          explanation: "GC automatically frees memory that's no longer reachable. You don't need to manually free memory in JS (unlike C/C++).",
          output: "Soyeb"
        },
        intermediate: {
          code: `// Common memory leaks to avoid!\n\n// 1. Global variables (never garbage collected)\nfunction bad() {\n  leakedVar = "I'm global!"; // no let/const!\n}\n\n// 2. Event listeners not removed\nfunction attachListener() {\n  const bigData = new Array(10000).fill(0);\n  document.getElementById("btn").addEventListener("click", () => {\n    console.log(bigData[0]); // closure keeps bigData alive!\n  });\n}\n// bigData can't be GC'd as long as listener exists!\n\n// Fix: remove listener when done\nfunction attachProperListener() {\n  const bigData = new Array(10000).fill(0);\n  const handler = () => { console.log(bigData[0]); };\n  const btn = document.getElementById("btn");\n  btn.addEventListener("click", handler);\n  return () => btn.removeEventListener("click", handler); // cleanup!\n}\n\n// 3. Use WeakMap/WeakSet for object-keyed data\nconst cache = new WeakMap(); // doesn't prevent GC\n// cache.set(objectKey, value) → auto-deleted when objectKey is GC'd`,
          explanation: "Memory leaks happen when you hold references to objects you no longer need. Event listeners, closures, and global variables are common culprits.",
          output: "[Memory properly managed]"
        },
        realworld: {
          code: `// React cleanup pattern — prevents memory leaks\n// This is why React has useEffect cleanup!\n\n// Without cleanup (memory leak)\nuseEffect(() => {\n  const timer = setInterval(() => {\n    fetchData(); // keeps running even after component unmounts!\n  }, 5000);\n  // No cleanup = memory leak + errors on unmounted component\n});\n\n// With cleanup (correct)\nuseEffect(() => {\n  const controller = new AbortController();\n  const timer = setInterval(async () => {\n    const data = await fetch("/api/data", {\n      signal: controller.signal // cancels fetch if unmounted\n    });\n  }, 5000);\n\n  return () => { // cleanup function runs on unmount\n    clearInterval(timer);\n    controller.abort(); // cancel pending fetch\n    console.log("Cleaned up!");\n  };\n}, []);`,
          explanation: "React's useEffect cleanup prevents memory leaks. clearInterval stops timer. AbortController cancels fetch. This pattern is essential for React development.",
          output: "[Timer and fetch properly cleaned up on unmount]"
        }
      },
      { type: "summary", points: ["JS uses automatic garbage collection (mark and sweep)", "GC frees objects that are no longer reachable", "Avoid: global variables, unremoved event listeners, circular references", "WeakMap/WeakSet: hold weak references (allow GC)", "React: always clean up in useEffect return function"] }
    ]
  },

  security: {
    title: "JS Security Best Practices",
    emoji: "🔐",
    sections: [
      { type: "intro", content: "JavaScript security is critical — vulnerable apps can be hacked, user data stolen, and systems compromised. Learn the common attacks and how to prevent them." },
      {
        type: "comparison",
        title: "Common Attacks",
        table: {
          headers: ["Attack", "What it is", "Prevention"],
          rows: [
            ["XSS (Cross-Site Scripting)", "Attacker injects malicious scripts", "Sanitize input, use textContent not innerHTML"],
            ["CSRF (Cross-Site Request Forgery)", "Tricks user into making unwanted requests", "CSRF tokens, SameSite cookies"],
            ["Injection", "Malicious input breaks your logic", "Validate all inputs, use parameterized queries"],
            ["Clickjacking", "Hidden iframe tricks user to click wrong thing", "X-Frame-Options header"],
            ["Sensitive Data Exposure", "Storing passwords/tokens insecurely", "HTTPS, HttpOnly cookies, never localStorage for tokens"]
          ]
        }
      },
      {
        type: "code",
        title: "Security Best Practices",
        basic: {
          code: `// XSS Prevention\nconst userInput = '<script>alert("Hacked!")</script>';\n\n// ❌ Dangerous — executes the script!\ndocument.getElementById("div").innerHTML = userInput;\n\n// ✅ Safe — displays as text, not HTML\ndocument.getElementById("div").textContent = userInput;\n\n// ✅ Sanitize HTML if you must use innerHTML\n// Use DOMPurify library:\n// import DOMPurify from 'dompurify';\n// element.innerHTML = DOMPurify.sanitize(userInput);\n\n// Never use eval() — executes arbitrary code\n// eval(userInput); // ❌ NEVER!\n\n// Content Security Policy headers (in HTML meta):\n// <meta http-equiv="Content-Security-Policy"\n//   content="default-src 'self'; script-src 'self'">`,
          explanation: "textContent escapes HTML automatically. innerHTML runs scripts. eval() is extremely dangerous — never use with user input.",
          output: "[Script tag displayed as text, not executed]"
        },
        intermediate: {
          code: `// Input Validation\nfunction sanitizeInput(input) {\n  if (typeof input !== 'string') return '';\n  return input\n    .trim()\n    .slice(0, 100) // max length\n    .replace(/[<>&"']/g, char => ({ // escape HTML chars\n      '<': '&lt;', '>': '&gt;',\n      '&': '&amp;', '"': '&quot;',\n      \"'\": '&#x27;'\n    })[char]);\n}\n\n// Secure token storage (use HttpOnly cookies, not localStorage)\n// ❌ Bad — vulnerable to XSS attacks\nlocalStorage.setItem('authToken', token);\n\n// ✅ Better — server sets HttpOnly cookie\n// Set-Cookie: token=abc123; HttpOnly; Secure; SameSite=Strict\n// JavaScript can't access HttpOnly cookies!\n\n// Environment variables — never hardcode secrets\n// ❌ Bad\nconst API_KEY = "sk-abc123"; // in client code!\n// ✅ Good — in .env file (server-side only)\n// const API_KEY = process.env.API_KEY;`,
          explanation: "Escape HTML special chars to prevent XSS. Store auth tokens in HttpOnly cookies (not localStorage). Never hardcode API keys in client code.",
          output: "[Input sanitized and safely displayed]"
        },
        realworld: {
          code: `// Real security checklist\nconst securityBestPractices = {\n  // 1. HTTPS always\n  https: "Always use HTTPS in production",\n  \n  // 2. Authentication\n  auth: "Use JWT + HttpOnly cookies, not localStorage",\n  \n  // 3. Input validation (frontend + backend!)\n  validation: "Validate on both frontend AND backend",\n  \n  // 4. Avoid dangerous methods\n  avoid: ["eval()", "innerHTML with user data", "document.write()"],\n  \n  // 5. Dependency security\n  deps: "Run 'npm audit' regularly to find vulnerabilities",\n  \n  // 6. CORS properly configured\n  cors: "Only allow trusted origins in CORS headers",\n  \n  // 7. Content Security Policy\n  csp: "Add CSP headers to prevent XSS",\n  \n  // 8. Rate limiting (backend)\n  rateLimit: "Limit API requests to prevent abuse"\n};\n\nconsole.log("Running npm audit...");\n// npm audit → shows known vulnerabilities in dependencies`,
          explanation: "Security is a checklist. Every production app needs: HTTPS, secure auth, input validation, CSP headers, dependency audits.",
          output: "[Security checklist for production apps]"
        }
      },
      { type: "summary", points: ["XSS: use textContent not innerHTML; sanitize with DOMPurify", "Never use eval() with user input", "Store tokens in HttpOnly cookies, not localStorage", "Validate input on BOTH frontend and backend", "Run npm audit regularly for dependency vulnerabilities"] }
    ]
  },

  interview: {
    title: "Interview Master Guide",
    emoji: "🎤",
    sections: [
      { type: "intro", content: "This guide covers the most frequently asked JavaScript interview questions with detailed answers. Organized by difficulty: Beginner → Intermediate → Advanced." },
      {
        type: "interview-guide",
        beginner: [
          { q: "What is JavaScript?", a: "JavaScript is a lightweight, interpreted, high-level programming language primarily used to make web pages interactive. It runs in browsers and also on servers via Node.js. Unlike HTML (structure) and CSS (style), JavaScript adds behavior." },
          { q: "What is the difference between var, let, and const?", a: "var: function-scoped, hoisted as undefined, can be re-declared. let: block-scoped, in TDZ before declaration, can be re-assigned. const: block-scoped, must be initialized, cannot be re-assigned. Use const by default, let when value changes, avoid var." },
          { q: "What are the data types in JavaScript?", a: "Primitives: String, Number, Boolean, Undefined, Null, BigInt, Symbol. Reference types: Object (includes Arrays, Functions, Dates). Use typeof to check — note typeof null === 'object' is a known bug." },
          { q: "What is the difference between == and ===?", a: "== (loose equality): compares values after type coercion. 5 == '5' → true. === (strict equality): compares value AND type. 5 === '5' → false. Always use === in production code." },
          { q: "What is hoisting?", a: "JavaScript moves declarations to the top of their scope before execution. Function declarations are fully hoisted. var is hoisted as undefined. let/const are hoisted but in the Temporal Dead Zone — accessing before declaration throws ReferenceError." },
          { q: "What is a closure?", a: "A closure is when an inner function remembers variables from its outer function's scope, even after the outer function has returned. Example: counter functions. Used for private data, factory functions, and module patterns." },
          { q: "What is the DOM?", a: "Document Object Model — a tree structure representing all HTML elements as JavaScript objects. JS can read, create, update, and delete any element. Access via document.getElementById(), querySelector(), etc." },
          { q: "What is an event listener?", a: "A function attached to an element that runs when a specific event occurs. element.addEventListener('click', callback). Modern way — supports multiple listeners, can be removed with removeEventListener." },
          { q: "What are arrow functions?", a: "Shorter function syntax introduced in ES6. const add = (a, b) => a + b. Key difference: no own 'this' (inherits from enclosing scope), cannot be used as constructors, no 'arguments' object." },
          { q: "What is the difference between null and undefined?", a: "undefined: variable declared but no value assigned (JS default). null: intentional absence of value (developer sets it). typeof null === 'object' (bug), typeof undefined === 'undefined'. Use === null to check for null." }
        ],
        intermediate: [
          { q: "Explain the event loop", a: "JS is single-threaded. Event loop: 1) Run all sync code (call stack). 2) Run all microtasks (Promise callbacks). 3) Run next macrotask (setTimeout). 4) Repeat. This allows non-blocking async behavior." },
          { q: "What is the prototype chain?", a: "Every JS object has a [[Prototype]] link. When accessing a property, JS first checks the object, then its prototype, then prototype's prototype, until null. This is how inheritance works in JS under the hood." },
          { q: "What is event delegation?", a: "Adding ONE event listener to a parent instead of each child. Uses event bubbling — events rise from child to parent. e.target identifies actual clicked element. Benefits: less memory, handles dynamically added elements." },
          { q: "What is the difference between Promise.all and Promise.allSettled?", a: "Promise.all: resolves when ALL resolve, rejects if ANY rejects. Promise.allSettled: waits for ALL, returns array of {status, value/reason} — never rejects. Use allSettled when partial failure is acceptable." },
          { q: "What is memoization?", a: "Caching the results of expensive function calls. Same inputs → return cached result instead of recalculating. Improves performance for pure functions. React's useMemo and useCallback use this pattern." },
          { q: "Explain 'this' keyword", a: "'this' refers to the object calling the function. In methods: the object. In global: window (or undefined in strict mode). In arrow functions: inherits from enclosing scope. In constructors (new): the new object." },
          { q: "What is debouncing?", a: "Delays function execution until events STOP firing. Resets timer on each call, fires once after delay. Used for search input, resize handlers. Prevents excessive API calls while user is still typing." },
          { q: "What are ES6 modules?", a: "export: share code from a file. import: use code from another file. Named exports: export const/function (import with {}). Default export: one per file (import without {}). Enables code splitting and organization." },
          { q: "What is the difference between call, apply, and bind?", a: "All set 'this'. call: invokes immediately, args as comma list. apply: invokes immediately, args as array. bind: returns new function with fixed 'this' — doesn't invoke immediately." },
          { q: "What are higher-order functions?", a: "Functions that accept functions as arguments OR return functions. Examples: map, filter, reduce, forEach. Enable abstraction and functional programming. Used constantly in React (event handlers, hooks)." }
        ],
        advanced: [
          { q: "Explain microtasks vs macrotasks", a: "Microtasks (Promise.then, queueMicrotask): run after current code, before next macrotask. Macrotasks (setTimeout, setInterval): run in event loop cycles. All microtasks drain before any macrotask runs." },
          { q: "What are JavaScript design patterns?", a: "Singleton (one instance), Observer (pub/sub), Factory (create without new), Module (encapsulation with IIFE), Strategy (swap algorithms), Proxy (intercept operations). Used in React (Observer), Redux (Strategy)." },
          { q: "How does garbage collection work in JavaScript?", a: "Mark-and-sweep algorithm: marks all reachable objects from roots (global, stack). Sweeps (deletes) unreachable objects. Common leaks: global variables, unremoved event listeners, closures holding large data, circular references." },
          { q: "What is functional programming?", a: "Programming paradigm based on pure functions (same input = same output), immutability (no mutations), no side effects. Key concepts: pure functions, higher-order functions, function composition, currying, immutability." },
          { q: "How does async/await work internally?", a: "Async functions return Promises. Await suspends the function and schedules the remainder as a microtask when the awaited Promise resolves. Under the hood, async/await is syntactic sugar over generator functions and Promises." },
          { q: "What is the Temporal Dead Zone?", a: "Period between entering a block scope and the variable declaration being initialized. let/const variables exist in TDZ from scope entry to declaration line. Accessing during TDZ throws ReferenceError. var doesn't have TDZ." },
          { q: "Explain WeakMap and WeakSet", a: "WeakMap: key-value pairs where keys are objects, held weakly (don't prevent GC). WeakSet: unique objects, held weakly. Both non-iterable. Use for caching/metadata keyed by objects without preventing garbage collection." },
          { q: "What is the difference between deep and shallow copy?", a: "Shallow: copies one level deep, nested objects are still references. {...obj}, Object.assign, [...arr]. Deep: copies ALL levels, completely independent. JSON.parse(JSON.stringify(obj)) (simple), structuredClone() (modern), or libraries like Lodash." },
          { q: "How does the JavaScript engine optimize code?", a: "V8: 1) Parse code to AST. 2) Interpreter (Ignition) creates bytecode. 3) Hot functions: JIT compiler (TurboFan) compiles to optimized machine code. 4) Deoptimize if types change. Keep types stable for better optimization." },
          { q: "What are Proxy and Reflect?", a: "Proxy: intercept and customize fundamental operations (get, set, delete, function calls). Reflect: same operations as explicit methods. Used for validation, logging, reactive systems (Vue 3 uses Proxy for reactivity)." }
        ]
      }
    ]
  },

  projects: {
    title: "Real-World Projects",
    emoji: "🏗️",
    sections: [
      { type: "intro", content: "Building real projects is the BEST way to solidify JavaScript knowledge. Each project introduces new concepts and challenges. Start small and build up!" },
      {
        type: "projects-guide",
        projects: [
          {
            level: "Beginner",
            items: [
              {
                name: "Counter App",
                description: "Increment, decrement, reset counter",
                concepts: ["Variables", "DOM manipulation", "Event listeners", "Conditionals"],
                features: ["Display count", "Increment/Decrement buttons", "Reset button", "Min/Max limits", "Color changes based on value"],
                code: `// Counter App\nconst display = document.getElementById("count");\nlet count = 0;\nconst MIN = -10, MAX = 10;\n\nfunction updateDisplay() {\n  display.textContent = count;\n  display.style.color = count > 0 ? "#10b981" : count < 0 ? "#ef4444" : "#94a3b8";\n}\n\ndocument.getElementById("increment").addEventListener("click", () => {\n  if (count < MAX) { count++; updateDisplay(); }\n});\ndocument.getElementById("decrement").addEventListener("click", () => {\n  if (count > MIN) { count--; updateDisplay(); }\n});\ndocument.getElementById("reset").addEventListener("click", () => {\n  count = 0; updateDisplay();\n});`
              },
              {
                name: "To-Do App",
                description: "Add, complete, delete tasks with localStorage",
                concepts: ["Arrays", "localStorage", "DOM manipulation", "Event delegation"],
                features: ["Add tasks", "Mark complete", "Delete tasks", "Filter by status", "Persist in localStorage"],
                code: `// Todo App\nlet todos = JSON.parse(localStorage.getItem("todos")) || [];\n\nfunction saveTodos() { localStorage.setItem("todos", JSON.stringify(todos)); }\n\nfunction renderTodos(filter = "all") {\n  const list = document.getElementById("list");\n  const filtered = todos.filter(t =>\n    filter === "all" ? true : filter === "done" ? t.done : !t.done\n  );\n  list.innerHTML = filtered.map(t => \`\n    <li class="\${t.done ? 'done' : ''}" data-id="\${t.id}">\n      <span>\${t.text}</span>\n      <button class="toggle">✓</button>\n      <button class="delete">🗑</button>\n    </li>\n  \`).join("");\n}\n\ndocument.getElementById("form").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const text = document.getElementById("input").value.trim();\n  if (!text) return;\n  todos.push({ id: Date.now(), text, done: false });\n  saveTodos(); renderTodos();\n  document.getElementById("input").value = "";\n});\n\ndocument.getElementById("list").addEventListener("click", (e) => {\n  const id = Number(e.target.closest("li")?.dataset.id);\n  if (!id) return;\n  if (e.target.classList.contains("toggle")) {\n    todos = todos.map(t => t.id === id ? { ...t, done: !t.done } : t);\n  } else if (e.target.classList.contains("delete")) {\n    todos = todos.filter(t => t.id !== id);\n  }\n  saveTodos(); renderTodos();\n});`
              }
            ]
          },
          {
            level: "Intermediate",
            items: [
              {
                name: "Weather App",
                description: "Fetch real weather data from API",
                concepts: ["Fetch API", "async/await", "Promises", "Error handling", "DOM manipulation"],
                features: ["Search by city", "Display temperature, humidity, wind", "Weather icons", "5-day forecast", "Error handling for invalid cities"],
                code: `// Weather App\nconst API_KEY = "your_openweathermap_key";\nconst BASE_URL = "https://api.openweathermap.org/data/2.5";\n\nasync function getWeather(city) {\n  const loadingEl = document.getElementById("loading");\n  loadingEl.style.display = "block";\n  try {\n    const res = await fetch(\`\${BASE_URL}/weather?q=\${city}&appid=\${API_KEY}&units=metric\`);\n    if (!res.ok) throw new Error(res.status === 404 ? "City not found!" : "API error");\n    const data = await res.json();\n    displayWeather(data);\n  } catch (err) {\n    document.getElementById("error").textContent = err.message;\n  } finally {\n    loadingEl.style.display = "none";\n  }\n}\n\nfunction displayWeather(data) {\n  document.getElementById("city").textContent = data.name;\n  document.getElementById("temp").textContent = Math.round(data.main.temp) + "°C";\n  document.getElementById("desc").textContent = data.weather[0].description;\n  document.getElementById("humidity").textContent = data.main.humidity + "%";\n  document.getElementById("wind").textContent = data.wind.speed + " m/s";\n}\n\ndocument.getElementById("search-form").addEventListener("submit", (e) => {\n  e.preventDefault();\n  const city = document.getElementById("city-input").value.trim();\n  if (city) getWeather(city);\n});`
              }
            ]
          },
          {
            level: "Advanced",
            items: [
              {
                name: "Task Management System",
                description: "Full CRUD with drag & drop, categories, priorities",
                concepts: ["Classes", "OOP", "Drag & Drop API", "localStorage", "Event delegation", "Functional programming"],
                features: ["Multiple boards (Kanban)", "Drag & drop tasks", "Priority levels", "Due dates", "Search & filter", "Dark/Light theme"],
                code: `// Task Management — Architecture\nclass Task {\n  constructor({ title, description, priority = "medium", dueDate, boardId }) {\n    this.id = Date.now();\n    this.title = title;\n    this.description = description;\n    this.priority = priority;\n    this.dueDate = dueDate;\n    this.boardId = boardId;\n    this.createdAt = new Date().toISOString();\n    this.done = false;\n  }\n}\n\nclass Board {\n  constructor(name) {\n    this.id = Date.now();\n    this.name = name;\n    this.tasks = [];\n  }\n  addTask(taskData) {\n    const task = new Task({ ...taskData, boardId: this.id });\n    this.tasks.push(task);\n    return task;\n  }\n  removeTask(id) {\n    this.tasks = this.tasks.filter(t => t.id !== id);\n  }\n}\n\nclass TaskManager {\n  constructor() {\n    this.boards = this.load();\n    this.render();\n  }\n  load() {\n    return JSON.parse(localStorage.getItem("boards")) || [\n      new Board("To Do"), new Board("In Progress"), new Board("Done")\n    ];\n  }\n  save() { localStorage.setItem("boards", JSON.stringify(this.boards)); }\n  render() { /* render all boards with tasks */ }\n}\n\nconst app = new TaskManager();`
              }
            ]
          }
        ]
      }
    ]
  }
};

export default content2;
