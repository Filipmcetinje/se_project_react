import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/logo1.svg";
import hamburgerIcon from "../../assets/hamburger.svg";
import closeIcon from "../../assets/close.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

function Header({ handleAddClick, city, isCelsius, onToggle, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpened(!isMobileMenuOpened);

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

          {isLoggedIn && (
            <button
              onClick={() => handleAddClick("add-garment")}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>
          )}

          {!isLoggedIn && (
            <>
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
            </>
          )}

          {isLoggedIn && (
            <Link to="/profile" className="header__user-container">
              <span className="header__username">{currentUser?.name}</span>
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
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
