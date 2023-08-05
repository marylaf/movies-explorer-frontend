import React, { createContext, useState, useContext } from 'react';

const SavedMoviesContext = createContext();

export function SavedMoviesProvider({ children }) {
  const [isSaved, setIsSaved] = useState(false);

  return (
    <SavedMoviesContext.Provider value={{ isSaved, setIsSaved }}>
      {children}
    </SavedMoviesContext.Provider>
  );
}

export function useSavedMovies() {
  return useContext(SavedMoviesContext);
}