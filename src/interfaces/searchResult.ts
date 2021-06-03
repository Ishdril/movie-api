import Genre from './genre';
import Movie from './movie';

export default interface SearchResult extends Movie {
  genre_ids: Genre['id'][];
  media_type?: string;
}
