import SearchForm from "../SearchForm/SearchForm";
import React, { useState, useCallback, useMemo, useEffect } from "react";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoreFilms from "../MoreFilms/MoreFilms";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Preloader from "../Preloader/Preloader";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import { SHORT_FILM_DURATION, START_SHOW_MOVIES_0, START_SHOW_MOVIES_12, START_SHOW_MOVIES_8, START_SHOW_MOVIES_7, START_SHOW_MOVIES_5, ADD_SHOW_MOVIES_0,
  ADD_SHOW_MOVIES_2, ADD_SHOW_MOVIES_3, ADD_SHOW_MOVIES_7, SCREENWIDTH_1280, SCREENWIDTH_889, SCREENWIDTH_769, SCREENWIDTH_768, SCREENWIDTH_493, SCREENWIDTH_492 } from '../../utils/constants';

function Movies({
  movies,
  handleMovieSave,
  toggleBurger,
  isLoading, setIsLoading,
}) {
  const { searchResults, setSearchResults } = useSavedMovies();
  const [displayedRows, setDisplayedRows] = useState(1);
  const [searchError, setSearchError] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [renderSet, setRenderSet] = useState({startShow: START_SHOW_MOVIES_0, addShow: ADD_SHOW_MOVIES_0});
  
  const [screenWidth, setScreenWidth ] = useState(window.innerWidth);

  useEffect(()=>{
		window.onresize = () => {
      setTimeout(() => {
        setScreenWidth(window.innerWidth);
      }, 1000);
		};	

		if (screenWidth >= SCREENWIDTH_1280) {
			handleSetRender({startShow: START_SHOW_MOVIES_12, addShow: ADD_SHOW_MOVIES_3}); // записать в константу значения количества выводимых фильмов
		} else if (screenWidth <= SCREENWIDTH_889 && screenWidth >= SCREENWIDTH_769 ) {
			handleSetRender({startShow: START_SHOW_MOVIES_7, addShow: ADD_SHOW_MOVIES_7});
		} else if ( screenWidth === SCREENWIDTH_768) {
			handleSetRender({startShow: START_SHOW_MOVIES_8, addShow: ADD_SHOW_MOVIES_2});
		} else if ( screenWidth < SCREENWIDTH_768 && screenWidth >= SCREENWIDTH_493 ) {
			handleSetRender({startShow: START_SHOW_MOVIES_7, addShow: ADD_SHOW_MOVIES_7});
		} else if ( screenWidth <= SCREENWIDTH_492) {
			handleSetRender({startShow: START_SHOW_MOVIES_5, addShow: ADD_SHOW_MOVIES_2});	
		} else {
			handleSetRender({startShow: START_SHOW_MOVIES_5, addShow: ADD_SHOW_MOVIES_2});
		}

	}, [screenWidth]);

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
      setDisplayedRows(1);
    } catch (error) {
      setSearchError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const displayedMovies = useMemo(() => {
    const moviesPerPage = renderSet.startShow + renderSet.addShow * (displayedRows - 1);
    return searchResults.slice(0, moviesPerPage);
  }, [searchResults, renderSet, displayedRows]);


  const handleLoadMore = () => {
    setDisplayedRows((prevRows) => prevRows + 1);
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
      {pageState === "movies" && (<MoviesCardList displayedRows={displayedRows} renderSet={renderSet} movies={displayedMovies} handleMovieSave={handleMovieSave} />)}
      {pageState === "movies" && searchResults.length > displayedMovies.length && ( <MoreFilms handleLoadMore={handleLoadMore} />)}
      <Footer />
      <BurgerMenu />
    </section>
  );
}

export default Movies;
