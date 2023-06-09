import find from "../../images/find.svg";
import icon from "../../images/icon-find.svg";
import turnin from "../../images/smalltumb.svg";
import turnoff from "../../images/turnoff.svg";
import { useState, useEffect } from "react";

function SearchForm({ performSearch, isFilter, handleFilterClick }) {
    const [keyword, setKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (evt) => {
        setKeyword(evt.target.value);
      };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (keyword === '') {
            setErrorMessage("Нужно ввести ключевое слово");
        } else {        
            try {
                    performSearch(keyword, isFilter);
                    localStorage.setItem('request', keyword);
                    setErrorMessage('');

                } catch {
                    console.log("Ошибка");
                }
            }
        }

    useEffect(() => {
        const savedRequest = localStorage.getItem('request');

        if (savedRequest) {
            setKeyword(savedRequest);
        }
    }, []);

    return(
    <form className="search" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
            <img src={icon} className="search__icon-find" alt="Иконка поиска" />
            <input className="search__input" value={keyword} onChange={handleInputChange} type="text" placeholder="Фильм" name="keyword" required/>
            {errorMessage &&  <span className="span">{errorMessage}</span>}
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