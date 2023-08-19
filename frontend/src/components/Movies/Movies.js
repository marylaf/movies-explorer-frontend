import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import { SHORT_FILM_DURATION, START_SHOW_MOVIES_0, ADD_SHOW_MOVIES_0 } from '../../utils/constants';

function Movies({
  movies,
  handleMovieSave,
  toggleBurger,
  isLoading, setIsLoading,
}) {
  const { searchResults, setSearchResults } = useSavedMovies();
  const [searchError, setSearchError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [renderSet, setRenderSet] = useState({startShow: START_SHOW_MOVIES_0, addShow: ADD_SHOW_MOVIES_0});

  function handleSetRender(setting){
    setRenderSet(setting);
  }
  
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
        ? movies.filter((movie) => movie.duration <= SHORT_FILM_DURATION)
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
    } catch (error) {
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    console.log(renderSet);
    handleSetRender({startShow: renderSet.startShow + renderSet.addShow, addShow: renderSet.addShow } );
  };

  let pageState = (() => {
    if (isLoading) {
      return "loading";
    }
    if (searchResults.length === 0) {
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
      {pageState === "movies" && (<MoviesCardList renderSet={renderSet} handleSetRender={handleSetRender} movies={searchResults} handleMovieSave={handleMovieSave} />)}
      {pageState === "movies" && searchResults.length > movies.slice(0, renderSet.startShow).length && ( <MoreFilms handleLoadMore={handleLoadMore} />)}
      <Footer />
      <BurgerMenu />
    </section>
  );
}

export default Movies;
