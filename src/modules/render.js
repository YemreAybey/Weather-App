/* eslint-env browser */
import { format } from 'date-fns';
import { days, wetSymbls, fAnC } from '../api/weatherApi';

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

const changeTemp = e => {
  const tdTemp = document.querySelector('.show-degree');
  const today1 = document.querySelector('.firstTemp');
  const today2 = document.querySelector('.secondTemp');
  const today3 = document.querySelector('.thirdTemp');
  const today4 = document.querySelector('.fourthTemp');

  if (e.target.id == 'F') {
    tdTemp.innerHTML = `${fAnC['today'][1]} °F`;
    today1.innerHTML = `${fAnC['today1'][1]} °F`;
    today2.innerHTML = `${fAnC['today2'][1]} °F`;
    today3.innerHTML = `${fAnC['today3'][1]} °F`;
    today4.innerHTML = `${fAnC['today4'][1]} °F`;
    e.target.innerHTML = 'To °C';
    e.target.id = 'C';
  } else {
    tdTemp.innerHTML = `${fAnC['today'][0]} °C`;
    today1.innerHTML = `${fAnC['today1'][0]} °C`;
    today2.innerHTML = `${fAnC['today2'][0]} °C`;
    today3.innerHTML = `${fAnC['today3'][0]} °C`;
    today4.innerHTML = `${fAnC['today4'][0]} °C`;
    e.target.innerHTML = 'To °F';
    e.target.id = 'F';
  }
};
export { renderToday, renderOtherDays, changeTemp };
