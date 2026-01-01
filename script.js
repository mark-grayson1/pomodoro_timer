const timerDisplay = document.getElementById('timer');

let workDuration = 25 * 60; // in minutes
let timeLeft = workDuration;
let timerInterval = null;

function startTimer() {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        clearInterval(timerInterval);
        timerInterval = null;
        updateTimerDisplay();
        startTimer();
      }  
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    const seconds = String(timeLeft % 60).padStart(2, "0");
    console.log(`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`);
    timerDisplay.textContent = `${minutes}:${seconds}`;
}

startTimer();