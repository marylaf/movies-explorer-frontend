import HeaderAuth from "../HeaderAuth/HeaderAuth";
import { Link } from "react-router-dom";

function Profile() {
    return(
        <section className="profile">
            <HeaderAuth />
            <h2 className="profile__title">Привет, Виталий!</h2>
            <div className="profile__info">
                <p className="profile__column">Имя</p>
                <p className="profile__name">Виталий</p>
            </div>
            <div className="profile__info">
                <p className="profile__column">E-mail</p>
                <p className="profile__name">pochta@yandex.ru</p>
            </div>
            <p className="profile__paragraph">Редактировать</p>
            <Link className="profile__exit" to="/sign-in">
                Выйти из аккаунта
            </Link>
        </section>
    );
}

export default Profile;