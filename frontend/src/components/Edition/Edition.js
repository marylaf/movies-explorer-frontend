import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import logo from "../../images/logo.svg";
import useFormValidation from "../../hooks/useFormValidation";
import { REGEX_NAME_PATTERN, REGEX_EMAIL_PATTERN } from '../../utils/constants';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Edition({serverError, handleEdition, setServerError}) {
  const { values, handleInputChange, errors, isValid, setValues } = useFormValidation();
  const [isFormUnchanged, setIsFormUnchanged] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  console.log(currentUser);

  useEffect(() => {
    setValues({
      name: currentUser.name,
      email: currentUser.email,
    });
    setServerError("");
  }, [currentUser, setValues, setServerError]);

  function handleChangeSubmit(evt) {
    evt.preventDefault();
    setIsSubmitting(true);
    if (isFormUnchanged) {
      console.log("Информация не изменилась");
      setIsSubmitting(false);
      return;
    }
    handleEdition(values.name, values.email)
    .catch((error) => {
      console.log('Ошибка');
      }
  )
    .finally(() => {
      setIsSubmitting(false);
    });
    }

    useEffect(() => {
      checkFormChanges();
    }, [values, currentUser]);

    const checkFormChanges = () => {
      if (currentUser.name === values.name && currentUser.email === values.email) {
        setIsFormUnchanged(true);
      } else {
        setIsFormUnchanged(false);
      }
    };

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
              value={values.name || ''}
              className="login__info login__info_form_title"
              id="title-input"
              minLength="6"
              maxLength="40"
              pattern={REGEX_NAME_PATTERN}
              disabled={isSubmitting}
              required
            />
            <span className="span title-input-error">{errors.name}</span>
    
            <span className="login__name">E-mail</span>
            <input
              type="email"
              onChange={handleInputChange}
              name="email"
              value={values.email || ''}
              className="login__info login__info_form_subtitle"
              id="subtitle-input"
              minLength="6"
              maxLength="200"
              pattern={REGEX_EMAIL_PATTERN}
              disabled={isSubmitting}
              required
            />
             <span className="span subtitle-input-error">{errors.email}</span>
             <div className="login__save-container login__save-container_type_bigger">
            {serverError && <span className="error">{serverError}</span>}
            <button
              type="submit"
              className={`login__button-save ${!isSubmitting && !isFormUnchanged && isValid ? '' : 'login__button-save_disabled'}`}
              disabled={isSubmitting || !isValid || isFormUnchanged}
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