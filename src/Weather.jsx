import { useState } from "react";
import "./weather.css";

import sun from "./assets/sun.png";
import cloud from "./assets/cloud.png";
import rain from "./assets/rain.png";
import snow from "./assets/snow.png";
import storm from "./assets/storm.png";

const API_KEY = "83d9fb189b0fc436c2fe8b47f079616d";

function Weather() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );

      if (!res.ok) {
        setError("City not found");
        setWeather(null);
        return;
      }

      const data = await res.json();
      setWeather(data);
      setError("");
    } catch {
      setError("Something went wrong");
    }
  };

  const getWeatherImage = () => {
  if (!weather) return null;

  const condition = weather.weather[0].main;

  switch (condition) {
    case "Clear":
      return sun;

    case "Clouds":
      return cloud;

    case "Rain":
    case "Drizzle":
      return rain;

    case "Snow":
      return snow;

    case "Thunderstorm":
      return storm;

    case "Mist":
    case "Smoke":
    case "Haze":
    case "Fog":
    case "Dust":
    case "Sand":
    case "Ash":
      return cloud; // best visual match

    default:
      return cloud;
  }
};


  return (
    <div className="app">
      <input
        className="search"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
      />

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="card">
          <img src={getWeatherImage()} alt="weather" className="icon" />

          <div className="details">
            <p className="today">Today</p>
            <h1>{weather.name}</h1>
            <p>Temperature: {Math.round(weather.main.temp)}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
