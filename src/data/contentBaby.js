const contentBaby = {
  "intro": {
    title: "Introduction to JavaScript",
    sections: [
      {
        type: "dialogue",
        content: "Welcome to the Magic Sandbox! ✨ Imagine a house. HTML is the bricks and walls. CSS is the beautiful paint. But JavaScript? JavaScript is the MAGIC that makes the house come alive!"
      },
      {
        type: "game-fill",
        question: "If HTML is the skeleton, and CSS is the clothes, what is JavaScript?",
        blank: "JavaScript is the ______!",
        options: ["Paint", "Magic Wand", "Bricks"],
        answer: "Magic Wand",
        successMsg: "Exactly! JavaScript brings the page to life!"
      },
      {
        type: "dialogue",
        content: "Without JavaScript, a website is just a boring picture. With JavaScript, buttons click, cars drive, and games can be played!"
      },
      {
        type: "game-button",
        text: "Let's cast your first spell! Click the giant magic button below to see JavaScript in action.",
        buttonText: "🪄 Make it Rain Confetti!",
        successMessage: "WOOSH! You just used JavaScript to make confetti fall!"
      },
      {
        type: "dialogue",
        content: "See? You told the computer what to do, and it listened! That is what coding is: just giving simple instructions."
      }
    ]
  },
  "variables": {
    title: "Variables (Magic Toy Boxes)",
    sections: [
      {
        type: "dialogue",
        content: "Imagine you have a new toy car. You don't want to lose it, so you put it inside a nice cardboard box and write 'My Car' on the outside."
      },
      {
        type: "dialogue",
        content: "In JavaScript, a VARIABLE is just a magic box where we store things! Instead of cardboard, we use the magic word 'let'."
      },
      {
        type: "game-fill",
        question: "How do we create a new magic box named 'toy'?",
        blank: "______ toy = 'car';",
        options: ["box", "make", "let"],
        answer: "let",
        successMsg: "Yes! 'let' tells JavaScript to create a new box!"
      },
      {
        type: "dialogue",
        content: "Now our box is created! `let toy = 'car';` means we put the 'car' inside the box called 'toy'."
      },
      {
        type: "game-fill",
        question: "If I say `let pet = 'dog';`, what is inside the box named 'pet'?",
        blank: "The box contains a ______",
        options: ["cat", "dog", "bird"],
        answer: "dog",
        successMsg: "Perfect! You opened the box and found the dog!"
      }
    ]
  }
};

export default contentBaby;
