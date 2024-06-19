const apiKey = '0ef7e66503dbfcc1cbd1d6101e52d070'; // Replace with your actual OpenWeatherMap API key

function getWeatherByInput() {
    const location = document.getElementById('location-input').value;
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Location not found');
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('weatherData', JSON.stringify(data));
                window.location.href = 'weather.html';
            })
            .catch(error => showError('Error fetching weather data: ' + error.message));
    } else {
        showError('Please enter a location');
    }
}

function showError(message) {
    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = message;
}

function displayWeather(data) {
    document.getElementById('city').textContent = data.name.toUpperCase();
    var temp = Math.round(data.main.temp);
    document.getElementById('temp').textContent = `${temp}°C`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('feel').textContent = `Feels like ${data.main.feels_like}°C`;
    document.getElementById('pressure').textContent = `Pressure: ${data.main.pressure} hPa`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('visibility').textContent = `Visibility: ${data.visibility} m`;
    document.getElementById('wind-speed').textContent = `Wind speed: ${data.wind.speed} m/s`;
    document.getElementById('wind-degree').textContent = `Wind degree: ${data.wind.deg}°`;
    document.getElementById('sunrise').textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
    document.getElementById('sunset').textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
    document.getElementById('country').textContent = `Country: ${data.sys.country}`;
    document.getElementById('lat').textContent = `Latitude: ${data.coord.lat}`;
    document.getElementById('long').textContent = `Longitude: ${data.coord.lon}`;

     // Calculate local time, day, and date
     const timezoneOffsetInSeconds = data.timezone-19800;
     const utcTimestamp = data.dt*1000;
     const localTimestamp = utcTimestamp + (timezoneOffsetInSeconds*1000);
     const localDate = new Date(localTimestamp);
     const dayOptions = { weekday: 'long' };
     const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
 
     document.getElementById('day').textContent = localDate.toLocaleDateString(undefined, dayOptions);
     document.getElementById('date').textContent = localDate.toLocaleDateString(undefined, dateOptions);
     document.getElementById('time').textContent = localDate.toLocaleTimeString();

    // Set background image according to weather description
    const Wallpaper = document.getElementById('wallpaper');
    const weatherIcon = document.getElementById('icon');
    const weatherBody = document.getElementsByClassName('weatherbody');

    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = "./images/clouds.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/cloudwall.webp')";
    }
    if(data.weather[0].main == 'Clear'){
        weatherIcon.src = "./images/clear.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/clearwall.webp')";
    }
    if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = "./images/drizzle.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/drizzlewall.jpg')";
    }
    if(data.weather[0].main == 'Mist'){
        weatherIcon.src = "./images/mist.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/mistwall.jpg')";
    }
    if(data.weather[0].main == 'Rain'){
        weatherIcon.src = "./images/rain.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/rainwall.jpg')";
    }
    if(data.weather[0].main == 'Snow'){
        weatherIcon.src = "./images/snow.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/snowall.jpg')";
    }
    if(data.weather[0].main == 'Haze' || data.weather[0].main == 'Dust'){
        weatherIcon.src = "./images/haze.png";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/hazewall.webp')";
    }
    if(data.weather[0].main == 'Thunderstorm'){
        weatherIcon.src = "./images/thunderstorm.jpg";
        document.getElementById('weatherbody').style.backgroundImage = "url('./images/thunderstormwall.jpg')";
    }

   
}

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.pathname.includes('weather.html')) {
        const weatherData = localStorage.getItem('weatherData');
        if (weatherData) {
            const parsedData = JSON.parse(weatherData);
            displayWeather(parsedData);
        }
    }
});

