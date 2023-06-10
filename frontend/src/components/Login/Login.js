import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

function Login() {

  return (
    <div className="login">
        <Link to="/">
      <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <p className="login__welcome">Рады видеть!</p>
      <form
        id="login__form"
        className="login__form"
        noValidate
      >

        <span className="span__name">E-mail</span>
        <input
          type="text"
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          required
        />
        <span className="span title-input-error"></span>

        <span className="span__name">Пароль</span>
        <input
          type="password"
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          minLength="6"
          maxLength="200"
          required
        />
        <span className="span subtitle-input-error">Что-то пошло не так...</span>
        <button
          type="submit"
          className="login__button-save login__button-save_type_bigger"
        >
          Войти
        </button>
        <div className="login__container-end">
        <p className="login__paragraph">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__paragraph login__paragraph_type_black">
        Регистрация
        </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;