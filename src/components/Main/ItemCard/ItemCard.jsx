import "./ItemCard.css";

function ItemCard({ item, onClick }) {
  return (
    <li className="card" onClick={() => onClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img className="card__image" src={item.link} alt={item.name} />
    </li>
  );
}

export default ItemCard;
