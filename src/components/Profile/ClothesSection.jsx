import ItemCard from "../Main/ItemCard/ItemCard";

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
          <li className="clothes-section__item" key={item._id}>
            <ItemCard item={item} onCardClick={onCardClick} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ClothesSection;
