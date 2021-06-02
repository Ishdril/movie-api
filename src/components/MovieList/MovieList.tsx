import SearchResult from '../../interfaces/searchResult';
import MovieTile from '../MovieTile/MovieTile';

interface MovieListProps {
  movieList: SearchResult[];
}

const MovieList = ({ movieList }: MovieListProps) => {
  return (
    <div>
      {movieList.map(movie => {
        return <MovieTile movie={movie} key={movie.id} />;
      })}
    </div>
  );
};

export default MovieList;
