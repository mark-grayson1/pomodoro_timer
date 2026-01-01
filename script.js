const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resetBtn = document.getElementById("resetBtn");
const statusDisplay = document.getElementById("status");

const WORK_MINUTES = 25; 
const BREAK_MINUTES = 5;
let workDuration = WORK_MINUTES * 60; // in minutes
let breakDuration = BREAK_MINUTES * 60; // in minutes

let isWorkTime = true;
let timeLeft = workDuration;
let timerInterval = null;

function startTimer() {
    if (timerInterval) return; // Timer is already running

    timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateTimerDisplay();
      } else {
        stopTimer();
        toggleStatus();
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

function toggleStatus() {
  isWorkTime = !isWorkTime;
  timeLeft = isWorkTime ? workDuration : breakDuration;
  statusDisplay.textContent = isWorkTime ? "Focus Time" : "Break Time";
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function pauseTimer() {
      stopTimer();
}

function resetTimer() {
  stopTimer();

  if (isWorkTime)
    timeLeft = workDuration;
  else
    timeLeft = breakDuration;

  updateTimerDisplay();
}

startBtn.addEventListener("click", startTimer);
pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTimer);

updateTimerDisplay();