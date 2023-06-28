import find from "../../images/find.svg";
import icon from "../../images/icon-find.svg";
import turnin from "../../images/smalltumb.svg";
import turnoff from "../../images/turnoff.svg";
import { useState, useEffect, useContext } from "react";
import SearchContext from '../../contexts/SearchContext';

function SearchForm({ handleSearch }) {

    const [isFilter, setIsFilter] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const { searchResults, setSearchResults } = useContext(SearchContext);

    const handleInputChange = (evt) => {
        setKeyword(evt.target.value);
      };

    const handleFilterClick = () => {
        setIsFilter(!isFilter);
  };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        if (keyword === '') {
            setErrorMessage("Нужно ввести ключевое слово");
        } else {                            // если успешно
            handleSearch(keyword)
            .then((searchResults) => {
                localStorage.setItem('searchResults', JSON.stringify(searchResults));
                localStorage.setItem('request', keyword);
                localStorage.setItem('isFilter', JSON.stringify(isFilter));
                setErrorMessage('');
            })
            .catch(() => console.log("Ошибка"))
        }
    };

    useEffect(() => {
        const savedRequest = localStorage.getItem('request');
        const savedIsFilter = JSON.parse(localStorage.getItem('isFilter'));
        const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
        if (savedRequest) {
            setKeyword(savedRequest);
            handleSearch(savedRequest);
        }
        if (savedIsFilter) {
            setIsFilter(savedIsFilter);
        }
        if (savedSearchResults) {
            setSearchResults(savedSearchResults);
          }
    }, []);

    return(
    <form className="search" onSubmit={handleSubmit} noValidate>
        <div className="search__container">
            <img src={icon} className="search__icon-find" alt="Иконка поиска" />
            <input className="search__input" onChange={handleInputChange} type="text" placeholder="Фильм" name="keyword" required/>
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