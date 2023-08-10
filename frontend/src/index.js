import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./components/App/App";
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { SavedMoviesProvider } from "./contexts/SavedMoviesContext";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <SavedMoviesProvider>
      <App />
    </SavedMoviesProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
