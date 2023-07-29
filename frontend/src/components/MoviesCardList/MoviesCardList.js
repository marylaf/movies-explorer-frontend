import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, handleMovieSave, isSaved}) {

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
                  key={movie.id}
                  nameRU={movie.nameRU}
                  duration={movie.duration}  
                  isSaved={isSaved}
                  handleCardClick={() => handleCardClick(movie.trailerLink)}
                  handleMovieSave={handleMovieSave}
                />)}
              )}
            </div>
        </section>
    );
}

export default MoviesCardList;