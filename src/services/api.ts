import Search, { defaultSearch, isSearch } from '../interfaces/search';
import parseMovies from '../helpers/parseMovies';
import SearchResult from '../interfaces/searchResult';
// import SearchResult from '../interfaces/searchResult';

const apiKey = process.env['REACT_APP_API_KEY'];
const apiURL = process.env['REACT_APP_API_URL'];

const getDiscoverMovies = async (): Promise<SearchResult[]> => {
  const res = await fetchFactory<Search>('/discover/movie');
  return isSearch(res) ? parseMovies(res.results) : defaultSearch.results;
};

const searchMovies = async (searchStr: string): Promise<SearchResult[]> => {
  const res = await fetchFactory<Search>('/search/movie', {}, `&query=${searchStr}`);
  return isSearch(res) ? parseMovies(res.results) : defaultSearch.results;
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

export { getDiscoverMovies, searchMovies };
