import "./ItemModal.css";
import closeIcon from "../../assets/close-icon.svg";

function ItemModal({ item, onClose, onDelete }) {
  console.log("Item object:", item);
  return (
    <div className="preview-modal">
      <div className="preview-modal__content">
        <button className="preview-modal__close" onClick={onClose}>
          <img
            src={closeIcon}
            alt="Close"
            className="preview-modal__close-icon"
          />
        </button>
        <img
          src={item.imageUrl}
          alt={item.name}
          className="preview-modal__image"
        />
        <p className="preview-modal__caption">{item.name}</p>
        <p className="preview-modal__weather">Weather: {item.weather}</p>

        <button
          className="preview-modal__delete-btn"
          onClick={() => onDelete(item)}
        >
          Delete item
        </button>
      </div>
    </div>
  );
}

export default ItemModal;
