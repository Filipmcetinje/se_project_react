import { APIkey, latitude, longitude } from "./constants";

import sunny from "../assets/sunny.svg";
import night from "../assets/night.svg";
import cloudy from "../assets/cloudy.svg";
import nightCloudy from "../assets/night-cloudy.svg";
import rain from "../assets/rain.svg";
import nightRain from "../assets/night-rain.svg";
import storm from "../assets/storm.svg";
import nightStorm from "../assets/night-storm.svg";

export const fetchWeatherData = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch weather data");
    }
    return res.json();
  });
};
export const getWeatherType = (temperature) => {
  if (temperature >= 86) {
    return "hot";
  } else if (temperature >= 66) {
    return "warm";
  } else {
    return "cold";
  }
};
export const getWeatherImage = (weatherId, sunrise, sunset, currentTime) => {
  const isDaytime = currentTime >= sunrise && currentTime < sunset;

  if (weatherId >= 200 && weatherId < 300) {
    return isDaytime ? storm : nightStorm;
  } else if (weatherId >= 300 && weatherId < 600) {
    return isDaytime ? rain : nightRain;
  } else if (weatherId >= 600 && weatherId < 700) {
    return isDaytime ? cloudy : nightCloudy;
  } else if (weatherId === 800) {
    return isDaytime ? sunny : night;
  } else if (weatherId > 800) {
    return isDaytime ? cloudy : nightCloudy;
  } else {
    return isDaytime ? sunny : night; 
  }
};
