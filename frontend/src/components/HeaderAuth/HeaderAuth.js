import React from "react";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link } from "react-router-dom";

function HeaderAuth({ toggleBurger }) {

  return (
    <header className="header header-auth">
      <div className='header__container'>
      <Link to="/">
      <img className="logo" src={logo} alt="Логотип" />
      </Link>
      <div className="header__info-container header__info-burger">
            <Link to="/movies" className="header__link">
            Фильмы
            </Link>

            <Link to="/saved-movies" className="header__link header-auth_type_saved">
            Сохранённые фильмы
            </Link>
      </div>

      <div className="header__info-container header__info-burger">
            <Link to="/profile" className="header__link">
            Аккаунт
            </Link>

            <Link to="/profile" className="header-auth__account">
            <img src={profile} alt="Аккаунт" />
            </Link>
      </div>
      <button className="header-auth__burger" onClick={toggleBurger}></button>
      </div>
    </header>
  );
}

export default HeaderAuth;