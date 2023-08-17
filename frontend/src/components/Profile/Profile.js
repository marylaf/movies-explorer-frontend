import HeaderAuth from "../HeaderAuth/HeaderAuth";
import { Link } from "react-router-dom";
import { useContext } from 'react';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile({handleSignOut, toggleBurger }) {

    const currentUser = useContext(CurrentUserContext);
    console.log(currentUser, 'PROFILE');

    return(
        <section className="profile">
            <HeaderAuth toggleBurger={toggleBurger} />
            <h2 className="profile__title">Привет, {currentUser.name}!</h2>
            <div className="profile__info">
                <p className="profile__column">Имя</p>
                <p className="profile__name">{currentUser.name}</p>
            </div>
            <div className="profile__info">
                <p className="profile__column">E-mail</p>
                <p className="profile__name">{currentUser.email}</p>
            </div>
            <Link className="profile__paragraph" to="/edit">
            Редактировать
            </Link>
            
            <Link className="profile__exit" onClick={handleSignOut} to="/sign-in">
                Выйти из аккаунта
            </Link>
        </section>
    );
}

export default Profile;