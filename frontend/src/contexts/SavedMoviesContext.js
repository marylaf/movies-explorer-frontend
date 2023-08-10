import React, { createContext, useState, useContext } from 'react';

const SavedMoviesContext = createContext();

export function SavedMoviesProvider({ children }) {
  const [savedMovies, setSavedMovies] = useState([]);
  const [searchResults, setSearchResults] = useState(() => {
    const savedSearchResults = JSON.parse(
      localStorage.getItem("searchResults")
    );
    return savedSearchResults ? savedSearchResults : [];
  });

  return (
    <SavedMoviesContext.Provider value={{ savedMovies, setSavedMovies, searchResults, setSearchResults }}>
      {children}
    </SavedMoviesContext.Provider>
  );
}

export function useSavedMovies() {
  return useContext(SavedMoviesContext);
}