const apiKey = 'ec82fe1c9624acc4d19d3ed5fccca6a5'; 

// Function to fetch weather data based on city name
async function fetchWeatherByCity(city) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeatherData(data);
}

// Function to fetch weather data based on coordinates (latitude and longitude)
async function fetchWeatherByCoords(lat, lon) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    displayWeatherData(data);
}

// Function to display the fetched weather data
function displayWeatherData(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === 200) {
        weatherInfo.innerHTML = `
            <p><strong>Location:</strong> ${data.name}, ${data.sys.country}</p>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    }
}

// Event listener for the form submission (user input city)
document.getElementById('locationForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const city = document.getElementById('locationInput').value;
    if (city) {
        fetchWeatherByCity(city);
    }
});

// Event listener for current location button
document.getElementById('currentLocationBtn').addEventListener('click', function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeatherByCoords(lat, lon);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
