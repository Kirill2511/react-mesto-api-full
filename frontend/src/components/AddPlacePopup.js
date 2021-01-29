import React from 'react';
import PopupWithForm from './PopupWithForm';
import SubmitButton from './SubmitButton';

function AddPlacePopup(props) {
  const [name, setNameCard] = React.useState('');
  const [link, setLinkCard] = React.useState('');

  function handleSubmitCard(e) {
    e.preventDefault();
    props.postNewCard({
      name, link,
    });
  }

  function handleNameCard(evt) {
    setNameCard(evt.target.value);
  }

  function handleLinkCard(evt) {
    setLinkCard(evt.target.value);
  }

  return (
    <PopupWithForm
      name="addCard"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmitCard}
    >
      <label className="popup__label">
        <input
          value={name || ''}
          onChange={handleNameCard}
          id="name"
          className="popup__item popup__input-name"
          type="text"
          name="name"
          required
          placeholder="Название"
          minLength="1"
          maxLength="30"
          autoComplete="off"
        />
        <span className="popup__input-error" id="place-input-error" />
      </label>
      <label className="popup__label">
        <input
          value={link || ''}
          onChange={handleLinkCard}
          className="popup__item popup__input-url"
          id="link"
          type="url"
          name="link"
          required
          placeholder="Ссылка на картинку"
          autoComplete="off"
        />
        <span className="popup__input-error" id="link-input-error" />
      </label>
      <SubmitButton button="Создать" onClick={props.isLoading} />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
