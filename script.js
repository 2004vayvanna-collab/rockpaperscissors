const choices = ["rock", "paper", "scissors"];

let winners = [];
let playerWins = 0;
let computerWins = 0;
let ties = 0;

// attach click events to images
function startGame() {
  const imgs = document.querySelectorAll(".pImg");

  imgs.forEach((img) => {
    img.addEventListener("click", () => {
      playRound(img.id.replace("player-", ""));
    });
  });
}

// reset game
function restartGame() {
  winners = [];
  playerWins = 0;
  computerWins = 0;
  ties = 0;

  document.querySelector(".playerScore").textContent = "Score: 0";
  document.querySelector(".computerScore").textContent = "Score: 0";
  document.querySelector(".ties").textContent = "Ties: 0";
  document.querySelector(".winner").textContent = "";
  document.querySelector(".winnerdiv").style.display = "none";
}

// main round logic
function playRound(playerChoice) {
  if (playerWins >= 5 || computerWins >= 5) return;

  const computerChoice = getComputerChoice();
  const winner = checkWinner(playerChoice, computerChoice);

  winners.push(winner);
  tallyWins();
  displayRound(playerChoice, computerChoice, winner);

  if (playerWins === 5 || computerWins === 5) {
    displayEnd();
  }
}

// display one round
function displayRound(playerChoice, computerChoice, winner) {
  document.querySelector(".playerChoice").textContent =
    `You chose ${capitalize(playerChoice)}`;

  document.querySelector(".computerChoice").textContent =
    `Computer chose ${capitalize(computerChoice)}`;

  if (winner === "Player") {
    document.querySelector(".winner").textContent = "You win this round!";
  } else if (winner === "Computer") {
    document.querySelector(".winner").textContent = "Computer wins this round!";
  } else {
    document.querySelector(".winner").textContent = "It's a tie!";
  }
}

// update scores
function tallyWins() {
  playerWins = winners.filter((w) => w === "Player").length;
  computerWins = winners.filter((w) => w === "Computer").length;
  ties = winners.filter((w) => w === "Tie").length;

  document.querySelector(".playerScore").textContent = `Score: ${playerWins}`;
  document.querySelector(".computerScore").textContent = `Score: ${computerWins}`;
  document.querySelector(".ties").textContent = `Ties: ${ties}`;
}

// end game display
function displayEnd() {
  document.querySelector(".winnerdiv").style.display = "flex";

  if (playerWins === 5) {
    document.querySelector(".winner").textContent =
      "🎉 You won 5 games! Congratulations!";
  } else {
    document.querySelector(".winner").textContent =
      "😢 Computer won the game!";
  }
}

// helper functions
function getComputerChoice() {
  return choices[Math.floor(Math.random() * choices.length)];
}

function checkWinner(player, computer) {
  if (player === computer) return "Tie";

  if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "Player";
  }
  return "Computer";
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// start the game
startGame();
