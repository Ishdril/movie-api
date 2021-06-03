import { createContext } from 'react';
import IMovieDetails, { initialMovie } from '../interfaces/movieDetails';

interface IMovieDetailsContext {
  movieDetails: IMovieDetails;
  movieDetailsHandler: (movieId: number) => void;
}

const MovieDetailsContext = createContext<IMovieDetailsContext>({
  movieDetails: initialMovie,
  movieDetailsHandler: () => {},
});

export default MovieDetailsContext;
