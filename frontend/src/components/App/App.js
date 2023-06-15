import './App.css';
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Error from "../Error/Error";
import { Routes, Route } from "react-router-dom";
import Edition from '../Edition/Edition';

function App() {
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
              path="/movies" element={<Movies />}
            />
            <Route
              path="/saved-movies" element={<SavedMovies />}
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
