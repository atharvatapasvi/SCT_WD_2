let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  let seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
  const currentTime = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(currentTime);
}

startPauseBtn.addEventListener("click", () => {
  if (!running) {
    startTime = Date.now();
    timerInterval = setInterval(updateDisplay, 1000);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
    resetBtn.disabled = false;
    running = true;
  } else {
    clearInterval(timerInterval);
    elapsedTime += Date.now() - startTime;
    startPauseBtn.textContent = "Start";
    running = false;
  }
});

resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  startTime = 0;
  elapsedTime = 0;
  running = false;
  lapCount = 0;
  display.textContent = "00:00:00";
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
  resetBtn.disabled = true;
  lapsContainer.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
  const lapTime = display.textContent;
  lapCount++;
  const li = document.createElement("li");
  li.textContent = `Lap ${lapCount} — ${lapTime}`;
  lapsContainer.prepend(li);
});
