import icon from "../../images/icon.svg";

function Portfolio() {
    return(
        <div className="portfolio">
            <h3 className="portfolio__title">Портфолио</h3>
                <a href="https://marylaf.github.io/how-to-learn" target="_blank" rel="noopener noreferrer" className="portfolio__menu">
                    <p className="portfolio__paragraph">Статичный сайт</p>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </a>
                <a href="https://marylaf.github.io/russian-travel" target="_blank" rel="noopener noreferrer" className="portfolio__menu">
                   <p className="portfolio__paragraph">Адаптивный сайт</p>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </a>
                <a href="https://mary.diplom.nomoredomains.monster" target="_blank" rel="noopener noreferrer" className="portfolio__menu">
                    <p className="portfolio__paragraph">Одностраничное приложение</p>
                    <img className="portfolio__icon" src={icon} alt="Логотип" />
                </a>
        </div>
    );
}

export default Portfolio;