import { createContext } from 'react';
import FavDictionary from '../interfaces/FavDictionary';
import SearchResult from '../interfaces/searchResult';

interface IFavContext {
  favDictionary: FavDictionary;
  favHandler: (movie: SearchResult) => void;
}

const FavContext = createContext<IFavContext>({
  favDictionary: {},
  favHandler: () => {},
});

export default FavContext;
