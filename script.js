const board = document.getElementById("board");
const failedImages = [];

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
  card.classList.toggle("flipped");
};

const createBoard = (cards) => {
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.classList.add("child");

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
