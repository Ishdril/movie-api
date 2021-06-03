import { ChangeEvent, useContext, useMemo, useState } from 'react';
import { debounce } from '../../helpers/debounce';
import loginRedirect from '../../helpers/loginRedirect';
import SearchResult from '../../interfaces/searchResult';
import { deleteSession, getToken, searchMovies } from '../../services/api';
import LoginContext from '../../services/LoginContext';
import SearchResults from '../SearchResults/SearchResults';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [searchStr, setSearchStr] = useState<string>('');
  const [movies, setMovies] = useState<SearchResult[]>([]);
  const { sessionId, handleLogout } = useContext(LoginContext);

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

  const handleLogin = (action: string): void => {
    if (action === 'login') {
      getToken().then(token => {
        window.location.href = loginRedirect(token);
      });
    } else if (action === 'logout') {
      deleteSession(sessionId).then(res => {
        if (res) {
          handleLogout();
        }
      });
    } else {
      console.error('wrong parameter');
    }
  };

  const removeSearch = (): void => {
    setSearchStr('');
    setMovies([]);
  };

  return (
    <div className={styles['navbar']}>
      <input placeholder="search your movie" value={searchStr} onChange={handleSearch} />
      {searchStr.length ? <SearchResults movieList={movies} removeSearch={removeSearch} /> : null}
      <button
        className={styles['login']}
        onClick={() => handleLogin(sessionId ? 'logout' : 'login')}
      >
        {sessionId ? 'logout' : 'login'}
      </button>
    </div>
  );
};

export default Navbar;
