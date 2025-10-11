const board = document.getElementById("board");

let flippedCards = [];
let isClickable = true;
let totalPoints = 0;

const flippedCardAudio = new Audio("sounds/flipcard.mpeg");
const matchedCardAudio = new Audio("sounds/correct-choice.mp3");
const gameWin = new Audio("sounds/gamewin.wav");

flippedCardAudio.load();
matchedCardAudio.load();
gameWin.load();

const loadCards = () => {
  fetch("data/cards.json")
    .then((response) => response.json())
    .then((data) => {
      let charactersArray = data;
      let allCards = [...charactersArray, ...charactersArray];
      allCards.sort(() => Math.random() - 0.5);
      createBoard(allCards);
    });
};

const flipCard = (e) => {
  const card = e.currentTarget;

  if (flippedCards.includes(card)) {
    return;
  }
  if (!isClickable || card.classList.contains("matched")) {
    return;
  } else {
    flippedCardAudio.play();
  }

  card.classList.toggle("flipped");
  if (card.classList.contains("flipped")) {
    flippedCards.push(card);
    if (flippedCards.length === 2) {
      isClickable = false;

      compareCards(flippedCards[0], flippedCards[1]);
    }
  }
};

const compareCards = (firstCard, secondCard) => {
  setTimeout(() => {
    if (firstCard.dataset.name === secondCard.dataset.name) {
      firstCard.classList.add("matched");
      secondCard.classList.add("matched");
      matchedCardAudio.play();
      totalPoints++;

      if (totalPoints === 32) {
        gameWin.play();
        setTimeout(() => {
          const winMessage = document.createElement("div");
          winMessage.classList.add("win-message");
          winMessage.textContent = "¡YOU WON THE GAME!";

          document.body.appendChild(winMessage);

          setTimeout(() => {
            winMessage.classList.add("show");
          }, 100);
        }, 500);
      }
    } else {
      firstCard.classList.remove("flipped");
      secondCard.classList.remove("flipped");
    }

    flippedCards = [];
    isClickable = true;
  }, 800);
};

const createBoard = (cards) => {
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("child");
    div.setAttribute("data-name", card.name);

    const front = document.createElement("div");
    front.classList.add("front");

    const back = document.createElement("div");
    back.classList.add("back");
    back.style.backgroundImage = `url(${card.image})`;

    div.appendChild(front);
    div.appendChild(back);

    div.addEventListener("click", flipCard);
    board.appendChild(div);
  });
};

loadCards();
