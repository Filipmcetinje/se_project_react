import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      {/* Row 1 — avatar + name */}
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

      {/* Row 2 — change profile */}
      <button className="sidebar__link" onClick={onEditProfile}>
        Change profile data
      </button>

      {/* Row 3 — logout */}
      <button
        className="sidebar__link sidebar__link_logout"
        onClick={onSignOut}
      >
        Log out
      </button>
    </div>
  );
}

export default SideBar;
