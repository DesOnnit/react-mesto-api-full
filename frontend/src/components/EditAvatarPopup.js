import React from "react";
import PopupWithForm from "./PopupWithForm";
function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  React.useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          type="url"
          ref={avatarRef}
          className="popup__input"
          id="avatar"
          name="avatar"
          placeholder="Ссылка на аватар"
          required
        />
        <span className="popup__error" id="avatar-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
