import Notiflix from 'notiflix';

const refs = {
  delay : document.querySelector('[name="delay"]'),
  step : document.querySelector('[name="step"]'),
  amount:  document.querySelector('[name="amount"]'),
}

document.querySelector('.form').addEventListener('submit', e => {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  const delayValue = parseInt(delay.value);
  const stepValue = parseInt(step.value);
  const amountValue = parseInt(amount.value);

  for (let index = 0; index < amountValue; index += 1) {
    const delay = index * stepValue + delayValue;
    createPromise(index, delay)
    .then(({position,delay}) => 
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`)
    )
    .catch(({ position, delay}) => 
    Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`)
    )
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}