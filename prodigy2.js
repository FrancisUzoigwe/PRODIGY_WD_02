let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapTimes = [];

const display = document.querySelectorAll(".t");
const pauseBtn = document.querySelector(".pausebtn");
const stopBtn = document.querySelector(".stopbtn");
const resetBtn = document.querySelector(".resetbtn");
const lapBtn = document.querySelector(".lapbtn");
const lapTimesElement = document.getElementById("lap-times");

function updateDisplay() {
  const totalSeconds = Math.floor(elapsedTime / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor(elapsedTime % 1000);

  display[0].textContent = hours.toString().padStart(2, "0");
  display[2].textContent = minutes.toString().padStart(2, "0");
  display[4].textContent = seconds.toString().padStart(2, "0");
  display[6].textContent = milliseconds.toString().padStart(3, "0");
}

function startTimer() {
  startTime = Date.now() - elapsedTime;
  isRunning = true;
  intervalId = setInterval(updateTimer, 10);
}

function updateTimer() {
  elapsedTime = Date.now() - startTime;
  updateDisplay();
}

function pauseTimer() {
  clearInterval(intervalId);
  isRunning = false;
}

function stopTimer() {
  pauseTimer();
  elapsedTime = 0;
  updateDisplay();
  lapTimes = [];
  lapTimesElement.innerHTML = ""; 
}

function resetTimer() {
  stopTimer();
  startTime = 0;
}

function recordLap() {
  if (isRunning) {
    const currentLapTime = elapsedTime;
    lapTimes.push(currentLapTime);

    const lapTimeInMilliseconds = currentLapTime;
    const hours = Math.floor(lapTimeInMilliseconds / (3600 * 1000));
    const minutes = Math.floor(
      (lapTimeInMilliseconds % (3600 * 1000)) / (60 * 1000)
    );
    const seconds = Math.floor((lapTimeInMilliseconds % (60 * 1000)) / 1000);
    const milliseconds = lapTimeInMilliseconds % 1000;

    const formattedLapTime =
      `${hours.toString().padStart(2, "0")} : ` +
      `${minutes.toString().padStart(2, "0")} : ` +
      `${seconds.toString().padStart(2, "0")} : ` +
      `${milliseconds.toString().padStart(3, "0")}`;
    lapTimesElement.innerHTML += `<p>Lap: ${formattedLapTime}</p>`;
  } else {
    console.log("Cannot record lap due to unknown issues");
  }
}

pauseBtn.addEventListener("click", () => {
  if (isRunning) {
    pauseTimer();
    pauseBtn.textContent = "Start";
  } else {
    startTimer();
    pauseBtn.textContent = "Pause";
  }
});

stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);
