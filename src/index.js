/* eslint-env browser */
import { getWeather, getForecast, modal } from './api/weatherApi';
import { changeTemp } from './modules/render';

const input = document.querySelector('input');
const btn = document.querySelector('.searchButton');
const close = document.querySelector('.closing');
const changeBtn = document.querySelector('.changeButton');

getWeather('Istanbul');
getForecast('Istanbul');

const search = () => {
  getWeather(input.value);
  getForecast(input.value);
  input.value = '';
  changeBtn.innerHTML = 'To °F';
  changeBtn.id = 'F';
};

changeBtn.addEventListener('click', changeTemp);

btn.addEventListener('click', search);
close.addEventListener('click', () => {
  modal.classList.toggle('show-modal');
  modal.classList.toggle('d-none');
});
