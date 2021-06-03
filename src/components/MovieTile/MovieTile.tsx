import SearchResult from '../../interfaces/searchResult';
import addFav from '../../assets/addFav.svg';
import removeFav from '../../assets/removeFav.svg';
import styles from './MovieTile.module.css';
import { useContext } from 'react';
import favContext from '../../services/favContext';

interface MovieTileProps {
  movie: SearchResult;
  favHandler: (id: SearchResult) => void;
}

const MovieTile = ({ movie, favHandler }: MovieTileProps) => {
  const favDictionary = useContext(favContext);

  return (
    <div className={styles['movie-container']}>
      <div
        className={styles['movie']}
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        onClick={event => {
          if (event.currentTarget === event.target) {
          } // TODO: handle movie Details
        }}
      >
        <div className={styles['movie__title']}>{movie.title}</div>
        {
          <button
            className={`${styles['movie__fav-btn']} ${
              favDictionary[movie.id] ? styles['movie__show-btn'] : ''
            }`}
            onClick={() => favHandler(movie)}
          >
            <img
              src={favDictionary[movie.id] ? removeFav : addFav}
              alt={favDictionary[movie.id] ? 'remove from favourites' : 'add to favourites'}
            />
          </button>
        }
      </div>
    </div>
  );
};

export default MovieTile;
