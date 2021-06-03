import { useContext } from 'react';
import SearchResult from '../../interfaces/searchResult';
import LoginContext from '../../services/LoginContext';
import MovieTile from '../MovieTile/MovieTile';
import styles from './MovieList.module.css';

interface MovieListProps {
  title?: string;
  direction: string;
  movieList: SearchResult[];
}

const MovieList = ({ title, direction, movieList }: MovieListProps) => {
  const { sessionId } = useContext(LoginContext);
  return (
    <div className={styles['list']}>
      {title ? <h1>{title}</h1> : null}
      <div
        className={
          direction === 'horizontal'
            ? styles['list__container-horizontal']
            : styles['list__container-grid']
        }
      >
        <div className={direction === 'horizontal' ? styles['scrollable'] : ''}>
          {movieList.length ? (
            movieList.map(movie => {
              return <MovieTile movie={movie} key={movie.id} />;
            })
          ) : !sessionId ? (
            <span className={styles['favorites__add-text']}>Login to add your favourites</span>
          ) : (
            <span className={styles['favorites__add-text']}>Start adding your favourites!</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
