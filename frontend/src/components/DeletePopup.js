import React from 'react';
import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDelete(props.card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <button
        aria-label="Да"
        className="popup__button popup__button_card-delete"
        name="submit"
        type="submit"
      >
        {props.isLoading ? 'Удаление...' : 'Да'}
      </button>
    </PopupWithForm>
  );
}

export default DeletePopup;
