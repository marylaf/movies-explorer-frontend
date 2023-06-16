function AboutProject() {
    return (
     <section className="about-project" id="section1">
        <h2 className="title">О проекте</h2>
        <div className="about-project__container">
            <h3 className="about-project__main">Дипломный проект включал 5 этапов</h3>
            <h3 className="about-project__main about-project__main-second">На выполнение диплома ушло 5 недель</h3>
            <p className="about-project__paragraph">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
            <p className="about-project__paragraph">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
        <div className="about-project__table">
            <p className="about-project__cell about-project__cell_type_white">1 неделя</p>
            <p className="about-project__cell about-project__cell_type_black">4 недели</p>
            <p className="about-project__cell about-project__cell_type_grey">Back-end</p>
            <p className="about-project__cell about-project__cell_type_grey">Front-end</p>
        </div>
    </section>
    );
}

export default AboutProject;