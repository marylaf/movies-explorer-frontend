import React, { useState, useEffect } from 'react';
import iconSaved from "../../images/saved.svg";

function MoviesCard({ movie, isSaved, nameRU, duration, image, handleCardClick, handleMovieSave}) {

    // const [isSaved, setIsSaved] = useState(false);

    // useEffect(() => {
    //     console.log('ПЕРЕКЛЮЧИЛОСЬ', isSaved);
    // }, [isSaved]);

    const handleSaveClick = React.useCallback(() => {
        console.log('НАЧАЛО', isSaved);
        handleMovieSave(movie);
    }, [movie]);

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