import SearchResult from '../../interfaces/searchResult';
import MovieTile from '../MovieTile/MovieTile';
import styles from './MovieList.module.css';

interface MovieListProps {
  movieList: SearchResult[];
  favHandler: (id: SearchResult['id']) => void;
}

const MovieList = ({ movieList, favHandler }: MovieListProps) => {
  return (
    <div className={styles['list__container']}>
      {movieList.map(movie => {
        return <MovieTile movie={movie} key={movie.id} favHandler={favHandler} />;
      })}
    </div>
  );
};

export default MovieList;
