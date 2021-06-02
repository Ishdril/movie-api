import Genre from './genre';

export default interface SearchResult {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: Genre['id'][];
  id: number;
  isFav?: boolean;
  media_type?: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
