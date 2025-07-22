import React from "react";
import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

import Footer from "../Footer/Footer";
import { fetchWeatherData, getWeatherType } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.jsx";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import { getItems, addItem, deleteItem } from "../../utils/api.js";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [clothingItems, setClothingItems] = useState([]);
  const allClothingItems = clothingItems;

  const [cardToDelete, setCardToDelete] = useState(null);

  function openConfirmationModal(card) {
    setCardToDelete(card);
    setActiveModal("confirm");
  }

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleOpenModal = (modalName) => {
    setActiveModal(modalName);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleAddItemSubmit = (item) => {
    addItem(item)
      .then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteItem = (id) => {
    deleteItem(id)
      .then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== id);
        setClothingItems(updatedItems);
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("preview");
  };

  useEffect(() => {
    fetchWeatherData()
      .then((data) => {
        const temp = data.main.temp;
        const tempC = Math.round((temp - 32) * (5 / 9));
        const weatherType = getWeatherType(temp);
        setWeatherData({
          temperature: temp,
          temperatureC: tempC,
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

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error("Error loading items:", err);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <HashRouter>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header handleAddClick={handleOpenModal} city={weatherData.city} />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={allClothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    clothingItems={allClothingItems}
                    onAddItem={() => handleOpenModal("add-garment")}
                    onCardClick={handleCardClick}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={handleCloseModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={handleAddItemSubmit}
            />
          )}
          {activeModal === "preview" && selectedItem && (
            <ItemModal
              item={selectedItem}
              onClose={handleCloseModal}
              onDelete={openConfirmationModal}
            />
          )}
          {activeModal === "confirm" && cardToDelete && (
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm"}
              onConfirm={() => {
                if (cardToDelete?._id) {
                  handleDeleteItem(cardToDelete._id);
                }
                setActiveModal("");
                setCardToDelete(null);
              }}
              onCancel={() => {
                setActiveModal("");
                setCardToDelete(null);
              }}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </HashRouter>
  );
}

export default App;
