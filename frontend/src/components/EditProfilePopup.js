import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      button="Сохранить"
    >
      <label className="popup__label">
        <input
          type="text"
          className="popup__input"
          value={name || ''}
          id="name"
          name="name"
          minLength="2"
          maxLength="40"
          placeholder="Имя"
          required
          onChange={handleNameChange}
        />
        <span className="popup__error" id="name-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="text"
          className="popup__input"
          value={description || ''}
          id="job"
          name="job"
          minLength="2"
          maxLength="200"
          placeholder="Работа"
          required
          onChange={handleDescriptionChange}
        />
        <span className="popup__error" id="job-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
