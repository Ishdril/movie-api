import Search, { defaultSearch, isSearch } from '../interfaces/search';
import parseMovies from '../helpers/parseMovies';
import SearchResult from '../interfaces/searchResult';
import AccountDetails from '../interfaces/accountDetails';
import Movie, { initialMovie } from '../interfaces/movieDetails';

const apiKey = process.env['REACT_APP_API_KEY'];
const apiURL = process.env['REACT_APP_API_URL'];

const getDiscoverMovies = async (page = 1): Promise<Search> => {
  const res = await fetchFactory<Search>('/discover/movie', {}, `&page=${page}`);
  if (isSearch(res)) res.results = res.results.map(movie => parseMovies(movie));
  const searchResult = res || defaultSearch;
  return searchResult;
};

const searchMovies = async (searchStr: string): Promise<SearchResult[]> => {
  const res = await fetchFactory<Search>('/search/movie', {}, `&query=${searchStr}`);
  return isSearch(res) ? res.results.map(movie => parseMovies(movie)) : defaultSearch.results;
};

const getToken = async (): Promise<string> => {
  const res = await fetchFactory<{ success: boolean; expires_at: string; request_token: string }>(
    '/authentication/token/new'
  );
  if (res && res.success) return res.request_token;
  else return '';
};

const createSession = async (token: string): Promise<string> => {
  const res = await fetchFactory<{ success: boolean; session_id: string }>(
    '/authentication/session/new',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ request_token: token }),
    }
  );
  if (res && res.success) return res.session_id;
  else return '';
};

const getAccountDetails = async (sessionId: string): Promise<number> => {
  const res = await fetchFactory<AccountDetails>('/account', {}, `&session_id=${sessionId}`);
  return res ? res.id : 0;
};

const getFavMovies = async (sessionId: string, userId: number): Promise<SearchResult[]> => {
  const res = await fetchFactory<Search>(
    `/account/${userId}/favorite/movies`,
    {},
    `&session_id=${sessionId}`
  );
  return isSearch(res) ? res.results.map(movie => parseMovies(movie)) : defaultSearch.results;
};

const markAsFavorite = async (
  sessionId: string,
  userId: number,
  movieId: number,
  isFav: boolean
): Promise<boolean> => {
  const favObj = {
    media_type: 'movie',
    media_id: movieId,
    favorite: isFav,
  };
  const res = await fetchFactory<{ success: boolean }>(
    `/account/${userId}/favorite`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(favObj),
    },
    `&session_id=${sessionId}`
  );
  return res && res.success;
};

const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const res = await fetchFactory<Movie>(`/movie/${id}`);
  return res ? parseMovies(res) : initialMovie;
};

const deleteSession = async (sessionId: string): Promise<boolean> => {
  const res = await fetchFactory<{ success: boolean }>('/authentication/session', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ session_id: sessionId }),
  });
  return res && res.success;
};

// custom fetch function to easily create new requests to the API
const fetchFactory = async <T>(
  path: string,
  options?: RequestInit,
  query: string = ''
): Promise<T | false> => {
  try {
    const res = await fetch(apiURL + path + `?api_key=${apiKey}${query}`, options);
    if (res.status >= 400) throw Error(`API responded with a ${res.status} (${res.statusText})`);
    return (await res.json()) as T;
  } catch (error) {
    console.error(`Error fetching [${(options && options.method) || 'GET'}] ${path}: `, error);
    return false;
  }
};

export {
  createSession,
  deleteSession,
  getAccountDetails,
  getDiscoverMovies,
  getFavMovies,
  getToken,
  fetchMovieDetails,
  markAsFavorite,
  searchMovies,
};
