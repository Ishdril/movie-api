import styles from './SearchResults.module.css';
import SearchResult from '../../interfaces/searchResult';
import MovieList from '../MovieList/MovieList';

interface SearchResultsProps {
  movieList: SearchResult[];
  removeSearch: () => void;
}

const SearchResults = ({ movieList, removeSearch }: SearchResultsProps) => {
  return (
    <div className={styles['search__bg']} onClick={removeSearch}>
      <div className={styles['search__container']}>
        <MovieList direction="horizontal" movieList={movieList} />
      </div>
    </div>
  );
};

export default SearchResults;
