import MoviesCard from "../MoviesCard/MoviesCard";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";
import { ADD_SHOW_MOVIES_0, ADD_SHOW_MOVIES_2, ADD_SHOW_MOVIES_3, ADD_SHOW_MOVIES_7 } from "../../utils/constants";

function MoviesCardList({ movies, renderSet, displayedRows }) {

  const { startShow, addShow } = renderSet;

  const { savedMovies } = useSavedMovies();

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }
    return(
        <section className="cards">
            <div className="cards__container">
              {movies.slice(0, startShow + addShow * (displayedRows - 1)).map((movie) => 
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