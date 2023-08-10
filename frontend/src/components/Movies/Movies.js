import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import useWindowSize from "../../hooks/resize";

function Movies({
  movies,
  handleMovieSave,
  toggleBurger
}) {
  const { savedMovies, searchResults, setSearchResults } = useSavedMovies();
  const [displayedRows, setDisplayedRows] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const { width } = useWindowSize();

  
  useEffect(() => {
    if (searchResults.length > 0) {
      setIsLoading(false);
    }
    // cache results
    localStorage.setItem("searchResults", JSON.stringify(searchResults));
  }, [searchResults]);

  const handleSearch = useCallback(
    async (keyword, isFilter) => {
      if (!keyword.trim()) {
        console.log(keyword);
        // Если ключевое слово пустое, то просто сбрасываем результаты поиска до всех фильмов
        setSearchResults(movies);
        setSearchKeyword("");
        return;
      }
      const filteredMovies = isFilter
        ? movies.filter((movie) => movie.duration <= 40)
        : movies;
      const results = filteredMovies.filter(
        (movie) =>
          movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.country.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.description.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.director.toLowerCase().includes(keyword.toLowerCase()) ||
          movie.year.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
    },
    [movies]
  );

  const performSearch = (keyword, isFilter) => {
    setIsLoading(true);
    setSearchError(false);
    handleSearch(keyword, isFilter)
      .then(() => {
        console.log("ФИЛЬМЫ ИЩУТСЯ");
        setDisplayedRows(1);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setSearchError(true);
      });
  };


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
    return searchResults.slice(0, moviesPerPage);
  }, [searchResults, width, displayedRows]);


  const handleLoadMore = () => {
    setDisplayedRows((prevRows) => prevRows + 1); // Увеличиваем количество отображаемых рядов
  };

  return (
    <section className="movies">
      <HeaderAuth toggleBurger={toggleBurger} />
      <SearchForm searchFilms={performSearch} />
      {isLoading ? (
        <Preloader />
      ) : searchResults.length > 0 ? (
        <>
          <MoviesCardList
            movies={displayedMovies}
            handleMovieSave={handleMovieSave}
          />
          {searchResults.length > displayedMovies.length && (
            <MoreFilms handleLoadMore={handleLoadMore} />
          )}
        </>
      ) : (
        <p className="paragraph">
          {searchError
            ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            : "Ничего не найдено"}
        </p>
      )}
      <Footer />
      <BurgerMenu />
    </section>
  );
}

export default Movies;
