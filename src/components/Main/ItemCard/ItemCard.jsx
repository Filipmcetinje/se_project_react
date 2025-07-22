import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.imageUrl} alt={item.name} />
    </li>
  );
}

export default ItemCard;
