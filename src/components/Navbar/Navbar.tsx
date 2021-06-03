import { ChangeEvent, useMemo, useState } from 'react';
import { debounce } from '../../helpers/debounce';
import SearchResult from '../../interfaces/searchResult';
import { getToken, searchMovies } from '../../services/api';

const Navbar = () => {
  const [searchStr, setSearchStr] = useState<string>('');
  const [movies, setMovies] = useState<SearchResult[]>([]);

  const memoizedDebounce = useMemo(
    () =>
      debounce((search: string): void => {
        if (search) searchMovies(search).then(searchResult => setMovies(searchResult));
        else setMovies([]);
      }, 400),
    []
  );

  const handleSearch = ({ target }: ChangeEvent<HTMLInputElement>): void => {
    setSearchStr(target.value);
    memoizedDebounce(target.value);
  };

  const handleClick = () => {
    getToken().then(token => {
      window.location.href = `https://www.themoviedb.org/authenticate/${token}?redirect_to=http://localhost:3000/`;
    });
  };

  return (
    <div>
      <input placeholder="search your movie" value={searchStr} onChange={handleSearch} />
      {movies.map(movie => (
        <p key={movie.id}>{movie.title}</p>
      ))}
      <div onClick={() => handleClick()}>login</div>
    </div>
  );
};

export default Navbar;
