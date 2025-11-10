import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onLogout }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {currentUser?.name?.[0]?.toUpperCase() || "?"}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name || "Guest"}</p>
      </div>

      <button className="sidebar__link" onClick={onEditProfile}>
        Change profile data
      </button>

      <button className="sidebar__link sidebar__link_logout" onClick={onLogout}>
        Log out
      </button>
    </div>
  );
}

export default SideBar;
