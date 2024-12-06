document.addEventListener('DOMContentLoaded', () => {
    const BREAK_RATIO = 0.2; // 20% del tempo di lavoro
    const MIN_TIME_FOR_BREAK = 30; // secondi minimi per avere una pausa
    
    let startStopBtn = document.querySelector('.boxes-button');
    let resetBox = document.querySelector('#reset-box');
    let timer = false;
    let seconds = 0;
    let minutes = 0;
    let isBreakMode = false;
    let timerInterval = null;

    // Event Listeners
    startStopBtn.addEventListener('click', toggleTimer);
    resetBox.addEventListener('click', handleReset);

    function toggleTimer() {
        timer = !timer;
        
        if(timer) {
            if (!timerInterval) {
                pomoWatch();
            }
        } else {
            clearTimeout(timerInterval);
            timerInterval = null;
        }
    }

    function handleReset(e) {
        e.stopPropagation();
        reset();
    }

    function pomoWatch() {
        if(!timer) {
            clearTimeout(timerInterval);
            timerInterval = null;
            return;
        }

        if(isBreakMode) {
            handleBreakTimer();
        } else {
            handleWorkTimer();
        }

        updateDisplay();
        timerInterval = setTimeout(pomoWatch, 1000);
    }

    function handleBreakTimer() {
        if(seconds === 0 && minutes === 0) {
            timer = false;
            isBreakMode = false;
            clearTimeout(timerInterval);
            timerInterval = null;
            return;
        }

        if(seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }
    }

    function handleWorkTimer() {
        seconds++;
        if(seconds === 60) {
            minutes++;
            seconds = 0;
        }
    }

    function updateDisplay() {
        const min1 = Math.floor(minutes / 10);
        const min2 = minutes % 10;
        const sec1 = Math.floor(seconds / 10);
        const sec2 = seconds % 10;

        document.querySelector('.mn1').textContent = min1;
        document.querySelector('.mn2').textContent = min2;
        document.querySelector('.sc1').textContent = sec1;
        document.querySelector('.sc2').textContent = sec2;
    }

    function reset() {
        timer = false;
        clearTimeout(timerInterval);
        timerInterval = null;
        const totalSeconds = minutes * 60 + seconds;

        if(totalSeconds < MIN_TIME_FOR_BREAK) {
            resetDisplay();
            return;
        }

        startBreakTimer(totalSeconds);
    }

    function resetDisplay() {
        seconds = 0;
        minutes = 0;
        updateDisplay();
    }

    function startBreakTimer(totalSeconds) {
        const breakSeconds = Math.round(totalSeconds * BREAK_RATIO);
        seconds = breakSeconds % 60;
        minutes = Math.floor(breakSeconds / 60);
        timer = true;
        isBreakMode = true;
        pomoWatch();
    }
});
