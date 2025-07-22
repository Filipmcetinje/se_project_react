import "./DeleteConfirmationModal.css";
import closeIcon from "../../assets/close-icon.svg";

function DeleteConfirmationModal({ onConfirm, onCancel, isOpen }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="delete-modal__content">
        <button className="delete-modal__close" onClick={onCancel}>
          <img
            src={closeIcon}
            alt="Close"
            className="delete-modal__close-icon"
          />
        </button>
        <h2 className="delete-modal__title">
          Are you sure you want to delete this item? <br /> This action is irreversible
        </h2>
        <button
          className="delete-modal__button delete-modal__button_confirm"
          onClick={onConfirm}
        >
          Yes, delete item
        </button>
        <button
          className="delete-modal__button delete-modal__button_cancel"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
