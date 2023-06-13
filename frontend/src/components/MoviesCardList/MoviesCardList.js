import MoviesCard from "../MoviesCard/MoviesCard";
import first from "../../images/1.png";
import second from "../../images/2.png";
import third from "../../images/3.png";

function MoviesCardList() {
    return(
        <section className="cards">
            <div className="cards__container">
            <MoviesCard
              title="В погоне за Бенкси"
              image={first}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={second}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={third}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={first}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={second}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={third}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={first}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={second}
              time="27 минут"
              isSavedPage={false}
            />
              <MoviesCard
              title="В погоне за Бенкси"
              image={third}
              time="27 минут"
              isSavedPage={false}
            />
             <MoviesCard
              title="В погоне за Бенкси"
              image={first}
              time="27 минут"
              isSavedPage={false}
            />
             <MoviesCard
              title="В погоне за Бенкси"
              image={second}
              time="27 минут"
              isSavedPage={false}
            />
             <MoviesCard
              title="В погоне за Бенкси"
              image={third}
              time="27 минут"
              isSavedPage={false}
            />
            </div>
        </section>
    );
}

export default MoviesCardList;