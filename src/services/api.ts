import Search, { defaultSearch, isSearch } from '../interfaces/search';
// import SearchResult from '../interfaces/searchResult';

const apiKey = process.env['REACT_APP_API_KEY'];
const apiURL = process.env['REACT_APP_API_URL'];

const getDiscoverMovies = async (): Promise<Search> => {
  const res = await fetchFactory<Search>('/discover/movie');
  return isSearch(res) ? res : defaultSearch;
};

const searchMovies = async (searchStr: string): Promise<Search> => {
  const res = await fetchFactory<Search>('/search/movie', {}, `&query=${searchStr}`);
  return isSearch(res) ? res : defaultSearch;
};

// custom fetch function to easily create new requests to the API
const fetchFactory = async <T>(
  path: string,
  options?: RequestInit,
  query: string = ''
): Promise<T | Response | false> => {
  try {
    const res = await fetch(apiURL + path + `?api_key=${apiKey}${query}`, options);
    if (res.status >= 400) throw Error(`API responded with a ${res.status} (${res.statusText})`);
    return res.status !== 204 ? ((await res.json()) as T) : res;
  } catch (error) {
    console.error(`Error fetching [${(options && options.method) || 'GET'}] ${path}: `, error);
    return false;
  }
};

export { getDiscoverMovies, searchMovies };
