import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner === currentUser._id;

  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? '' : 'element__delete_invisible'
  }`;

  const isLiked = (props.card.likes.some((i) => i === currentUser._id));

  const cardLikeButtonClassName = `element__heart ${
    isLiked ? 'element__heart_active' : ''
  }`;

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <button
        aria-label="Удалить"
        className={cardDeleteButtonClassName}
        name="Удалить"
        type="submit"
        onClick={handleCardDelete}
      />
      <img
        src={props.card.link}
        alt={props.card.name}
        className="element__image"
        onClick={handleClick}
      />
      <div className="element__container">
        <h2 className="element__title">{props.card.name}</h2>
        <div className="element__container_like">
          <button
            aria-label="Лайк"
            className={cardLikeButtonClassName}
            name="Лайк"
            type="submit"
            onClick={handleLikeClick}
          />
          <p className="card__count-likes">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
