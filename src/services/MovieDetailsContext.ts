import React, { createContext } from 'react';
import Movie, { initialMovie } from '../interfaces/movie';

interface IMovieDetailsContext {
  movieDetails: Movie;
  setMovieDetails: React.Dispatch<React.SetStateAction<Movie>>;
}

const MovieDetailsContext = createContext<IMovieDetailsContext>({
  movieDetails: initialMovie,
  setMovieDetails: () => {},
});

export default MovieDetailsContext;
