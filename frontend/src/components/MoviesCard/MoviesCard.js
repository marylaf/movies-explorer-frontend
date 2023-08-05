import { useState, useCallback, useEffect } from 'react';
import iconSaved from "../../images/saved.svg";
import { mainApi } from "../../utils/MainApi";

function MoviesCard({ movie, nameRU, duration, image, handleCardClick, savedMovies }) {

    const [isSaved, setIsSaved] = useState(() => {
        // Проверяем, сохранен ли этот конкретный фильм
        const savedState = savedMovies.some(savedMovie => savedMovie.id === movie.id);
        return savedState;
      });

      useEffect(() => {
        const savedMovieIds = JSON.parse(localStorage.getItem('savedMovieIds') || "[]");
        setIsSaved(savedMovieIds.includes(movie.id));
    }, [movie.id]);

      const handleMovieSave = (movie) => {
        const existingMovie = savedMovies.find(savedMovie => savedMovie.id === movie.id);
      
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