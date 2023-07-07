import React, { useState } from 'react';
import iconSaved from "../../images/saved.svg";

function MoviesCard({title, time, image, handleCardClick}) {

    const [isSaved, setIsSaved] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(!isSaved);
      };

    return(
        <article className="card" onClick={handleCardClick}>
            <div className="card__titles">
                <h4 className="card__name">{title}</h4>
                <p className="card__count">{time}</p>
            </div>
            <img className="card__image" src={`${"https://api.nomoreparties.co/"}${image}`} alt="Обложка фильма" />
            <button className={`card__button ${isSaved ? "card__button-pink" : "card__save-button"}`}
            type="button"
            onClick={handleSaveClick}
            >{isSaved ? (<img src={iconSaved} alt="Галочка" />) : 'Сохранить'}</button>
      </article>
    );
}

export default MoviesCard;