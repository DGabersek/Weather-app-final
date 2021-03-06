function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
      <div class="row mb-2 day-one">
        <div class="col-4">
          <p class="forecast-text">${formatDay(forecastDay.dt)}</p>
        </div>
        <div class="col-4 day-one-icon">
          ${showCurrentWeatherIcon(forecastDay.weather[0].description)}
        </div>
        <div class="col-2">
          <span class="forecast-text-min">${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
        <div class="col-2">
          <span class="forecast-text">${Math.round(
            forecastDay.temp.max
          )}°</span>
        </div>
        </div>
      
      `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showCurrentWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = currentTemp;

  let weatherDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#current-description");
  descriptionElement.innerHTML = weatherDescription;

  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#current-humidity");
  humidityElement.innerHTML = `Humidity: ${humidity} %`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#current-wind");
  windElement.innerHTML = `Wind: ${windSpeed} km/h`;

  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  currentWeatherIcon.innerHTML = showCurrentWeatherIcon(weatherDescription);

  let currentQuote = document.querySelector("#weather-quote");
  currentQuote.innerHTML = showCurrentQuote(weatherDescription);

  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeather);
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

function showCurrentWeatherIcon(currentWeatherDescriptionIcon) {
  let currentWeatherIcon = "";
  if (currentWeatherDescriptionIcon === "clear sky") {
    currentWeatherIcon = `<i class="fa-solid fa-sun"></i>`;
  } else if (currentWeatherDescriptionIcon === "few clouds") {
    currentWeatherIcon = `<i class="fa-solid fa-cloud-sun"></i>`;
  } else if (
    currentWeatherDescriptionIcon === "scattered clouds" ||
    currentWeatherDescriptionIcon === "broken clouds" ||
    currentWeatherDescriptionIcon === "overcast clouds"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-cloud"></i>`;
  } else if (
    currentWeatherDescriptionIcon === "shower rain" ||
    currentWeatherDescriptionIcon === "light intensity drizzle" ||
    currentWeatherDescriptionIcon === "drizzle" ||
    currentWeatherDescriptionIcon === "heavy intensity drizzle" ||
    currentWeatherDescriptionIcon === "light intensity drizzle rain" ||
    currentWeatherDescriptionIcon === "drizzle rain" ||
    currentWeatherDescriptionIcon === "heavy intensity drizzle rain" ||
    currentWeatherDescriptionIcon === "shower rain and drizzle" ||
    currentWeatherDescriptionIcon === "heavy shower rain and drizzle" ||
    currentWeatherDescriptionIcon === "shower drizzle" ||
    currentWeatherDescriptionIcon === "light intensity shower rain" ||
    currentWeatherDescriptionIcon === "heavy intensity shower rain" ||
    currentWeatherDescriptionIcon === "ragged shower rain"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-cloud-showers-heavy"></i>`;
  } else if (
    currentWeatherDescriptionIcon === "rain" ||
    currentWeatherDescriptionIcon === "light rain" ||
    currentWeatherDescriptionIcon === "moderate rain" ||
    currentWeatherDescriptionIcon === "heavy intensity rain" ||
    currentWeatherDescriptionIcon === "extreme rain"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-cloud-sun-rain"></i>`;
  } else if (
    currentWeatherDescriptionIcon === "thunderstorm" ||
    currentWeatherDescriptionIcon === "thunderstorm with light rain" ||
    currentWeatherDescriptionIcon === "thunderstorm with rain" ||
    currentWeatherDescriptionIcon === "thunderstorm with heavy rain" ||
    currentWeatherDescriptionIcon === "light thunderstorm" ||
    currentWeatherDescriptionIcon === "heavy thunderstorm" ||
    currentWeatherDescriptionIcon === "ragged thunderstorm" ||
    currentWeatherDescriptionIcon === "thunderstorm with light drizzle" ||
    currentWeatherDescriptionIcon === "thunderstorm with drizzle" ||
    currentWeatherDescriptionIcon === "thunderstorm with heavy drizzle"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-cloud-bolt"></i>`;
  } else if (
    currentWeatherDescriptionIcon === "snow" ||
    currentWeatherDescriptionIcon === "freezing rain" ||
    currentWeatherDescriptionIcon === "light snow" ||
    currentWeatherDescriptionIcon === "heavy snow" ||
    currentWeatherDescriptionIcon === "sleet" ||
    currentWeatherDescriptionIcon === "light shower sleet" ||
    currentWeatherDescriptionIcon === "shower sleet" ||
    currentWeatherDescriptionIcon === "light rain and snow" ||
    currentWeatherDescriptionIcon === "rain and snow" ||
    currentWeatherDescriptionIcon === "light shower snow" ||
    currentWeatherDescriptionIcon === "shower snow" ||
    currentWeatherDescriptionIcon === "heavy shower snow"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-snowflake"></i>`;
  }
  if (
    currentWeatherDescriptionIcon === "mist" ||
    currentWeatherDescriptionIcon === "smoke" ||
    currentWeatherDescriptionIcon === "haze" ||
    currentWeatherDescriptionIcon === "sand/ dust whirls" ||
    currentWeatherDescriptionIcon === "fog" ||
    currentWeatherDescriptionIcon === "sand" ||
    currentWeatherDescriptionIcon === "dust" ||
    currentWeatherDescriptionIcon === "volcanic ash" ||
    currentWeatherDescriptionIcon === "squalls" ||
    currentWeatherDescriptionIcon === "tornado"
  ) {
    currentWeatherIcon = `<i class="fa-solid fa-bars-staggered"></i>`;
  }

  return currentWeatherIcon;
}

function showCurrentQuote(currentWeatherDescriptionIcon) {
  let currentQuote = "";
  if (
    currentWeatherDescriptionIcon === "clear sky" ||
    currentWeatherDescriptionIcon === "few clouds"
  ) {
    currentQuote = "Weather today is perfect for a trip! 😎";
  } else if (
    currentWeatherDescriptionIcon === "rain" ||
    currentWeatherDescriptionIcon === "shower rain"
  ) {
    currentQuote = "Don't forget your umbrella! 🌂";
  } else if (currentWeatherDescriptionIcon === "snow") {
    currentQuote = "Time for a cup of tea and a good book! 📖";
  } else {
    currentQuote = "Have an excellent day! 🤗";
  }

  return currentQuote;
}

function findPosition(position) {
  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let myLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${myLocationUrl}&appid=${apiKey}`).then(showMyLocation);
}

function showMyLocation(response) {
  let cityName = response.data.name;
  let h1 = document.querySelector("#searched-city");
  h1.innerHTML = cityName;

  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let myLocationCityUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

  axios.get(`${myLocationCityUrl}&appid=${apiKey}`).then(showCurrentWeather);
}

function showMyLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findPosition);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", showMyLocationWeather);

let now = new Date();

let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

h2.innerHTML = `${day}, ${hour}:${minutes}`;

searchCity("Ljubljana");
