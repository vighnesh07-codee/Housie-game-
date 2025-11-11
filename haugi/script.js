let currentState = "stopped";
let intervalId = null;
let timer = 0;
let usedNumbers = [];

const numberDisplay = document.getElementById("number");
const timerDisplay = document.getElementById("timer");
const beepSound = document.getElementById("beepSound");
const toggleButton = document.getElementById("toggleButton");

function getRandomNumber() {
  if (usedNumbers.length >= 90) return null;

  let num;
  do {
    num = Math.floor(Math.random() * 90) + 1;
  } while (usedNumbers.includes(num));

  usedNumbers.push(num);
  return num;
}

function updateNumberAndTimer() {
  const newNumber = getRandomNumber();

  if (newNumber === null) {
    clearInterval(intervalId);
    numberDisplay.textContent = "Done!";
    toggleButton.textContent = "Start";
    currentState = "stopped";
    return;
  }

  numberDisplay.textContent = newNumber;
  timer++;
  timerDisplay.textContent = `Elapsed Time: ${timer}s`;
  beepSound.play();
}

function handleStartButton() {
  if (currentState === "stopped") {
    // Start fresh
    timer = 0;
    usedNumbers = [];
    numberDisplay.textContent = "--";
    timerDisplay.textContent = "Elapsed Time: 0s";

    intervalId = setInterval(updateNumberAndTimer, 5000);
    toggleButton.textContent = "Pause";
    currentState = "running";
  } else if (currentState === "running") {
    // Pause
    clearInterval(intervalId);
    toggleButton.textContent = "Resume";
    currentState = "paused";
  } else if (currentState === "paused") {
    // Resume
    intervalId = setInterval(updateNumberAndTimer, 1000);
    toggleButton.textContent = "Pause";
    currentState = "running";
  }
}
