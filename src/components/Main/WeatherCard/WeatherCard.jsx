import { useContext } from "react";

import "./WeatherCard.css";
import { getWeatherImage } from "../../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({
  temperature,
  temperatureC,
  weatherId,
  sunrise,
  sunset,
  timestamp,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const displayTemp =
    currentTemperatureUnit === "F" ? temperature : temperatureC;

  const imageSrc = getWeatherImage(weatherId, sunrise, sunset, timestamp);
  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.round(displayTemp)}° {currentTemperatureUnit}
      </p>
      <img src={imageSrc} alt="weather" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
