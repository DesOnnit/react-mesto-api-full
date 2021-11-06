function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_open" : ""
      }`}
    >
      <div className="popup__container">
        <form
          className={`popup__form popup__form_type_${props.name}`}
          onSubmit={props.onSubmit}
        >
          <h2 className="popup__form-title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__submit-button transition">
            {props.button}
          </button>
        </form>
        <button
          type="button"
          className={`popup__form-close transition-btn`}
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default PopupWithForm;
