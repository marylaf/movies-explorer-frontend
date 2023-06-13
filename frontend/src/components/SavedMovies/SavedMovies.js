import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import Footer from "../Footer/Footer";

function SavedMovies() {
    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm />
            <MoviesCardList isSavedPage={true} />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default SavedMovies;