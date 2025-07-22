import SideBar from "./SideBar";
import ClothesSection from "./ClothesSection";
import "./Profile.css";

function Profile({ clothingItems, onAddItem, onCardClick }) {
  return (
    <div className="profile">
      <SideBar />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
      />
    </div>
  );
}

export default Profile;
