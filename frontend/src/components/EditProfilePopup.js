import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';
import SubmitButton from './SubmitButton';

function EditProfilePopup(props) {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser.about, currentUser.name]);

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeDescription(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          value={name || ''}
          onChange={handleChangeName}
          className="popup__item popup__name"
          id="name-input"
          maxLength="40"
          minLength="2"
          name="name"
          placeholder="Имя"
          required="required"
          type="text"
        />
        <span className="popup__input-error" id="name-input-error" />
      </label>
      <label className="popup__label">
        <input
          value={description || ''}
          onChange={handleChangeDescription}
          className="popup__item popup__about"
          id="activity-input"
          maxLength="200"
          minLength="2"
          name="about"
          placeholder="Обо мне"
          required="required"
          type="text"
        />
        <span className="popup__input-error" id="activity-input-error" />;
      </label>

      <SubmitButton button="Сохранить" onClick={props.isLoading} />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
