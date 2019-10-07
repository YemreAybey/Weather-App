/* eslint-env browser */
import { getWeather, getForecast, modal } from './api/weatherApi';

const input = document.querySelector('input');
const btn = document.querySelector('.searchButton');
const close = document.querySelector('.closing');

const search = () => {
  getWeather(input.value);
  getForecast(input.value);
  input.value = '';
};

getWeather('Istanbul');
getForecast('Istanbul');

btn.addEventListener('click', search);
close.addEventListener('click', () => {
  modal.classList.toggle('show-modal');
  modal.classList.toggle('d-none');
});
