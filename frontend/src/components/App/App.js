import './App.css';
import { useState, useEffect, useCallback } from "react";
import Main from "../Main/Main";
import { useNavigate } from "react-router-dom";
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

function App() {

  const navigate = useNavigate();

  const [searchResults, setSearchResults] = useState(() => {
    const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    return savedSearchResults;
  });

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [serverError, setServerError] = useState(null);

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
      })
      .then((res) => {
        if (res) {
          setIsLoggedIn(true);
          navigate("/movies", { replace: true });
          // setUserEmail(res.data.email);
        }
      })
      .catch((e) => console.log("Ошибка", e));
    }
  };

  const handleMovieSave = (movie) => {
    mainApi.saveMovie(movie)
    .then((res) =>  {
      setSavedMovies((prevSavedMovies) => [...prevSavedMovies, movie]);
    })
    .catch(() => {
      console.log("Ошибка");
    });
  };

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

    function handleRegister(email, password, name) {
      return mainApi
        .register(email, password, name)
        .then((res) => {
          navigate("/movies", { replace: true });
        })
        .catch((error) => { 
          setServerError(error); // Установка ошибки
          throw error;
     });
    }

    return (
         <Routes>
            <Route
              path="/" element={<Main />}
            />
            <Route
              path="/sign-up" element={<Register handleRegister={handleRegister} serverError={serverError} />}
            />
            <Route
              path="/sign-in" element={<Login />}
            />
             <Route
              path="/profile" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Profile}
            /> 
            }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Movies}
                  onMovieSave={handleMovieSave}
                  onSearch={handleSearch}
                  movies={searchResults}
                />
              }
              />
            <Route
              path="/saved-movies" element={
                <ProtectedRoute
                  movies={savedMovies}
                  isLoggedIn={isLoggedIn}
                  element={SavedMovies}
            /> 
            }
            />
             <Route
              path="/edit" element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  element={Edition}
            /> 
            }
            />
            <Route
              path="*" element={<Error />}
            />
          </Routes>
    );
}

export default App;
