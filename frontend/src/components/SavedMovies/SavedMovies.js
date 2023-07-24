import { useState, useEffect } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import React from "react";
import { mainApi } from "../../utils/MainApi";

function SavedMovies({ toggleBurger, isSaved, handleMovieSave }) {
    const [savedMovies, setSavedMovies] = useState([]);

    useEffect(() => {
        mainApi.getMovies()
        .then((movies) => {
            console.log("MOVIES", movies);
            setSavedMovies(movies);
        })
        .catch((e) => console.log("Ошибка:", e));
    }, []);

    return (
        <section className="movies">
            <HeaderAuth toggleBurger={toggleBurger} />
            <SearchForm />
            <MoviesCardList handleMovieSave={handleMovieSave} isSaved={isSaved} movies={savedMovies} />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;