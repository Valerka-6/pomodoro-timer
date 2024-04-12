const btnStart = document.querySelector("#start");
const btnReset = document.querySelector("#reset");
const btnPomodoro = document.querySelector("#pomodoro");
const btnBreak = document.querySelector("#break");
const timer = document.querySelector("#pomodoro-time");
let seconds = parseInt(timer.textContent.slice(3, 5));
let minutes = parseInt(timer.textContent.slice(0, 2));

function format(item) {
    if (item < 10) {
        return `0${item}`;
    }
    return item;
}
let timerId;
let mode = "pomodoro";

btnPomodoro.addEventListener('click', () => {
    mode = 'pomodoro';
    btnStart.textContent = 'start';
    timer.textContent = '25:00';
    seconds = 0;
    minutes = 25;
    btnPomodoro.classList.add('active');
    btnBreak.classList.remove('active');
    clearInterval(timerId);
    btnStart.textContent = 'start';
});

btnBreak.addEventListener('click', () => {
    mode = 'break';
    btnStart.textContent = 'start';
    timer.textContent = '05:00';
    seconds = 0;
    minutes = 5;
    btnBreak.classList.add('active');
    btnPomodoro.classList.remove('active');
    clearInterval(timerId);
    btnStart.textContent = 'start';
});

function timerReset() {
    if (mode === 'pomodoro') {
        timer.textContent = '25:00';
        seconds = 0;
        minutes = 25;
    } else {
        timer.textContent = '05:00';
        seconds = 0;
        minutes = 5;
    };
    clearInterval(timerId);
    btnStart.textContent = 'start';
};
btnReset.addEventListener("click", timerReset);

function timerStsrt() {
    if (btnStart.textContent === "start") {
        btnStart.textContent = "stop";
        timerId = setInterval(() => {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0 && seconds === 0) {
                minutes--;
                seconds = 59;
            } else if (minutes === 0 || seconds === 0) {
                timerReset();
                clearInterval(timerId);
                btnStart.textContent = "start";
            };
            timer.textContent = `${format(minutes)}:${format(seconds)}`;
        }, 10);
    } else {
        clearInterval(timerId);
        btnStart.textContent = "start";

    }
}
btnStart.addEventListener("click", timerStsrt);