import SearchResult from '../../interfaces/searchResult';
import MovieList from '../MovieList/MovieList';
import styles from './SearchResults.module.css';

interface SearchResultsProps {
  movieList: SearchResult[];
  removeSearch: () => void;
}

const SearchResults = ({ movieList, removeSearch }: SearchResultsProps) => {
  return (
    <div className={styles['search__bg']} onClick={removeSearch}>
      <div className={styles['search__container']} onClick={e => e.stopPropagation()}>
        {movieList.length ? (
          <MovieList direction="horizontal" movieList={movieList} />
        ) : (
          <div className={styles['search__no-movies']}>
            <span className={styles['no-movies__text']}>
              Your search came back empty, try another one ;)
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
