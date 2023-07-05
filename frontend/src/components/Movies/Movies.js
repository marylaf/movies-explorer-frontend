import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useEffect } from 'react';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";

function Movies({ handleSearch, movies}) {

    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);

    useEffect(() => {
        if(movies.length > 0) {
            setIsLoading(false);
        }
    }, [movies])
    
    const performSearch = (keyword) => {
        setIsLoading(true);
        setSearchError(false);
        handleSearch(keyword)
        .then(() => { 
            setIsLoading(false);
        })
        .catch(() => {
            setIsLoading(false);
            setSearchError(true);
        })
    }

    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm performSearch={performSearch} />
              {isLoading ? <Preloader /> : movies.length > 0 ? (<MoviesCardList movies={movies}/>) : (
                <p className="paragraph">{searchError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}</p>
            )}
            <MoreFilms />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default Movies;