import MoviesCard from "../MoviesCard/MoviesCard";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import React, { useState, useEffect } from "react";
import { START_SHOW_MOVIES_12, START_SHOW_MOVIES_8, START_SHOW_MOVIES_7, START_SHOW_MOVIES_5,
  ADD_SHOW_MOVIES_2, ADD_SHOW_MOVIES_3, ADD_SHOW_MOVIES_7, SCREENWIDTH_1280, SCREENWIDTH_889, SCREENWIDTH_769, SCREENWIDTH_768, SCREENWIDTH_493, SCREENWIDTH_492 } from '../../utils/constants';

function MoviesCardList({ movies, renderSet, handleSetRender }) {

  const { savedMovies } = useSavedMovies();

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }
 
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
  
    return(
        <section className="cards">
            <div className="cards__container">
              {movies.slice(0, renderSet.startShow).map((movie) => 
              {
                return (
                  <MoviesCard
                  movie={movie}
                  image={movie.image}
                  trailerLink={movie.trailerLink}
                  thumbnail={movie.thumbnail}
                  movieId={movie.id}
                  key={movie.id || movie._id}
                  nameRU={movie.nameRU}
                  duration={movie.duration}  
                  handleCardClick={() => handleCardClick(movie.trailerLink)}
                  savedMovies={savedMovies}
                  movies={movies}
                />)}
              )}
            </div>
        </section>
    );
}

export default MoviesCardList;