import ItemCard from "../Main/ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({ clothingItems, onAddItem, onCardClick }) {
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <h2>Your Items</h2>
        <button className="clothes-section__add-btn" onClick={onAddItem}>
          + Add New
        </button>
      </div>
      <ul className="clothes-section__items">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
