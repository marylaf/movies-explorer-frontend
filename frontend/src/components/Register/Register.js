import { Link, Navigate } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Register({ handleRegister, serverError, isLoggedIn }) {

  const { inputs, handleInputChange, errors, isValid } = useFormValidation({ name: '', email: '', password: '' });

function handleSubmit(evt) {
  evt.preventDefault();
  handleRegister(inputs.email, inputs.password, inputs.name)
  .catch((error) => {
    console.log('Ошибка');
    }
);
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
          value={inputs.name || ''}
          onChange={handleInputChange}
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
          value={inputs.email || ''}
          onChange={handleInputChange}
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
          value={inputs.password || ''}
          onChange={handleInputChange}
          name="password"
          required
        />
        <span className="span subtitle-input-error">{errors.password}</span>
        <div className="login__save-container">
          {serverError && <span className="error">{serverError}</span>}
          <button
            type="submit"
            className={`login__button-save ${isValid ? '' : 'login__button-save_disabled'}`}
            disabled={!isValid}
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