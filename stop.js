let timerInterval;
let isRunning = false;
let startTime = 0;
let elapsedTime = 0;
let lapTime = 0;
let lapCounter = 1; // Lap counter to keep track of lap number

const timeLabel = document.getElementById("time-label");
const startBtn = document.getElementById("start-btn");
const lapBtn = document.getElementById("lap-btn");
const lapsList = document.getElementById("laps-list");

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        startTimer();
    } else {
        stopTimer();
    }
});

lapBtn.addEventListener("click", () => {
    if (isRunning) {
        recordLap();
    } else {
        resetTimer();
    }
});

function startTimer() {
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);  // Update every 10ms for better precision
    startBtn.textContent = "Stop";
    startBtn.classList.add("stop");
    lapBtn.textContent = "Lap"; // Keep Lap text static
    lapBtn.classList.remove("reset");
}

function stopTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = Date.now() - startTime;
    startBtn.textContent = "Start";
    startBtn.classList.remove("stop");
    lapBtn.textContent = "Reset"; // Change to Reset when timer stops
    lapBtn.classList.add("reset");
}

function updateTime() {
    const currentTime = Date.now() - startTime;
    const milliseconds = currentTime % 1000;
    const seconds = Math.floor(currentTime / 1000) % 60;
    const minutes = Math.floor(currentTime / (1000 * 60)) % 60;
    const hours = Math.floor(currentTime / (1000 * 60 * 60)) % 24;

    timeLabel.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(time) {
    return time < 10 ? "0" + time : time;
}

function padMilliseconds(ms) {
    return ms < 10 ? "00" + ms : ms < 100 ? "0" + ms : ms;
}

function recordLap() {
    const currentLapTime = Date.now() - startTime;
    const milliseconds = currentLapTime % 1000;
    const seconds = Math.floor(currentLapTime / 1000) % 60;
    const minutes = Math.floor(currentLapTime / (1000 * 60)) % 60;
    const hours = Math.floor(currentLapTime / (1000 * 60 * 60)) % 24;

    // Create the lap item in the format "Lap 1", "Lap 2", etc.
    const lapLabel = `Lap ${lapCounter}: `;
    
    // Create the lap item with the label
    const lapItem = document.createElement("li");
    lapItem.textContent = lapLabel + `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
    lapsList.prepend(lapItem);

    // Increment the lap counter for the next lap
    lapCounter++;
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeLabel.textContent = "00:00:00.000";
    startBtn.textContent = "Start";
    startBtn.classList.remove("stop");
    lapBtn.textContent = "Lap"; // Reset lap button text to "Lap"
    lapBtn.classList.remove("reset");
    lapsList.innerHTML = ""; // Clear the laps list
    lapCounter = 1; // Reset lap counter
}
