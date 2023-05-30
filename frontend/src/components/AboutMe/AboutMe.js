import photo from "../../images/masha.jpg";

function AboutMe() {
  
    return (
      <section className="about-me" id="section3">
        <h2 className="about-project__title">Студент</h2>
        <h1 className="about-me__main">Мария</h1>
        <h3 className="about-me__title">Фронтенд-разработчик, 20 лет</h3>
        <p className="about-me__paragraph">Я родилась в маленьком поволжском городе России, но на данный момент проживаю в Армении. У меня есть несколько хобби: я обожаю готовить что-то новое и сложное, а также меня часто приглашают на съемки как модель. Уже год я познаю мир программирования, в частности веб-разработку, но также мне интересен бэкенд. Полгода работала верстальщиком сайтов в частной компании, сейчас же в поиске нового и более серьезного. </p>
        <img className="about-me__photo" src={photo} alt="Логотип" />
        <a href="https://github.com/marylaf" target="_blank" rel="noopener noreferrer" className="about-me__copyright">Github</a>
      </section>
    )
  }
  
  export default AboutMe;