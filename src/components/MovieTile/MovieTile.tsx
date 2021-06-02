import SearchResult from '../../interfaces/searchResult';
import addFav from '../../assets/addFav.svg';
import removeFav from '../../assets/removeFav.svg';
import styles from './MovieTile.module.css';

interface MovieTileProps {
  movie: SearchResult;
}

const MovieTile = ({ movie }: MovieTileProps) => {
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
              movie.isFav ? styles['movie__show-btn'] : ''
            }`}
          >
            {' '}
            {/* TODO: handle click favourites */}
            <img
              src={movie.isFav ? removeFav : addFav}
              alt={movie.isFav ? 'remove from favourites' : 'add to favourites'}
            />
          </button>
        }
      </div>
    </div>
  );
};

export default MovieTile;
