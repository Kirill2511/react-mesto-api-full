import React from 'react';
import PopupWithForm from './PopupWithForm';
import SubmitButton from './SubmitButton';

function EditAvatarPopup(props) {
  const changeAvatar = React.useRef('');

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: changeAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__label">
        <input
          className="popup__item popup__input_avatar-link"
          ref={changeAvatar}
          id="link-avatar"
          name="avatar"
          placeholder="Ссылка на картинку"
          required
          type="url"
        />
        <span className="popup__input-error" id="link-avatar-error" />
      </label>

      <SubmitButton button="Сохранить" onClick={props.isLoading} />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
