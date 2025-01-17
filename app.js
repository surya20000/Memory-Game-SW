document.addEventListener("DOMContentLoaded", () => {
  const cardArray = [
    { name: "fries", img: "images/fries.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "hotdog", img: "images/hotdog.png" },
    { name: "fries", img: "images/fries.png" },
    { name: "cheeseburger", img: "images/cheeseburger.png" },
    { name: "ice-cream", img: "images/ice-cream.png" },
    { name: "pizza", img: "images/pizza.png" },
    { name: "milkshake", img: "images/milkshake.png" },
    { name: "hotdog", img: "images/hotdog.png" },
  ];

  const grid = document.querySelector(".grid");
  const resultDisplay = document.querySelector("#result");
  const timerDisplay = document.querySelector("#timer");
  const difficultySelector = document.querySelector("#difficulty");
  const startButton = document.querySelector("#start");
  let cardsChosen = [];
  let cardsChosenId = [];
  let cardsWon = [];
  let timeLimit = 60; 
  let timer = null;

  function createBoard() {
    grid.innerHTML = ""; 
    cardArray.sort(() => 0.5 - Math.random()); 
    cardArray.forEach((card, index) => {
      const cardElement = document.createElement("img");
      cardElement.setAttribute("src", "images/blank.png");
      cardElement.setAttribute("data-id", index);
      cardElement.addEventListener("click", flipCard);
      grid.appendChild(cardElement);
    });
  }

  function startGame() {
    const difficulty = difficultySelector.value;
    if (difficulty === "easy") {
      timeLimit = 75;
    } else if (difficulty === "medium") {
      timeLimit = 70; 
    } else {
      timeLimit = 60; 
    }

    createBoard();
    startTimer(); 
    cardsWon = []; 
    resultDisplay.textContent = 0; 
    cardsChosen = [];
    cardsChosenId = [];
  }

  function startTimer() {
    let elapsedTime = 0;
    timerDisplay.textContent = `Time Left: ${timeLimit}s`;
    if (timer) clearInterval(timer);
    timer = setInterval(() => {
      elapsedTime++;
      const timeLeft = timeLimit - elapsedTime;
      timerDisplay.textContent = `Time Left: ${timeLeft}s`;

      if (timeLeft <= 0) {
        clearInterval(timer);
        alert("Time's up! Game over!");
        grid.innerHTML = ""; 
      }
    }, 1000);
  }

  function checkForMatch() {
    const cards = document.querySelectorAll("img");
    const optionOneId = cardsChosenId[0];
    const optionTwoId = cardsChosenId[1];

    if (optionOneId == optionTwoId) {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      alert("You have clicked the same image!");
    } else if (cardsChosen[0] === cardsChosen[1]) {
      alert("You found a match");
      cards[optionOneId].setAttribute("src", "images/white.png");
      cards[optionTwoId].setAttribute("src", "images/white.png");
      cards[optionOneId].removeEventListener("click", flipCard);
      cards[optionTwoId].removeEventListener("click", flipCard);
      cardsWon.push(cardsChosen);
    } else {
      cards[optionOneId].setAttribute("src", "images/blank.png");
      cards[optionTwoId].setAttribute("src", "images/blank.png");
      alert("Sorry, try again");
    }
    cardsChosen = [];
    cardsChosenId = [];
    resultDisplay.textContent = cardsWon.length;
    if (cardsWon.length === cardArray.length / 2) {
      clearInterval(timer); 
      resultDisplay.textContent = "Congratulations! You found them all!";
    }
  }

  function flipCard() {
    let cardId = this.getAttribute("data-id");
    cardsChosen.push(cardArray[cardId].name);
    cardsChosenId.push(cardId);
    this.setAttribute("src", cardArray[cardId].img);
    if (cardsChosen.length === 2) {
      setTimeout(checkForMatch, 500);
    }
  }

  startButton.addEventListener("click", startGame); 
});
