import React from "react";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link } from "react-router-dom";

function HeaderAuth() {
  return (
    <header className="header header-auth">
      <div className='header__container'>
      <img className="header__logo" src={logo} alt="Логотип" />
      <div className="header__info-container">
            <Link to="/movies" className="header__link">
            Фильмы
            </Link>

            <Link to="/saved-movies" className="header__link header-auth_type_saved">
            Сохранённые фильмы
            </Link>
      </div>

      <div className="header__info-container">
            <Link to="/profile" className="header__link">
            Аккаунт
            </Link>

            <Link to="/profile" className="header-auth__account">
            <img src={profile} alt="Аккаунт" />
            </Link>
      </div>
      </div>
    </header>
  );
}

export default HeaderAuth;