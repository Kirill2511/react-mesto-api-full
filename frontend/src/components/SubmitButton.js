import React from 'react';

function SubmitButton(props) {
  return (
    <button type="submit" className={'popup__button'}>
      {props.onClick ? 'Сохранение...' : props.button}
    </button>
  );
}

export default SubmitButton;
