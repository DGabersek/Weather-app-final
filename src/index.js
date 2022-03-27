//Search Engine

function showCurrentWeather(response) {
  console.log(response.data);
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
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#input-city");
  let h1 = document.querySelector("h1");
  h1.innerHTML = searchInput.value;

  searchCity(searchInput.value);
}

function searchCity(city) {
  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeather);
}

//Current weather description icon
function showCurrentWeatherIcon(response) {
  let currentWeatherDescriptionIcon = response.data.weather[0].icon;
  let currentWeatherIcon = document.querySelector("#current-weather-icon");
  if (currentWeatherDescriptionIcon === "clear sky");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-sun"></i>;
  if (currentWeatherDescriptionIcon === "few clouds");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-cloud-sun"></i>;
  if (currentWeatherDescriptionIcon === "scattered clouds" && "broken clouds");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-cloud"></i>;
  if (currentWeatherDescriptionIcon === "shower rain");
  currentWeatherIcon.innerHTML = (
    <i class="fa-solid fa-cloud-showers-heavy"></i>
  );
  if (currentWeatherDescriptionIcon === "rain");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-cloud-sun-rain"></i>;
  if (currentWeatherDescriptionIcon === "thunderstorm");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-cloud-bolt"></i>;
  if (currentWeatherDescriptionIcon === "snow");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-snowflake"></i>;
  if (currentWeatherDescriptionIcon === "mist");
  currentWeatherIcon.innerHTML = <i class="fa-solid fa-bars-staggered"></i>;

  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let currentWeatherIconUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentWeatherDescriptionIcon}&appid=${apiKey}`;

  axios
    .get(`${currentWeatherIconUrl}&appid=${apiKey}`)
    .then(showCurrentWeatherIcon);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", enterCity);

//Current Location button
function findPosition(position) {
  let apiKey = "b40c21ef5c00549b637618fc8306ed3b";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let myLocationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(`${myLocationUrl}&appid=${apiKey}`).then(showMyLocation);
}

function showMyLocation(response) {
  let cityName = response.data.name;
  //console.log(cityName);
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

let myLocationButton = document.querySelector("#my-location-button");
myLocationButton.addEventListener("click", showMyLocationWeather);

//Date and hour
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

//Temperature unit change
function showFahrenheit(event) {
  event.preventDefault();
  let changeTempFahr = document.querySelector("#temperature");
  changeTempFahr.innerHTML = "37";
}

let tempFahr = document.querySelector("#fahrenheit-link");
tempFahr.addEventListener("click", showFahrenheit);

function showCelsius(event) {
  event.preventDefault();
  let changeTempCel = document.querySelector("#temperature");
  changeTempCel.innerHTML = "3";
}

let tempCel = document.querySelector("#celsius-link");
tempCel.addEventListener("click", showCelsius);
