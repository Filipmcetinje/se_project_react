import "./Main.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import ItemCard from "./ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";

function Main({ weatherData, onCardClick }) {
  return (
    <main>
      <WeatherCard
        temperature={weatherData.temperature}
        weatherId={weatherData.weatherId}
        sunrise={weatherData.sunrise}
        sunset={weatherData.sunset}
        timestamp={weatherData.timestamp}
      />
      <section className="cards">
        <p className="cards__text">
          Today is {Math.round(weatherData.temperature)}° F/ You may want to
          wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard key={item._id} item={item} onClick={onCardClick} />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
