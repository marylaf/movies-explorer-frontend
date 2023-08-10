import { useState, useEffect } from "react";
import iconSaved from "../../images/saved.svg";
import { mainApi } from "../../utils/MainApi";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function MoviesCard({ movie, nameRU, duration, image, handleCardClick }) {
  const { savedMovies, setSavedMovies } = useSavedMovies();

  const realMovieId = movie.id || movie.movieId;

  const [isSaved, setIsSaved] = useState(() => {
    // Проверяем, сохранен ли этот конкретный фильм
    const savedState = savedMovies.some(
      (savedMovie) => (savedMovie.id ?? savedMovie.movieId) === realMovieId
    );
    return savedState;
  });
  useEffect(() => {
    console.log("USE EFFECT set saved", realMovieId, savedMovies);
    setIsSaved(
      savedMovies.some((savedMovie) => (savedMovie.id ?? savedMovie.movieId) === realMovieId)
    );
  }, [realMovieId, savedMovies]);


  const handleMovieSave = (movie) => {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        console.log("res", res, movie);
        setSavedMovies([...savedMovies, res.data]);
      })
      .catch(() => {
        console.log("Ошибка");
      });
  };

  const handleMovieDelete = () => {
    const savedMovieToDelete = savedMovies.find((savedMovie) => savedMovie.movieId === realMovieId);
    console.log("savedMovieToDelete", savedMovieToDelete, savedMovies, movie);
    if (savedMovieToDelete) {
      mainApi
        .deleteMovie(savedMovieToDelete._id)
        .then(() => {
          const updatedSavedMovies = savedMovies.filter(
            (savedMovie) => savedMovie._id !== savedMovieToDelete._id
          );
          setSavedMovies(updatedSavedMovies);
        })
        .catch(() => {
          console.log("Ошибка");
        });
  };
}

  useEffect(() => {
    console.log("проверка в useEffect", isSaved);
  }, [isSaved]);

  const changeButtonStatus = (movie, isSaved) => {
    return isSaved ? handleMovieDelete(movie) : handleMovieSave(movie);
  }

  const handleSaveClick = () => {
    console.log("проверка в клике", isSaved);
    changeButtonStatus(movie, isSaved);
  };

  console.log("MOVIE", movie.nameRU, realMovieId, isSaved, savedMovies);

  return (
    <article className="card">
      <div className="card__titles">
        <h4 className="card__name">{nameRU}</h4>
        <p className="card__count">{duration}</p>
      </div>
      <img
        className="card__image"
        onClick={handleCardClick}
        src={image}
        alt="Обложка фильма"
      />
      <button
        className={`card__button ${
          isSaved ? "card__button-pink" : "card__save-button"
        }`}
        type="button"
        onClick={handleSaveClick}
      >
        {isSaved ? <img src={iconSaved} alt="Галочка" /> : "Сохранить"}
      </button>
    </article>
  );
}

export default MoviesCard;
