import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

function LoginModal({ isOpen, onClose, onLogin, handleOpenModal }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setErrorMessage("");
    }
  }, [isOpen]);

  const isFormValid = email && password;

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }).catch(() => {
      setErrorMessage("Email or password incorrect");
    });
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      altText="or Sign Up"
      onAltClick={() => handleOpenModal("register")}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isFormValid={isFormValid}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        {errorMessage && <p className="modal__error">{errorMessage}</p>}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
