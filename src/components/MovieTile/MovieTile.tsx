import SearchResult from '../../interfaces/searchResult';
import addFav from '../../assets/addFav.svg';
import removeFav from '../../assets/removeFav.svg';

interface MovieTileProps {
  movie: SearchResult;
}

const MovieTile = ({ movie }: MovieTileProps) => {
  return (
    <div className="movie-container">
      <div
        className="movie"
        style={{ backgroundImage: `url(${movie.backdrop_path})` }}
        onClick={event => {
          if (event.currentTarget === event.target) {
          } // TODO: handle movie Details
        }}
      >
        <div className="movie-title">{movie.title}</div>
        {
          <button className={'movie-fav-button' + (movie.isFav ? ' show-btn' : '')}>
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
