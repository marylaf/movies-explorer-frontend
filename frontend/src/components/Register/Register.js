import { Link, Navigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { useState, useEffect } from "react";
import { REGEX_NAME_PATTERN, REGEX_EMAIL_PATTERN } from '../../utils/constants';

function Register({ handleRegister, serverError, isLoggedIn, setServerError }) {

  const { values, handleInputChange, errors, isValid, setValues } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues({
      email:"",
      password:""
    });
    setServerError("");
  }, [setValues, setServerError]);

function handleSubmit(evt) {
  evt.preventDefault();
  setIsSubmitting(true);
  handleRegister(values.email, values.password, values.name)
  .catch((error) => {
    console.log('Ошибка');
    }
)
  .finally(() => {
    setIsSubmitting(false);
  });
}

if (isLoggedIn) {
  // Если пользователь авторизован, перенаправляем на страницу фильмов
  return <Navigate to="/movies" replace />;
}

return (
    <div className="login">
        <Link to="/">
      <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <p className="login__welcome">Добро пожаловать!</p>
      <form
        id="login__form"
        className="login__form"
        onSubmit={handleSubmit}
        noValidate
      >
        <span className="login__name">Имя</span>
        <input
          type="text"
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          name="name"
          value={values.name || ''}
          onChange={handleInputChange}
          pattern={REGEX_NAME_PATTERN}
          required
        />
        <span className="span title-input-error">{errors.name}</span>

        <span className="login__name">E-mail</span>
        <input
          type="email"
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          name="email"
          value={values.email || ''}
          onChange={handleInputChange}
          pattern={REGEX_EMAIL_PATTERN}
          required
        />
        <span className="span title-input-error">{errors.email}</span>

        <span className="login__name">Пароль</span>
        <input
          type="password"
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          minLength="6"
          maxLength="200"
          value={values.password || ''}
          onChange={handleInputChange}
          name="password"
          required
        />
        <span className="span subtitle-input-error">{errors.password}</span>
        <div className="login__save-container">
          {serverError && <span className="error">{serverError}</span>}
          <button
            type="submit"
            className={`login__button-save ${!isSubmitting && isValid ? '' : 'login__button-save_disabled'}`}
            disabled={!isValid || isSubmitting}
          >
            Зарегистрироваться
          </button>
          <div className="login__container-end">
          <p className="login__paragraph">Уже зарегистрированы?</p>
          <Link to="/sign-in" className="login__paragraph login__paragraph_type_black">
          Войти
          </Link>
         </div>
        </div>
      </form>
    </div>
  );
}

export default Register;