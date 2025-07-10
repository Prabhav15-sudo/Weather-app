const apiKey = "YOUR_API_KEY_HERE";
const weatherInfo = document.getElementById('weatherInfo');
const searchForm = document.getElementById('searchForm');
const cityInput = document.getElementById('cityInput');

// Function to fetch weather by city name
async function getWeatherByCity(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Function to fetch weather by coordinates
function getWeatherByLocation(lat, lon) {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// Function to fetch and display weather data
async function fetchWeather(url) {
  weatherInfo.innerHTML = `<p>Fetching weather...</p>`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod !== 200) {
      weatherInfo.innerHTML = `<p>City not found. Try again.</p>`;
      return;
    }

    const html = `
      <h2>${data.name}, ${data.sys.country}</h2>
      <p><strong>Condition:</strong> ${data.weather[0].main}</p>
      <p><strong>Temperature:</strong> ${data.main.temp}°C</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = html;
  } catch (err) {
    weatherInfo.innerHTML = `<p>Error retrieving data.</p>`;
  }
}

// Get user's location on load
window.onload = function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      getWeatherByLocation(latitude, longitude);
    }, () => {
      weatherInfo.innerHTML = "<p>Please enter a city name to get weather.</p>";
    });
  }
};

// Handle search form
searchForm.addEventListener('submit', e => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeatherByCity(city);
    cityInput.value = '';
  }
});
