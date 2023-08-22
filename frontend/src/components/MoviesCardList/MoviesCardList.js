import MoviesCard from "../MoviesCard/MoviesCard";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import React, { useState, useEffect } from "react";
import { START_SHOW_MOVIES_12, START_SHOW_MOVIES_8, SCREENWIDTH_730, START_SHOW_MOVIES_5,
  ADD_SHOW_MOVIES_2, ADD_SHOW_MOVIES_3, SCREENWIDTH_731, SCREENWIDTH_1280, SCREENWIDTH_1171 } from '../../utils/constants';

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

		if (screenWidth >= SCREENWIDTH_1280 || screenWidth >= SCREENWIDTH_1171 ) {
			handleSetRender({startShow: START_SHOW_MOVIES_12, addShow: ADD_SHOW_MOVIES_3});
		} else if (screenWidth >= SCREENWIDTH_731) {
			handleSetRender({startShow: START_SHOW_MOVIES_8, addShow: ADD_SHOW_MOVIES_2});
		} else if ( screenWidth <= SCREENWIDTH_730) {
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