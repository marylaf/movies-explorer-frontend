import { Link } from "react-router-dom";
import { useMemo } from 'react';
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";

function Edition({serverError, handleEdition, userEmail, userName}) {
  const { inputs, handleInputChange, errors, isValid } = useFormValidation({ name: userName, email: userEmail});

  function handleChangeSubmit(evt) {
    evt.preventDefault();
    handleEdition(inputs.name, inputs.email)
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
          <p className="login__welcome login__welcome_type_edit">Измените данные профиля</p>
          <form
            id="login__form"
            className="login__form"
            onSubmit={handleChangeSubmit}
            noValidate
          >

            <span className="login__name">Имя</span>
            <input
              type="text"
              onChange={handleInputChange}
              name="name"
              value={inputs.name}
              className="login__info login__info_form_title"
              id="title-input"
              minLength="6"
              maxLength="40"
              required
            />
            <span className="span title-input-error">{errors.name}</span>
    
            <span className="login__name">E-mail</span>
            <input
              type="email"
              onChange={handleInputChange}
              name="email"
              value={inputs.email}
              className="login__info login__info_form_subtitle"
              id="subtitle-input"
              minLength="6"
              maxLength="200"
              required
            />
             <span className="span subtitle-input-error">{errors.email}</span>
             <div className="login__save-container login__save-container_type_bigger">
            {serverError && <span className="error">{serverError}</span>}
            <button
              type="submit"
              className={`login__button-save ${isValid ? '' : 'login__button-save_disabled'}`}
              disabled={!isValid}
            >
              Сохранить
            </button>
            <div className="login__container-end">
            <Link to="/profile" className="login__paragraph login__paragraph_type_black">
            Передумал
            </Link>
            </div>
            </div>
          </form>
        </div>
      );
}

export default Edition;