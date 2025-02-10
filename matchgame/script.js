const images = [
    "mikuro_card1", "mikuro_card1",
    "mikuro_card2", "mikuro_card2",
    "mikuro_card3", "mikuro_card3",
    "mikuro_card4", "mikuro_card4",
    "mikuro_card5", "mikuro_card5",
    "mikuro_card6", "mikuro_card6"
];

let cards = [];
let firstCard = null;
let secondCard = null;
let flipCount = 0;
let matchedPairs = 0;

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCard(content) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.content = content;
    card.dataset.flipped = "false"; // 初期状態は裏面
    card.addEventListener("click", () => flipCard(card));
    return card;
}

function setupGame() {
    const cardGrid = document.getElementById("cardGrid");
    cardGrid.innerHTML = "";
    flipCount = 0;
    matchedPairs = 0;
    firstCard = null;
    secondCard = null;

    cards = shuffle(images.map(content => createCard(content)));

    cards.forEach(card => cardGrid.appendChild(card));

    document.getElementById("flipCount").textContent = flipCount;
    document.getElementById("remainingCards").textContent = images.length;
    document.getElementById("resultMessage").textContent = "";
}

function flipCard(card) {
    if (firstCard && secondCard) return;
    if (card.classList.contains("matched") || card.dataset.flipped === "true") return;

    card.style.backgroundImage = `url('images/${card.dataset.content}.png')`;
    card.dataset.flipped = "true";

    if (!firstCard) {
        firstCard = card;
    } else {
        secondCard = card;
        checkMatch();
    }
}

function checkMatch() {
    flipCount++;
    document.getElementById("flipCount").textContent = flipCount;

    if (firstCard.dataset.content === secondCard.dataset.content) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");
        matchedPairs++;
        firstCard = null;
        secondCard = null;
        checkWin();
    } else {
        setTimeout(() => {
            firstCard.style.backgroundImage = "url('images/cardBack.png')";
            secondCard.style.backgroundImage = "url('images/cardBack.png')";
            firstCard.dataset.flipped = "false";
            secondCard.dataset.flipped = "false";
            firstCard = null;
            secondCard = null;
        }, 1000);
    }

    document.getElementById("remainingCards").textContent = images.length - matchedPairs * 2;
}

function checkWin() {
    if (matchedPairs === images.length / 2) {
        let rank;
        let message;

        if (flipCount <= 16) {
            rank = "Sランク";
            message = "記憶力半端ないよ！";
        } else if (flipCount <= 25) {
            rank = "Aランク";
            message = "目指せ、Sランク！";
        } else if (flipCount <= 35) {
            rank = "Bランク";
            message = "もう少し頑張ろう！";
        } else {
            rank = "Cランク";
            message = "もっと頑張って！";
        }

        document.getElementById("resultMessage").textContent = `${rank} - ${message}`;
    }
}

document.getElementById("resetButton").addEventListener("click", setupGame);

setupGame();