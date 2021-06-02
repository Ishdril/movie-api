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

  return (
    <div className="App">
      <Navbar />
      <MovieList movieList={movies} />
      <Footer />
    </div>
  );
}

export default App;
