import { Link, useNavigate } from "react-router-dom";
import React from "react";

function Error() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };

    return(
    <section className="error">
        <p className="error__big">404</p>
        <p className="error__small">Страница не найдена</p>
        <button className="error__link" onClick={handleGoBack}>
        Назад
      </button>
    </section>
    );
}

export default Error;