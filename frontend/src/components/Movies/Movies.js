import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useEffect, useMemo } from 'react';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";
import useWindowSize from "../../hooks/resize";


function Movies({ handleSearch, movies, isFilter, handleFilterClick, changeFilter}) {

    const [isLoading, setIsLoading] = useState(false);
    const [searchError, setSearchError] = useState(false);
    const [displayedRows, setDisplayedRows] = useState(1);

    const { width } = useWindowSize();


    const getMoviesRow = (windowWidth) => {
        if (windowWidth >= 1171) {
          return 3; 
        } else if (windowWidth >= 731) {
          return 2; 
        } else {
          return 1;
        }
      };

    const displayedMovies = useMemo(() => {
        const moviesRow = getMoviesRow(width);
        const moviesPerPage = moviesRow * displayedRows;
        // Обновляем список отображаемых фильмов
        return movies.slice(0, moviesPerPage);
    }, [movies, width, displayedRows]); 

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
            setDisplayedRows(1); 
        })
        .catch(() => {
            setIsLoading(false);
            setSearchError(true);
        })
    }

      const handleLoadMore = () => {
        console.log("HANDLE");
        setDisplayedRows((prevRows) => prevRows + 1); // Увеличиваем количество отображаемых рядов
      };

    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm isFilter={isFilter} handleFilterClick={handleFilterClick} performSearch={performSearch} />
               {isLoading ? (
        <Preloader />
      ) : movies.length > 0 ? (
        <>
          <MoviesCardList movies={displayedMovies} />
          {movies.length > displayedMovies.length && <MoreFilms handleLoadMore={handleLoadMore} />}
        </>
      ) : (
                <p className="paragraph">{searchError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}</p>
            )}
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default Movies;