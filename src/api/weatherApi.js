/* eslint-env browser */
import getHours from 'date-fns/getHours';
import { renderToday, renderOtherDays } from '../modules/render';
const modal = document.querySelector('.modal-window');

const wetSymbls = {
  Cloudy: 'fa-cloud',
  Sunny: 'fa-sun',
  Rainy: 'fa-cloud-rain',
  Misty: 'fa-smog',
  Extreme: 'fa-cloud-showers-heavy'
};
const fAnC = [];
const getFormattedStatus = status => {
  let currentStatus = status.toLowerCase();

  if (currentStatus == 'rain') {
    return 'Rainy';
  }
  if (currentStatus == 'clouds') {
    return 'Cloudy';
  }
  if (currentStatus == 'clear') {
    return 'Sunny';
  }
  if (currentStatus == 'mist') {
    return 'Misty';
  }
  if (currentStatus == 'extreme') {
    return 'Extreme';
  }
  return status;
};

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const KtoC = degree => {
  return parseInt(degree - 273.15, 10);
};

const CtoF = degree => {
  return parseInt(degree * (9 / 5) + 32, 10);
};

const FtoC = degree => {
  return parseInt((degree - 32) * (5 / 9), 10);
};

const decideData = date => {
  let theHour = getHours(date);
  while (theHour % 3 != 0) {
    theHour--;
  }
  const first = (24 - theHour) / 3;
  return [first + 2, first + 10, first + 18, first + 26];
};

const getWeather = name => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${name.toUpperCase()}&APPID=0f695179f8524df704f661f75ece5bb7`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json();
    })
    .then(weather => {
      fAnC['today'] = [KtoC(weather.main.temp), CtoF(KtoC(weather.main.temp))];
      renderToday(
        `${KtoC(weather.main.temp)} °C`,
        getFormattedStatus(weather.weather[0].main),
        weather.name,
        weather.sys.country,
        weather.main.humidity,
        weather.wind.speed
      );
    })
    .catch(e => {
      modal.classList.toggle('show-modal');
      modal.classList.toggle('d-none');
    });
};

const getForecast = name => {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${name.toUpperCase()}&APPID=0f695179f8524df704f661f75ece5bb7`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json();
    })
    .then(foreCast => {
      const today1 = KtoC(foreCast.list[decideData(new Date())[0]].main.temp);
      fAnC['today1'] = [today1, CtoF(today1)];
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[0]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[0]].main.temp),
        'first',
        1
      );
      const today2 = KtoC(foreCast.list[decideData(new Date())[1]].main.temp);
      fAnC['today2'] = [today2, CtoF(today2)];
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[1]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[1]].main.temp),
        'second',
        2
      );
      const today3 = KtoC(foreCast.list[decideData(new Date())[2]].main.temp);
      fAnC['today3'] = [today3, CtoF(today3)];
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[2]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[2]].main.temp),
        'third',
        3
      );
      const today4 = KtoC(foreCast.list[decideData(new Date())[3]].main.temp);
      fAnC['today4'] = [today4, CtoF(today4)];
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[3]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[3]].main.temp),
        'fourth',
        4
      );
    })
    .catch(e => {});
};

export {
  getWeather,
  days,
  wetSymbls,
  getForecast,
  getFormattedStatus,
  modal,
  fAnC
};
