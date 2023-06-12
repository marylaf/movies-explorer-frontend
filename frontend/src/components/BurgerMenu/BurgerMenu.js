import { Link } from "react-router-dom";
import profile from "../../images/profile.svg";

function BurgerMenu() {
	return (
		<section className="burger-menu burger-menu_opened">
			<nav className="burger-menu__container">
				<button className="burger-menu__close"></button>
				<ul className="burger-menu__links">
					<li className="burger-menu__element">
						<Link to='/' className="burger-menu__link">Главная</Link>
					</li>
					<li className="burger-menu__element">
						<Link to='/movies' className="burger-menu__link burger-menu__link_active">Фильмы</Link>
					</li>
					<li className="burger-menu__element">
						<Link to='/saved-movies' className="burger-menu__link">Сохраненные фильмы</Link>  
					</li>
					<li className="burger-menu__element">
						<div className="burger-menu__account">
							<Link to='/profile' className="burger-menu__account-link">Аккаунт</Link>
							<Link to="/">
							<img src={profile} alt="Аккаунт" className="header-auth__account" />
							</Link>
						</div>
					</li>
				</ul>
		  </nav>
		</section>
		
	)
}

export default BurgerMenu;