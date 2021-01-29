import React from 'react';

function PopupWithForm(props) {
  return (
    <div
      className={`popup popup__${props.name} ${
        props.isOpen ? 'popup_opened' : ''
      }`}
    >
      <div className="popup__container">
        <button
          aria-label="Закрыть"
          className="popup__close-icon popup__close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className="popup__fields popup__form-avatar"
          name={`${props.name}`}
          onSubmit={props.onSubmit}
          action="#"
          noValidate
        >
          {props.children}
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
