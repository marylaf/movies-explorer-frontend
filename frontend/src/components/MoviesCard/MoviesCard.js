import { useState, useCallback, useEffect } from "react";
import iconSaved from "../../images/saved.svg";
import { mainApi } from "../../utils/MainApi";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function MoviesCard({ movie, nameRU, duration, image, handleCardClick }) {
  const { savedMovies, setSavedMovies } = useSavedMovies();
  console.log(savedMovies, "SAVED");
  const realMovieId = movie.id || movie._id;

  const [isSaved, setIsSaved] = useState(() => {
    // Проверяем, сохранен ли этот конкретный фильм
    const savedState = savedMovies.some(
      (savedMovie) => savedMovie._id === realMovieId
    );
    return savedState;
  });
  useEffect(() => {
    setIsSaved(
      savedMovies.some((savedMovie) => savedMovie._id === realMovieId)
    );
  }, [realMovieId, savedMovies]);

  const handleMovieSave = (movie) => {
    const existingMovie = savedMovies.some(
      (savedMovie) => savedMovie._id === realMovieId
    );

    if (existingMovie) {
      console.log("Фильм уже сохранен");
      return;
    } else {
      mainApi
        .saveMovie(movie)
        .then(() => {
          setIsSaved(true);
          let savedMovieIds = JSON.parse(
            localStorage.getItem("savedMovieIds") || "[]"
          );
          savedMovieIds.push(movie.id);
          localStorage.setItem("savedMovieIds", JSON.stringify(savedMovieIds));
        })
        .catch(() => {
          console.log("Ошибка");
        });
    }
  };

  const handleMovieDelete = (movie) => {
    mainApi
      .deleteMovie(movie._id)
      .then(() => {
        setIsSaved(false);
        // Удалить фильм из списка savedMovies
        const updatedSavedMovies = savedMovies.filter(
          (savedMovie) => savedMovie._id !== realMovieId
        );
        setSavedMovies(updatedSavedMovies);

        // Обновить localStorage с удаленным ID
        let savedMovieIds = JSON.parse(
          localStorage.getItem("savedMovieIds") || "[]"
        );
        savedMovieIds = savedMovieIds.filter(
          (savedMovieId) => savedMovieId !== realMovieId
        );
        localStorage.setItem("savedMovieIds", JSON.stringify(savedMovieIds));
      })
      .catch(() => {
        console.log("Ошибка");
      });
  };

  useEffect(() => {
    console.log("проверка в useEffect", isSaved);
  }, [isSaved]);

  const changeButtonStatus = (movie, isSaved ) => {
        return !isSaved ? handleMovieSave(movie) : handleMovieDelete(movie);
  }

  const handleSaveClick = () => {
    console.log("проверка в клике", isSaved);
    changeButtonStatus(movie, isSaved);
  };

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
