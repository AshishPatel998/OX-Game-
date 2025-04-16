// script.js

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let isGameOver = false;
let vsComputer = false;
const cells = document.querySelectorAll(".cell");
const popup = document.querySelector(".popup");
const popupContent = document.querySelector(".popup-content h2");
const playFriendBtn = document.getElementById("play-friend");
const playComputerBtn = document.getElementById("play-computer");
const grid = document.querySelector(".grid");
const loadingScreen = document.querySelector(".loading-screen");
const fill = document.querySelector(".progress-bar-fill");

// LOADING ANIMATION
let percent = 0;
const loadingInterval = setInterval(() => {
  percent++;
  fill.style.width = `${percent}%`;
  if (percent >= 100) {
    clearInterval(loadingInterval);
    loadingScreen.style.display = "none";
    document.querySelector(".container").style.display = "block";
  }
}, 30);

// START MODE
playFriendBtn.addEventListener("click", () => {
  vsComputer = false;
  startGame();
});

playComputerBtn.addEventListener("click", () => {
  vsComputer = true;
  startGame();
});

function startGame() {
  document.getElementById("mode-select").style.display = "none";
  grid.style.display = "grid";
  resetGame();
}

// GAME LOGIC
cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (isGameOver || board[index]) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin(currentPlayer)) {
      endGame(`${currentPlayer} wins!`);
      return;
    }

    if (!board.includes("")) {
      endGame("It's a draw!");
      return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (vsComputer && currentPlayer === "O") {
      setTimeout(computerMove, 500);
    }
  });
});

function computerMove() {
  let emptyIndexes = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  let move = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];

  board[move] = currentPlayer;
  cells[move].textContent = currentPlayer;
  cells[move].classList.add("taken");

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} wins!`);
    return;
  }

  if (!board.includes("")) {
    endGame("It's a draw!");
    return;
  }

  currentPlayer = "X";
}

function checkWin(player) {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  return winPatterns.some(pattern => {
    return pattern.every(index => board[index] === player);
  });
}

function endGame(message) {
  isGameOver = true;
  popup.style.display = "flex";
  popupContent.textContent = message;
}

document.getElementById("restart").addEventListener("click", () => {
  popup.style.display = "none";
  resetGame();
});

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  isGameOver = false;
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}
