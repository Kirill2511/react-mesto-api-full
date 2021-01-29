import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button
          className="button profile__edit-avatar"
          type="button"
          onClick={props.onEditAvatar}
        >
          <img
            alt="жак-ив"
            className="profile__avatar"
            srcSet={currentUser.avatar}
          />
        </button>
        <div className="profile__info">
          <div className="profile__wrapper">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              aria-label="Редактировать профиль"
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            />
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
        </div>
        <button
          aria-label="Добавить карточку"
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        />
      </section>

      <section className="elements">
        <ul className="elements__container">
          {props.cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
