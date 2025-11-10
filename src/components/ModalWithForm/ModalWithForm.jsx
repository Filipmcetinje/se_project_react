import "./ModalWithForm.css";
import closeIcon from "../../assets/close-icon.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  isOpen,
  onSubmit,
  altText,
  onAltClick,
  isFormValid,
  extraClass,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>

        <button type="button" className="modal__close" onClick={onClose}>
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>

        <form className="modal__form" onSubmit={onSubmit}>
          {children}

          <div className="modal__actions">
            <button
              type="submit"
              className={`modal__submit${
                isFormValid ? " modal__submit_active" : ""
              } ${extraClass ? " " + extraClass : ""}`}
              disabled={!isFormValid}
            >
              {buttonText}
            </button>

            {altText && (
              <button
                type="button"
                className="modal__alt-btn"
                onClick={onAltClick}
              >
                {altText}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
