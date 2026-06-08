export const quests = {
  // ──────────────────────────────────────────────────────
  // CHAPTER 1: Variables
  // ──────────────────────────────────────────────────────
  intro: {
    id: "intro",
    title: "Chapter 1: The Outpost of Variables",
    levels: [
      {
        levelId: "1.1",
        title: "The First Step",
        story: "Welcome to the Magic Sandbox! Sensei says: 'Program the robot to move 2 steps forward using a variable.'",
        conceptHtml: "A <strong>variable</strong> is a box that stores data.<br>Use <code>let</code> to create one.",
        starterCode: "// Create a variable 'steps' and set it to 2\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Aray bhai! Swagat hai JavaScript Dojo mein! 🌟 main hoon tumhara Sensei. JavaScript ek magic wand hai jisse hum web apps aur robots ko life dete hain. Chalo sabse pehle **Variables** seekhte hain! Variable ek simple box ki tarah hai jismein hum data store karte hain. Hum `let` keyword ka use karte hain naya box banane ke liye. Jaise: `let toy = 'car';` iska matlab humne ek box banaya jiska naam `toy` hai aur usme `'car'` store kar diya!"
          },
          {
            type: "fill-blank",
            question: "Complete the spell to create a box named 'steps' and store the number 2 inside it:",
            code: "______ steps = 2;",
            blankValue: "let",
            options: ["let", "box", "create"],
            hint: "Naya variable box banane ke liye hum humesha 'let' keyword use karte hain!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not found. Try: let steps = 2;" };
          if (val !== 2) return { ok: false, msg: "Robot needs exactly 2 steps, but you gave " + val };
          return { ok: true, msg: "Correct! Moving 2 steps.", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "1.2",
        title: "The Long Path",
        story: "Sensei points to a longer path. 'Now, how many steps does the robot need to reach the star?'",
        conceptHtml: "Count the grey squares from the robot to the star. Update your variable!",
        starterCode: "// Set 'steps' to the correct number\nlet steps = 0;\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Great job! Ek baar jab hum variable box bana lete hain (`let steps = 0;`), toh hum uski value bad mein badal sakte hain! Value update karne ke liye hume phir se `let` likhne ki zaroorat nahi padti. Jaise:\n`let score = 0;` (box banaya)\n`score = 10;` (box mein value badal kar 10 kar di!)"
          },
          {
            type: "quiz",
            question: "Agar humare paas box hai: `let gold = 5;` aur fir hum likhte hain `gold = 20;`, toh gold ki final value kya hogi?",
            options: ["5", "20", "25"],
            answer: "20",
            hint: "Value overwrite hokar latest value ban jayegi, jo ki 20 hai!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','player','path','path','path','goal','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 9, goalIdx: 13
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not found." };
          if (val !== 4) return { ok: false, msg: "Hint: The star is 4 steps away." };
          return { ok: true, msg: "Perfect!", data: { path: [9, 10, 11, 12, 13] } };
        }
      },
      {
        levelId: "1.3",
        title: "Naming Your Robot",
        story: "Sensei asks: 'What is the robot's name? Use a string (text in quotes) to name it ROBO.'",
        conceptHtml: "A <strong>string</strong> is text surrounded by quotes: <code>let name = \"Alice\";</code>",
        starterCode: "// Create a variable 'robotName' and set it to \"ROBO\"\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Perfect! Variables mein hum sirf numbers hi nahi, balki text bhi store kar sakte hain. Text ko programming mein **String** kehte hain. Strings ko humesha quotes (jaise `\"Hello\"` ya `'ROBO'`) ke andar likhna padta hai, taaki computer samajh sake ki yeh text hai, code commands nahi!"
          },
          {
            type: "quiz",
            question: "Inmein se kaun sa sahi string variable declaration hai robot ke name 'PIKACHU' ke liye?",
            options: ["let name = PIKACHU;", "let name = 'PIKACHU';", "let name = 123;"],
            answer: "let name = 'PIKACHU';",
            hint: "String ko humesha quotes (' ya \") ke andar lapetna zaroori hai!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','wall','wall','player','goal','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 11, goalIdx: 12
        },
        returnExpr: "try { return (typeof robotName !== 'undefined') ? robotName : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'robotName' not found." };
          if (val !== "ROBO") return { ok: false, msg: "The name must be exactly \"ROBO\" (with quotes)." };
          return { ok: true, msg: "Hello ROBO!", data: { path: [11, 12] } };
        }
      },
      {
        levelId: "1.4",
        title: "Math Magic",
        story: "'You can use math in JavaScript!' says Sensei. 'Add 3 and 2 together inside a variable to open the gate.'",
        conceptHtml: "You can use <code>+</code> to add numbers: <code>let sum = 5 + 5;</code>",
        starterCode: "// Create a variable 'key' and set it to 3 + 2\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum variables ke andar direct math calculations bhi kar sakte hain! Jaise `+` (add), `-` (subtract), `*` (multiply), ya `/` (divide). Jaise:\n`let total = 2 + 3;` (is box mein 5 store hoga!)\nJavaScript pehle calculations solve karta hai aur fir answer ko box mein store karta hai."
          },
          {
            type: "fill-blank",
            question: "Complete the spell to add 10 and 20 together inside a variable named 'total':",
            code: "let total = 10 ______ 20;",
            blankValue: "+",
            options: ["+", "-", "*"],
            hint: "Numbers ko add karne ke liye plus '+' sign ka use karo."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','path','gate-locked','treasure','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, gateIdx: 11, treasureIdx: 12
        },
        returnExpr: "try { return (typeof key !== 'undefined') ? key : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'key' not found." };
          if (val !== 5) return { ok: false, msg: "Hmm, 3 + 2 is 5. Make sure key equals 5!" };
          return { ok: true, msg: "Gate Unlocked!", data: { gate: true, path: [8, 9, 10, 11, 12] } };
        }
      }
    ]
  },
  
  // ──────────────────────────────────────────────────────
  // CHAPTER 2: If/Else
  // ──────────────────────────────────────────────────────
  ifelse: {
    id: "ifelse",
    title: "Chapter 2: The Twin Gates",
    levels: [
      {
        levelId: "2.1",
        title: "Choosing Paths",
        story: "Sensei: 'Two paths! If the password is correct, go right. Else, go left.'",
        conceptHtml: "Use <code>if (condition)</code> to make decisions.",
        starterCode: "let pass = 'open';\nlet direction;\n\n// If pass is 'open', set direction to 'right'\n// Else, set direction to 'left'\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Chapter 2 shuru ho gaya bhai! 🔀 `if/else` statement se humara robot choices bana sakta hai. Agar condition true hai toh block A chalega, nahi toh block B chalega. Jaise: Agar bahar dhoop hai toh sunglasses pehno, nahi toh chashma mat pehno!"
          },
          {
            type: "fill-blank",
            question: "Complete the if/else structure below:",
            code: "if (sky === 'cloudy') { \n  rain = true; \n} ______ { \n  rain = false; \n}",
            blankValue: "else",
            options: ["else", "if", "let"],
            hint: "If block ke baad jab alternative block dena ho toh 'else' keyword likha jata hai."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wrong','path','path','player','path','path','right','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 3, goalIdx: 6, wrongIdx: 0
        },
        returnExpr: "try { return (typeof direction !== 'undefined') ? direction : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'direction' not set." };
          if (val !== "right") return { ok: false, msg: "You went the wrong way! It should be 'right'." };
          return { ok: true, msg: "Correct path!", data: { path: [3, 4, 5, 6] } };
        }
      },
      {
        levelId: "2.2",
        title: "The Locked Door",
        story: "Sensei: 'The door is locked! You only have the silver key. Write an if/else to check if key === \"gold\".'",
        conceptHtml: "Use <code>===</code> to check if two things are exactly the same.",
        starterCode: "let key = 'silver';\nlet unlock;\n\n// If key is 'gold', unlock = true;\n// Else, unlock = false;\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Decisions lene ke liye hum values ko compare karte hain. JavaScript mein do cheezon ko exactly compare karne ke liye triple equals `===` operator ka use hota hai. Jaise: `key === 'gold'` yeh check karta hai ki `key` variable ki value 'gold' ke barabar hai ya nahi."
          },
          {
            type: "quiz",
            question: "JavaScript mein check karne ke liye ki do values barabar hain ya nahi, kaun sa symbol lagate hain?",
            options: ["=", "==", "==="],
            answer: "===",
            hint: "JS mein '=' variable assign karne ke liye hota hai, jabki '===' comparison ke liye!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','gate-locked','treasure','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, gateIdx: 9, treasureIdx: 10
        },
        returnExpr: "try { return (typeof unlock !== 'undefined') ? unlock : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'unlock' not set." };
          if (val === true) return { ok: false, msg: "Wait, you only have the 'silver' key! unlock should be false." };
          return { ok: true, msg: "Correct, it stays locked because you don't have gold.", data: { path: [8] } };
        }
      },
      {
        levelId: "2.3",
        title: "Finding the Gold Key",
        story: "Sensei: 'Ah, you found the gold key! Change the key variable and run the check again!'",
        conceptHtml: "Change the variable so the <code>if</code> condition becomes true.",
        starterCode: "let key = 'gold'; // We changed it!\nlet unlock;\n\n// Write the same if/else here\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Agar condition match karti hai, toh `if` block wala code chalta hai. Aur agar nahi match karti, toh automatic `else` block wala code chalta hai. Chalo ise test karte hain!"
          },
          {
            type: "quiz",
            question: "Agar hum likhein:\n`let key = 'silver';` \n`if (key === 'gold') { unlock = true; } else { unlock = false; }` \nIsme 'unlock' variable ki value kya hogi?",
            options: ["true", "false", "undefined"],
            answer: "false",
            hint: "Key ki value 'silver' hai, jo 'gold' ke barabar nahi hai. Isliye else block chalega aur unlock ki value false ho jayegi!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','gate-locked','treasure','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, gateIdx: 9, treasureIdx: 10
        },
        returnExpr: "try { return (typeof unlock !== 'undefined') ? unlock : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'unlock' not set." };
          if (val === false) return { ok: false, msg: "You have the gold key now! unlock should be true." };
          return { ok: true, msg: "Gate Unlocked!", data: { gate: true, path: [8, 9, 10] } };
        }
      },
      {
        levelId: "2.4",
        title: "The Greater Power",
        story: "Sensei: 'You need enough power to push the boulder. Is power > 50?'",
        conceptHtml: "You can use <code>></code> (greater than) or <code><</code> (less than).",
        starterCode: "let power = 100;\nlet canPush;\n\n// If power is greater than 50, canPush = true\n\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum equals (`===`) ke alawa do numbers ko comparison operators se check kar sakte hain, jaise greater than (`>`) ya less than (`<`). Jaise:\n`let speed = 60;` \n`if (speed > 50) { fast = true; }` (yahan 60, 50 se bada hai, isliye fast variable true ho jayega!)"
          },
          {
            type: "quiz",
            question: "Kaun sa statement checks karta hai ki variable 'power' ki value 10 se badi hai?",
            options: ["power > 10", "power < 10", "power === 10"],
            answer: "power > 10",
            hint: "Greater than ke liye '>' sign use kiya jata hai."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return (typeof canPush !== 'undefined') ? canPush : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'canPush' not set." };
          if (val !== true) return { ok: false, msg: "Power is 100, which is > 50! canPush should be true." };
          return { ok: true, msg: "Boulder pushed!", data: { path: [8, 9, 10] } };
        }
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 3: Functions
  // ──────────────────────────────────────────────────────
  functions: {
    id: "functions",
    title: "Chapter 3: The Factory of Functions",
    levels: [
      {
        levelId: "3.1",
        title: "Your First Spell",
        story: "Sensei ARITY appears: 'A function is a reusable spell. Define a function called `openGate` that returns 42.'",
        conceptHtml: "A <strong>function</strong> groups code together.<br><code>function name() { return value; }</code>",
        starterCode: "// Define function openGate that returns 42\n\n\n// Let's test it\nlet key = openGate();",
        learningSteps: [
          {
            type: "dialogue",
            text: "Chapter 3! Functions shuru karte hain bhai. ⚙️ Function ek re-usable magic spell scroll ki tarah hota hai. Tum iske andar code likh kar pack kar dete ho aur usko ek naam de dete ho. Jab bhi tumhe woh spell chalana ho, tum bas uske naam se use call karte ho! Vibe like: `function spellName() { return 42; }`"
          },
          {
            type: "fill-blank",
            question: "Complete the definition of the function hello that sends back 'world':",
            code: "function hello() { \n  ______ 'world'; \n}",
            blankValue: "return",
            options: ["return", "let", "give"],
            hint: "Function se value wapas bhejne ke liye 'return' keyword ka use karte hain."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','gate-locked','treasure','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, gateIdx: 10, treasureIdx: 11
        },
        returnExpr: "try { return (typeof key !== 'undefined') ? key : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Did you call the function and save it to 'key'?" };
          if (val !== 42) return { ok: false, msg: "Your function needs to return exactly 42." };
          return { ok: true, msg: "Spell cast! Gate opening!", data: { gate: true, path: [8, 9, 10, 11] } };
        }
      },
      {
        levelId: "3.2",
        title: "Parameters (Spell Ingredients)",
        story: "Sensei: 'Functions can take ingredients, called Parameters! Pass the number 5 into the function to move 5 steps.'",
        conceptHtml: "Put variables inside the parentheses: <code>function move(steps) { return steps; }</code>",
        starterCode: "function getSteps(amount) {\n  return amount;\n}\n\n// Call getSteps with the number 5 and save it to 'steps'\nlet steps = ",
        learningSteps: [
          {
            type: "dialogue",
            text: "Functions inputs bhi le sakte hain! In inputs ko hum programming mein **Parameters** kehte hain. Yeh tumhare spell ke ingredients ki tarah hain! Jaise: `function double(num) { return num * 2; }` yahan `num` ek parameter hai jo function ke andar use hota hai."
          },
          {
            type: "quiz",
            question: "Agar humare paas function hai: `function multiply(x) { return x * 10; }`, aur hum call karte hain `multiply(3)`, toh output kya hoga?",
            options: ["30", "13", "10"],
            answer: "30",
            hint: "Function x ki jagah 3 lega, aur 3 * 10 calculate karke 30 return karega!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','path','path','path','goal','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 13
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not set." };
          if (val !== 5) return { ok: false, msg: "You need exactly 5 steps. Did you pass 5 into getSteps?" };
          return { ok: true, msg: "Passed the ingredient perfectly!", data: { path: [8, 9, 10, 11, 12, 13] } };
        }
      },
      {
        levelId: "3.3",
        title: "Math Function",
        story: "Sensei: 'Now create a function that takes TWO numbers and adds them together! We need 7 steps.'",
        conceptHtml: "Functions can have multiple parameters: <code>function add(a, b) { return a + b; }</code>",
        starterCode: "function add(a, b) {\n  // return a plus b\n  \n}\n\n// Call add(3, 4) and save to 'steps'\nlet steps = ",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum functions ke andar ek se zyada parameters bhi de sakte hain, commas `,` ka use karke! Jaise:\n`function add(a, b) { return a + b; }` \nJab hum `add(10, 5)` call karenge toh a=10 aur b=5 ho jayega aur output 15 aayega."
          },
          {
            type: "fill-blank",
            question: "Complete the parameters to separate 'height' and 'width':",
            code: "function area(width ______ height) { \n  return width * height; \n}",
            blankValue: ",",
            options: [",", "+", "let"],
            hint: "Parameters ko separate karne ke liye hum comma ',' ka use karte hain."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','path','path','path','path','path','goal',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 15
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not set." };
          if (val !== 7) return { ok: false, msg: "The add function didn't return 7. Check your math!" };
          return { ok: true, msg: "Math successful!", data: { path: [8, 9, 10, 11, 12, 13, 14, 15] } };
        }
      },
      {
        levelId: "3.4",
        title: "Function Scope",
        story: "Sensei: 'Variables created inside a function stay inside the function. Return the secret!'",
        conceptHtml: "This is called <strong>Scope</strong>. You can't access inner variables from the outside.",
        starterCode: "function getSecret() {\n  let secret = 'diamond';\n  // return the secret variable here\n  \n}\n\nlet myTreasure = getSecret();",
        learningSteps: [
          {
            type: "dialogue",
            text: "Ek baat yaad rakhna bhai! Jo variables hum function ke andar banate hain, woh function ke andar hi rehte hain. Unhe bahar se koi access nahi kar sakta. Ise hum **Scope** kehte hain. Local variables function khatam hote hi gayab ho jate hain!"
          },
          {
            type: "quiz",
            question: "Agar humare paas function hai: `function show() { let x = 5; }`, toh kya hum function ke bahar se x ko print kar sakte hain?",
            options: ["Nahi, x sirf function ke andar hi readable hai", "Haan, pure code mein kahin se bhi access kar sakte hain"],
            answer: "Nahi, x sirf function ke andar hi readable hai",
            hint: "Function ke andar ke variables private / local scope wale hote hain."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','player','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 9, goalIdx: 10
        },
        returnExpr: "try { return (typeof myTreasure !== 'undefined') ? myTreasure : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'myTreasure' not set." };
          if (val !== 'diamond') return { ok: false, msg: "You didn't return the secret string 'diamond'." };
          return { ok: true, msg: "Secret retrieved!", data: { path: [9, 10] } };
        }
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 4: Arrays
  // ──────────────────────────────────────────────────────
  arrays: {
    id: "arrays",
    title: "Chapter 4: The Array Archipelago",
    levels: [
      {
        levelId: "4.1",
        title: "The Item Bag",
        story: "Sensei: 'You have many items. Put them in an Array so you don't lose them! Create an array with \"sword\" and \"shield\".'",
        conceptHtml: "An <strong>Array</strong> is a list of items inside square brackets: <code>let list = [1, 2, 3];</code>",
        starterCode: "let inventory = []; // Add \"sword\" and \"shield\" inside the brackets\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Chapter 4 shuru! Arrays seekhenge. 🏝️ Socho tumhare paas ek bag hai jismein tum bohot saare items rakhna chahte ho. Bajaye 10 alag boxes banane ke, tum ek hi **Array** (list) bana lete ho square brackets `[ ]` ka use karke! Jaise:\n`let backpack = ['water', 'sword', 'shield'];`"
          },
          {
            type: "quiz",
            question: "Inmein se kaun sa syntax sahi tareeke se ek array banata hai?",
            options: ["['potion', 'key']", "{'potion', 'key'}", "('potion', 'key')"],
            answer: "['potion', 'key']",
            hint: "Arrays ko humesha square brackets [ ] ke andar likha jata hai."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return Array.isArray(inventory) ? inventory : null; } catch(e) { return null; }",
        validate: (val) => {
          if (!val) return { ok: false, msg: "Variable 'inventory' not found or is not an array." };
          if (val.length !== 2 || val[0] !== 'sword' || val[1] !== 'shield') return { ok: false, msg: "Array must contain exactly 'sword' and 'shield'." };
          return { ok: true, msg: "Inventory secured!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "4.2",
        title: "Array Indexing",
        story: "Sensei: 'Computers start counting at ZERO. Grab the \"potion\" from the bag! It is the 2nd item.'",
        conceptHtml: "Get an item using its position (index): <code>let first = list[0];</code>",
        starterCode: "let bag = ['sword', 'potion', 'map'];\n\n// Get 'potion' which is at index 1\nlet item = ",
        learningSteps: [
          {
            type: "dialogue",
            text: "Computers count karna 0 se shuru karte hain! Array ke pehle item ki position (index) 0 hoti hai, dusre ki 1, teesre ki 2, aur aise hi chalta rehta hai. Jaise: `let list = ['apple', 'banana'];` mein `list[0]` apple hai aur `list[1]` banana!"
          },
          {
            type: "quiz",
            question: "Agar humare paas array hai: `let weapons = ['sword', 'potion', 'shield'];`, toh weapons[1] kya hoga?",
            options: ["'sword'", "'potion'", "'shield'"],
            answer: "'potion'",
            hint: "Index 0 par 'sword' hai, index 1 par 'potion' aur index 2 par 'shield'!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return (typeof item !== 'undefined') ? item : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'item' not set." };
          if (val !== 'potion') return { ok: false, msg: `You grabbed ${val}, not 'potion'. Remember, indexing starts at 0!` };
          return { ok: true, msg: "Potion equipped!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "4.3",
        title: "Pushing to the Array",
        story: "Sensei: 'You found a \"ruby\"! Use the push() command to add it to the end of your backpack.'",
        conceptHtml: "Add items to an array using <code>push()</code>: <code>list.push('new item');</code>",
        starterCode: "let backpack = ['water', 'bread'];\n\n// Use push() to add 'ruby' to backpack\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum bane-banaye arrays mein naye items add kar sakte hain `.push()` method ka use karke! Jaise:\n`let items = ['wood'];` \n`items.push('gold');` \nAb array ban jayega `['wood', 'gold']`!"
          },
          {
            type: "fill-blank",
            question: "Complete the statement to add 'potion' to the array named 'bag':",
            code: "bag.______('potion');",
            blankValue: "push",
            options: ["push", "add", "insert"],
            hint: "Naya item array ke aakhiri mein push() command se dala jata hai."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','treasure','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return Array.isArray(backpack) ? backpack : null; } catch(e) { return null; }",
        validate: (val) => {
          if (!val) return { ok: false, msg: "Variable 'backpack' not found." };
          if (val[val.length - 1] !== 'ruby') return { ok: false, msg: "The last item is not 'ruby'. Use backpack.push('ruby');" };
          return { ok: true, msg: "Ruby added!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "4.4",
        title: "Array Length",
        story: "Sensei: 'How many items are in the array? Set `count` to the length of the array.'",
        conceptHtml: "Find out how many items are in an array using <code>.length</code>",
        starterCode: "let enemies = ['goblin', 'orc', 'dragon'];\n\n// Set count to enemies.length\nlet count = ",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum kisi bhi array mein kitne items hain yeh count karne ke liye uski `.length` property use karte hain. Jaise:\n`let numbers = [10, 20, 30];` \n`numbers.length` se humein 3 milta hai kyunki list mein 3 items hain."
          },
          {
            type: "quiz",
            question: "Agar `let cards = ['spade', 'heart'];`, toh cards.length ki value kya hogi?",
            options: ["2", "1", "3"],
            answer: "2",
            hint: "Array mein do items hain, isliye length 2 hogi."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return (typeof count !== 'undefined') ? count : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'count' not set." };
          if (val !== 3) return { ok: false, msg: "Count is wrong. Use enemies.length to find the exact number." };
          return { ok: true, msg: "Counted 3 enemies!", data: { path: [8, 9, 10] } };
        }
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 5: Loops
  // ──────────────────────────────────────────────────────
  loops: {
    id: "loops",
    title: "Chapter 5: The Loop Labyrinth",
    levels: [
      {
        levelId: "5.1",
        title: "The For Loop",
        story: "Sensei: 'Walking 5 steps is tedious. Don't write 5 lines of code, use a `for` loop to repeat the action!'",
        conceptHtml: "A <strong>for loop</strong> repeats code: <code>for (let i = 0; i < 5; i++) { ... }</code>",
        starterCode: "let steps = 0;\n\n// Run this loop 5 times\nfor (let i = 0; i < 5; i++) {\n  steps = steps + 1;\n}\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Chapter 5 shuru bhai! 🔁 Agad humein robot ko 100 kadam chalana ho, toh hum 100 baar code nahi likhte. Hum loops use karte hain! `for` loop humare code ko kuch specific times repeat karta hai. Jaise:\n`for (let i = 0; i < 5; i++) { ... }` iska matlab yeh loop 5 baar chalega!"
          },
          {
            type: "quiz",
            question: "In `for (let i = 0; i < 3; i++)`, yeh loop andar likhe code ko kitni baar repeat karega?",
            options: ["3 baar", "2 baar", "4 baar"],
            answer: "3 baar",
            hint: "i = 0 se start hokar i < 3 tak chalega (i = 0, 1, 2) yaani exactly 3 baar."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','player','path','path','path','path','goal','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 9, goalIdx: 14
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not set." };
          if (val !== 5) return { ok: false, msg: `Robot took ${val} steps. It needs to loop exactly 5 times!` };
          return { ok: true, msg: "Looped perfectly!", data: { path: [9, 10, 11, 12, 13, 14] } };
        }
      },
      {
        levelId: "5.2",
        title: "Looping Arrays",
        story: "Sensei: 'You can loop over an array to check every item! Add all the gold coins together.'",
        conceptHtml: "Use <code>i < array.length</code> to loop through every item.",
        starterCode: "let bags = [10, 20, 30];\nlet totalGold = 0;\n\nfor (let i = 0; i < bags.length; i++) {\n  // Add each bag's gold to the total\n  totalGold = totalGold + bags[i];\n}\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum loops ka use karke kisi array ke sabhi items par ek-ek karke kaam kar sakte hain! Hum loop limit mein array ki `.length` dete hain, aur index ki jagah loop variable `i` use karte hain. Jaise: `items[i]` se har item ko access kiya jata hai."
          },
          {
            type: "fill-blank",
            question: "Complete the condition below to loop through the whole array 'bags':",
            code: "for (let i = 0; i < bags.______; i++)",
            blankValue: "length",
            options: ["length", "size", "count"],
            hint: "Hum loop limit mein array.length use karte hain taaki array ke saare items iterate ho sakein."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','treasure','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, treasureIdx: 10
        },
        returnExpr: "try { return (typeof totalGold !== 'undefined') ? totalGold : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'totalGold' not set." };
          if (val !== 60) return { ok: false, msg: `Total gold is ${val}. It should be 60 (10+20+30).` };
          return { ok: true, msg: "Wealth acquired!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "5.3",
        title: "The While Loop",
        story: "Sensei: 'A `while` loop runs as long as a condition is true. Keep running until energy is 0.'",
        conceptHtml: "A <strong>while loop</strong>: <code>while (condition) { ... }</code>",
        starterCode: "let energy = 3;\nlet steps = 0;\n\nwhile (energy > 0) {\n  steps++;\n  energy--;\n}\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Ek aur loop hota hai jise **while loop** kehte hain. Yeh loop tab tak bar-bar chalta hai jab tak uski condition true rehti hai! Jaise:\n`while (energy > 0) { energy--; }` \nIsme humesha dhyan rakhna padta hai ki condition bad mein kabhi false ho sake, warna computer hang ho jayega (Infinite loop)!"
          },
          {
            type: "quiz",
            question: "Kya hoga agar while loop ki condition kabhi false na ho?",
            options: ["Infinite loop chalega aur system hang ho sakta hai", "Loop automatic band ho jayega", "Kuch nahi hoga"],
            answer: "Infinite loop chalega aur system hang ho sakta hai",
            hint: "Condition hamesha true rehne se loop kabhi rukega nahi, jise infinite loop kehte hain."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','path','goal','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 11
        },
        returnExpr: "try { return (typeof steps !== 'undefined') ? steps : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'steps' not set." };
          if (val !== 3) return { ok: false, msg: `Steps is ${val}. The loop should run 3 times.` };
          return { ok: true, msg: "Energy depleted, goal reached!", data: { path: [8, 9, 10, 11] } };
        }
      }
    ]
  },

  // ──────────────────────────────────────────────────────
  // CHAPTER 6: Objects
  // ──────────────────────────────────────────────────────
  objects: {
    id: "objects",
    title: "Chapter 6: The Object Armory",
    levels: [
      {
        levelId: "6.1",
        title: "Robot Blueprint",
        story: "Sensei: 'An Object is like a blueprint. It holds properties. Create a robot object with a `name`.'",
        conceptHtml: "<strong>Objects</strong> use curly braces: <code>let obj = { key: \"value\" };</code>",
        starterCode: "let myRobot = {\n  name: 'X-1',\n  color: 'blue'\n};\n\nlet robotName = myRobot.name;",
        learningSteps: [
          {
            type: "dialogue",
            text: "Aakhiri chapter bhai! Objects seekhenge. 🛡️ Object ek structure hai jismein hum multi-property data store karte hain curly braces `{ }` ke andar. Jaise robot ki speed, color aur size. Inhe key-value pairs kehte hain. Hum property read karne ke liye dot `.` notation use karte hain, jaise `myRobot.name`!"
          },
          {
            type: "quiz",
            question: "Agar humare paas object hai: `let sword = { damage: 15, type: 'steel' };`, toh iske damage ki value kaise read karenge?",
            options: ["sword.damage", "sword(damage)", "sword[damage]"],
            answer: "sword.damage",
            hint: "Object property read karne ke liye objectName.propertyName syntax use kiya jata hai."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return (typeof robotName !== 'undefined') ? robotName : null; } catch(e) { return null; }",
        validate: (val) => {
          if (val === null) return { ok: false, msg: "Variable 'robotName' not set." };
          if (val !== 'X-1') return { ok: false, msg: "Did you extract myRobot.name?" };
          return { ok: true, msg: "Blueprint verified!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "6.2",
        title: "Updating Properties",
        story: "Sensei: 'You can change an object's property. Upgrade the robot's armor to 100!'",
        conceptHtml: "Change properties with dot notation: <code>obj.armor = 100;</code>",
        starterCode: "let myRobot = {\n  armor: 50\n};\n\n// Upgrade armor to 100 here:\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Hum object ki properties ko baad mein update bhi kar sakte hain dot notation ka use karke! Jaise:\n`let hero = { hp: 50 };` \n`hero.hp = 100;` \nAb hero ki `hp` update hokar 100 ho jayegi!"
          },
          {
            type: "fill-blank",
            question: "Complete the statement to set the armor of myRobot to 80:",
            code: "myRobot.______ = 80;",
            blankValue: "armor",
            options: ["armor", "let", "set"],
            hint: "dot '.' ke baad property ka naam likh kar '=' lagayein."
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'player','path','goal','wall','wall','wall','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 8, goalIdx: 10
        },
        returnExpr: "try { return myRobot.armor; } catch(e) { return null; }",
        validate: (val) => {
          if (val !== 100) return { ok: false, msg: `Armor is ${val}. Set myRobot.armor = 100;` };
          return { ok: true, msg: "Armor fully upgraded!", data: { path: [8, 9, 10] } };
        }
      },
      {
        levelId: "6.3",
        title: "Object Methods",
        story: "Sensei: 'Functions inside objects are called Methods! Call the robot's `move()` method.'",
        conceptHtml: "Call a method like this: <code>obj.methodName();</code>",
        starterCode: "let steps = 0;\nlet myRobot = {\n  move: function() {\n    steps = 4;\n  }\n};\n\n// Call the move method here:\n",
        learningSteps: [
          {
            type: "dialogue",
            text: "Agar object ke andar koi property ek function ho, toh use hum **Method** kehte hain. Yeh humare object ke actions ko dikhata hai. Method chalane ke liye hum parenthesese `()` lagate hain! Jaise: `myRobot.move()` call karne par uske andar ka code execute hoga!"
          },
          {
            type: "quiz",
            question: "Agar object 'player' ke paas method 'attack' hai, toh use kaise execute karenge?",
            options: ["player.attack();", "player.attack;", "execute player.attack"],
            answer: "player.attack();",
            hint: "Method ko execute karne ke liye parentheses () lagana zaroori hai!"
          }
        ],
        grid: {
          rows: 3, cols: 8,
          cells: [
            'wall','wall','wall','wall','wall','wall','wall','wall',
            'wall','player','path','path','path','goal','wall','wall',
            'wall','wall','wall','wall','wall','wall','wall','wall'
          ],
          playerIdx: 9, goalIdx: 13
        },
        returnExpr: "try { return steps; } catch(e) { return null; }",
        validate: (val) => {
          if (val !== 4) return { ok: false, msg: `Steps is ${val}. Call myRobot.move();` };
          return { ok: true, msg: "Method executed!", data: { path: [9, 10, 11, 12, 13] } };
        }
      }
    ]
  }
};
