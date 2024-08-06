const weatherCity = document.querySelector('.weather_city');
const weatherDateTime = document.querySelector('.weather_date_time');
const weatherForecast = document.querySelector('.weather_forecast');
const weatherIcon = document.querySelector('.weather_icon');
const weatherTemperature = document.querySelector('.weather_temperature');
const weatherMin = document.querySelector('.weather_min');
const weatherMax = document.querySelector('.weather_max');
const weatherHumidity = document.querySelector('.weather_humidity');
const weatherFeelsLike = document.querySelector('.weather_feelsLike');
const weatherWind = document.querySelector('.weather_wind');
const weatherPressure = document.querySelector('.weather_pressure');
const searchCity = document.querySelector('.weather_search');

let city = 'delhi';

// Function to convert country code to full name
function getCountryName(code) {
    return new Intl.DisplayNames(['en'], { type: 'region' }).of(code);
}

// Function to format date
function getWeatherdate(dt) {
    const newDate = new Date(dt * 1000);
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    };
    return new Intl.DateTimeFormat('en-US', options).format(newDate);
}

const getWeatherData = async () => {
    try {
        const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=ef941ac22f0112bb0ecd2c4f16f13196`;
        const res = await fetch(weatherAPI);
        const data = await res.json();
        const { main, name, weather, wind, sys, dt } = data;
        console.log(data);

        const tempCelsius = (main.temp - 273.15).toFixed(1); // Convert from Kelvin to Celsius
        const tempMinCelsius = (main.temp_min - 273.15).toFixed(1);
        const tempMaxCelsius = (main.temp_max - 273.15).toFixed(1);
        const feelsLikeCelsius = (main.feels_like - 273.15).toFixed(1);

        weatherCity.innerHTML = `${name}, ${getCountryName(sys.country)}`; // City and country
        weatherDateTime.innerHTML = getWeatherdate(dt); // Date and time
        weatherTemperature.innerHTML = `${tempCelsius} \u00B0C`; // Current temperature
        weatherMin.innerHTML = `Min: ${tempMinCelsius} \u00B0C`; // Minimum temperature
        weatherMax.innerHTML = `Max: ${tempMaxCelsius} \u00B0C`; // Maximum temperature
        weatherHumidity.innerHTML = `${main.humidity}%`; // Humidity
        weatherFeelsLike.innerHTML = `${feelsLikeCelsius} \u00B0C`; // Feels like temperature
        weatherWind.innerHTML = `${wind.speed} m/s`; // Wind speed
        weatherPressure.innerHTML = `${main.pressure} hPa`; // Pressure
        weatherForecast.innerHTML = `${weather[0].description}`;  // Forecast
        weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon">`; // Weather icon

    } catch (error) {
        console.log('There is an error, please check your internet: ' + error);
    }
};

// Event listener for the search form
searchCity.addEventListener('submit', (formData) => {
    formData.preventDefault();
    let cityInput = document.querySelector('.city_name');
    let cityData = cityInput.value; // Update the city variable
    // console.log(cityData)
    city = cityData;
    getWeatherData();
    cityInput.value = '';
    
});

window.addEventListener('load', getWeatherData); // Load weather data on page load
