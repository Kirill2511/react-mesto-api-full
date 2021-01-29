import React from 'react';

function InfoTooltip({
  onClose, isOpen, image, message,
}) {
  return (
    <section className={`popup popup__tooltip ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <img className="popup__tooltip" src={image} alt="Статус" />
        <h2 className="popup__tooltip-message">{message}</h2>
        <button
          aria-label="Закрыть"
          className="popup__close-icon"
          type="button"
          onClick={onClose}
        />
      </div>
    </section>
  );
}

export default InfoTooltip;
