import React from "react";
import PopupWithForm from "./PopupWithForm";
function AddPlacePopup(props) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdatePlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  React.useEffect(() => {
    nameRef.current.value = "";
    linkRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="text"
          ref={nameRef}
          className="popup__input"
          id="title"
          name="name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__error" id="title-error"></span>
      </label>
      <label className="popup__label">
        <input
          type="url"
          ref={linkRef}
          className="popup__input"
          id="link"
          name="link"
          placeholder="Ссылка на картинку"
          required
        />
        <span className="popup__error" id="link-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
