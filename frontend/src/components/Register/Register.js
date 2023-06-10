import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

function Register() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   function handleEmailChange(e) {
//     setEmail(e.target.value);
//   }

//   function handlePasswordChange(e) {
//     setPassword(e.target.value);
//   }

//   function handleSubmit(evt) {
//     evt.preventDefault();
//     const userEmail = email;
//     const userPassword = password;
//     handleRegister(userEmail, userPassword);
//   }

  return (
    <div className="login">
        <Link to="/">
      <img className="header__logo" src={logo} alt="Логотип" />
      </Link>
      <p className="login__welcome">Добро пожаловать!</p>
      <form
        id="login__form"
        className="login__form"
        noValidate
      >
        <span className="span__name">Имя</span>
        <input
          type="text"
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          required
        />
        <span className="span title-input-error"></span>

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
          className="login__button-save"
        >
          Зарегистрироваться
        </button>
        <div className="login__container-end">
        <p className="login__paragraph">Уже зарегистрированы?</p>
        <Link to="/sign-in" className="login__paragraph login__paragraph_type_black">
        Войти
        </Link>
        </div>
      </form>
    </div>
  );
}

export default Register;