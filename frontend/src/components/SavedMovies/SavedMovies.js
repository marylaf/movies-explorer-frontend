import { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import React from "react";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ toggleBurger, savedMovies, setSavedMovies }) {

    useEffect(() => {
    mainApi.getMovies()
      .then((newMovies) => {
        console.log("MOVIES", newMovies, savedMovies);
        if (JSON.stringify(newMovies) !== JSON.stringify(savedMovies)) {
          setSavedMovies(newMovies);
        }
    })
      .catch((e) => console.log("Ошибка:", e));
    }, []);

    return (
        <section className="movies">
            <HeaderAuth toggleBurger={toggleBurger} />
            <SearchForm />
            <MoviesCardList movies={savedMovies} savedMovies={savedMovies} />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;