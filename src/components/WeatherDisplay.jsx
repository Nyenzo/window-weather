import '../styles/WeatherDisplay.css';

function WeatherDisplay({ weatherData }) {
    
    
    const formatDateTime = () => {
        if (!weatherData.timezone) return '';
        // Get current UTC time in milliseconds
        const now = new Date();
        const utcMs = now.getTime() + (now.getTimezoneOffset() * 60000);
        // Add city timezone offset (in seconds)
        const cityMs = utcMs + weatherData.timezone * 1000;
        const cityDate = new Date(cityMs);
        const time = cityDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const date = cityDate.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
            year: '2-digit'
        });
        return `${time} - ${date}`;
    };

    const getTemperatureColor = (tempCelsius) => {
        if (tempCelsius >= 30) return 'var(--temp-hot)';
        if (tempCelsius >= 25) return 'var(--temp-warm)';
        if (tempCelsius >= 17) return 'var(--text-primary)';
        if (tempCelsius < 17) return 'var(--temp-cool)';
        return 'var(--temp-cold)';
    };

    const tempCelsius = Math.round(weatherData.main.temp - 273.15);
    const tempColor = getTemperatureColor(tempCelsius);

    return (
        <div className="weather-display">
            <div className="temperature" style={{ color: tempColor }}>
                {tempCelsius}°C
            </div>
            <div className="location-info">
                <h2 className="city-name">{weatherData.name}</h2>
                <div className="date-time">{formatDateTime()}</div>
                <div className="weather-condition">{weatherData.weather[0].main}
                </div>
            </div>
            <div className="weather-icon">
                <img
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={weatherData.weather[0].description}
                />
            </div>
        </div>
    )
}

export default WeatherDisplay