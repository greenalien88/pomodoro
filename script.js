let timeLeft;
let timerId = null;
let isWorkTime = true;

const WORK_TIME = 25 * 60; // 25 minutes in seconds
const BREAK_TIME = 5 * 60; // 5 minutes in seconds

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const modeText = document.getElementById('mode-text');
const toggleButton = document.getElementById('toggle-mode');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

function switchMode(manual = false) {
    isWorkTime = !isWorkTime;
    timeLeft = isWorkTime ? WORK_TIME : BREAK_TIME;
    modeText.textContent = isWorkTime ? 'Work Time' : 'Break Time';
    
    // Update button color based on mode
    toggleButton.style.backgroundColor = isWorkTime ? '#4CAF50' : '#ff5252';
    toggleButton.style.borderColor = isWorkTime ? '#45a049' : '#ff1744';
    
    updateDisplay();
    
    if (manual && timerId !== null) {
        clearInterval(timerId);
        timerId = null;
        startTimer();
    }
}

function startTimer() {
    if (timerId === null) {
        if (timeLeft === undefined) {
            timeLeft = WORK_TIME;
        }
        timerId = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft === 0) {
                clearInterval(timerId);
                timerId = null;
                switchMode();
                startTimer();
            }
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerId);
    timerId = null;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = WORK_TIME;
    modeText.textContent = 'Work Time';
    updateDisplay();
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
toggleButton.addEventListener('click', () => switchMode(true));

// Initialize the display
resetTimer(); 