import '../styles/PopularCities.css'
function PopularCities({ cities, onCitySelect }) {
  return (
    <div className='popular-cities'>
        {cities.map((city) => (
            <button
                key={city}
                onClick={() => onCitySelect(city)}
                className='city-button'
            >
                {city}
            </button>
        ))}
    </div>
  );
}

export default PopularCities;
