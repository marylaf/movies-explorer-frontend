import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Login({handleLogin, serverError}) {

  const { inputs, handleInputChange, errors, isValid } = useFormValidation({ email: '', password: ''});

  
  function handleInSubmit(evt) {
    evt.preventDefault();
    handleLogin(inputs.email, inputs.password)
    .catch((error) => {
      console.log('Ошибка');
      }
  );
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
          value={inputs.email || ''}
          className="login__info login__info_form_title"
          id="title-input"
          minLength="6"
          maxLength="40"
          required
        />
        <span className="span title-input-error">{errors.email}</span>

        <span className="login__name">Пароль</span>
        <input
          onChange={handleInputChange}
          type="password"
          name="password"
          value={inputs.password || ''}
          className="login__info login__info_form_subtitle"
          id="subtitle-input"
          minLength="6"
          maxLength="200"
          required
        />
        <span className="span subtitle-input-error">{errors.password}</span>
        <div className="login__save-container login__save-container_type_bigger">
        {serverError && <span className="error">{serverError}</span>}
        <button
            type="submit"
            className={`login__button-save ${isValid ? '' : 'login__button-save_disabled'}`}
            disabled={!isValid}
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