const timer = document.querySelector(".time");
const startBtn = document.querySelector(".start");
const pauseBtn = document.querySelector(".pause");
const resetBtn = document.querySelector(".reset");
const workTimeInput = document.getElementById("work-time");
const brackTimeInput = document.getElementById("brack-time");
const sessionTytpe = document.querySelector(".session-type");
const sessionCount = document.querySelector(".session-count");
const alertSound = document.getElementById("alert-sound");

let countdown;
let isPaused = false;
let iswiorking = true;
let timeinSecods = workTimeInput.value * 60;
let completesessions = 0;
const THRESHOLD_PERCENTAGE_1 = 0.3;
const THRESHOLD_PERCENTAGE_2 = 0.1;
const GREEN_COLOR = "#ffff";
const RED_COLOR = "#ffff";

function updateBackgroundColor(remainingTimePercentage) {
  if (remainingTimePercentage <= THRESHOLD_PERCENTAGE_2) {
    document.body.style.backgroundColor = RED_COLOR;
  } else if (remainingTimePercentage <= 0.3) {
    document.body.style.backgroundColor = GREEN_COLOR;
  } else {
    document.body.style.backgroundColor = "#ffff";
  }
}

function startTime() {
  countdown = setInterval(() => {
    timeinSecods--;
    const remainingTimePercentage =
      timeinSecods /
      (iswiorking ? workTimeInput.value : brackTimeInput.value) /
      60;
    updateTimer();
    updateBackgroundColor(remainingTimePercentage);
    if (timeinSecods === 0) {
      plaAlartSound();
      clearInterval(countdown);
      if (iswiorking) {
        completesessions++;
        sessionCount.textContent = `completed Sessions : ${completesessions}`;
      }
      iswiorking = !iswiorking;
      updateSessionType();
      timeinSecods =
        (iswiorking ? workTimeInput.value : brackTimeInput.value) * 60;
      startTime();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(countdown);
  isPaused = true;
}

function resetTime() {
  clearInterval(countdown);
  isPaused = false;
  iswiorking = true;
  timeinSecods = workTimeInput.value * 60;
  completesessions = 0;
  sessionTytpe.textContent = "";
  sessionCount.textContent = "";
  updateTimer();
}

function updateTimer() {
  const minutes = Math.floor(timeinSecods / 60);
  const seconds = timeinSecods % 60;
  timer.textContent = `${minutes < 10 ? "0" : ""} ${minutes} :${
    seconds < 10 ? "0" : ""
  } ${seconds}`;
}

function updateSessionType() {
  sessionTytpe.textContent = iswiorking ? "work Session" : "Break Session";
}

function plaAlartSound() {
  alertSound.currentTime = 0;
  alertSound.play();
}
startBtn.addEventListener("click", () => {
  if (isPaused) {
    startTime();
    isPaused = false;
  } else {
    updateSessionType();
    startTime();
  }
});

pauseBtn.addEventListener("click", pauseTimer);
resetBtn.addEventListener("click", resetTime);
document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();
  workTimeInput.disbled = true;
  brackTimeInput.disbled = true;
  timeinSecods = workTimeInput.value * 60;
  updateTimer();
  resetTime();
});

updateTimer();
