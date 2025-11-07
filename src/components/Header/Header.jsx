import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo1.svg";
import avatar from "../../assets/avatar-img.svg";
import hamburgerIcon from "../../assets/hamburger.svg";
import closeIcon from "../../assets/close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({ handleAddClick, city, isCelsius, onToggle }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <header className="header">
      <Link to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>

      <button
        className="header__mobile-toggle"
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
      >
        <img
          src={isMobileMenuOpened ? closeIcon : hamburgerIcon}
          alt={isMobileMenuOpened ? "Close menu" : "Open menu"}
        />
      </button>
      <div
        className={`header__menu ${
          isMobileMenuOpened ? "header__menu_opened" : ""
        }`}
      >
        <p className="header__date-location">
          {" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
          {city ? `, ${city}` : ""}
        </p>

        <div className="header__actions">
          <div className="header__unit-toggle">
            <ToggleSwitch isCelsius={isCelsius} onToggle={onToggle} />
          </div>

          <button
            onClick={() => handleAddClick("add-garment")}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <button
            onClick={() => handleAddClick("register")}
            type="button"
            className="header__auth-btn"
          >
            Sign Up
          </button>

          <button
            onClick={() => handleAddClick("login")}
            type="button"
            className="header__auth-btn"
          >
            Log In
          </button>
          
        </div>
        <Link to="/profile" className="header__user-container">
          <span className="header__username">
            {currentUser ? currentUser.name : "Guest"}
          </span>
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="header__avatar"
            />
          ) : (
            <div className="header__avatar header__avatar_placeholder">
              {currentUser?.name?.[0]?.toUpperCase() || "?"}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}

export default Header;
