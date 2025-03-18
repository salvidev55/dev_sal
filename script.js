let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let isGameActive = true;

const cells = document.querySelectorAll(".cell");
const resultDisplay = document.getElementById("result");

function handleClick(event) {
  const cellIndex = event.target.getAttribute("data-cell");

  if (gameBoard[cellIndex] || !isGameActive) return;

  gameBoard[cellIndex] = currentPlayer;
  event.target.textContent = currentPlayer;
  event.target.classList.add(currentPlayer);

  if (checkWinner()) {
    resultDisplay.textContent = `${currentPlayer} Wins!`;
    isGameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  if (!gameBoard.includes("")) {
    resultDisplay.textContent = "It's a draw!";
    isGameActive = false;
  }

  return false;
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  isGameActive = true;
  currentPlayer = "X";
  resultDisplay.textContent = "";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
}

cells.forEach(cell => {
  cell.addEventListener("click", handleClick);
});
