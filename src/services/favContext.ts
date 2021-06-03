import { createContext } from 'react';
import FavDictionary from '../interfaces/FavDictionary';
import SearchResult from '../interfaces/searchResult';

interface FavContext {
  favDictionary: FavDictionary;
  favHandler: (movie: SearchResult) => void;
}

const favContext = createContext<FavContext>({
  favDictionary: {},
  favHandler: () => {},
});

export default favContext;
