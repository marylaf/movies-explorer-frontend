import { Link } from "react-router-dom";
import logo from "../../images/logo.svg";

function Edition() {
    return (
        <div className="login">
            <Link to="/">
          <img className="logo" src={logo} alt="Логотип" />
          </Link>
          <p className="login__welcome login__welcome_type_edit">Измените данные профиля</p>
          <form
            id="login__form"
            className="login__form"
            noValidate
          >

            <span className="login__name">Имя</span>
            <input
              type="text"
              className="login__info login__info_form_title"
              id="title-input"
              minLength="6"
              maxLength="40"
              required
            />
            <span className="span title-input-error"></span>
    
            <span className="login__name">E-mail</span>
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
              Сохранить
            </button>
            <div className="login__container-end">
            <Link to="/profile" className="login__paragraph login__paragraph_type_black">
            Передумал
            </Link>
            </div>
          </form>
        </div>
      );
}

export default Edition;