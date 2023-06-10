import find from "../../images/find.svg";
import icon from "../../images/icon-find.svg";
import turnin from "../../images/smalltumb.svg";
import turnoff from "../../images/turnoff.svg";
import { useState } from "react";

function SearchForm() {

    const [isFilter, setIsFilter] = useState(false);

    const handleFilterClick = () => {
        setIsFilter(!isFilter);

        setTimeout(() => {
            setIsFilter(!isFilter);
    }, 1000); // Задержка в 1 секунду
  };

    return(
    <form className="search">
        <div className="search__container">
            <img src={icon} className="search__icon-find" alt="Иконка поиска" />
            <input className="search__input" type="text" placeholder="Фильм" />
            <button className="search__submit" type="submit">
                <img className="" src={find} alt="Кнопка поиска" />
            </button>
            <button className="search__button-filter" type="button" onClick={handleFilterClick}>
                <img src={isFilter ? turnin : turnoff} alt="Кнопка фильтра короткометражки" />
                <p className="search__name">Короткометражки</p>
            </button>
        </div>
    </form>
    );
}

export default SearchForm;