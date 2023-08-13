import React from "react";
import checkMark from "../../images/checkMark.png";

function PopupSuccess({isOpen, onClose}) {
  return (
    <div
      className={`popup ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container">
        <button
          className="popup__button-drop"
          type="button"
          aria-label="Закрытие попапа"
          onClick={onClose}
        ></button>
        <form
          // name={`${name}`}
          id="popup__form"
          className="popup__form"
          // onSubmit={onSubmit}
          noValidate
        >
          <h3 className="popup__correct">Успешно</h3>
          <img className="popup__image" src={checkMark} alt="Аккаунт"/>
        </form>
      </div>
    </div>
  );
}

export default PopupSuccess;
