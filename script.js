const form = document.querySelector('form');
const apiKey = '84265e61a5d2ab466a0e7436f38ec9b9';
let weatherInfo;
const s = window.location.protocol=='https:' ? 's' : '';

form.onsubmit = function(event) {
  event.preventDefault();
  const location = event.target.firstElementChild.value;

  fetch(`http${s}://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`, {mode: 'cors'}).then(res => res.json()).then(res => processWeatherJSON(res)).catch((err => {
    document.querySelector('.weatherLocation').textContent = 'Failed. Try again.';
    document.querySelector('.weather').textContent = 'Failed. Try again.';
    document.querySelector('.weatherTemp').textContent = 'Failed. Try again.';
  }));
  document.querySelector('.weatherLocation').textContent = 'Loading...';
  document.querySelector('.weather').textContent = 'Loading...';
  document.querySelector('.weatherTemp').textContent = 'Loading...';
  document.querySelector('.weatherIcon img').src = '';
}

function processWeatherJSON (weatherJSON) {
  weatherInfo = {};
  weatherInfo.temperatureF = Math.floor((weatherJSON.main.temp - 273.15) * (9/5) + 32);// + 'ºF';
  weatherInfo.weather = weatherJSON.weather[0].main;
  weatherInfo.name = weatherJSON.name;
  weatherInfo.wind = weatherJSON.wind;
  weatherInfo.coord = weatherJSON.coord;
  weatherInfo.iconURL = 'http://openweathermap.org/img/wn/' + weatherJSON.weather[0].icon + '@4x.png'

  displayWeather();
}

function displayWeather() {
  document.querySelector('.weatherTemp').textContent = weatherInfo.temperatureF + '°F';
  document.querySelector('.weatherLocation').textContent = weatherInfo.name;
  document.querySelector('.weather').textContent = weatherInfo.weather;
  document.querySelector('.weatherIcon img').src = weatherInfo.iconURL;
}