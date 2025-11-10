import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

function Profile({
  clothingItems,
  onAddItem,
  onCardClick,
  onCardLike,
  onEditProfile,
  onLogout,
}) {
  return (
    <div className="profile">
      <SideBar onEditProfile={onEditProfile} onLogout={onLogout} />
      <ClothesSection
        clothingItems={clothingItems}
        onAddItem={onAddItem}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </div>
  );
}

export default Profile;
