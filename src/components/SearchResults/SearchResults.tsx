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
        <MovieList direction="horizontal" movieList={movieList} />
      </div>
    </div>
  );
};

export default SearchResults;
