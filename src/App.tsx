import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import MovieList from './components/MovieList/MovieList';
import Navbar from './components/Navbar/Navbar';
import SearchResult from './interfaces/searchResult';
import {
  createSession,
  getAccountDetails,
  getDiscoverMovies,
  getFavMovies,
  markAsFavorite,
} from './services/api';
import favContext from './services/favContext';

function App() {
  const [movies, setMovies] = useState<SearchResult[]>([]);
  const [favMovies, setFavMovies] = useState<SearchResult[]>([]);
  const [favDictionary, setFavDictionary] = useState<{ [key: string]: true }>({});
  const [sessionId, setSessionId] = useState<string>(localStorage.getItem('session_id') || '');
  const [userId, setUserId] = useState<number>(0);
  const { search } = useLocation();

  useEffect(() => {
    if (search) {
      const token = search.slice(search.indexOf('=') + 1, search.indexOf('&', 1));
      createSession(token).then(sesId => {
        localStorage.setItem('session_id', sesId);
        setSessionId(sesId);
      });
    }
  }, [search]);

  useEffect(() => {
    const getFavs = async () => {
      if (sessionId) {
        const userId = await getAccountDetails(sessionId);
        setUserId(userId);
        const favResult = await getFavMovies(sessionId, userId);
        setFavMovies(favResult);
        const newFavs: { [key: string]: true } = {};
        favResult.forEach(movie => (newFavs[movie.id] = true));
        setFavDictionary(oldFavs => ({ ...oldFavs, ...newFavs }));
      }
    };
    getDiscoverMovies().then(movies => {
      setMovies(movies);
    });
    getFavs();
  }, [sessionId]);

  const favHandler = (movie: SearchResult): void => {
    const newFavValue = !favDictionary[movie.id];
    markAsFavorite(sessionId, userId, movie.id, newFavValue).then(res => {
      if (res) {
        setFavDictionary({ ...favDictionary, [movie.id]: newFavValue });
        newFavValue
          ? setFavMovies([...favMovies, movie])
          : setFavMovies(favMovies.filter(mov => mov.id !== movie.id));
      }
    });
  };

  return (
    <div className="App">
      <favContext.Provider value={favDictionary}>
        <Navbar />
        <MovieList movieList={favMovies} favHandler={favHandler} />
        <MovieList movieList={movies} favHandler={favHandler} />
      </favContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
