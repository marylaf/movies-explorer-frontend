import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, savedMovies}) {

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }

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