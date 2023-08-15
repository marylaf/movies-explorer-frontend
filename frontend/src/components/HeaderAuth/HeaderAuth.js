import React from "react";
import logo from "../../images/logo.svg";
import profile from "../../images/profile.svg";
import { Link, NavLink } from "react-router-dom";

function HeaderAuth({ toggleBurger, isLoggedIn }) {
  return (
    <header className={`header ${isLoggedIn ? "" : "header-auth"}`}>
      <div className="header__container">
        <Link to="/">
          <img className="logo" src={logo} alt="Логотип" />
        </Link>
        <div className="header__info-container header__info-burger">
          <NavLink
            to="/movies"
            className="header__link"
            activeclassname="active"
          >
            Фильмы
          </NavLink>

          <NavLink
            to="/saved-movies"
            className="header__link"
            activeclassname="active"
          >
            Сохранённые фильмы
          </NavLink>
        </div>

        <div className="header__info-container header__info-burger">
          <NavLink
            to="/profile"
            className="header__link"
            activeclassname="active"
          >
            Аккаунт
          </NavLink>

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
