// Function to get the current day of the week
function getDayOfWeek(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[date.getDay()];
}

// Function to format the date as "28July"
function getFormattedDate(date) {
    const day = date.getDate();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const month = months[date.getMonth()];
    return `${day}${month}`;
}

// Function to determine if it's currently night
function isNight(sunrise, sunset) {
    const now = new Date();
    const sunriseTime = new Date();
    const [sunriseHours, sunriseMinutes] = sunrise.split(':');
    sunriseTime.setHours(sunriseHours, sunriseMinutes);

    const sunsetTime = new Date();
    const [sunsetHours, sunsetMinutes] = sunset.split(':');
    sunsetTime.setHours(sunsetHours, sunsetMinutes);

    return now < sunriseTime || now > sunsetTime;
}

// Function to fetch and display weather data
function fetchWeatherData(city) {
    fetch(`https://api.weatherapi.com/v1/forecast.json?key=f6f2f39cf8b44ee98e564050242807&q=${city}&days=3`)
        .then(response => response.json())
        .then(data => {
            // Extract and display data for each day
            for (let i = 0; i < 3; i++) {
                const forecast = data.forecast.forecastday[i];
                const date = new Date(forecast.date);
                const day = getDayOfWeek(date);
                const formattedDate = getFormattedDate(date);
                const location = data.location.name;
                const temp_c = forecast.day.avgtemp_c;
                const max_temp = forecast.day.maxtemp_c;
                const min_temp = forecast.day.mintemp_c;
                const condition = forecast.day.condition.text;
                const icon = forecast.day.condition.icon;
                const wind_kph = forecast.day.maxwind_kph;
                const precipitation = forecast.day.totalprecip_mm;
                const humidity = forecast.day.avghumidity;
                const sunrise = forecast.astro.sunrise;
                const sunset = forecast.astro.sunset;

                let iconUrl = "https:" + icon;
                if (isNight(sunrise, sunset)) {
                    iconUrl = "path/to/moon_icon.png"; // Replace with your moon icon path
                }

                document.getElementById(`day${i + 1}`).textContent = day;
                document.getElementById(`condition${i + 1}`).textContent = condition;
                document.getElementById(`condition_icon${i + 1}`).src = iconUrl;

                if (i === 0) {
                    document.getElementById(`date1`).textContent = formattedDate;
                    document.getElementById(`location1`).textContent = location;
                    document.getElementById(`temperature1`).textContent = Math.round(temp_c);
                    document.getElementById(`wind1`).textContent = Math.round(wind_kph) + " kph";
                    document.getElementById(`precipitation1`).textContent = precipitation + "%";
                    document.getElementById(`humidity1`).textContent = humidity + "%";
                } else {
                    document.getElementById(`max_temp${i + 1}`).textContent = Math.round(max_temp);
                    document.getElementById(`min_temp${i + 1}`).textContent = Math.round(min_temp);
                }
            }
        })
        .catch(error => console.log("Error fetching weather data:", error));
}

// Add event listener to the search button
document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        fetchWeatherData(city);
    }
});

// Fetch initial weather data for a default city
fetchWeatherData('Cairo');
