import { Link, Navigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { useState, useEffect } from "react";
import { REGEX_NAME_PATTERN, REGEX_EMAIL_PATTERN } from '../../utils/constants';

function Login({handleLogin, serverError, isLoggedIn, setServerError}) {

  const { values, handleInputChange, errors, isValid, setValues } = useFormValidation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setValues({
      email:"",
      password:""
    });
    setServerError("");
  }, [setValues, setServerError]);

  function handleInSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);
   
    handleLogin(values.email, values.password)
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
      <p className="login__welcome">Рады видеть!</p>
      <form onSubmit={handleInSubmit}
        id="login__form"
        className="login__form"
        noValidate
      >

        <span className="login__name">E-mail</span>
        <input
          onChange={handleInputChange}
          type="text"
          name="email"
          value={values.email || ''}
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          pattern={REGEX_NAME_PATTERN}
          required
        />
        <span className="span title-input-error">{errors.email}</span>

        <span className="login__name">Пароль</span>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          value={values.password || ''}
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          minLength="6"
          maxLength="200"
          pattern={REGEX_EMAIL_PATTERN}
          required
        />
        <span className="span subtitle-input-error">{errors.password}</span>
        <div className="login__save-container login__save-container_type_bigger">
        {serverError && <span className="error">{serverError}</span>}
        <button
            type="submit"
            className={`login__button-save ${!isSubmitting && isValid ? '' : 'login__button-save_disabled'}`}
            disabled={!isValid || isSubmitting}
          >
          Войти
        </button>
        <div className="login__container-end">
        <p className="login__paragraph">Ещё не зарегистрированы?</p>
        <Link to="/sign-up" className="login__paragraph login__paragraph_type_black">
        Регистрация
        </Link>
        </div>
        </div>
      </form>
    </div>
  );
}

export default Login;