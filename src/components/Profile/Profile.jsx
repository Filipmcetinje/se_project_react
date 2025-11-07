import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddItem,
  onCardClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
      />
    </div>
  );
}

export default Profile;
