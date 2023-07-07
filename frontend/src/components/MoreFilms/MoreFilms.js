function MoreFilms({handleLoadMore}) {
    return(
        <section className="more">
            <button onClick={handleLoadMore} className="more__paragraph">Ещё</button>
        </section>
    );
}

export default MoreFilms;