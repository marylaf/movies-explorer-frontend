import React from "react";
import logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className='header__container'>
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__info-container">
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>

            <Link to="/sign-in" className="header__link header__link_type_login">
              Войти
            </Link>
      </div>
      </div>
    </header>
  );
}

export default Header;
