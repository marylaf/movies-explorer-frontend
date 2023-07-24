import HeaderAuth from "../HeaderAuth/HeaderAuth";
import { Link } from "react-router-dom";

function Profile({handleSignOut, userEmail, toggleBurger, userName }) {
    return(
        <section className="profile">
            <HeaderAuth toggleBurger={toggleBurger} />
            <h2 className="profile__title">Привет, {userName}!</h2>
            <div className="profile__info">
                <p className="profile__column">Имя</p>
                <p className="profile__name">{userName}</p>
            </div>
            <div className="profile__info">
                <p className="profile__column">E-mail</p>
                <p className="profile__name">{userEmail}</p>
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