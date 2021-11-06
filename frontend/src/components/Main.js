import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="profile__avatar-container">
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
          <button
            type="button"
            className="profile__avatar-edit-button"
            onClick={onEditAvatar}
          ></button>
        </div>
        <div className="profile__info">
          <h1 className="profile__info-title">{currentUser.name}</h1>
          <button
            type="button"
            className="profile__edit-button transition-btn"
            onClick={onEditProfile}
          ></button>
          <h2 className="profile__info-subtitle">{currentUser.about}</h2>
        </div>
        <button
          type="button"
          className="profile__add-button transition-btn"
          onClick={onAddPlace}
        ></button>
      </section>
      <section>
        <ul className="elements">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelet={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
