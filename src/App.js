import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const weatherDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light intensity",
    53: "Drizzle: Moderate intensity",
    55: "Drizzle: Dense intensity",
    56: "Freezing drizzle: Light intensity",
    57: "Freezing drizzle: Dense intensity",
    61: "Rain: Slight intensity",
    63: "Rain: Moderate intensity",
    65: "Rain: Heavy intensity",
    66: "Freezing rain: Light intensity",
    67: "Freezing rain: Heavy intensity",
    71: "Snow fall: Slight intensity",
    73: "Snow fall: Moderate intensity",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight intensity",
    81: "Rain showers: Moderate intensity",
    82: "Rain showers: Violent intensity",
    85: "Snow showers: Slight intensity",
    86: "Snow showers: Heavy intensity",
    95: "Thunderstorm: Slight or moderate",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };

  const [longLat, setLongLat] = useState({latitude: null, longitude: null});
  const [weatherData, setWeatherData] = useState(null)


  useEffect (() => {
    if ("geolocation" in navigator){
      navigator.geolocation.getCurrentPosition(
        (position) =>{
          setLongLat({latitude: position.coords.latitude, longitude: position.coords.longitude});
        }
      )
    }
  }, []);

  useEffect(()=> {
    if(longLat.latitude && longLat.longitude){
      const fetchWeather = async () => {
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${longLat.latitude}&longitude=${longLat.longitude}&current=weather_code&timezone=auto&forecast_days=1`
          );
          console.log(response)
          const data = await response.json();
          setWeatherData(data); // Update weatherData with fetched data
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setWeatherData('ERROR')
        }
      };
      fetchWeather();
    }
  }, [longLat]);

  return (
    <div className="App">
      <h1>
        {longLat.latitude !== null && longLat.longitude !== null? `Your Location is:  ${longLat.latitude} ${longLat.longitude}`: 'Location Unkown'}
      </h1>
      <h2>
      {weatherData && weatherData.current && weatherData.current.weather_code
          ? `The Weather is: ${
              weatherDescriptions[weatherData.current.weather_code] || "Unknown"
            }`
          : weatherData === "ERROR"? "Error Loading Weather Data" : "Loading weather data..."}
      </h2>
    </div>
  );
}

export default App;
