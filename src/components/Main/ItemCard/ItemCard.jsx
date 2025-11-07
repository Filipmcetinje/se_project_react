import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const isLiked = item.likes.some((id) => id === currentUser?._id);

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_liked" : ""
  }`;

  const handleLike = (evt) => {
    evt.stopPropagation();
    onCardLike(item);
  };

  return (
    <li className="card" onClick={() => onCardClick(item)}>
      <h2 className="card__name">{item.name}</h2>
      <img
        className="card__image"
        src={item.imageUrl || item.image}
        alt={item.name}
      />

      {currentUser && (
        <button
          className={itemLikeButtonClassName}
          onClick={handleLike}
          type="button"
          aria-label="Like item"
        />
      )}
    </li>
  );
}

export default ItemCard;
