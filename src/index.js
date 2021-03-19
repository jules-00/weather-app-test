//Feature 1: Display the current date and time using JavaScript

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];

  let months = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];

  let currentMonth = months[date.getMonth()];

  let currentDate = date.getDate();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  let currentYear = date.getFullYear();

  return `${currentDay}, ${currentDate}.${currentMonth}.${currentYear}`;
}

function formatTime(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }
  return `${currentHour}:${currentMinute} local time`;
}

//Feature 2: Display a default city
function search(city) {
  let apiKey = "2b0b6250896d4e6a0a3b6c088976e629";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let url = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayWeatherCondition);
}

//Feature 3 new: Add a search engine, when searching for a city, display the city name on the page after the user submits the form.
function displayWeatherCondition(response) {
  document.querySelector("#selected-city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let feltTemperature = Math.round(response.data.main.feels_like);
  document.querySelector(
    "#felt-temperature"
  ).innerHTML = `feels like ${feltTemperature}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

//Feature 4: Current location button: When clicking on it, it uses the Geolocation API to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.

function searchLocation(position) {
  let apiKey = "2b0b6250896d4e6a0a3b6c088976e629";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

//call feature 1.1
let dateToday = document.querySelector("#current-date");
let currentDate = new Date();
dateToday.innerHTML = formatDate(currentDate);

//call feature 1.2
let actualTime = document.querySelector("#current-time");
let currentTime = new Date();
actualTime.innerHTML = formatTime(currentTime);

//call feature 2
search("Bern");

//call feature 3
let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSubmit);

//call feature 4
let currentLocationButton = document.querySelector("#location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
