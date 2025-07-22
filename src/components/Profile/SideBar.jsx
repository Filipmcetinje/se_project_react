import avatar from "../../assets/avatar-img.svg";

function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Terrence Tegegne" className="header__avatar" />
      <p className="sidebar__username">Terrence Tegegne</p>
    </div>
  );
}

export default SideBar;
