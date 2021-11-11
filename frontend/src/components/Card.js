import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({card,onCardClick,onCardLike,onCardDelet}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardDeleteButtonClassName = `element__trash transition-btn ${
    isOwn ? "element__trash_active" : ""
  }`;
  const cardLikeButtonClassName = `element__like transition-like ${
    isLiked ? "element__like_acive" : ""
  }`;

  function handleCardClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleCardDelet() {
    onCardDelet(card);
  }
  return (
    <li id={card._id}>
      <div className="element">
        <img
          className="element__image"
          alt={card.name}
          src={card.link}
          onClick={handleCardClick}
        />
        <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={handleCardDelet}
        ></button>
        <div className="element__caption">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__caption_like">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
            ></button>
            <span className="element__like_counter">
              {card.likes.length}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}
export default Card;
