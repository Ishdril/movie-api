import SearchResult from '../interfaces/searchResult';
import IMovieDetails from '../interfaces/movieDetails';

const baseImageURL = process.env['REACT_APP_IMAGE_URL'] as string;
const noImage = process.env['REACT_APP_NO_IMAGE'] as string;

function parseMovies(Movie: SearchResult): SearchResult;
function parseMovies(Movie: IMovieDetails): IMovieDetails;
function parseMovies(movie: SearchResult | IMovieDetails): SearchResult | IMovieDetails {
  return {
    ...movie,
    poster_path: movie.poster_path ? baseImageURL + movie.poster_path : noImage,
    backdrop_path: movie.backdrop_path ? baseImageURL + movie.backdrop_path : noImage,
  };
}
export default parseMovies;
