import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useEffect } from 'react';
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Movies({ handleSearch, movies}) {

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        console.log(handleSearch());
        handleSearch()
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    }, [handleSearch]);

    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm handleSearch={handleSearch} />
              {isLoading ?  <Preloader /> : movies.length > 0 ? (<MoviesCardList movies={movies}/>) : (
                <p className="paragraph">Ничего не найдено</p>
            )}
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default Movies;