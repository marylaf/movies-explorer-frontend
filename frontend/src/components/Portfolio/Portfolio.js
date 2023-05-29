import icon from "../../images/icon.svg";

function Portfolio() {
    return(
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
            <nav>
                <ul className="portfolio__list" >
                <li className="portfolio__menu">
                    <a className="portfolio__paragraph" href="#section1">Статичный сайт</a>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </li>
                <li className="portfolio__menu">
                    <a className="portfolio__paragraph" href="#section2">Адаптивный сайт</a>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </li>
                <li className="portfolio__menu">
                    <a className="portfolio__paragraph" href="#section1">Одностраничное приложение</a>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </li>
                </ul>
            </nav>
        </div>
    );
}

export default Portfolio;