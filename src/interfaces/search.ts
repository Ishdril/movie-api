import SearchResult from './searchResult';

export default interface Search {
  page: number;
  results: SearchResult[];
  total_pages: number;
  total_results: number;
}

export const isSearch = (res: any): res is Search => {
  if (res.page && res.results && res.total_pages && res.total_results) return true;
  return false;
};

export const defaultSearch: Search = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};
