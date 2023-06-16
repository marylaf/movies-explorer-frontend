import { Link } from "react-router-dom";

function Error() {
    return(
    <section className="error">
        <p className="error__big">404</p>
        <p className="error__small">Страница не найдена</p>
        <Link to="/" className="error__link">
        Назад
        </Link>
    </section>
    );
}

export default Error;