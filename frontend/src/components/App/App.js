import './App.css';
import { useState, useEffect, useCallback } from "react";
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

function App() {
  const [searchResults, setSearchResults] = useState(() => {
    const savedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
    return savedSearchResults;
  });
  const [isFilter, setIsFilter] = useState(() => {
    const savedIsFilter = JSON.parse(localStorage.getItem('isFilter'))
    return savedIsFilter;
  });
  const [movies, setMovies] = useState([]);

  const handleFilterClick = () => {
    setIsFilter(!isFilter);
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
    localStorage.setItem('isFilter', JSON.stringify(isFilter));
  }, [searchResults, isFilter])

  const handleSearch = useCallback(async (request) => {
      const filteredMovies = isFilter ? movies.filter((movie) => movie.duration <= 40) : movies;
      const results = filteredMovies.filter(movie =>
        movie.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        movie.nameEN.toLowerCase().includes(request.toLowerCase()) ||
        movie.country.toLowerCase().includes(request.toLowerCase()) ||
        movie.nameRU.toLowerCase().includes(request.toLowerCase()) ||
        movie.description.toLowerCase().includes(request.toLowerCase()) ||
        movie.director.toLowerCase().includes(request.toLowerCase()) ||
        movie.year.toLowerCase().includes(request.toLowerCase())
        );
        setSearchResults(results);
    }, [movies, isFilter]);

    return (
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
              path="/movies" element={<Movies handleFilterClick={handleFilterClick} movies={searchResults} handleSearch={handleSearch} isFilter={isFilter} />}
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
    );
}

export default App;
