import SearchForm from "../SearchForm/SearchForm";
import HeaderAuth from "../HeaderAuth/HeaderAuth";
import Preloader from "../Preloader/Preloader";

function Movies() {
    return (
        <section className="movies">
            <HeaderAuth />
            <SearchForm />
            <Preloader />
        </section>
    );
}

export default Movies;