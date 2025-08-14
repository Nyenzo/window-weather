import rainBgDay from '../assets/rain-drops-2.png';
import cloudyBgDay from '../assets/cloudy-2.png';
import clearBgDay from '../assets/clear.jpg';
import snowBgDay from '../assets/snowy-1.png';
import thunderstormBgDay from '../assets/thunderstorm-1.png';
import drizzleBgDay from '../assets/rain-drops.png';
import mistBgDay from '../assets/mist-1.png';
import rainBgNight from '../assets/rainy-night.jpg';
import cloudyBgNight from '../assets/cloudy-night.jpg';
import clearBgNight from '../assets/clear-night.jpg';
import sunnyBgDay from '../assets/sunny.jpg';

export const weatherBackgrounds = {
    day: {
        rain: rainBgDay,
        clear: clearBgDay,
        clouds: cloudyBgDay,
        snow: snowBgDay,
        thunderstorm: thunderstormBgDay,
        drizzle: drizzleBgDay,
        mist: mistBgDay,
        sunny: sunnyBgDay,
        default: cloudyBgDay
    },
    night: {
        rain: rainBgNight,
        clear: clearBgNight,
        clouds: cloudyBgNight,
        snow: snowBgDay,
        thunderstorm: thunderstormBgDay,
        drizzle: rainBgNight,
        mist: mistBgDay,
        sunny: clearBgNight,
        default: cloudyBgNight
    }
};

export const getWeatherBackground = (weatherMain, isDay = true) => {
    const condition = weatherMain.toLowerCase();
    const timeOfDay = isDay ? 'day' : 'night';
    
    if (condition.includes('rain')) return weatherBackgrounds[timeOfDay].rain;
    if (condition.includes('clouds')) return weatherBackgrounds[timeOfDay].clouds;
    if (condition.includes('clear')) return weatherBackgrounds[timeOfDay].clear;
    if (condition.includes('snow')) return weatherBackgrounds[timeOfDay].snow;
    if (condition.includes('thunderstorm')) return weatherBackgrounds[timeOfDay].thunderstorm;
    if (condition.includes('drizzle')) return weatherBackgrounds[timeOfDay].drizzle;
    if (condition.includes('mist')) return weatherBackgrounds[timeOfDay].mist;
    if (condition.includes('sunny')) return weatherBackgrounds[timeOfDay].sunny;

    return weatherBackgrounds[timeOfDay].default;
}

export const isDayTime = (hour) => {
    return hour >= 5.5 && hour < 19;
}

export const popularCities = [
    'Nairobi',
    'New York',
    'London',
    'Tokyo',
    'Zanzibar',
    'Kampala'
];