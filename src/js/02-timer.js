import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const startBtn = document.querySelector('[data-start]')
const daysData = document.querySelector('[data-days]');
const hoursData = document.querySelector('[data-hours]');
const minutesData = document.querySelector('[data-minutes]');
const secondsData = document.querySelector('[data-seconds]');
const input = document.querySelector('#datetime-picker');

startBtn.disabled = true;

let timerId = null;


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if(selectedDates[0] < options.defaultDate) {
            Notiflix.Notify.warning("Please choose a date in the future");
        } else {
            startBtn.disabled = false;
        }    
    },
  };

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', clickBtnStart);

function clickBtnStart () {
    const dataSet = new Date(input.value);
    const delta = dataSet - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);
    updateClockface({ days, hours, minutes, seconds });
  
    timerId = setInterval(() => {
    input.disabled = true;
    startBtn.disabled = true;
    const delta = dataSet - Date.now();
    const { days, hours, minutes, seconds } = convertMs(delta);
    if(delta < 1000) {
        input.disabled = false;
        startBtn.disabled = false;
        clearInterval(timerId);
    }
    updateClockface({ days, hours, minutes, seconds });
}, 1000);
}

function updateClockface({ days, hours, minutes, seconds }) {
    if (seconds >= 0) {
      daysData.textContent = days;
      hoursData.textContent = hours;
      minutesData.textContent = minutes;
      secondsData.textContent = seconds;
    }
  }
function convertMs(ms) {
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;   

const days = pad(Math.floor(ms / day));
const hours = pad(Math.floor((ms % day) / hour));
const minutes = pad(Math.floor(((ms % day) %hour) / minute));
const seconds = pad(Math.floor((((ms % day) %hour) % minute) / second));
return { days, hours, minutes, seconds };
  }
  
function pad(value) {
   return String(value).padStart(2, '0');
}