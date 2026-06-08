// src/data/content.js  —  Full chapter content for every topic

const content = {

  // ─────────────────────────────────────────────
  // LEVEL 1 — FUNDAMENTALS
  // ─────────────────────────────────────────────

  intro: {
    title: "Introduction to JavaScript",
    emoji: "👋",
    sections: [
      {
        type: "intro",
        content: `JavaScript is the language of the web. It is a programming language that makes websites **interactive, dynamic, and alive**. Without JavaScript, websites would be static — just plain text and images with no movement or response.`
      },
      { type: "what", content: "JavaScript (JS) is a lightweight, interpreted programming language. It runs directly in the browser — no installation needed. It lets you add **interactivity** to web pages like button clicks, form validation, animations, pop-ups, and much more." },
      { type: "why", content: "Without JavaScript:\n- Websites cannot respond to clicks\n- Forms cannot be validated before sending\n- Pages cannot update without full reload\n- No animations, games, or real-time updates\n\n**JavaScript powers everything** — Google, YouTube, Facebook, Netflix all use JavaScript." },
      { type: "where", content: "JavaScript runs:\n- In the **browser** (Frontend — Chrome, Firefox, Edge)\n- On the **server** (Backend — Node.js)\n- In **mobile apps** (React Native)\n- In **desktop apps** (Electron)\n- In **IoT devices** (Internet of Things)" },
      { type: "when", content: "Use JavaScript when you want:\n- Interactive UI (dropdowns, modals, tabs)\n- Real-time updates (live chat, notifications)\n- Form validation (check email format)\n- Animations & transitions\n- Fetching data from APIs (weather, maps)" },
      {
        type: "code",
        title: "Your First JavaScript",
        basic: {
          code: `// This is a comment — JS ignores it\nconsole.log("Hello, World!");\nalert("Welcome to JavaScript!");`,
          explanation: "console.log() prints text to the browser console. alert() shows a popup dialog. Both are built-in JS functions.",
          output: `Hello, World!  ← appears in Console\n[Popup dialog] ← appears in browser`
        },
        intermediate: {
          code: `// Variable declaration\nlet userName = "Soyeb";\nlet age = 20;\nconsole.log("Name:", userName);\nconsole.log("Age:", age);\nconsole.log(\`Hello \${userName}! You are \${age} years old.\`);`,
          explanation: "let creates a variable. Template literals (backticks) allow embedding variables inside strings using ${}.",
          output: `Name: Soyeb\nAge: 20\nHello Soyeb! You are 20 years old.`
        },
        realworld: {
          code: `// Real website: Show greeting based on time\nconst hour = new Date().getHours();\nlet greeting;\nif (hour < 12) {\n  greeting = "Good Morning! ☀️";\n} else if (hour < 18) {\n  greeting = "Good Afternoon! 🌤️";\n} else {\n  greeting = "Good Evening! 🌙";\n}\ndocument.getElementById("greeting").textContent = greeting;`,
          explanation: "Gets the current hour, decides what greeting to show, then updates the HTML element. This is used on real websites.",
          output: `Updates the page with: "Good Morning! ☀️" (or Afternoon/Evening based on time)`
        }
      },
      {
        type: "mistakes",
        items: [
          { wrong: "Console.Log('hello')", right: "console.log('hello')", reason: "JavaScript is case-sensitive. 'Log' ≠ 'log'" },
          { wrong: "Missing semicolons (optional but good practice)", right: "console.log('hello');", reason: "Always add semicolons to avoid ASI pitfalls" },
          { wrong: "Confusing = with ==", right: "Use = for assignment, == or === for comparison", reason: "x = 5 sets x to 5. x == 5 checks if x equals 5." }
        ]
      },
      {
        type: "interview",
        questions: [
          "What is JavaScript and what is it used for?",
          "Is JavaScript the same as Java?",
          "What is the difference between JavaScript and HTML/CSS?",
          "Where does JavaScript run?",
          "What is console.log() used for?"
        ]
      },
      {
        type: "summary",
        points: [
          "JavaScript is a programming language that makes websites interactive",
          "It runs in browsers AND on servers (Node.js)",
          "It was created in 10 days by Brendan Eich in 1995",
          "console.log() is used to print output for debugging",
          "JavaScript is case-sensitive"
        ]
      }
    ],
    quiz: {
      question: "Which of the following statements is true about JavaScript?",
      options: [
        "It is exactly the same as Java",
        "You need to download it before you can use it",
        "It was created to make web pages interactive",
        "It only runs on servers"
      ],
      correct: 2,
      successMessage: "Awesome! You defeated the Intro Bug!"
    }
  },

  history: {
    title: "History of JavaScript",
    emoji: "📜",
    sections: [
      { type: "intro", content: "Understanding where JavaScript came from helps you understand **why** it works the way it does — and why some things seem quirky or inconsistent." },
      { type: "what", content: "JavaScript was created in **1995** by **Brendan Eich** at Netscape in just **10 days**. Originally named **Mocha**, then **LiveScript**, then renamed **JavaScript** for marketing reasons (Java was very popular at the time). Despite the name, JavaScript has **nothing to do with Java** — they are completely different languages." },
      {
        type: "timeline",
        items: [
          { year: "1995", event: "Brendan Eich creates JavaScript in 10 days at Netscape" },
          { year: "1996", event: "Microsoft creates JScript (their own version)" },
          { year: "1997", event: "ECMAScript standard created (ES1) — makes JS consistent across browsers" },
          { year: "1999", event: "ES3 — introduced regular expressions, try/catch" },
          { year: "2009", event: "ES5 — JSON support, strict mode, Array methods" },
          { year: "2009", event: "Node.js released — JS now runs on the server!" },
          { year: "2015", event: "ES6 (ES2015) — BIGGEST update: let, const, arrow functions, classes, promises" },
          { year: "2016+", event: "Yearly releases: ES7, ES8, ES9... (new features every year)" },
          { year: "2024", event: "ESNext — Modern JavaScript with all latest features" }
        ]
      },
      {
        type: "summary",
        points: [
          "JavaScript was created in 1995 in just 10 days",
          "Created by Brendan Eich at Netscape",
          "JavaScript ≠ Java — completely different languages",
          "ECMAScript is the official standard for JavaScript",
          "ES6 (2015) was the biggest update in JS history",
          "Node.js (2009) allowed JS to run on servers",
          "JavaScript is now the most popular programming language in the world"
        ]
      }
    ]
  },

  "how-js-works": {
    title: "How JavaScript Works",
    emoji: "⚙️",
    sections: [
      { type: "intro", content: "Understanding how JavaScript works internally helps you write better code, debug faster, and understand confusing behaviors like hoisting and async operations." },
      { type: "what", content: "JavaScript is a **single-threaded, interpreted language** that runs inside a **JavaScript Engine**. The most famous engine is **V8** (used in Chrome and Node.js). Other engines: SpiderMonkey (Firefox), JavaScriptCore (Safari)." },
      {
        type: "concept",
        title: "JavaScript Engine Components",
        items: [
          { name: "Parser", desc: "Reads your code and checks for syntax errors" },
          { name: "AST (Abstract Syntax Tree)", desc: "Converts code into a tree structure the computer understands" },
          { name: "Interpreter", desc: "Converts code to bytecode and runs it" },
          { name: "JIT Compiler", desc: "Just-In-Time compilation — optimizes frequently used code for speed" },
          { name: "Garbage Collector", desc: "Automatically frees up memory that's no longer needed" }
        ]
      },
      {
        type: "concept",
        title: "JavaScript Runtime (Browser)",
        items: [
          { name: "Call Stack", desc: "Where JS executes code — one function at a time (single-threaded)" },
          { name: "Web APIs", desc: "Browser features: setTimeout, fetch, DOM, localStorage" },
          { name: "Callback Queue", desc: "Holds completed async tasks waiting to run" },
          { name: "Event Loop", desc: "Moves tasks from Queue to Call Stack when Stack is empty" },
          { name: "Heap", desc: "Memory storage for objects and variables" }
        ]
      },
      {
        type: "code",
        title: "How Code Executes",
        basic: {
          code: `// Step 1: Parse (check for errors)\n// Step 2: Create Execution Context\n// Step 3: Hoisting phase\n// Step 4: Execute line by line\n\nconsole.log("Step 1"); // Runs first\nconsole.log("Step 2"); // Runs second\nconsole.log("Step 3"); // Runs third`,
          explanation: "JS runs code top-to-bottom, one line at a time. This is synchronous execution.",
          output: "Step 1\nStep 2\nStep 3"
        },
        intermediate: {
          code: `console.log("1 - Start");\nsetTimeout(() => {\n  console.log("3 - Async (setTimeout)");\n}, 0);\nconsole.log("2 - End");`,
          explanation: "Even with 0ms delay, setTimeout goes to the Web API then Callback Queue. Main code (Call Stack) always runs first.",
          output: "1 - Start\n2 - End\n3 - Async (setTimeout)"
        },
        realworld: {
          code: `// Like a restaurant:\n// Call Stack = one waiter taking one order\n// Web APIs = kitchen preparing food\n// Callback Queue = completed orders waiting\n// Event Loop = manager bringing food to table\nfetch('https://api.example.com/user')\n  .then(res => res.json())\n  .then(data => console.log(data));\nconsole.log("This runs BEFORE fetch completes");`,
          explanation: "Fetch goes to Web API (network), rest of code continues, when fetch completes it enters callback queue, then event loop brings it to call stack.",
          output: "This runs BEFORE fetch completes\n[user data object] ← arrives after"
        }
      },
      {
        type: "summary",
        points: [
          "JavaScript runs in a JavaScript Engine (V8 in Chrome/Node.js)",
          "JS is single-threaded — one task at a time",
          "Call Stack: where code runs",
          "Web APIs: browser features (setTimeout, fetch, DOM)",
          "Event Loop: moves async tasks from queue to stack",
          "Heap: memory storage for objects"
        ]
      }
    ]
  },

  variables: {
    title: "Variables",
    emoji: "📦",
    sections: [
      { type: "intro", content: "Variables are like **labeled boxes** that store data. You put something in the box (assign a value), give the box a name (variable name), and later you can open the box to get the value." },
      { type: "what", content: "A variable is a **named container** for storing data values. In JavaScript, you can declare variables using three keywords: **var**, **let**, and **const**." },
      { type: "why", content: "Variables let you:\n- Store and reuse data\n- Change data when needed\n- Make code readable with meaningful names\n- Avoid repeating values throughout code" },
      {
        type: "comparison",
        title: "var vs let vs const",
        table: {
          headers: ["Feature", "var", "let", "const"],
          rows: [
            ["Introduced", "ES1 (Old)", "ES6 (2015)", "ES6 (2015)"],
            ["Scope", "Function scope", "Block scope", "Block scope"],
            ["Re-declare?", "✅ Yes", "❌ No", "❌ No"],
            ["Re-assign?", "✅ Yes", "✅ Yes", "❌ No"],
            ["Hoisted?", "✅ Yes (undefined)", "✅ Yes (TDZ)", "✅ Yes (TDZ)"],
            ["Use today?", "❌ Avoid", "✅ Yes", "✅ Yes (preferred)"]
          ]
        }
      },
      {
        type: "code",
        title: "Variable Declaration",
        basic: {
          code: `// const — value won't change\nconst PI = 3.14159;\nconst siteName = "JS Mastery";\n\n// let — value might change\nlet score = 0;\nlet userName = "Soyeb";\n\n// Multiple variables\nlet x = 5, y = 10, z = 15;\n\nconsole.log(PI);      // 3.14159\nconsole.log(siteName); // JS Mastery\nconsole.log(score);   // 0`,
          explanation: "const for values that never change (best practice). let for values that will change.",
          output: "3.14159\nJS Mastery\n0"
        },
        intermediate: {
          code: `// Block scope example\nlet globalVar = "I am global";\n\nif (true) {\n  let blockVar = "I am in a block";\n  const blockConst = "Also in block";\n  console.log(globalVar); // ✅ Works\n  console.log(blockVar);  // ✅ Works\n}\n\nconsole.log(globalVar); // ✅ Works\n// console.log(blockVar); // ❌ ReferenceError!`,
          explanation: "let and const are block-scoped. They exist only inside the {} block where they are defined.",
          output: "I am global\nI am in a block\nI am global"
        },
        realworld: {
          code: `// E-commerce shopping cart\nconst TAX_RATE = 0.18;          // Never changes\nconst SITE_NAME = "ShopEasy";   // Never changes\n\nlet cartTotal = 0;              // Changes as items added\nlet itemCount = 0;              // Changes\nlet discountApplied = false;    // Changes\n\nfunction addToCart(price) {\n  cartTotal += price;\n  itemCount++;\n  console.log(\`Cart: ₹\${cartTotal} | Items: \${itemCount}\`);\n}\n\naddToCart(500);\naddToCart(1200);\nconsole.log(\`Tax: ₹\${cartTotal * TAX_RATE}\`);`,
          explanation: "TAX_RATE and SITE_NAME use const because they never change. Cart values use let because they update.",
          output: "Cart: ₹500 | Items: 1\nCart: ₹1700 | Items: 2\nTax: ₹306"
        }
      },
      {
        type: "naming",
        title: "Variable Naming Rules",
        rules: [
          "✅ Start with a letter, _ or $",
          "✅ Can contain letters, numbers, _, $",
          "✅ Use camelCase: firstName, totalPrice",
          "❌ Cannot start with a number: 1name ← INVALID",
          "❌ Cannot use reserved words: let, const, class",
          "❌ No spaces in names: first name ← INVALID"
        ]
      },
      {
        type: "mistakes",
        items: [
          { wrong: "var x = 5; (using var)", right: "let x = 5; or const x = 5;", reason: "var has confusing scoping and hoisting behavior. Always use let/const." },
          { wrong: "const x; x = 5;", right: "const x = 5;", reason: "const must be initialized when declared." },
          { wrong: "let 1name = 'Bob';", right: "let firstName = 'Bob';", reason: "Variable names cannot start with numbers." }
        ]
      },
      {
        type: "interview",
        questions: [
          "What is the difference between var, let, and const?",
          "What is block scope vs function scope?",
          "Can you reassign a const variable?",
          "What happens when you use a variable before declaring it?",
          "What is the Temporal Dead Zone (TDZ)?"
        ]
      },
      {
        type: "summary",
        points: [
          "Variables store data with a label",
          "Use const by default — only switch to let when value changes",
          "Avoid var — it has confusing behavior",
          "let and const are block-scoped",
          "Variable names: camelCase, no spaces, no reserved words"
        ]
      }
    ]
  },

  "data-types": {
    title: "Data Types",
    emoji: "🔢",
    sections: [
      { type: "intro", content: "Data types define **what kind of value** a variable holds. JavaScript has 8 data types divided into **Primitive** and **Object** types." },
      {
        type: "comparison",
        title: "JavaScript Data Types",
        table: {
          headers: ["Type", "Example", "typeof result"],
          rows: [
            ["String", `"Hello"`, `"string"`],
            ["Number", "42, 3.14, -7", `"number"`],
            ["Boolean", "true, false", `"boolean"`],
            ["Undefined", "let x; (no value)", `"undefined"`],
            ["Null", "let x = null;", `"object"` + " ← JS bug!"],
            ["BigInt", "9007199254740991n", `"bigint"`],
            ["Symbol", "Symbol('id')", `"symbol"`],
            ["Object", "{name: 'Bob'}", `"object"`],
            ["Array", "[1,2,3]", `"object"`],
            ["Function", "function(){}","\"function\""]
          ]
        }
      },
      {
        type: "code",
        title: "All Data Types in Action",
        basic: {
          code: `// String — text data\nconst name = "Soyeb";\nconst greeting = 'Hello World';\nconst template = \`My name is \${name}\`;\n\n// Number — numeric data\nconst age = 25;\nconst price = 99.99;\nconst negative = -10;\n\n// Boolean — true or false\nconst isLoggedIn = true;\nconst hasDiscount = false;\n\n// Undefined — declared but no value\nlet score;\nconsole.log(score); // undefined\n\n// Null — intentional empty value\nconst data = null;\n\n// Checking types\nconsole.log(typeof name);      // "string"\nconsole.log(typeof age);       // "number"\nconsole.log(typeof isLoggedIn); // "boolean"\nconsole.log(typeof score);     // "undefined"\nconsole.log(typeof data);      // "object" ← known JS bug`,
          explanation: "Each type stores a different kind of data. typeof tells you what type a variable is.",
          output: `undefined\nstring\nnumber\nboolean\nundefined\nobject`
        },
        intermediate: {
          code: `// Primitives are copied by VALUE\nlet a = 10;\nlet b = a;   // b gets a COPY of 10\nb = 20;\nconsole.log(a); // 10 — a is NOT changed!\nconsole.log(b); // 20\n\n// Objects are copied by REFERENCE\nlet obj1 = { score: 100 };\nlet obj2 = obj1; // obj2 POINTS to same object\nobj2.score = 999;\nconsole.log(obj1.score); // 999 — obj1 IS changed!\nconsole.log(obj2.score); // 999`,
          explanation: "Primitives (string, number, boolean) copy the value. Objects/Arrays copy the reference (memory address).",
          output: "10\n20\n999\n999"
        },
        realworld: {
          code: `// User profile object — real app data\nconst user = {\n  id: 1,                    // Number\n  name: "Soyeb Khan",       // String\n  email: "soyeb@mail.com",  // String\n  age: 22,                  // Number\n  isPremium: true,          // Boolean\n  address: null,            // Null (not provided)\n  hobbies: ["coding","gaming"], // Array (Object)\n  lastLogin: undefined      // Undefined (not set)\n};\n\nconsole.log(typeof user.name);     // "string"\nconsole.log(typeof user.isPremium); // "boolean"\nconsole.log(Array.isArray(user.hobbies)); // true`,
          explanation: "Real apps mix all data types in objects. Use Array.isArray() to check for arrays (typeof returns 'object').",
          output: "string\nboolean\ntrue"
        }
      },
      {
        type: "mistakes",
        items: [
          { wrong: "typeof null === 'null'", right: "typeof null === 'object'", reason: "Famous JS bug — typeof null returns 'object'. Use === null to check for null." },
          { wrong: "typeof [] === 'array'", right: "Array.isArray([]) === true", reason: "typeof array returns 'object'. Use Array.isArray() to check arrays." },
          { wrong: "undefined == null is false", right: "undefined == null is true (loose), undefined === null is false (strict)", reason: "Use strict equality === to avoid confusion." }
        ]
      },
      {
        type: "interview",
        questions: [
          "What are the 8 data types in JavaScript?",
          "What is the difference between undefined and null?",
          "What is the difference between primitive and reference types?",
          "Why does typeof null return 'object'?",
          "How do you check if a variable is an array?"
        ]
      },
      {
        type: "summary",
        points: [
          "7 primitive types: String, Number, Boolean, Undefined, Null, BigInt, Symbol",
          "Objects (including Arrays, Functions) are reference types",
          "typeof is used to check data types",
          "Primitives are copied by value; Objects are copied by reference",
          "typeof null === 'object' is a known JavaScript bug"
        ]
      }
    ]
  },

  operators: {
    title: "Operators",
    emoji: "➕",
    sections: [
      { type: "intro", content: "Operators are **symbols that perform operations** on values. Like math symbols (+, -, ×, ÷) but JavaScript has many more types." },
      {
        type: "comparison",
        title: "Types of Operators",
        table: {
          headers: ["Type", "Operators", "Example"],
          rows: [
            ["Arithmetic", "+  -  *  /  %  **  ++  --", "5 + 3 = 8"],
            ["Assignment", "=  +=  -=  *=  /=  %=", "x += 5"],
            ["Comparison", "==  ===  !=  !==  >  <  >=  <=", "5 === 5 → true"],
            ["Logical", "&&  ||  !", "true && false → false"],
            ["Ternary", "? :", "age > 18 ? 'Adult' : 'Minor'"],
            ["Nullish", "??", "null ?? 'default'"],
            ["Optional Chain", "?.", "user?.address?.city"],
            ["Typeof", "typeof", "typeof 'hello' → 'string'"]
          ]
        }
      },
      {
        type: "code",
        title: "Operators in Action",
        basic: {
          code: `// Arithmetic\nconsole.log(10 + 3);  // 13\nconsole.log(10 - 3);  // 7\nconsole.log(10 * 3);  // 30\nconsole.log(10 / 3);  // 3.333...\nconsole.log(10 % 3);  // 1 (remainder)\nconsole.log(2 ** 10); // 1024 (power)\n\n// Comparison (returns true/false)\nconsole.log(5 == "5");  // true  (loose — ignores type)\nconsole.log(5 === "5"); // false (strict — checks type)\nconsole.log(5 !== "5"); // true\nconsole.log(10 > 5);    // true\n\n// Logical\nconsole.log(true && false); // false\nconsole.log(true || false); // true\nconsole.log(!true);         // false`,
          explanation: "== compares values loosely (type coercion). === compares values AND types strictly. Always prefer ===.",
          output: "13\n7\n30\n3.333...\n1\n1024\ntrue\nfalse\ntrue\ntrue\nfalse\ntrue\nfalse"
        },
        intermediate: {
          code: `// Ternary operator — short if/else\nconst age = 20;\nconst status = age >= 18 ? "Adult ✅" : "Minor ❌";\nconsole.log(status); // "Adult ✅"\n\n// Nullish coalescing ??\nconst userName = null;\nconst display = userName ?? "Guest";\nconsole.log(display); // "Guest"\n\n// Optional chaining ?.\nconst user = { profile: { city: "Mumbai" } };\nconsole.log(user?.profile?.city);    // "Mumbai"\nconsole.log(user?.address?.street);  // undefined (no error!)`,
          explanation: "?? returns right side only if left is null/undefined. ?. safely accesses nested properties without crashing.",
          output: "Adult ✅\nGuest\nMumbai\nundefined"
        },
        realworld: {
          code: `// Real app: Shopping cart discount logic\nconst cartTotal = 1500;\nconst couponCode = null;\nconst isPremiumUser = true;\n\nconst discount = isPremiumUser ? 0.15 : 0.05;\nconst coupon = couponCode ?? "No coupon applied";\nconst finalPrice = cartTotal - (cartTotal * discount);\n\nconsole.log(coupon);      // "No coupon applied"\nconsole.log(discount);    // 0.15\nconsole.log(finalPrice);  // 1275`,
          explanation: "Real apps chain operators for business logic. Ternary for discount. ?? for default values.",
          output: "No coupon applied\n0.15\n1275"
        }
      },
      {
        type: "mistakes",
        items: [
          { wrong: "if (x == 0) — loose comparison", right: "if (x === 0) — strict comparison", reason: "== does type coercion which causes bugs. Always use ===" },
          { wrong: `"5" + 3 = 53 (not 8)`, right: "parseInt('5') + 3 = 8", reason: "String + Number = String concatenation! Convert first." },
          { wrong: "x = x + 1 (verbose)", right: "x++ or x += 1", reason: "Use shorthand assignment operators" }
        ]
      },
      { type: "interview", questions: ["What is the difference between == and ===?", "What does the % operator do?", "What is the ternary operator?", "What is ?? (nullish coalescing)?", "What does optional chaining (?.) do?"] },
      { type: "summary", points: ["== checks value only (loose); === checks value AND type (strict)", "Always use === in real code", "?? returns right side if left is null/undefined", "?. safely accesses nested properties", "Ternary: condition ? valueIfTrue : valueIfFalse"] }
    ]
  },

  "type-conversion": {
    title: "Type Conversion",
    emoji: "🔄",
    sections: [
      { type: "intro", content: "JavaScript can convert between data types — sometimes automatically (**type coercion**), sometimes manually (**type conversion**). Understanding this prevents many confusing bugs." },
      { type: "what", content: "**Type Coercion** = JavaScript automatically converts types (implicit)\n**Type Conversion** = You manually convert types (explicit)\n\nBoth change a value from one type to another." },
      {
        type: "code",
        title: "Type Conversion",
        basic: {
          code: `// String to Number\nconsole.log(Number("42"));     // 42\nconsole.log(Number("3.14"));   // 3.14\nconsole.log(Number("hello"));  // NaN (Not a Number)\nconsole.log(Number(true));     // 1\nconsole.log(Number(false));    // 0\nconsole.log(Number(null));     // 0\nconsole.log(Number(undefined));// NaN\n\n// Number to String\nconsole.log(String(42));       // "42"\nconsole.log((42).toString());  // "42"\n\n// To Boolean\nconsole.log(Boolean(0));       // false\nconsole.log(Boolean(""));      // false\nconsole.log(Boolean(null));    // false\nconsole.log(Boolean(undefined)); // false\nconsole.log(Boolean(NaN));     // false\nconsole.log(Boolean("hello")); // true\nconsole.log(Boolean(1));       // true\nconsole.log(Boolean([]));      // true (!)`,
          explanation: "Number() converts to number. String() converts to string. Boolean() converts to true/false. 0, '', null, undefined, NaN are 'falsy' — everything else is 'truthy'.",
          output: "42\n3.14\nNaN\n1\n0\n0\nNaN\n\"42\"\n\"42\"\nfalse\nfalse\nfalse\nfalse\nfalse\ntrue\ntrue\ntrue"
        },
        intermediate: {
          code: `// Type COERCION (automatic — be careful!)\nconsole.log("5" + 3);    // "53" — number becomes string!\nconsole.log("5" - 3);    // 2   — string becomes number\nconsole.log("5" * "2");  // 10  — both become numbers\nconsole.log(true + 1);   // 2   — true becomes 1\nconsole.log(false + 1);  // 1   — false becomes 0\nconsole.log(null + 1);   // 1   — null becomes 0\nconsole.log("" + 0);     // "0" — number becomes string\n\n// The famous JS quirks\nconsole.log([] + []);     // "" (empty string)\nconsole.log({} + []);     // "[object Object]"`,
          explanation: "+ with a string causes concatenation. Other math operators force number conversion. These quirks are why JS gets a bad reputation — but knowing them helps you avoid the bugs!",
          output: '"53"\n2\n10\n2\n1\n1\n"0"\n""\n"[object Object]"'
        },
        realworld: {
          code: `// Form input is ALWAYS a string — you must convert!\nconst priceInput = "1500";   // from <input type="text">\nconst quantityInput = "3";   // from <input>\n\n// Bug: string concatenation!\nconsole.log(priceInput + quantityInput); // "15003" ← WRONG!\n\n// Fix: explicit conversion\nconst price = Number(priceInput);\nconst qty = Number(quantityInput);\nconsole.log(price * qty); // 4500 ✅\n\n// Using parseInt / parseFloat\nconsole.log(parseInt("42px"));     // 42 (ignores "px")\nconsole.log(parseFloat("3.14em")); // 3.14`,
          explanation: "HTML form inputs are always strings. Always convert before doing math. parseInt ignores trailing non-numeric characters.",
          output: '"15003"\n4500\n42\n3.14'
        }
      },
      {
        type: "comparison",
        title: "Falsy vs Truthy Values",
        table: {
          headers: ["Falsy (converts to false)", "Truthy (converts to true)"],
          rows: [
            ["false", "true"],
            ["0, -0, 0n", "Any non-zero number"],
            ['""  (empty string)', '"hello" (any string with content)'],
            ["null", "[] (empty array!)"],
            ["undefined", "{} (empty object!)"],
            ["NaN", "Any function"]
          ]
        }
      },
      { type: "interview", questions: ["What is type coercion in JavaScript?", "What are falsy values in JavaScript?", "Why does '5' + 3 = '53' but '5' - 3 = 2?", "How do you convert a string to a number?", "What is NaN and how to check for it?"] },
      { type: "summary", points: ["Coercion = automatic conversion (JS does it); Conversion = manual (you do it)", "Falsy: false, 0, '', null, undefined, NaN", "Truthy: everything else (including [], {})", "Form inputs are always strings — convert with Number()", "parseInt() stops at first non-numeric character"] }
    ]
  },

  conditionals: {
    title: "Conditionals",
    emoji: "🔀",
    sections: [
      { type: "intro", content: "Conditionals let your code **make decisions** — do this if something is true, do that if it's false. Just like real life: IF it's raining, take an umbrella." },
      {
        type: "code",
        title: "if / else if / else",
        basic: {
          code: `const age = 20;\n\nif (age < 13) {\n  console.log("Child");\n} else if (age < 18) {\n  console.log("Teenager");\n} else if (age < 65) {\n  console.log("Adult");\n} else {\n  console.log("Senior");\n}\n// Output: "Adult"`,
          explanation: "JS checks each condition top-to-bottom. The first true condition runs its block. else catches everything else.",
          output: "Adult"
        },
        intermediate: {
          code: `// Switch statement — cleaner for multiple exact values\nconst day = "Monday";\n\nswitch (day) {\n  case "Monday":\n  case "Tuesday":\n  case "Wednesday":\n  case "Thursday":\n  case "Friday":\n    console.log("Weekday — Work time! 💼");\n    break;\n  case "Saturday":\n  case "Sunday":\n    console.log("Weekend — Rest time! 🏖️");\n    break;\n  default:\n    console.log("Invalid day");\n}`,
          explanation: "switch checks exact matches. break stops execution. default runs if nothing matches. Cases can fall through (stack together).",
          output: "Weekday — Work time! 💼"
        },
        realworld: {
          code: `// Real app: E-commerce order status\nconst orderStatus = "shipped";\n\nconst statusMessages = {\n  pending:   "⏳ Order received, processing...",\n  confirmed: "✅ Order confirmed!",\n  shipped:   "🚚 Your order is on the way!",\n  delivered: "📦 Order delivered. Enjoy!",\n  cancelled: "❌ Order cancelled."\n};\n\n// Object lookup — cleaner than if/else chain\nconst message = statusMessages[orderStatus] ?? "Unknown status";\nconsole.log(message); // "🚚 Your order is on the way!"`,
          explanation: "Object lookup is often cleaner than long if/else or switch chains. Real apps like Amazon use this for order status.",
          output: "🚚 Your order is on the way!"
        }
      },
      {
        type: "summary",
        points: [
          "if/else — for complex conditions and ranges",
          "switch — for exact value matching",
          "Ternary (? :) — for simple one-liner conditions",
          "Object lookup — cleanest for many exact values",
          "Always use === (strict) inside conditions"
        ]
      }
    ]
  },

  loops: {
    title: "Loops",
    emoji: "🔁",
    sections: [
      { type: "intro", content: "Loops let you **repeat actions** without writing the same code over and over. Instead of writing console.log 100 times, write a loop that runs 100 times." },
      {
        type: "comparison",
        title: "Types of Loops",
        table: {
          headers: ["Loop", "Best Used For"],
          rows: [
            ["for", "When you know how many times to repeat"],
            ["while", "When you repeat until a condition is false"],
            ["do...while", "When you need to run at least once"],
            ["for...of", "Iterating over arrays/strings"],
            ["for...in", "Iterating over object keys"],
            ["forEach", "Array method — loop over each item"]
          ]
        }
      },
      {
        type: "code",
        title: "All Loop Types",
        basic: {
          code: `// for loop\nfor (let i = 1; i <= 5; i++) {\n  console.log("Count:", i);\n}\n\n// while loop\nlet count = 1;\nwhile (count <= 3) {\n  console.log("While:", count);\n  count++;\n}\n\n// for...of (arrays)\nconst fruits = ["Apple","Mango","Banana"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}\n\n// for...in (objects)\nconst user = { name: "Soyeb", age: 22 };\nfor (const key in user) {\n  console.log(key, ":", user[key]);\n}`,
          explanation: "for: initialize; condition; update. while: runs while condition true. for...of: gets values. for...in: gets keys.",
          output: "Count: 1\nCount: 2\nCount: 3\nCount: 4\nCount: 5\nWhile: 1\nWhile: 2\nWhile: 3\nApple\nMango\nBanana\nname : Soyeb\nage : 22"
        },
        intermediate: {
          code: `// break — exit loop early\nfor (let i = 0; i < 10; i++) {\n  if (i === 5) break;\n  console.log(i);\n}\n// Prints: 0 1 2 3 4\n\n// continue — skip current iteration\nfor (let i = 0; i < 6; i++) {\n  if (i % 2 === 0) continue; // skip even\n  console.log(i);\n}\n// Prints: 1 3 5`,
          explanation: "break exits the loop completely. continue skips the current iteration and moves to the next.",
          output: "0\n1\n2\n3\n4\n1\n3\n5"
        },
        realworld: {
          code: `// Real app: Find discounted products\nconst products = [\n  { name: "Laptop",   price: 60000, discount: 10 },\n  { name: "Phone",    price: 25000, discount: 0  },\n  { name: "Earbuds",  price: 3000,  discount: 20 },\n  { name: "Keyboard", price: 2000,  discount: 15 },\n];\n\nconsole.log("🛒 Discounted Products:");\nfor (const product of products) {\n  if (product.discount === 0) continue; // skip no-discount\n  const savings = product.price * (product.discount / 100);\n  const newPrice = product.price - savings;\n  console.log(\`\${product.name}: ₹\${newPrice} (Save ₹\${savings})\`);\n}`,
          explanation: "Real e-commerce logic: loop products, skip ones with no discount, calculate and display savings.",
          output: "🛒 Discounted Products:\nLaptop: ₹54000 (Save ₹6000)\nEarbuds: ₹2400 (Save ₹600)\nKeyboard: ₹1700 (Save ₹300)"
        }
      },
      { type: "interview", questions: ["What is the difference between for and while?", "What does break do in a loop?", "What does continue do?", "What is the difference between for...of and for...in?", "What is an infinite loop and how do you avoid it?"] },
      { type: "summary", points: ["for — best when you know iterations count", "while — best when condition-based", "for...of — best for arrays/strings (gets values)", "for...in — for object keys", "break exits, continue skips current iteration"] }
    ]
  },

  // ─────────────────────────────────────────────
  // LEVEL 2 — CORE JAVASCRIPT
  // ─────────────────────────────────────────────

  functions: {
    title: "Functions",
    emoji: "🔧",
    sections: [
      { type: "intro", content: "Functions are **reusable blocks of code** that perform a specific task. Instead of writing the same code multiple times, wrap it in a function and call it whenever needed." },
      { type: "what", content: "A function is like a **recipe** — it has a name, takes ingredients (parameters), follows steps (code body), and produces a result (return value)." },
      {
        type: "comparison",
        title: "Ways to Create Functions",
        table: {
          headers: ["Type", "Syntax", "Hoisted?", "Has 'this'?"],
          rows: [
            ["Function Declaration", "function greet() {}", "✅ Yes", "✅ Yes"],
            ["Function Expression", "const greet = function() {}", "❌ No", "✅ Yes"],
            ["Arrow Function", "const greet = () => {}", "❌ No", "❌ No (inherits)"],
            ["IIFE", "(function() {})()", "N/A", "✅ Yes"]
          ]
        }
      },
      {
        type: "code",
        title: "Function Types",
        basic: {
          code: `// 1. Function Declaration\nfunction greet(name) {\n  return \`Hello, \${name}! 👋\`;\n}\nconsole.log(greet("Soyeb")); // "Hello, Soyeb! 👋"\n\n// 2. Function Expression\nconst add = function(a, b) {\n  return a + b;\n};\nconsole.log(add(5, 3)); // 8\n\n// 3. Arrow Function (ES6)\nconst multiply = (a, b) => a * b;\nconsole.log(multiply(4, 5)); // 20\n\n// 4. Default Parameters\nfunction welcome(name = "Guest") {\n  return \`Welcome, \${name}!\`;\n}\nconsole.log(welcome());        // "Welcome, Guest!"\nconsole.log(welcome("Admin")); // "Welcome, Admin!"`,
          explanation: "All four styles create functions. Arrow functions are concise — if single expression, no need for {} or return.",
          output: "Hello, Soyeb! 👋\n8\n20\nWelcome, Guest!\nWelcome, Admin!"
        },
        intermediate: {
          code: `// Rest parameters — accept any number of args\nfunction sum(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1, 2, 3));          // 6\nconsole.log(sum(10, 20, 30, 40));   // 100\n\n// Higher-order function — accepts function as argument\nfunction runTwice(fn, value) {\n  return fn(fn(value));\n}\nconst double = x => x * 2;\nconsole.log(runTwice(double, 3)); // 12 (3→6→12)\n\n// IIFE — runs immediately\n(function() {\n  const secret = "I run once!";\n  console.log(secret);\n})();`,
          explanation: "...rest collects extra arguments into an array. HOFs take/return functions. IIFE runs immediately without needing to call it.",
          output: "6\n100\n12\nI run once!"
        },
        realworld: {
          code: `// Real app: Form validator\nfunction validateEmail(email) {\n  const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n  return regex.test(email);\n}\n\nfunction validatePassword(password) {\n  return password.length >= 8;\n}\n\nfunction validateForm(email, password) {\n  const errors = [];\n  if (!validateEmail(email)) {\n    errors.push("❌ Invalid email format");\n  }\n  if (!validatePassword(password)) {\n    errors.push("❌ Password must be 8+ characters");\n  }\n  return errors.length === 0\n    ? { success: true, message: "✅ Form valid!" }\n    : { success: false, errors };\n}\n\nconsole.log(validateForm("soyeb@gmail.com", "secret123"));\nconsole.log(validateForm("invalid", "short"));`,
          explanation: "Real apps use small, focused functions that do one thing. Compose them together for complex logic.",
          output: '{ success: true, message: "✅ Form valid!" }\n{ success: false, errors: ["❌ Invalid email format", "❌ Password must be 8+ characters"] }'
        }
      },
      { type: "interview", questions: ["What is the difference between function declaration and function expression?", "What are arrow functions and how are they different?", "What is a higher-order function?", "What is an IIFE?", "What are default parameters?"] },
      { type: "summary", points: ["Functions: reusable code blocks", "Declaration: hoisted (can call before definition)", "Arrow functions: no own 'this', concise syntax", "Default params: function(name = 'Guest')", "Rest (...args): collects multiple arguments into array"] }
    ]
  },

  scope: {
    title: "Scope",
    emoji: "🔭",
    sections: [
      { type: "intro", content: "Scope determines **where variables can be accessed** in your code. Think of it like rooms in a house — you can access things in your room, but not in a locked room." },
      {
        type: "comparison",
        title: "Types of Scope",
        table: {
          headers: ["Scope Type", "Where defined", "Accessible from"],
          rows: [
            ["Global Scope", "Outside all functions/blocks", "Everywhere"],
            ["Function Scope", "Inside a function", "Only inside that function"],
            ["Block Scope", "Inside {} (if, for, etc.)", "Only inside that {} block"],
            ["Module Scope", "Inside an ES6 module", "Only inside that file"]
          ]
        }
      },
      {
        type: "code",
        title: "Scope Examples",
        basic: {
          code: `const globalVar = "I am global"; // Global scope\n\nfunction myFunction() {\n  const functionVar = "I am function-scoped"; // Function scope\n  console.log(globalVar);   // ✅ Can access global\n  console.log(functionVar); // ✅ Can access function\n}\n\nmyFunction();\nconsole.log(globalVar);   // ✅ Works\n// console.log(functionVar); // ❌ ReferenceError!`,
          explanation: "Global variables are accessible everywhere. Function variables are only accessible inside the function.",
          output: "I am global\nI am function-scoped\nI am global"
        },
        intermediate: {
          code: `// Scope chain — JS looks outward for variables\nconst city = "Mumbai"; // Global\n\nfunction outer() {\n  const country = "India"; // outer scope\n\n  function inner() {\n    const street = "MG Road"; // inner scope\n    // inner can access all outer scopes!\n    console.log(street);  // ✅ own scope\n    console.log(country); // ✅ outer scope\n    console.log(city);    // ✅ global scope\n  }\n\n  inner();\n  // console.log(street); // ❌ can't access inner\n}\n\nouter();`,
          explanation: "JS walks up the scope chain to find variables. Inner functions can access outer variables, but not vice versa.",
          output: "MG Road\nIndia\nMumbai"
        },
        realworld: {
          code: `// Module pattern — uses scope to hide implementation\nconst bankAccount = (function() {\n  let balance = 0; // PRIVATE — can't be accessed outside!\n\n  return {\n    deposit(amount) {\n      balance += amount;\n      console.log(\`Deposited ₹\${amount}. Balance: ₹\${balance}\`);\n    },\n    withdraw(amount) {\n      if (amount > balance) {\n        console.log("Insufficient funds!");\n        return;\n      }\n      balance -= amount;\n      console.log(\`Withdrawn ₹\${amount}. Balance: ₹\${balance}\`);\n    },\n    getBalance: () => balance\n  };\n})();\n\nbankAccount.deposit(1000);\nbankAccount.withdraw(300);\nconsole.log(bankAccount.getBalance());\n// console.log(balance); // ❌ ReferenceError — balance is private!`,
          explanation: "IIFE creates a private scope. balance is hidden inside. Only the returned methods can touch it — like a real bank!",
          output: "Deposited ₹1000. Balance: ₹1000\nWithdrawn ₹300. Balance: ₹700\n700"
        }
      },
      { type: "interview", questions: ["What is scope in JavaScript?", "What is the difference between global and local scope?", "What is the scope chain?", "What is block scope (let/const)?", "What is lexical scope?"] },
      { type: "summary", points: ["Scope = where variables can be accessed", "Global: everywhere. Function: inside function. Block: inside {}", "Scope chain: JS looks outward until found or ReferenceError", "let/const are block-scoped; var is function-scoped", "Lexical scope: scope determined by where code is written"] }
    ]
  },

  hoisting: {
    title: "Hoisting",
    emoji: "🏗️",
    sections: [
      { type: "intro", content: "Hoisting is JavaScript's behavior of **moving declarations to the top** of their scope before code runs. It's why you can call a function before writing it." },
      { type: "what", content: "During the **creation phase** of execution, JS scans your code and 'hoists' (moves to top) all function declarations and variable declarations. Only the **declaration** is hoisted — not the **value**." },
      {
        type: "code",
        title: "Hoisting Behavior",
        basic: {
          code: `// You can call a function BEFORE declaring it!\ngreet("Soyeb"); // ✅ Works! — "Hello Soyeb"\n\nfunction greet(name) {\n  console.log("Hello " + name);\n}\n\n// var is hoisted (but as undefined)\nconsole.log(x); // undefined (NOT an error)\nvar x = 5;\nconsole.log(x); // 5\n\n// let/const are hoisted but in TDZ (Temporal Dead Zone)\n// console.log(y); // ❌ ReferenceError!\nlet y = 10;`,
          explanation: "Function declarations are fully hoisted. var is hoisted as undefined. let/const are hoisted but in TDZ — accessing before declaration causes error.",
          output: "Hello Soyeb\nundefined\n5"
        },
        intermediate: {
          code: `// What JS actually does behind the scenes:\n// Before execution, code becomes:\n\n// --- HOISTED ---\nvar name;          // declaration hoisted (undefined)\nfunction sayHi() { // fully hoisted\n  console.log("Hi!");\n}\n// --- YOUR CODE runs after ---\nsayHi();           // Hi!\nconsole.log(name); // undefined\nname = "Soyeb";    // assignment stays here\nconsole.log(name); // Soyeb`,
          explanation: "JS engine does a two-pass: first pass hoists declarations, second pass executes code. Understanding this prevents confusing bugs.",
          output: "Hi!\nundefined\nSoyeb"
        },
        realworld: {
          code: `// Best practice: avoid hoisting confusion\n// ✅ Always declare before using\n\nconst PI = 3.14;  // const — no hoisting surprise\nconst area = calculateArea(5);\nconsole.log(area); // This works because function is declared below\n\n// Function declarations are fine to use before writing them\nfunction calculateArea(radius) {\n  return PI * radius * radius;\n}\n\n// ❌ Avoid: function expressions are NOT hoisted\n// const result = multiply(2, 3); // ReferenceError!\n// const multiply = (a, b) => a * b;`,
          explanation: "In real code: use const/let (not var) and declare functions before using them, except for function declarations which hoist fully.",
          output: "78.5"
        }
      },
      { type: "interview", questions: ["What is hoisting in JavaScript?", "What is the difference between var and let hoisting?", "What is the Temporal Dead Zone?", "Are function expressions hoisted?", "Why is var considered bad practice?"] },
      { type: "summary", points: ["Hoisting = JS moves declarations to top before running", "Function declarations: fully hoisted (can call before)", "var: hoisted as undefined (can cause subtle bugs)", "let/const: hoisted but in TDZ — access before declaration = error", "Best practice: always declare variables at the top"] }
    ]
  },

  "execution-context": {
    title: "Execution Context",
    emoji: "🧠",
    sections: [
      { type: "intro", content: "Execution Context is the **environment where JavaScript code runs**. Understanding it explains hoisting, scope, closures, and the 'this' keyword." },
      { type: "what", content: "Every time JS runs code, it creates an **Execution Context** — a container with everything needed to run that code:\n- **Variable Environment** — stores variables\n- **Scope Chain** — access to outer scopes\n- **this** — reference to current object" },
      {
        type: "concept",
        title: "Types of Execution Context",
        items: [
          { name: "Global Execution Context (GEC)", desc: "Created first when JS file loads. Only one exists. Creates: global object (window in browser, global in Node), 'this' = global object." },
          { name: "Function Execution Context (FEC)", desc: "Created every time a function is called. Each call creates a NEW context. Manages its own variables, arguments." },
          { name: "Eval Execution Context", desc: "Created when eval() is called. Avoid eval() — it's dangerous and slow." }
        ]
      },
      {
        type: "code",
        title: "Execution Context in Action",
        basic: {
          code: `// Two phases of execution:\n// PHASE 1: Creation Phase (hoisting)\n//   - Memory allocated for variables (undefined)\n//   - Function declarations stored completely\n//   - 'this' is set\n\n// PHASE 2: Execution Phase\n//   - Code runs line by line\n//   - Variables get their values\n\nconsole.log(a); // undefined (creation phase gave it undefined)\nvar a = 10;\nconsole.log(a); // 10 (execution phase set it)\n\nfunction show() {\n  console.log("Function runs in its own context!");\n}\nshow();`,
          explanation: "In Phase 1 (creation), a is declared as undefined. In Phase 2 (execution), a gets value 10 when that line runs.",
          output: "undefined\n10\nFunction runs in its own context!"
        },
        intermediate: {
          code: `// Call Stack — manages multiple execution contexts\nfunction first() {\n  console.log("Inside first()");\n  second();\n  console.log("Back in first()");\n}\n\nfunction second() {\n  console.log("Inside second()");\n  third();\n  console.log("Back in second()");\n}\n\nfunction third() {\n  console.log("Inside third()");\n}\n\nfirst();\n// Call Stack:\n// [GEC] → [first] → [second] → [third]\n// third pops → second pops → first pops → GEC`,
          explanation: "Call Stack is LIFO (Last In, First Out). Each function call pushes a new context. When function returns, it pops off.",
          output: "Inside first()\nInside second()\nInside third()\nBack in second()\nBack in first()"
        },
        realworld: { code: `// Stack overflow — too many function calls!\nfunction countdown(n) {\n  console.log(n);\n  if (n <= 0) return; // ← BASE CASE prevents overflow\n  countdown(n - 1); // recursive call\n}\n\ncountdown(5);\n// Without base case:\n// function forever() { forever(); }\n// forever(); // ❌ Maximum call stack size exceeded!`, explanation: "Recursive functions must have a base case or you'll overflow the call stack. This is why error says 'Maximum call stack size exceeded'.", output: "5\n4\n3\n2\n1\n0" }
      },
      { type: "interview", questions: ["What is an execution context?", "What happens during the creation phase?", "What is the call stack?", "What is a stack overflow?", "How many global execution contexts can there be?"] },
      { type: "summary", points: ["Every code runs inside an execution context", "2 phases: Creation (hoisting) → Execution (running code)", "Call Stack: LIFO structure managing all contexts", "Global EC: created first, 'this' = window/global", "Function EC: created per call, has own variables"] }
    ]
  },

  closures: {
    title: "Closures",
    emoji: "🔒",
    sections: [
      { type: "intro", content: "A closure is when a function **remembers the variables from where it was created**, even after the outer function has finished. It's one of the most powerful and important JavaScript concepts." },
      { type: "what", content: "A closure is a function that has access to its **outer function's scope** even after the outer function has returned. The inner function 'closes over' the variables." },
      {
        type: "code",
        title: "Closures Explained",
        basic: {
          code: `function outer() {\n  let count = 0; // outer variable\n\n  function inner() {\n    count++; // inner accesses outer's variable!\n    console.log("Count:", count);\n  }\n\n  return inner; // return the function\n}\n\nconst counter = outer(); // outer() finishes, but...\ncounter(); // Count: 1 — inner still remembers count!\ncounter(); // Count: 2 — count persists!\ncounter(); // Count: 3\n\n// count is NOT accessible from outside\n// console.log(count); // ❌ ReferenceError`,
          explanation: "Even after outer() finishes, the inner function still remembers and can modify count. This is a closure!",
          output: "Count: 1\nCount: 2\nCount: 3"
        },
        intermediate: {
          code: `// Closure factory — creates custom functions\nfunction multiplier(factor) {\n  return (number) => number * factor; // closure over 'factor'\n}\n\nconst double = multiplier(2);\nconst triple = multiplier(3);\nconst times10 = multiplier(10);\n\nconsole.log(double(5));  // 10\nconsole.log(triple(5));  // 15\nconsole.log(times10(5)); // 50\n\n// Each function remembers its own 'factor'!`,
          explanation: "Each call to multiplier() creates a new closure with its own factor. This is the factory pattern.",
          output: "10\n15\n50"
        },
        realworld: {
          code: `// Real app: Private counter (like page views)\nfunction createCounter(startValue = 0, step = 1) {\n  let count = startValue;\n\n  return {\n    increment() { count += step; return count; },\n    decrement() { count -= step; return count; },\n    reset()     { count = startValue; return count; },\n    getCount()  { return count; }\n  };\n}\n\nconst likes = createCounter(100, 1);\nconst views = createCounter(1000, 10);\n\nconsole.log(likes.increment()); // 101\nconsole.log(likes.increment()); // 102\nconsole.log(views.increment()); // 1010\nconsole.log(likes.getCount()); // 102\nconsole.log(views.getCount()); // 1010`,
          explanation: "Each counter has its own private count variable via closure. Like/views counters are independent. Used in real apps for tracking.",
          output: "101\n102\n1010\n102\n1010"
        }
      },
      { type: "interview", questions: ["What is a closure?", "Give a practical use case for closures.", "What is a closure factory?", "How do closures relate to scope?", "What is the classic closure-in-loop bug?"] },
      { type: "summary", points: ["Closure: inner function remembers outer function's variables", "Even after outer function returns, inner can access those variables", "Use cases: private data, factory functions, memoization, event handlers", "Every function in JS creates a closure", "Closures are the foundation of React hooks!"] }
    ]
  },

  arrays: {
    title: "Arrays",
    emoji: "📋",
    sections: [
      { type: "intro", content: "Arrays are **ordered lists** of items. Think of a shopping list — it has items in order, numbered from 0. Arrays store multiple values in one variable." },
      {
        type: "code",
        title: "Array Basics & Methods",
        basic: {
          code: `// Create arrays\nconst fruits = ["Apple", "Mango", "Banana"];\nconst numbers = [1, 2, 3, 4, 5];\nconst mixed = ["hello", 42, true, null];\n\n// Access elements (0-indexed)\nconsole.log(fruits[0]);  // "Apple" (first)\nconsole.log(fruits[2]);  // "Banana" (third)\nconsole.log(fruits.length); // 3\n\n// Add / Remove\nfruits.push("Orange");   // Add to END\nfruits.pop();            // Remove from END\nfruits.unshift("Grape"); // Add to BEGINNING\nfruits.shift();          // Remove from BEGINNING`,
          explanation: "Arrays are 0-indexed (first item is index 0). push/pop for end. unshift/shift for beginning.",
          output: "Apple\nBanana\n3"
        },
        intermediate: {
          code: `const nums = [3, 1, 4, 1, 5, 9, 2, 6];\n\n// map — transform each element\nconst doubled = nums.map(n => n * 2);\nconsole.log(doubled); // [6,2,8,2,10,18,4,12]\n\n// filter — keep matching elements\nconst big = nums.filter(n => n > 4);\nconsole.log(big); // [5, 9, 6]\n\n// reduce — combine to single value\nconst total = nums.reduce((sum, n) => sum + n, 0);\nconsole.log(total); // 31\n\n// find — first matching element\nconst found = nums.find(n => n > 4);\nconsole.log(found); // 5\n\n// sort\nconsole.log([...nums].sort((a,b) => a - b));\n// [1,1,2,3,4,5,6,9]`,
          explanation: "map creates new array. filter keeps items. reduce condenses. find returns first match. sort mutates — use spread to avoid.",
          output: "[6,2,8,2,10,18,4,12]\n[5,9,6]\n31\n5\n[1,1,2,3,4,5,6,9]"
        },
        realworld: {
          code: `// Real app: Product catalog operations\nconst products = [\n  { id: 1, name: "Laptop",   price: 60000, category: "electronics", inStock: true },\n  { id: 2, name: "T-Shirt",  price: 500,   category: "clothing",     inStock: true },\n  { id: 3, name: "Phone",    price: 25000, category: "electronics",  inStock: false},\n  { id: 4, name: "Sneakers", price: 3000,  category: "clothing",     inStock: true },\n];\n\n// Get in-stock electronics under ₹50000\nconst results = products\n  .filter(p => p.inStock)\n  .filter(p => p.category === "electronics")\n  .filter(p => p.price < 50000)\n  .map(p => ({ name: p.name, price: \`₹\${p.price}\` }));\n\nconsole.log(results);\n// [{ name: "Phone", price: "₹25000" }]`,
          explanation: "Real apps chain array methods. Each filter/map returns a new array. This pattern is used in every e-commerce search filter.",
          output: '[{ name: "Phone", price: "₹25000" }]'
        }
      },
      { type: "interview", questions: ["What is the difference between map, filter, and reduce?", "How do you remove duplicates from an array?", "How does sort() work with numbers?", "What does flat() do?", "How do you copy an array without mutation?"] },
      { type: "summary", points: ["Arrays: ordered lists, 0-indexed", "push/pop: end. unshift/shift: beginning. splice: anywhere", "map: transform. filter: select. reduce: combine. find: first match", "sort() mutates — use [...arr].sort() to avoid", "Array.from(), spread [...arr]: create copies"] }
    ]
  },

  objects: {
    title: "Objects",
    emoji: "🗂️",
    sections: [
      { type: "intro", content: "Objects store data as **key-value pairs** — like a dictionary or a form. Instead of having 5 separate variables for one person, put everything in one object." },
      {
        type: "code",
        title: "Objects in Action",
        basic: {
          code: `// Create an object\nconst user = {\n  name: "Soyeb",\n  age: 22,\n  city: "Mumbai",\n  isStudent: true,\n  greet() {\n    return \`Hi! I'm \${this.name}\`;\n  }\n};\n\n// Access properties\nconsole.log(user.name);        // "Soyeb" (dot notation)\nconsole.log(user["city"]);     // "Mumbai" (bracket notation)\nconsole.log(user.greet());     // "Hi! I'm Soyeb"\n\n// Add / Update / Delete\nuser.email = "soyeb@mail.com"; // add new property\nuser.age = 23;                 // update\ndelete user.isStudent;         // delete\nconsole.log(user);`,
          explanation: "Dot notation: user.name. Bracket notation: user['name'] (needed for dynamic keys). Methods inside objects use 'this' to refer to the object.",
          output: "Soyeb\nMumbai\nHi! I'm Soyeb\n{name:'Soyeb',age:23,city:'Mumbai',email:'soyeb@mail.com',greet:[Function]}"
        },
        intermediate: {
          code: `// Object methods\nconst car = { make: "Toyota", model: "Camry", year: 2023 };\n\nconsole.log(Object.keys(car));    // ["make","model","year"]\nconsole.log(Object.values(car));  // ["Toyota","Camry",2023]\nconsole.log(Object.entries(car)); // [["make","Toyota"],...]\n\n// Object spread — copy & merge\nconst updated = { ...car, color: "Blue", year: 2024 };\nconsole.log(updated);\n// { make:"Toyota", model:"Camry", year:2024, color:"Blue" }\n\n// Check if property exists\nconsole.log("make" in car);  // true\nconsole.log("color" in car); // false`,
          explanation: "Object.keys/values/entries iterate. Spread copies and merges objects — later properties override earlier ones.",
          output: '["make","model","year"]\n["Toyota","Camry",2023]\n[["make","Toyota"],["model","Camry"],["year",2023]]\n{make:"Toyota",model:"Camry",year:2024,color:"Blue"}\ntrue\nfalse'
        },
        realworld: {
          code: `// Real app: User management system\nconst createUser = (name, email, role = "user") => ({\n  id: Date.now(),\n  name,\n  email,\n  role,\n  createdAt: new Date().toISOString(),\n  isActive: true,\n  permissions: role === "admin"\n    ? ["read", "write", "delete"]\n    : ["read"]\n});\n\nconst admin = createUser("Soyeb", "soyeb@site.com", "admin");\nconst regular = createUser("Alice", "alice@site.com");\n\nconsole.log(admin.permissions);   // ["read","write","delete"]\nconsole.log(regular.permissions); // ["read"]\nconsole.log(admin.role);          // "admin"`,
          explanation: "Factory function creates user objects. Shorthand property names (name, email), computed properties. Used in real user management systems.",
          output: '["read","write","delete"]\n["read"]\n"admin"'
        }
      },
      { type: "interview", questions: ["What is an object in JavaScript?", "What is the difference between dot and bracket notation?", "How do you copy an object without mutation?", "What does Object.keys() return?", "What is shorthand property syntax?"] },
      { type: "summary", points: ["Objects: key-value pairs (like dictionaries)", "Access: obj.key or obj['key']", "Object.keys/values/entries — iterate objects", "Spread {...obj} — copy/merge objects", "Methods in objects use 'this' to refer to the object"] }
    ]
  },

  destructuring: {
    title: "Destructuring",
    emoji: "📤",
    sections: [
      { type: "intro", content: "Destructuring lets you **unpack values from arrays or objects** into separate variables in one line — much cleaner than accessing each property separately." },
      {
        type: "code",
        title: "Array & Object Destructuring",
        basic: {
          code: `// Object Destructuring\nconst user = { name: "Soyeb", age: 22, city: "Mumbai" };\n\nconst { name, age, city } = user;\nconsole.log(name); // "Soyeb"\nconsole.log(age);  // 22\n\n// Rename while destructuring\nconst { name: userName, age: userAge } = user;\nconsole.log(userName); // "Soyeb"\n\n// Default values\nconst { role = "user", name: n } = user;\nconsole.log(role); // "user" (default — not in object)\n\n// Array Destructuring\nconst [first, second, , fourth] = [10, 20, 30, 40];\nconsole.log(first);  // 10\nconsole.log(second); // 20\nconsole.log(fourth); // 40 (skipped index 2)`,
          explanation: "Object destructuring: match by KEY name. Array destructuring: match by POSITION. Use , to skip elements. Use = for defaults.",
          output: "Soyeb\n22\nSoyeb\nuser\n10\n20\n40"
        },
        intermediate: {
          code: `// Nested destructuring\nconst student = {\n  name: "Ali",\n  scores: { math: 95, english: 88 },\n  address: { city: "Delhi", state: "Delhi" }\n};\n\nconst { name, scores: { math }, address: { city } } = student;\nconsole.log(name, math, city); // Ali 95 Delhi\n\n// Destructuring in function parameters\nfunction displayUser({ name, age = 25, role = "user" }) {\n  console.log(\`\${name} | \${age} | \${role}\`);\n}\n\ndisplayUser({ name: "Soyeb", age: 22 });\ndisplayUser({ name: "Admin", role: "admin" });`,
          explanation: "Nested destructuring goes deep into objects. Function parameter destructuring is very common in React (props destructuring).",
          output: "Ali 95 Delhi\nSoyeb | 22 | user\nAdmin | 25 | admin"
        },
        realworld: {
          code: `// Real app: API response destructuring\nconst apiResponse = {\n  status: 200,\n  data: {\n    user: { id: 1, name: "Soyeb", email: "s@mail.com" },\n    posts: [{ id: 1, title: "JS Tips" }, { id: 2, title: "CSS Tricks" }]\n  },\n  meta: { page: 1, total: 50 }\n};\n\nconst {\n  status,\n  data: { user: { name, email }, posts: [firstPost] },\n  meta: { page, total }\n} = apiResponse;\n\nconsole.log(status);           // 200\nconsole.log(\`\${name} <\${email}>\`); // "Soyeb <s@mail.com>"\nconsole.log(firstPost.title);  // "JS Tips"\nconsole.log(\`Page \${page}/\${Math.ceil(total/10)}\`); // "Page 1/5"`,
          explanation: "Real apps destructure complex API responses. This is used in every React, Vue, and Node.js project when handling API data.",
          output: "200\nSoyeb <s@mail.com>\nJS Tips\nPage 1/5"
        }
      },
      { type: "interview", questions: ["What is destructuring?", "How do you destructure nested objects?", "How do you set default values in destructuring?", "What is the difference between array and object destructuring?", "How does destructuring work in function parameters?"] },
      { type: "summary", points: ["Destructuring: extract values into variables cleanly", "Object: match by key name. Array: match by position", "Rename: const { name: newName } = obj", "Defaults: const { role = 'user' } = obj", "Very common in React (props, state, API responses)"] }
    ]
  },

  "spread-rest": {
    title: "Spread & Rest Operators",
    emoji: "✨",
    sections: [
      { type: "intro", content: "Both use **... (three dots)** but do opposite things! **Spread** expands items out. **Rest** collects items together." },
      {
        type: "code",
        title: "Spread & Rest",
        basic: {
          code: `// SPREAD — expand array/object into individual items\nconst nums = [1, 2, 3];\nconst moreNums = [...nums, 4, 5, 6];\nconsole.log(moreNums); // [1,2,3,4,5,6]\n\n// Spread to copy arrays\nconst copy = [...nums];\ncopy.push(99);\nconsole.log(nums);  // [1,2,3] — original unchanged!\nconsole.log(copy);  // [1,2,3,99]\n\n// Spread objects\nconst user = { name: "Soyeb", age: 22 };\nconst updated = { ...user, age: 23, city: "Mumbai" };\nconsole.log(updated); // {name:"Soyeb",age:23,city:"Mumbai"}`,
          explanation: "Spread (...) unpacks items. Great for copying arrays/objects without mutation and merging them.",
          output: "[1,2,3,4,5,6]\n[1,2,3]\n[1,2,3,99]\n{name:'Soyeb',age:23,city:'Mumbai'}"
        },
        intermediate: {
          code: `// REST — collect multiple values into array\nfunction sum(...numbers) { // rest parameter\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sum(1,2,3));        // 6\nconsole.log(sum(1,2,3,4,5));    // 15\n\n// Rest in destructuring\nconst [first, second, ...remaining] = [10,20,30,40,50];\nconsole.log(first);     // 10\nconsole.log(second);    // 20\nconsole.log(remaining); // [30,40,50]\n\nconst { name, ...otherDetails } = { name:"Soyeb", age:22, city:"Mumbai" };\nconsole.log(name);         // "Soyeb"\nconsole.log(otherDetails); // {age:22, city:"Mumbai"}`,
          explanation: "Rest (...) collects remaining items. Must be LAST in destructuring. Unlike spread which expands, rest collects.",
          output: "6\n15\n10\n20\n[30,40,50]\nSoyeb\n{age:22,city:'Mumbai'}"
        },
        realworld: {
          code: `// Real app: Merge user profile updates\nfunction updateProfile(existingUser, ...updates) {\n  // Spread: merge all updates onto existing user\n  return updates.reduce(\n    (user, update) => ({ ...user, ...update }),\n    existingUser\n  );\n}\n\nconst user = { id: 1, name: "Soyeb", age: 22, city: "Mumbai" };\nconst updated = updateProfile(\n  user,\n  { age: 23 },\n  { city: "Pune" },\n  { email: "new@mail.com" }\n);\nconsole.log(updated);\n// {id:1, name:"Soyeb", age:23, city:"Pune", email:"new@mail.com"}`,
          explanation: "Real app pattern: collect multiple update objects (rest), then spread each onto user object. Used in Redux reducers and API updates.",
          output: "{id:1,name:'Soyeb',age:23,city:'Pune',email:'new@mail.com'}"
        }
      },
      { type: "interview", questions: ["What is the difference between spread and rest?", "How do you merge two objects?", "How do you copy an array without mutation?", "Where must the rest parameter be placed?", "Can you spread a string?"] },
      { type: "summary", points: ["Both use ... (three dots)", "Spread: expands array/object into individual items", "Rest: collects multiple items into an array", "Spread: copy arrays ([...arr]), merge objects ({...a,...b})", "Rest: must be last parameter. Accepts any number of args"] }
    ]
  }
};

export default content;
