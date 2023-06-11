import React from "react";

function Footer() {
  const newDate = new Date().getFullYear();
  return (
    <footer className="footer">
       <p className="footer__info">Учебный проект Яндекс.Практикум х BeatFilm.</p>
       <div className="footer__container">
          <p className="footer__copyright footer__copyright_type_grey">© {newDate}</p>
          <div className="footer__info-container">
          <a href="https://practicum.yandex.ru" target="_blank" rel="noopener noreferrer" className="footer__copyright">Яндекс.Практикум</a>
          <a href="https://github.com/marylaf" target="_blank" rel="noopener noreferrer" className="footer__copyright">Github</a>
          </div>
      </div>
    </footer>
  );
  
}

export default Footer;
