import SearchResult from '../interfaces/searchResult';

const baseImageURL = process.env['REACT_APP_IMAGE_URL'] as string;
const noImage = process.env['REACT_APP_NO_IMAGE'] as string;

const parseMovies = (movies: SearchResult[]): SearchResult[] => {
  return movies.map(movie => {
    movie.poster_path = movie.poster_path ? baseImageURL + movie.poster_path : noImage;
    movie.backdrop_path = movie.backdrop_path ? baseImageURL + movie.backdrop_path : noImage;
    movie.isFav = !!localStorage.getItem(movie.id.toString());
    return movie;
  });
};
export default parseMovies;
