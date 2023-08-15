import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import iconSaved from "../../images/saved.svg";
import iconDelete from "../../images/icon_delete.svg";
import { mainApi } from "../../utils/MainApi";
import { api } from "../../utils/MoviesApi";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function MoviesCard({ movie, nameRU, duration, image, handleCardClick }) {
  const { savedMovies, setSavedMovies } = useSavedMovies();
  const location = useLocation();

  const isMoviesActive = location.pathname === "/movies";
  const isSavedMoviesActive = location.pathname === "/saved-movies";
  const realMovieId = movie.id || movie.movieId;

  const [isSaved, setIsSaved] = useState(() => {
    // Проверяем, сохранен ли этот конкретный фильм
    const savedState = savedMovies.some(
      (savedMovie) => (savedMovie.id ?? savedMovie.movieId) === realMovieId
    );
    return savedState;
  });

  useEffect(() => {
    setIsSaved(
      savedMovies.some(
        (savedMovie) => (savedMovie.id ?? savedMovie.movieId) === realMovieId
      )
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
    const savedMovieToDelete = savedMovies.find(
      (savedMovie) => savedMovie.movieId === realMovieId
    );
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
    }
  };

  useEffect(() => {
    console.log("проверка в useEffect", isSaved);
  }, [isSaved]);

  const changeButtonStatus = (movie, isSaved) => {
    return isSaved ? handleMovieDelete(movie) : handleMovieSave(movie);
  };

  const handleSaveClick = () => {
    console.log("проверка в клике", isSaved);
    changeButtonStatus(movie, isSaved);
  };

  let buttonState = (() => {
    if (isSaved) {
      if (isSavedMoviesActive) {
        return "saved_page";
      }
      return "movies_page";
    }
    return "don't save";
  })();

  return (
    <article className="card">
      <div className="card__titles">
        <h4 className="card__name">{nameRU}</h4>
        <p className="card__count">
          {mainApi._convertToHoursAndMinutes(duration) ||
            api._convertToHoursAndMinutes(duration)}
        </p>
      </div>
      <img
        className="card__image"
        onClick={handleCardClick}
        src={image}
        alt="Обложка фильма"
      />
      <button
        className={`card__button ${
          buttonState === "saved_page"
            ? "card__save-button"
            : buttonState === "movies_page"
            ? "card__button-pink"
            : "card__save-button"
        }`}
        type="button"
        onClick={handleSaveClick}
      >
        {buttonState === "saved_page" && <img src={iconDelete} alt="Крестик" />}
        {buttonState === "movies_page" && <img src={iconSaved} alt="Галочка" />}
        {buttonState === "don't save" && "Сохранить"}
      </button>
    </article>
  );
}

export default MoviesCard;
