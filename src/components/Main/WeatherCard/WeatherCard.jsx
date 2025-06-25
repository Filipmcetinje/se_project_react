import "./WeatherCard.css";
import { getWeatherImage } from "../../../utils/weatherApi";

function WeatherCard({ temperature, weatherId, sunrise, sunset, timestamp }) {
  const imageSrc = getWeatherImage(weatherId, sunrise, sunset, timestamp);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">{Math.round(temperature)}° F</p>
      <img src={imageSrc} alt="weather" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
