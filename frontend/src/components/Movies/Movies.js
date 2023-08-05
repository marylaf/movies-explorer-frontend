import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useEffect, useMemo } from 'react';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";


function Movies({ performSearch, movies, handleMovieSave, toggleBurger, isLoading, searchError, handleLoadMore, displayedMovies, savedMovies }) {

    return (
        <section className="movies">
            <HeaderAuth toggleBurger={toggleBurger} />
            <SearchForm searchFilms={performSearch} />
               {isLoading ? (
        <Preloader />
      ) : movies.length > 0 ? (
        <>
          <MoviesCardList savedMovies={savedMovies} movies={displayedMovies} handleMovieSave={handleMovieSave} />
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