import MoviesCard from "../MoviesCard/MoviesCard";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function MoviesCardList({ movies }) {

  const { savedMovies } = useSavedMovies();

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }
  console.log(savedMovies);
    return(
        <section className="cards">
            <div className="cards__container">
              {movies.map((movie) => 
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