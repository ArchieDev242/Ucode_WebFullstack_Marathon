document.addEventListener('DOMContentLoaded', function() 
{
    const api_key = 'bed91c8c081460ad88db2301b2a20057';
    const city = encodeURIComponent('San Francisco');
    const api_url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${api_key}`;

    fetch(api_url)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log('Raw API data:', data);

            const forecast_container = document.getElementById('forecast_container');
            const daily_forecasts = {};

            data.list.forEach(forecast => {
                const date = new Date(forecast.dt * 1000);
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const date_key = `${day}.${month}`;

                if(!daily_forecasts[date_key]) 
                    {
                    daily_forecasts[date_key] = {
                        temps: [],
                        weather_conditions: []
                    };
                }

                daily_forecasts[date_key].temps.push(forecast.main.temp);
                daily_forecasts[date_key].weather_conditions.push(forecast.weather[0].main);
            });

            const processed_forecasts = {};

            Object.keys(daily_forecasts).forEach(date_key => {
                const temps = daily_forecasts[date_key].temps;
                const weather_conditions = daily_forecasts[date_key].weather_conditions;

                const avg_temp = temps.length > 0 
                    ? Math.round(temps.reduce((sum, temp) => sum + temp, 0) / temps.length)
                    : '--';

                const weather_count = {};

                weather_conditions.forEach(condition => {
                    weather_count[condition] = (weather_count[condition] || 0) + 1;
                });

                const most_frequent_weather = Object.keys(weather_count).reduce((a, b) => 
                    weather_count[a] > weather_count[b] ? a : b
                );

                processed_forecasts[date_key] = {
                    temp: avg_temp,
                    weather: most_frequent_weather
                };
            });

            const today = new Date();

            const forecast_dates = Array.from({ length: 5 }, (_, i) => {
                const date = new Date(today);
                date.setDate(today.getDate() + i);
                return date;
            });

            forecast_dates.forEach(date => {
                const day = String(date.getDate()).padStart(2, '0');
                const month = String(date.getMonth() + 1).padStart(2, '0');
                const date_string = `${day}.${month}`;

                const forecast_data = processed_forecasts[date_string] || { 
                    temp: '--', 
                    weather: 'Clear' 
                };

                const icon_class = get_icon_class(forecast_data.weather);
                
                const card = document.createElement('div');

                card.className = 'forecast-day';
                card.innerHTML = `
                    <p class="date">${date_string}</p>
                    <div class="weather-icon ${icon_class}"></div>
                    <p class="temp">${forecast_data.temp}°C</p>
                `;
                forecast_container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            const forecast_container = document.getElementById('forecast_container');
            forecast_container.innerHTML = `
                <p class="error">⚠️ Error:<br>
                ${error.message}</p>
            `;
        });

    function get_icon_class(weather) 
    {
        const icon_map = {
            'Rain': 'icon-cloud-rain',
            'Clouds': 'icon-clouds',
            'Clear': 'icon-sun',
            'Snow': 'icon-cloud-rain',
            'Drizzle': 'icon-cloud-rain',
            'Thunderstorm': 'icon-cloud-rain',
            'Mist': 'icon-clouds',
            'Fog': 'icon-clouds'
        };

        return icon_map[weather] || 'icon-sun';
    }
});