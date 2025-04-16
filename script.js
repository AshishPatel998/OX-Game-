let currentPlayer = 'X';
let board = ["", "", "", "", "", "", "", "", ""];
let vsComputer = false;
let gameOver = false;

function startGame(mode) {
  vsComputer = mode === 'computer';
  document.getElementById('mode-buttons').style.display = 'none';
  document.getElementById('grid').style.display = 'grid';
  resetBoard();
}

function handleClick(index) {
  if (board[index] !== "" || gameOver) return;

  board[index] = currentPlayer;
  document.getElementsByClassName('cell')[index].innerText = currentPlayer;
  checkWin();

  if (!gameOver && vsComputer && currentPlayer === 'X') {
    setTimeout(computerMove, 500);
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function computerMove() {
  let emptyIndexes = board.map((val, i) => val === "" ? i : null).filter(val => val !== null);
  if (emptyIndexes.length === 0) return;

  let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
  board[randomIndex] = 'O';
  document.getElementsByClassName('cell')[randomIndex].innerText = 'O';
  checkWin();
  currentPlayer = 'X';
}

function checkWin() {
  const winCombos = [
    [0,1,2], [3,4,5], [6,7,8],  // rows
    [0,3,6], [1,4,7], [2,5,8],  // cols
    [0,4,8], [2,4,6]            // diagonals
  ];

  for (let combo of winCombos) {
    let [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      showPopup(`${board[a]} Wins!`);
      gameOver = true;
      return;
    }
  }

  if (!board.includes("")) {
    showPopup("It's a Draw!");
    gameOver = true;
  }
}

function showPopup(message) {
  document.getElementById('popup-message').innerText = message;
  document.getElementById('popup').style.display = 'flex';
}

function resetGame() {
  resetBoard();
  document.getElementById('popup').style.display = 'none';
  document.getElementById('mode-buttons').style.display = 'flex';
  document.getElementById('grid').style.display = 'none';
}

function resetBoard() {
  currentPlayer = 'X';
  gameOver = false;
  board = ["", "", "", "", "", "", "", "", ""];
  Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.innerText = "");
}

// Loading animation
window.onload = () => {
  let progress = 0;
  const fill = document.getElementById('progress-bar-fill');
  const loadingScreen = document.getElementById('loading-screen');
  const gameContainer = document.getElementById('game-container');

  const interval = setInterval(() => {
    progress += 2;
    fill.style.width = `${progress}%`;
    if (progress >= 100) {
      clearInterval(interval);
      loadingScreen.style.display = 'none';
      gameContainer.style.display = 'block';
    }
  }, 50);
};
