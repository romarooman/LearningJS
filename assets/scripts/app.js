const defaultResult = 0;
let currentResult = defaultResult;
let logEnteries = [];

function getUserNumberInput() {
  return parseInt(userInput.value);
}

function createAndWriteOutput(operator, resultBeforeCalc, calcNumber) {
  const calcDescription = `${resultBeforeCalc} ${operator} ${calcNumber}`;
  outputResult(currentResult, calcDescription);
  return;
}

function add() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult += enteredNumber;
  createAndWriteOutput('+', initialResult, currentResult);
  logEnteries.push(enteredNumber);
  console.log(logEnteries);
}

function substuc() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult -= enteredNumber;
  createAndWriteOutput('-', initialResult, currentResult);
}

function multip() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult *= enteredNumber;
  createAndWriteOutput('*', initialResult, currentResult);
}
function divide() {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  currentResult /= enteredNumber;
  createAndWriteOutput('/', initialResult, currentResult);
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', substuc);
multiplyBtn.addEventListener('click', multip);
divideBtn.addEventListener('click', divide);

let r = 3;
alert(++r);
alert(`after ${r}`);
