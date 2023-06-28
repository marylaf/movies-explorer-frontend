import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";

function SavedMovies({movies}) {
    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm />
            <MoviesCardList isSavedPage={true} movies={movies} />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;