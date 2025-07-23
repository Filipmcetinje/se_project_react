import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";

function Main({ weatherData, onCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  const temperature =
    currentTemperatureUnit === "F"
      ? weatherData.temperature
      : weatherData.temperatureC;

  return (
    <main>
      <WeatherCard
        temperature={weatherData.temperature}
        temperatureC={weatherData.temperatureC}
        weatherId={weatherData.weatherId}
        sunrise={weatherData.sunrise}
        sunset={weatherData.sunset}
        timestamp={weatherData.timestamp}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(temperature)}° {currentTemperatureUnit}/ You may
          want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
