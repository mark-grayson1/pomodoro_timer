const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");

let workDuration = 25 * 60; // in minutes
let timeLeft = workDuration;
let timerInterval = null;

function startTimer() {
    if (timerInterval) return; // Timer is already running
    
    timerInterval = setInterval(() => {
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

function pauseTimer() {
      clearInterval(timerInterval);
      timerInterval = null;
}

function resetTimer() {
  pauseTimer();
  timeLeft = workDuration;
  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);