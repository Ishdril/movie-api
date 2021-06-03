import { MouseEvent, useContext } from 'react';
import SearchResult from '../../interfaces/searchResult';
import addFav from '../../assets/addFav.svg';
import removeFav from '../../assets/removeFav.svg';
import FavContext from '../../services/FavContext';
import MovieDetailsContext from '../../services/MovieDetailsContext';
import styles from './MovieTile.module.css';

interface MovieTileProps {
  movie: SearchResult;
}

const MovieTile = ({ movie }: MovieTileProps) => {
  const { favDictionary, favHandler } = useContext(FavContext);
  const { movieDetailsHandler } = useContext(MovieDetailsContext);

  const clickFavHandler = (e: MouseEvent): void => {
    e.stopPropagation();
    favHandler(movie);
  };

  return (
    <div className={styles['movie-container']}>
      <div
        className={styles['movie']}
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        onClick={() => {
          movieDetailsHandler(movie.id);
        }}
      >
        <div className={styles['movie__title']}>{movie.title}</div>
        {
          <button className={styles['movie__fav-btn']} onClick={clickFavHandler}>
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
