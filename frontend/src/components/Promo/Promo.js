import React from "react";
import promo from "../../images/promo.svg";

function Promo() {
  
  return (
      <section className="promo">
        <img className="promo__picture" src={promo} alt="рисунок буквы" />
        <h1 className="promo__title">Учебный проект студентки факультета Веб-разработки.</h1>
      </section>
 );
}

export default Promo;