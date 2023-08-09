import { useState, useCallback, useEffect } from 'react';
import iconSaved from "../../images/saved.svg";
import { mainApi } from "../../utils/MainApi";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function MoviesCard({ movie, nameRU, duration, image, handleCardClick }) {
  
  const { savedMovies, setSavedMovies } = useSavedMovies();
  const realMovieId = movie.id || movie._id;

    const [isSaved, setIsSaved] = useState(() => {
      // Проверяем, сохранен ли этот конкретный фильм
      const savedState = savedMovies.some(savedMovie => savedMovie._id === realMovieId);
      return savedState;
    });

      useEffect(() => {
        console.log(savedMovies, 'CARDTwo');
        setIsSaved(savedMovies.some(savedMovie => savedMovie._id === realMovieId));
    }, [realMovieId, savedMovies]);

      const handleMovieSave = (movie) => {
        const existingMovie = savedMovies.find(savedMovie => savedMovie._id === realMovieId);
      console.log(savedMovies[1]);
        if (existingMovie) {
            console.log("Фильм уже сохранен");
            setIsSaved(true);
            return;
        } else {
          mainApi.saveMovie(movie)
            .then(() =>  {
              setIsSaved(true);
              let savedMovieIds = JSON.parse(localStorage.getItem('savedMovieIds') || "[]");
              savedMovieIds.push(movie.id);
              localStorage.setItem('savedMovieIds', JSON.stringify(savedMovieIds));
            })
            .catch(() => {
              console.log("Ошибка");
            });
        };
      };

      const handleMovieDelete = (movie) => {
        mainApi.deleteMovie(movie.id)
          .then(() =>  {
            // Удалить фильм из списка savedMovies
            const updatedSavedMovies = savedMovies.filter(savedMovie => savedMovie.id !== movie.id);
            setSavedMovies(updatedSavedMovies);
      
            // Обновить localStorage с удаленным ID
            let savedMovieIds = JSON.parse(localStorage.getItem('savedMovieIds') || "[]");
            savedMovieIds = savedMovieIds.filter(savedMovieId => savedMovieId !== realMovieId);
            localStorage.setItem('savedMovieIds', JSON.stringify(savedMovieIds));
          })
          .catch(() => {
            console.log("Ошибка");
          });
      };


    const handleSaveClick = useCallback(() => {
        console.log('проверка в клике', isSaved);
        handleMovieSave(movie);
    }, []);

    return(
        <article className="card">
            <div className="card__titles">
                <h4 className="card__name">{nameRU}</h4>
                <p className="card__count">{duration}</p>
            </div>
            <img className="card__image" onClick={handleCardClick} src={image} alt="Обложка фильма" />
            <button className={`card__button ${isSaved ? "card__button-pink" : "card__save-button"}`}
            type="button"
            onClick={handleSaveClick}
            >{isSaved ? (<img src={iconSaved} alt="Галочка" />) : 'Сохранить'}</button>
      </article>
    );
}

export default MoviesCard;