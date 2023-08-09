import React, { createContext, useState, useContext } from 'react';

const SavedMoviesContext = createContext();

export function SavedMoviesProvider({ children }) {
  const [savedMovies, setSavedMovies] = useState([]);

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, setSavedMovies }}>
      {children}
    </SavedMoviesContext.Provider>
  );
}

export function useSavedMovies() {
  return useContext(SavedMoviesContext);
}