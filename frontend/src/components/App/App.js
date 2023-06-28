import './App.css';
import { useState, useEffect } from "react";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { Routes, Route } from "react-router-dom";
import Edition from '../Edition/Edition';
import { api } from "../../utils/MoviesApi";
import SearchContext from '../../contexts/SearchContext';

function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    api.getInitialMovies()
      .then((res) => {
        setMovies(res);
      })
      .catch(() => {
        console.log("Ошибка");
      });
  }, []);

  const handleSearch = (request) => {
    const results = movies.filter(movie =>
      movie.nameRU.toLowerCase().includes(request.toLowerCase()))
      setSearchResults(results);
  }

    return (
      <SearchContext.Provider value={{ searchResults, setSearchResults }}>
         <Routes>
            <Route
              path="/" element={<Main />}
            />
            <Route
              path="/sign-up" element={<Register />}
            />
            <Route
              path="/sign-in" element={<Login />}
            />
             <Route
              path="/profile" element={<Profile />}
            />
            <Route
              path="/movies" element={<Movies movies={searchResults} handleSearch={handleSearch}  />}
            />
            <Route
              path="/saved-movies" element={<SavedMovies movies={movies} />}
            />
             <Route
              path="/edit" element={<Edition />}
            />
            <Route
              path="*" element={<Error />}
            />
          </Routes>
      </SearchContext.Provider>
    );
}

export default App;
