function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.card ? "popup_open" : ""}`}>
      <div className="popup__container popup__container_img">
        <img
          className="popup__image"
          src={props.card ? props.card.link : "#"}
          alt={props.card ? props.card.name : ''}
        />
        <p className="popup__form-title popup__img-title">{props.card ? props.card.name : ''}</p>
        <button
          type="button"
          className="popup__form-close transition-btn"
          onClick={props.onClose}
        ></button>
      </div>
    </div>
  );
}

export default ImagePopup;
