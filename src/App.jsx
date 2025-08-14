import { useEffect } from 'react';
import { useState } from 'react';
import { getWeatherBackground, popularCities, isDayTime } from './utils/weatherUtils';
import WeatherDisplay from './components/WeatherDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SearchBar from './components/SearchBar';
import PopularCities from './components/PopularCities';
import WeatherDetails from './components/WeatherDetails';
import SupplementaryWeather from './components/SupplementaryWeather';
import './styles/base.css';

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App(){
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchCity, setSearchCity] = useState('Nairobi');
  const [error, setError] = useState(null);
  const [isDay, setIsDay] = useState(true);

  const fetchWeatherData = async (city) => {
    setLoading(true);
    setError(null); 
    try{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`);
      console.log(response);
      if (!response.ok) {
          throw new Error(response.statusText);

      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
  } catch (err) {
      setError(err.message);
      setWeatherData(null);
  } finally {
      setLoading(false);
  }
}

  
  useEffect(() => {
     fetchWeatherData(searchCity);
}, []);

useEffect(() => {
  if (weatherData) {
    const now = new Date();
    const timezoneOffset = weatherData.timezone || 0;
    const cityLocalTime = new Date(now.getTime() + (timezoneOffset * 1000));
    const cityHour = cityLocalTime.getUTCHours();
    const dayStatus = isDayTime(cityHour);
    setIsDay(dayStatus);
  }
}, [weatherData]);

const handleSearch = (e) => {
  e.preventDefault();
  if(searchCity.trim()) {
    fetchWeatherData(searchCity.trim());
  }
}

const handleCitySelect = (city) => {
  setSearchCity(city);
  fetchWeatherData(city);
}



const currentBackground = weatherData
    ? getWeatherBackground(weatherData.weather[0].main, isDay)
    : getWeatherBackground('default', isDay);

  return (
    <div className='weather-app'
    style = {{backgroundImage: `url(${currentBackground})`}}>
      {/*left-side*/}
      <div className='main-weather'>
        <div className='app-title'>Welcome to the Weather App</div>

        <SupplementaryWeather />

        {loading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}

        {
          weatherData && (
            <WeatherDisplay weatherData={weatherData} />
          )
        }
      </div>
      {/*right-side* -search and details*/}
      <div className='sidebar'>
        <SearchBar 
        searchCity={searchCity} 
        setSearchCity={setSearchCity}
        handleSearch={handleSearch} />
        {/* popular cities*/}
        <PopularCities
          cities={popularCities}
          onCitySelect={handleCitySelect}
        />

        {/* Weather Details */}
        <WeatherDetails 
        weatherData={weatherData} 
        />
      </div>
    </div>
  );
};

export default App;