import { createContext } from 'react';
import FavDictionary from '../interfaces/FavDictionary';
import Movie from '../interfaces/movie';

interface IFavContext {
  favDictionary: FavDictionary;
  favHandler: (movie: Movie) => void;
}

const FavContext = createContext<IFavContext>({
  favDictionary: {},
  favHandler: () => {},
});

export default FavContext;
