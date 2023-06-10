import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import Preloader from "../Preloader/Preloader";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Movies() {
    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm />
            <MoviesCardList />
            <Preloader />
            <Footer />
            <BurgerMenu />
        </section>
    );
}

export default Movies;