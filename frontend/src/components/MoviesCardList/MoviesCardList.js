import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({movies}) {
    return(
        <section className="cards">
            <div className="cards__container">
              {movies.map((movie) => 
              { 
                return (
                  <MoviesCard
                  key={movie.id}
                  title={movie.nameRU}
                  image={movie.image.url}
                  time={movie.duration}  
                  isSavedPage={false}
                />)}
              )}
            </div>
        </section>
    );
}

export default MoviesCardList;