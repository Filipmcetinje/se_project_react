import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import Footer from "../Footer/Footer";
import { fetchWeatherData, getWeatherType } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("preview");
  };

  useEffect(() => {
    fetchWeatherData()
      .then((data) => {
        const temp = data.main.temp;
        const weatherType = getWeatherType(temp);
        setWeatherData({
          temperature: temp,
          type: weatherType,
          city: data.name,
          weatherId: data.weather[0].id,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          timestamp: data.dt,
        });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleOpenModal} city={weatherData.city} />
        <Main weatherData={weatherData} onCardClick={handleCardClick} />
        <Footer />
      </div>
      {activeModal === "add-garment" && (
        <ModalWithForm
          title="New garment"
          buttonText="Add garment"
          onClose={handleCloseModal}
          activeModal={activeModal}
        >
          <label htmlFor="name" className="modal__label">
            Name{" "}
            <input
              type="text"
              className="modal__input"
              id="name"
              placeholder="Name"
            />
          </label>
          <label htmlFor="imageURL" className="modal__label">
            Image{" "}
            <input
              type="url"
              className="modal__input"
              id="imageURL"
              placeholder="Image URL"
            />
          </label>
          <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>

            <label
              htmlFor="hot"
              className="modal__label modal__label_type_radio"
            >
              <input id="hot" type="radio" className="modal__radio-input" />
              Hot
            </label>
            <label
              htmlFor="warm"
              className="modal__label modal__label_type_radio"
            >
              <input id="warm" type="radio" className="modal__radio-input" />
              Warm
            </label>
            <label
              htmlFor="cold"
              className="modal__label modal__label_type_radio"
            >
              <input id="cold" type="radio" className="modal__radio-input" />
              Cold
            </label>
          </fieldset>
        </ModalWithForm>
      )}
      {activeModal === "preview" && selectedItem && (
        <ItemModal item={selectedItem} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default App;
