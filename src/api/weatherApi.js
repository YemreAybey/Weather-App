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
    `http://api.openweathermap.org/data/2.5/weather?q=${name.toUpperCase()}&APPID=0f695179f8524df704f661f75ece5bb7`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json();
    })
    .then(weather => {
      console.log(weather);
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
    `http://api.openweathermap.org/data/2.5/forecast?q=${name.toUpperCase()}&APPID=0f695179f8524df704f661f75ece5bb7`,
    { mode: 'cors' }
  )
    .then(response => {
      return response.json();
    })
    .then(foreCast => {
      console.log(foreCast);
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[0]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[0]].main.temp),
        'first',
        1
      );
      console.log(foreCast.list[decideData(new Date())[1]].weather[0].main);
      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[1]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[1]].main.temp),
        'second',
        2
      );

      renderOtherDays(
        getFormattedStatus(
          foreCast.list[decideData(new Date())[2]].weather[0].main
        ),
        KtoC(foreCast.list[decideData(new Date())[2]].main.temp),
        'third',
        3
      );

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

const getData = async name => {
  const weatherData = await getWeather(name);
  const foreCastData = await getForecast(name);
  return [weatherData, foreCastData];
};

export {
  getWeather,
  getData,
  days,
  wetSymbls,
  getForecast,
  getFormattedStatus,
  modal
};
