import { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ searchError, isLoading, toggleBurger, savedMovies, setSavedMovies, savedSearch, displayedMovies }) {


    useEffect(() => {
    mainApi.getMovies()
      .then((newMovies) => {
        if (JSON.stringify(newMovies) !== JSON.stringify(savedMovies)) {
          setSavedMovies(newMovies);
        }
    })
      .catch((e) => console.log("Ошибка:", e));
    }, []);

    return (
        <section className="movies">
            <HeaderAuth toggleBurger={toggleBurger} />
            <SearchForm searchFilms={savedSearch} />
            {isLoading ? (
                <Preloader />
            ) : savedMovies.length > 0 ? (
                <>
                    <MoviesCardList movies={savedMovies} savedMovies={savedMovies} />
                </>
            ) : (
                <p className="paragraph">{searchError ? 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз' : 'Ничего не найдено'}</p>
            )}
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;