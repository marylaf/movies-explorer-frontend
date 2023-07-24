import './App.css';
import { useState, useEffect, useCallback, useLayoutEffect, useMemo } from "react";
import Main from "../Main/Main";
import { useNavigate, useLocation } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { Routes, Route } from "react-router-dom";
import Edition from '../Edition/Edition';
import { api } from "../../utils/MoviesApi";
import { mainApi } from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import useWindowSize from "../../hooks/resize";


function App() {

  const navigate = useNavigate();
  const location = useLocation();


  const [searchResults, setSearchResults] = useState(() => {
    const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    return savedSearchResults;
  });
  const [movies, setMovies] = useState([]);
  // const [savedMovies, setSavedMovies] = useState([]);
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
  const [displayedRows, setDisplayedRows] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { width } = useWindowSize();

  const toggleBurger = () => {
    setIsBurgerOpen(true);
  }

  useLayoutEffect(() => {
    // настало время проверить токен
    tokenCheck();
  }, []);
  
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      mainApi.setHeaders({
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      })
      mainApi.getCurrentUser()
      .then((userData) => {
        setIsLoggedIn(true);
        setUserEmail(userData.data.email);
        setUserName(userData.data.name);
        navigate(location.pathname, { replace: true });
      })
      .catch((e) => console.log("Ошибка:", e));
    }
  };

  const handleMovieSave = (movie) => {
    console.log('НАЖИМАЕТСЯ', movie);
    mainApi.saveMovie(movie)
    .then((res) =>  {
      setIsSaved(!isSaved);
      console.log('УСПЕХ', isSaved);
      // setSavedMovies([...savedMovies, movie]);
    })
    .catch(() => {
      console.log("Ошибка");
    });
  };

  useEffect(() => {
    if(searchResults.length > 0) {
        setIsLoading(false);
    }
}, [searchResults])

  useEffect(() => {
    api.getInitialMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch(() => {
        console.log("Ошибка");
      });
  }, []);

  // cache results
  useEffect(() => {
    localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults])

  const handleSearch = useCallback(async (keyword, isFilter) => {
      const filteredMovies = isFilter ? movies.filter((movie) => movie.duration <= 40) : movies;
      const results = filteredMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.country.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.description.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.director.toLowerCase().includes(keyword.toLowerCase()) ||
        movie.year.toLowerCase().includes(keyword.toLowerCase())
        );
        setSearchResults(results);
    }, [movies]);

    const getMoviesRow = (windowWidth) => {
      if (windowWidth >= 1171) {
        return 3; 
      } else if (windowWidth >= 731) {
        return 2; 
      } else {
        return 1;
      }
    };


    const performSearch = (keyword, isFilter) => {
      setIsLoading(true);
      setSearchError(false);
      handleSearch(keyword, isFilter)
      .then(() => { 
          setIsLoading(false);
          setDisplayedRows(1); 
      })
      .catch(() => {
          setIsLoading(false);
          setSearchError(true);
      })
  }

  const displayedMovies = useMemo(() => {
      const moviesRow = getMoviesRow(width);
      const moviesPerPage = moviesRow * displayedRows;
      // Обновляем список отображаемых фильмов
      return searchResults.slice(0, moviesPerPage);
  }, [searchResults, width, displayedRows]); 

    function handleRegister(email, password, name) {
      return mainApi
        .register(email, password, name)
        .then((res) => {
          setUserEmail(email);
          setUserName(name);
          setCurrentUser(res.data);
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((error) => { 
          setServerError(error); // Установка ошибки
          throw error;
     });
    }

    const handleLoadMore = () => {
      setDisplayedRows((prevRows) => prevRows + 1); // Увеличиваем количество отображаемых рядов
    };

    function handleLogin(email, password) {
      return mainApi
        .login(email, password)
        .then((res) => {
          localStorage.setItem("jwt", res.token);
          mainApi.setHeaders({
            "Content-Type": "application/json",
            Authorization: `Bearer ${res.token}`,
          });
          setUserEmail(email);
          setCurrentUser(res.data);
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
          navigate("/profile", { replace: true });
        })
        .catch((error) => { 
          setServerError(error); // Установка ошибки
          throw error;
     });
    }

    function handleSignOut() {
      localStorage.removeItem("jwt");
      setIsLoggedIn(false);
      navigate("/sign-in", { replace: true });
  
    }

    function closeBurger() {
      setIsBurgerOpen(false);
    }

    return (
      <CurrentUserContext.Provider value={currentUser}>
         <Routes>
            <Route
              path="/" element={<Main />}
            />
            <Route
              path="/sign-up" element={<Register handleRegister={handleRegister} serverError={serverError} />}
            />
            <Route
              path="/sign-in" element={<Login handleLogin={handleLogin} serverError={serverError} />}
            />
             <Route
              path="/profile" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={() => (
                    <Profile 
                      handleSignOut={handleSignOut}
                      userEmail={userEmail}
                      userName={userName}
                      toggleBurger={toggleBurger}
                    />
                  )}
            /> 
            }
            />
            <Route
                path="/movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={() => (
                      <Movies
                        performSearch={performSearch}
                        handleMovieSave={handleMovieSave}
                        handleSearch={handleSearch}
                        movies={searchResults}
                        toggleBurger={toggleBurger}
                        isLoading={isLoading}
                        searchError={searchError}
                        handleLoadMore={handleLoadMore}
                        displayedMovies={displayedMovies}
                        isSaved={isSaved}
                      />
                    )}
                  />
                }
              />
                <Route
                path="/saved-movies"
                element={
                  <ProtectedRoute
                    isLoggedIn={isLoggedIn}
                    element={() => (
                      <SavedMovies 
                        handleMovieSave={handleMovieSave}
                        handleSearch={handleSearch}
                        movies={movies}
                        toggleBurger={toggleBurger}
                        handleLoadMore={handleLoadMore}
                        isSaved={isSaved}
                      />
                    )}
                  />
                }
              />
             <Route
              path="/edit" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Edition}
                  serverError={serverError}
                  handleEdition={handleEdition}
                  userEmail={userEmail}
                  userName={userName}
            /> 
            }
            />
            <Route
              path="*" element={<Error />}
            />
          </Routes>
           <BurgerMenu onClose={closeBurger} isOpen={isBurgerOpen} />
          </CurrentUserContext.Provider>
    );
}

export default App;
