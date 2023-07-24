import { Link, useLocation } from "react-router-dom";
import profile from "../../images/profile.svg";

function BurgerMenu({ isOpen, onClose }) {

	const location = useLocation();
  	const isMoviesActive = location.pathname === '/movies';
	const isSavedMoviesActive = location.pathname === '/saved-movies';
	const isMain = location.pathname === '/';
	const isProfile = location.pathname === '/profile';

	return (
		<section className={`burger-menu ${isOpen ? "burger-menu_opened" : ""}`}>
			<nav className="burger-menu__container">
				<button className="burger-menu__close" onClick={onClose}></button>
				<ul className="burger-menu__links">
					<li className="burger-menu__element">
						<Link to='/' onClick={onClose} className={`burger-menu__link ${isMain ? 'burger-menu__link_active' : ''}`}>Главная</Link>
					</li>
					<li className="burger-menu__element">
						<Link to='/movies' onClick={onClose} className={`burger-menu__link ${isMoviesActive ? 'burger-menu__link_active' : ''}`}>Фильмы</Link>
					</li>
					<li className="burger-menu__element">
						<Link to='/saved-movies' onClick={onClose} className={`burger-menu__link ${isSavedMoviesActive ? 'burger-menu__link_active' : ''}`}>Сохраненные фильмы</Link>  
					</li>
					<li className="burger-menu__element">
						<div className="burger-menu__account">
							<Link to='/profile' onClick={onClose} className={`burger-menu__account-link ${isProfile ? 'burger-menu__link_active' : ''}`}>Аккаунт</Link>
							<Link onClick={onClose} to="profile">
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