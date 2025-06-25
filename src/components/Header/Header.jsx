import { useState } from "react";

import "./Header.css";
import logo from "../../assets/logo1.svg";
import avatar from "../../assets/avatar-img.svg";
import hamburgerIcon from "../../assets/hamburger.svg";
import closeIcon from "../../assets/close.svg";

function Header({ handleAddClick, city }) {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };
  return (
    <header className="header">
      <img className="header__logo" src={logo} />

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
        <button
          onClick={() => handleAddClick("add-garment")}
          type="button"
          className="header__add-clothes-btn"
        >
          + Add clothes
        </button>
        <div className="header__user-container">
          <span className="header__username">Terrence Tegegne</span>
          <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
        </div>
      </div>
    </header>
  );
}

export default Header;
