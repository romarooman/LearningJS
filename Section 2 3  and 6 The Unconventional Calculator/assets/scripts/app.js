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

function writeToLog(
  operationIdentifier,
  prevResult,
  operationNumber,
  NewResult
) {
  const logEntry = {
    opertation: operationIdentifier,
    prevResult: prevResult,
    number: operationNumber,
    result: NewResult,
  };
  logEnteries.push(logEntry);
  console.log(logEnteries);
}

function calculateResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  if (
    (calculationType !== "ADD" &&
      calculationType !== "SUBTRACT" &&
      calculationType !== "MULTIPLY" &&
      calculationType !== "DIVIDE") ||
    !enteredNumber
  ) {
    return;
  }

  // if (
  //   calculationType === 'ADD' ||
  //   calculationType === 'SUBTRACT' ||
  //   calculationType === 'MULTIPLY' ||
  //   calculationType === 'DIVIDE'
  // ) {

  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === "ADD") {
    currentResult += enteredNumber;
    mathOperator = "+";
  } else if (calculationType === "SUBTRACT") {
    currentResult -= enteredNumber;
    mathOperator = "-";
  } else if (calculationType === "MULTIPLY") {
    currentResult *= enteredNumber;
    mathOperator = "*";
  } else if (calculationType === "DIVIDE") {
    currentResult /= enteredNumber;
    mathOperator = "/";
  }
  createAndWriteOutput(mathOperator, initialResult, currentResult);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}
// }

// function add() {
//   calculateResult('ADD');
// }

// function substuc() {
//   calculateResult('SUBTRACT');
// }

// function multip() {
//   calculateResult('MULTIPLY');
// }

// function divide() {
//   calculateResult('DIVIDE');
// }

addBtn.addEventListener("click", calculateResult.bind(this, "ADD"));
subtractBtn.addEventListener("click", calculateResult.bind(this, "SUBTRACT"));
multiplyBtn.addEventListener("click", calculateResult.bind(this, "MULTIPLY"));
divideBtn.addEventListener("click", calculateResult.bind(this, "DIVIDE"));
