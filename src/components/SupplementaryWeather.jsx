import { useState, useEffect } from 'react';
import '../styles/SupplementaryWeather.css';

function SupplementaryWeather() {
  const [editingModule, setEditingModule] = useState(null);
  const [editLocation, setEditLocation] = useState('');
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState({});
  
  const [defaultLocations, setDefaultLocations] = useState([
    'Nakuru',
    'Mombasa', 
    'Kakamega'
  ]);

  const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeatherData = async (city) => {
    if (weatherData[city]) return; 
    
    setLoading(prev => ({ ...prev, [city]: true }));
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`);
      if (response.ok) {
        const data = await response.json();
        setWeatherData(prev => ({
          ...prev,
          [city]: {
            temp: Math.round(data.main.temp - 273.15),
            condition: data.weather[0].main,
            icon: data.weather[0].icon
          }
        }));
      }
    } catch (error) {
      console.error(`Error fetching weather for ${city}:`, error);
    } finally {
      setLoading(prev => ({ ...prev, [city]: false }));
    }
  };

  useEffect(() => {
    defaultLocations.forEach(city => {
      fetchWeatherData(city);
    });
  }, [defaultLocations]);

  const handleModuleClick = (cityName) => {
    if (editingModule !== null) return; 
    
    
    setEditingModule(cityName);
    setEditLocation(cityName);
  };

  const handleSaveLocation = (oldCity) => {
    if (editLocation.trim() && editLocation.trim() !== oldCity) {
      const updatedLocations = defaultLocations.map(city => 
        city === oldCity ? editLocation.trim() : city
      );
      setDefaultLocations(updatedLocations);
      
      const newWeatherData = { ...weatherData };
      delete newWeatherData[oldCity];
      setWeatherData(newWeatherData);
      
      fetchWeatherData(editLocation.trim());
    }
    setEditingModule(null);
    setEditLocation('');
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
    setEditLocation('');
  };


  return (
    <div className="supplementary-weather">
      {defaultLocations.map((city, index) => {
        const cityData = weatherData[city];
        const isLoading = loading[city];
        
        return (
          <div key={index} className="weather-module-container">
            <div 
              className={`weather-module ${editingModule === city ? 'editing' : ''}`}
              onClick={() => handleModuleClick(city)}
            >
              <div className="module-city">{city}</div>
              {isLoading ? (
                <div className="module-loading">Loading...</div>
              ) : cityData ? (
                <>
                  <div className="module-temp">{cityData.temp}°C</div>
                  <div className="module-condition">{cityData.condition}</div>
                  <div className="module-icon">
                    <img
                      src={`https://openweathermap.org/img/wn/${cityData.icon}.png`}
                      alt={cityData.condition}
                    />
                  </div>
                </>
              ) : (
                <div className="module-error">Error</div>
              )}
            </div>

            {editingModule === city && (
              <div className="edit-popup">
                <div className="popup-content">
                  <h4>Edit Location</h4>
                  <input
                    type="text"
                    value={editLocation}
                    onChange={(e) => setEditLocation(e.target.value)}
                    placeholder="Enter city name"
                    className="edit-input"
                    autoFocus
                  />
                  <div className="popup-buttons">
                    <button 
                      className="save-btn"
                      onClick={() => handleSaveLocation(city, editLocation)}
                    >
                      Save
                    </button>
                    <button 
                      className="cancel-btn"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default SupplementaryWeather;
