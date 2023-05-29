import './App.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import { Routes, Route } from "react-router-dom";

function App() {
    return (
      <div className="page">
         <Header />
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
              path="/movies"
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
