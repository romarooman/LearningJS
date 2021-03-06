const startGameBtn = document.getElementById("start-game-btn");

const ROCK = `ROCK`;
const PAPER = `PAPER`;
const SCISSORS = `SCISSORS`;
const DEFAULT_USER_CHOICE = ROCK;
const RESULT_DRAW = "DRAW";
const RESULT_PLAYER_WINS = "PLAYER_WINS";
const RESULT_COMPUTER_WINS = "COMPUTER_WINS";

let gameIsRunnig = false;

const getPlayerChoice = () => {
  const selection = prompt(
    `${ROCK}, ${PAPER} or ${SCISSORS}?`,
    ""
  ).toUpperCase();
  if (selection !== ROCK && selection !== PAPER && selection !== SCISSORS) {
    alert(`Invalid choice, we chose ${DEFAULT_USER_CHOICE} for you`);
    return;
  }
  return selection;
};

const getComputerChoice = () => {
  const randomValue = Math.random();
  if (randomValue < 0.34) {
    return ROCK;
  } else if (randomValue < 0.67) {
    return PAPER;
  } else {
    return SCISSORS;
  }
};

const getWinner = (cChoice, pChoice = DEFAULT_USER_CHOICE) =>
  cChoice === pChoice
    ? RESULT_DRAW
    : (cChoice === ROCK && pChoice === PAPER) ||
      (cChoice === PAPER && pChoice === SCISSORS) ||
      (cChoice === SCISSORS && pChoice === ROCK)
    ? RESULT_PLAYER_WINS
    : RESULT_COMPUTER_WINS;
// if (cChoice === pChoice) {
//   return RESULT_DRAW;
// } else if (
//   (cChoice === ROCK && pChoice === PAPER) ||
//   (cChoice === PAPER && pChoice === SCISSORS) ||
//   (cChoice === SCISSORS && pChoice === ROCK)
// ) {
//   //&& - and
//   //|| - or
//   return RESULT_PLAYER_WINS;
// } else {
//   return RESULT_COMPUTER_WINS;
// }

startGameBtn.addEventListener("click", () => {
  if (gameIsRunnig) {
    return;
  }
  gameIsRunnig = true;
  console.log("Game is starting ...");
  const playerSelection = getPlayerChoice();
  const computerChoice = getComputerChoice();
  let winner;
  if (playerSelection) {
    winner = getWinner(computerChoice, playerSelection);
  } else {
    getWinner(computerChoice);
  }

  let message = `You picked ${
    playerSelection || DEFAULT_USER_CHOICE
  }, computer picked ${computerChoice}, therefore you `;
  if (winner === RESULT_DRAW) {
    message = message + `had a draw.`;
  } else if (winner === RESULT_PLAYER_WINS) {
    message = message + `won.`;
  } else {
    message = message + `computer won.`;
  }
  alert(message);
  gameIsRunnig = false;
});

const sumUp = (resultHandler, ...numbers) => {
  const valideNumber = (number) => {
    return isNaN(number) ? 0 : number;
  };
  let sum = 0;
  for (const num of numbers) {
    sum += valideNumber(num);
  }
  resultHandler(sum);
};
const showResult = (result) => {
  alert("the result adding all number is: " + result);
};
console.log(sumUp(showResult, 1, 2, 3, 5));
