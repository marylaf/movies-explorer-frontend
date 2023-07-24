import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies, handleMovieSave, isSaved}) {

  const handleCardClick = (trailerUrl) => {
    window.open(trailerUrl, '_blank');
  }
  // console.log("MOVIES RENDER", movies);
    return(
        <section className="cards">
            <div className="cards__container">
              {movies.map((movie) => 
              {
                console.log('CARDLIST', movies);
              //  console.log(typeof movie.image === String);
                return (
                  <MoviesCard
                  movie={movie}
                  image={movie.image}
                  // image={`${"https://api.nomoreparties.co/"}${movie.image.url}`}
                  trailerLink={movie.trailerLink}
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