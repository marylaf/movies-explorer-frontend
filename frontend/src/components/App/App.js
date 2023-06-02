import './App.css';
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
      <div className="page">
         <Routes>
            <Route
              path="/" element={<Main />}
            />
            <Route
              path="/signin"
            />
            <Route
              path="/signup"
            />
             <Route
              path="/profile"
            />
            <Route
              path="/movies" element={<Movies />}
            />
            <Route
              path="/saved-movies"
            />
          </Routes>
         <Footer />
      </div>
    );
}

export default App;
