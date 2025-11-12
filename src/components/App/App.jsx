import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";

import Footer from "../Footer/Footer";
import { fetchWeatherData, getWeatherType } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import AddItemModal from "../AddItemModal/AddItemModal";
import { Routes, Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import {
  getItems,
  addItem,
  deleteItem,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import * as auth from "../../utils/auth.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { updateUserInfo } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [activeModal, setActiveModal] = useState("");

  const [selectedItem, setSelectedItem] = useState(null);

  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const [clothingItems, setClothingItems] = useState([]);

  const [cardToDelete, setCardToDelete] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(handleCloseModal)

      .catch(console.error)

      .finally(() => setIsLoading(false));
  }

  const handleAddItemSubmit = (item) => {
    function makeRequest() {
      return addItem(item).then((createdItem) => {
        setClothingItems([createdItem, ...clothingItems]);
      });
    }

    handleSubmit(makeRequest);
  };

  const handleDeleteItem = (id) => {
    function makeRequest() {
      return deleteItem(id).then(() => {
        const updatedItems = clothingItems.filter((item) => item._id !== id);
        setClothingItems(updatedItems);
        setCardToDelete(null);
      });
    }

    handleSubmit(makeRequest);
  };

  const handleCardClick = (item) => {
    setSelectedItem(item);
    setActiveModal("preview");
  };

  const handleConfirmDelete = () => {
    if (cardToDelete?._id) {
      handleDeleteItem(cardToDelete._id);
    }
  };

  const handleCancelDelete = () => {
    setActiveModal("");
    setCardToDelete(null);
  };

  function handleRegister({ name, avatar, email, password }) {
    console.log("🧩 handleRegister called with:", {
      name,
      avatar,
      email,
      password,
    });
    auth
      .signup({ name, avatar, email, password })
      .then(() => {
        return auth.signin({ email, password });
      })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        console.log("Registered and logged in!");

        setIsLoggedIn(true);

        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        handleCloseModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Registration error:", err);
      });
  }

  function handleLogin({ email, password }) {
    return auth
      .signin({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        setIsLoggedIn(true);
        return auth.checkToken(res.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        handleCloseModal();
        navigate("/");
      })
      .catch((err) => {
        console.error("Login error:", err);
        throw err;
      });
  }

  function handleEditProfile({ name, avatar }) {
    const token = localStorage.getItem("jwt");

    function makeRequest() {
      return updateUserInfo(name, avatar, token).then((updatedUser) => {
        setCurrentUser(updatedUser);
        console.log("Profile updated!");
      });
    }

    handleSubmit(makeRequest);
  }

  function handleCardLike({ _id, likes }) {
    const token = localStorage.getItem("jwt");
    if (!token || !currentUser?._id) return;

    const isLiked = likes.some((id) => id === currentUser._id);
    const apiCall = isLiked ? removeCardLike : addCardLike;

    apiCall(_id, token)
      .then((updatedCard) => {
        setClothingItems((cards) =>
          cards.map((item) => (item._id === _id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Error updating like:", err));
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    setCurrentUser(null);
    handleCloseModal();
    navigate("/");
  }

  function handleEditProfileClick() {
    setActiveModal("edit-profile");
  }

  function handleAddItemClick() {
    setActiveModal("add-garment");
  }

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
      .catch((error) => {
        console.error("Failed to fetch weather data:", error);
      });
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
    const token = localStorage.getItem("jwt");

    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          console.log("Token valid, user:", userData);
          setIsLoggedIn(true);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Invalid token:", err);
          localStorage.removeItem("jwt");
          setIsLoggedIn(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleOpenModal}
              city={weatherData.city}
              isCelsius={currentTemperatureUnit === "C"}
              onToggle={handleToggleSwitchChange}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onEditProfile={handleEditProfileClick}
                      onAddItem={handleAddItemClick}
                      onLogout={handleSignOut}
                    />
                  </ProtectedRoute>
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
              isOpen={activeModal === "preview"}
              onClose={handleCloseModal}
              onDelete={openConfirmationModal}
            />
          )}
          {activeModal === "confirm" && cardToDelete && (
            <DeleteConfirmationModal
              isOpen={activeModal === "confirm"}
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          {activeModal === "register" && (
            <RegisterModal
              isOpen={activeModal === "register"}
              onClose={handleCloseModal}
              onRegister={handleRegister}
              handleOpenModal={handleOpenModal}
            />
          )}

          {activeModal === "login" && (
            <LoginModal
              isOpen={activeModal === "login"}
              onClose={handleCloseModal}
              onLogin={handleLogin}
              handleOpenModal={handleOpenModal}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={handleCloseModal}
              onEditProfile={handleEditProfile}
            />
          )}
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
