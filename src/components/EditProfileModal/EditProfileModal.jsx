import "./EditProfileModal.css";
import { useState, useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [currentUser, isOpen]);

  useEffect(() => {
    const isNameValid = name.trim().length > 0;
    const isAvatarValid = avatar.trim().length > 0;
    setIsFormValid(isNameValid && isAvatarValid);
  }, [name, avatar]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onEditProfile({ name, avatar });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      extraClass="modal__submit_edit-profile"
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Name*
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="modal__input"
          required
        />
      </label>
      <label className="modal__label">
        Avatar*
        <input
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          className="modal__input"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
