import { useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import MovieList from './components/MovieList/MovieList';
import Navbar from './components/Navbar/Navbar';
import SearchResult from './interfaces/searchResult';
import { getDiscoverMovies } from './services/api';

function App() {
  const [movies, setMovies] = useState<SearchResult[]>([]);
  useEffect(() => {
    getDiscoverMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  const saveFavLocally = (movieId: number, isFav: boolean): void => {
    isFav
      ? localStorage.setItem(movieId.toString(), isFav.toString())
      : localStorage.removeItem(movieId.toString());
  };

  const favHandler = (movieId: SearchResult['id']): void => {
    const updatedMovies = movies.filter(movie => {
      if (movie.id === movieId) {
        movie.isFav = !movie.isFav;
        saveFavLocally(movieId, movie.isFav);
      }
      return movie;
    });
    setMovies(updatedMovies);
  };

  return (
    <div className="App">
      <Navbar />
      <MovieList movieList={movies} favHandler={favHandler} />
      <Footer />
    </div>
  );
}

export default App;
