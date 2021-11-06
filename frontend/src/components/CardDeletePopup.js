import PopupWithForm from "./PopupWithForm";
function CardDeletePopup(props) {
  return (
    <PopupWithForm name="delete" title="Вы уверены?" isOpen={props.isOpen} />
  );
}

export default CardDeletePopup;
