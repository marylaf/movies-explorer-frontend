import "./App.css";
import {
  useState,
  useEffect,
} from "react";
import Main from "../Main/Main";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { Routes, Route } from "react-router-dom";
import Edition from "../Edition/Edition";
import { api } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import PopupSuccess from "../PopupSuccess/PopupSuccess";
import { useSavedMovies } from "../../contexts/SavedMoviesContext";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { setSavedMovies, setSearchResults, searchResults } = useSavedMovies();
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      return true;
    }
    return false;
  });
  const [serverError, setServerError] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState({});
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);

  const toggleBurger = () => {
    setIsBurgerOpen(true);
  };

  useEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, []);

  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      });
      mainApi
        .getCurrentUser()
        .then((userData) => {
          setIsLoggedIn(true);
          setUserEmail(userData.data.email);
          setUserName(userData.data.name);
          navigate(location.pathname, { replace: true });
        })
        .catch((e) => console.log("Ошибка:", e));
    }
  };

  useEffect(() => {
    mainApi.getMovies()
      .then((newMovies) => {
        console.log(newMovies);
        setSavedMovies(newMovies);
    })
      .catch((e) => console.log("Ошибка:", e));
  }, [setSavedMovies]);

  useEffect(() => {
    api
      .getInitialMovies()
      .then((res) => {
        console.log(res, 'вот тут');
        setMovies(res);
        if (searchResults && searchResults.length > 0) {
          setSearchResults(searchResults);
        } else {
          setSearchResults(res); // Установка начальных результатов, если сохраненных нет
        }
      })
      .catch(() => {
        console.log("Ошибка");
      });
  }, []);

  function handleRegister(email, password, name) {
    return mainApi
      .register(email, password, name)
      .then((res) => {
        console.log(res, res.token, 'TOKEN');
        localStorage.setItem("jwt", res.token);
        mainApi.setHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.token}`,
        });
        setCurrentUser(res.data);
        setUserEmail(email);
        setUserName(name);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((error) => {
        setServerError(error); // Установка ошибки
        throw error;
      });
  }

  function handleLogin(email, password) {
    return mainApi
      .login(email, password)
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        mainApi.setHeaders({
          "Content-Type": "application/json",
          Authorization: `Bearer ${res.token}`,
        });
        setCurrentUser(res.data);
        setUserEmail(res.data.email);
        setUserName(res.data.name);
        setIsLoggedIn(true);
        navigate("/movies", { replace: true });
      })
      .catch((error) => {
        setServerError(error); // Установка ошибки
        throw error;
      });
  }

  function handleEdition(name, email) {
    return mainApi
      .updateProfile(name, email)
      .then((res) => {
        setUserName(name);
        setUserEmail(email);
        setCurrentUser(res.data);
        console.log(name, email);
        setIsSuccessPopupOpen(true);
        navigate("/profile", { replace: true });
      })
      .catch((error) => {
        setServerError(error); // Установка ошибки
        throw error;
      });
  }

  function handleSignOut() {
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/sign-in", { replace: true });
  }

  function closeBurger() {
    setIsBurgerOpen(false);
  }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <Routes>
            <Route path="/" element={<Main isLoggedIn={isLoggedIn} />} />
            <Route
              path="/sign-up"
              element={
                <Register
                  handleRegister={handleRegister}
                  serverError={serverError}
                />
              }
            />
            <Route
              path="/sign-in"
              element={
                <Login handleLogin={handleLogin} serverError={serverError} />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleSignOut={handleSignOut}
                    userEmail={userEmail}
                    userName={userName}
                    toggleBurger={toggleBurger}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    movies={movies}
                    toggleBurger={toggleBurger}
                    searchError={searchError}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    toggleBurger={toggleBurger}
                    setSavedMovies={setSavedMovies}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}>
                  <Edition serverError={serverError}
                  handleEdition={handleEdition}
                  userEmail={userEmail}
                  userName={userName} />
                  </ProtectedRoute>
              }
            />
            <Route path="*" element={<Error />} />
          </Routes>
          <BurgerMenu onClose={closeBurger} isOpen={isBurgerOpen} />
          <PopupSuccess isOpen={isSuccessPopupOpen} onClose={() => setIsSuccessPopupOpen(false)} />
      </CurrentUserContext.Provider>
  );
}

export default App;
