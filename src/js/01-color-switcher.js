
const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let timerId = null;
stopBtn.disabled = true;

startBtn.addEventListener('click', timerInterval);
stopBtn.addEventListener('click',removeId)

function timerInterval (evt) {
    evt.preventDefault();
    changeBcg(evt);
    timerId = setInterval(() => changeBcg(evt), 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function changeBcg(evt) {
    body.style.backgroundColor = getRandomHexColor();
};

function removeId () {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }