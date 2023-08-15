import { useState, useEffect, useCallback, useMemo } from 'react';
import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";
import Preloader from "../Preloader/Preloader";
import React from "react";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function SavedMovies({ toggleBurger }) {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchError, setSearchError] = useState(false);
  const { savedMovies } = useSavedMovies();

  const handleSearchSaved = useCallback(
    async (keyword, isFilter) => {
      if (!keyword.trim()) {
        // Если ключевое слово пустое, то просто сбрасываем результаты поиска до всех фильмов
        setSearchResults(savedMovies);
        setSearchKeyword("");
        return;
      }
      const filteredMovies = isFilter
        ? savedMovies.filter((savedMovie) => savedMovie.duration <= 40)
        : savedMovies;
      const results = filteredMovies.filter(
        (savedMovie) =>
        savedMovie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        savedMovie.nameEN.toLowerCase().includes(keyword.toLowerCase())
          // savedMovie.country.toLowerCase().includes(keyword.toLowerCase()) ||
          // savedMovie.description
          //   .toLowerCase()
          //   .includes(keyword.toLowerCase()) ||
          // savedMovie.director.toLowerCase().includes(keyword.toLowerCase()) ||
          // savedMovie.year.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
      setSearchKeyword(keyword);
    },
    [savedMovies]
  );

  const savedSearch = async (keyword, isFilter) => {
    setIsLoading(true);
    setSearchError(false);

    try {
      await handleSearchSaved(keyword, isFilter)
      console.log("СОХРАНЕННЫЕ ИЩУТСЯ");
    } catch (error) {
      setSearchError(true);
    } finally {
      setIsLoading(false); // Скрываем прелоадер при завершении поиска (успешном или неуспешном)
    }
  };

    const moviesToRender = useMemo(() => {
      if (searchKeyword.length) {
        return searchResults;
      }
      return savedMovies;
    }, [searchKeyword, searchResults, savedMovies]);

    let pageState = (() => {
      if (isLoading) {
        return "loading";
      }
      if (searchKeyword.length > 0) {
        if (searchError) {
          return "search_error";
        }
        if (searchResults.length === 0) {
          return "no_results";
        }
      }
      return "movies";   
    })();

    return (
        <section className="movies">
            <HeaderAuth toggleBurger={toggleBurger} />
            <SearchForm searchFilms={savedSearch} />
            {pageState === "loading" &&  <Preloader />}
            {pageState === "search_error" &&  <p className="paragraph">{searchError}</p>}
            {pageState === "no_results" &&  <p className="paragraph">Ничего не найдено</p>}
            {pageState === "movies" && <MoviesCardList movies={moviesToRender} />}
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;