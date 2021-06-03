import SearchResult from '../../interfaces/searchResult';
import MovieTile from '../MovieTile/MovieTile';
import styles from './MovieList.module.css';

interface MovieListProps {
  direction: string;
  movieList: SearchResult[];
}

const MovieList = ({ direction, movieList }: MovieListProps) => {
  return (
    <div
      className={
        direction === 'horizontal'
          ? styles['list__container-horizontal']
          : styles['list__container-grid']
      }
    >
      <div className={direction === 'horizontal' ? styles['scrollable'] : ''}>
        {movieList.map(movie => {
          return <MovieTile movie={movie} key={movie.id} />;
        })}
      </div>
    </div>
  );
};

export default MovieList;
