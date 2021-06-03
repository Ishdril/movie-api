import { useContext } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import MovieDetailsContext from '../../services/MovieDetailsContext';
import styles from './MovieDetails.module.css';
dayjs.extend(advancedFormat);

const MovieDetails = () => {
  const { movieDetails: movie, movieDetailsHandler } = useContext(MovieDetailsContext);
  return (
    <div className={styles['details__bg']} onClick={() => movieDetailsHandler(0)}>
      <div className={styles['details__container']} onClick={e => e.stopPropagation()}>
        <div className={styles['scrollable']}>
          <div className={styles['details__summary']}>
            <div className="movie-poster">
              <img src={movie.poster_path} alt={movie.title} />
            </div>
            <div className={styles['summary__properties']}>
              <h1>{movie.title}</h1>
              <h2>{movie.tagline}</h2>
              <p>
                <span className={styles['field__gray']}>Original title: </span>
                {movie.original_title}
              </p>
              <p>
                <span className={styles['field__gray']}>Released on: </span>
                {dayjs(movie.release_date).format('MMM Do, YYYY')}
              </p>
              <p>
                <span className={styles['field__gray']}>Budget: </span> $
                {movie.budget.toLocaleString()}
              </p>
              <p>
                <span className={styles['field__gray']}>Genres: </span>
                {movie.genres.reduce((acc, el, i, arr) => {
                  return i === arr.length - 1 ? acc + el.name : acc + el.name + ', ';
                }, '')}
              </p>
              <p>
                <span className={styles['field__gray']}>Rating:</span> {movie.vote_average} / 10
              </p>
            </div>
          </div>
          <div className={styles['details__description']}>
            <p>{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
