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
  toggleBurger, 
  isLoggedIn
}) {
  const { searchResults, setSearchResults } = useSavedMovies();
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
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase())
      );
      setSearchResults(results);
      console.log(results);
    },
    [movies]
  );

  const performSearch = async (keyword, isFilter) => {
    setIsLoading(true);
    setSearchError(false);

    try {
      await handleSearch(keyword, isFilter)
      console.log("ФИЛЬМЫ ИЩУТСЯ");
      setDisplayedRows(1);
    } catch (error) {
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const getMoviesRow = (windowWidth) => {
    if (windowWidth >= 1280) {
      return 4;
    } else if (windowWidth >= 768) {
      return 3;
    } else if (windowWidth >= 320) {
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

  let pageState = (() => {
    if (isLoading) {
      return "loading";
    }
    if (displayedMovies.length === 0) {
      if (searchError) {
        return "search_error";
      }
      return "no_results";
    }
    return "movies";
  })();

  return (
    <section className="movies">
      <HeaderAuth toggleBurger={toggleBurger} />
      <SearchForm searchFilms={performSearch} />
      {pageState === "loading" && <Preloader />}
      {pageState === "search_error" && (<p className="paragraph">{searchError}</p>)}
      {pageState === "no_results" &&  <p className="paragraph">Ничего не найдено</p>}
        {/* <p className="paragraph">
          {searchError
            ? "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            : "Ничего не найдено"}
        </p> */}
      {pageState === "movies" && (<MoviesCardList movies={displayedMovies} handleMovieSave={handleMovieSave} />)}
      {pageState === "movies" && searchResults.length > displayedMovies.length && ( <MoreFilms handleLoadMore={handleLoadMore} />)}
      <Footer />
      <BurgerMenu />
    </section>
  );
}

export default Movies;
