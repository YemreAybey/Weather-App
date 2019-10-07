/* eslint-env browser */
import { format } from 'date-fns';
import { days, wetSymbls } from '../api/weatherApi';

const getSymColor = status => {
  if (status == 'Sunny') {
    return 'text-warning';
  } else if (status == 'Extreme') {
    return 'text-dr';
  } else {
    return 'text-sec';
  }
};

const renderToday = (temp, title, city, country, humid, wind) => {
  const dateArea = document.querySelector('.h6.notable');
  const dayArea = document.querySelector('.dayArea');
  const degreeArea = document.querySelector('.degree');
  const cityArea = document.querySelector('.city');
  const humidity = document.querySelector('.humidity');
  const windArea = document.querySelector('.wind');
  const span1 = document.createElement('span');
  const span2 = document.createElement('span');
  const bigSym = document.querySelector('.bigSymb');
  span1.classList.add('show-degree', 'text-white');
  span2.classList.add('show-degree', 'text-white', 'd-block');
  span1.innerHTML = temp;
  span2.innerHTML = title;
  degreeArea.innerHTML = '';
  degreeArea.appendChild(span1);
  degreeArea.appendChild(span2);
  const theDay = new Date();
  dateArea.innerHTML = format(new Date(), 'PP');
  dayArea.innerHTML = days[theDay.getDay()];
  cityArea.innerHTML = `${city}, ${country}`;
  humidity.innerHTML = `${humid}%`;
  windArea.innerHTML = `${wind} km/h`;
  bigSym.className = '';
  bigSym.classList.add(
    'fas',
    `${wetSymbls[title]}`,
    'fa-5x',
    `${getSymColor(title)}`,
    'bigSymb'
  );
};

const renderOtherDays = (status, temp, order, plus) => {
  const first = document.querySelector(`.${order}Day`);
  const firstName = document.querySelector(`.${order}Name`);
  const theTemp = document.querySelector(`.${order}Temp`);
  theTemp.innerHTML = `${temp}°C`;
  const date = new Date();
  const day = date.getDay();
  first.className = '';
  firstName.innerHTML = days[day + plus].substring(0, 3);
  first.classList.add(
    'mt-2',
    'fas',
    `${wetSymbls[status]}`,
    'fa-3x',
    `${getSymColor(status)}`,
    `${order}Day`
  );
};

export { renderToday, renderOtherDays };
