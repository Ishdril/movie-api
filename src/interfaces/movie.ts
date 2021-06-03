import Collection from './collection';
import Genre from './genre';
import Language from './language';
import ProductionCompany from './productionCompany';

export default interface Movie {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: Collection | null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: [];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const initialMovie: Movie = {
  adult: false,
  backdrop_path: '',
  belongs_to_collection: null,
  budget: 0,
  genres: [],
  homepage: '',
  id: 0,
  imdb_id: '',
  original_language: '',
  original_title: '',
  overview: '',
  popularity: 0,
  poster_path: '',
  production_companies: [],
  production_countries: [],
  release_date: '',
  revenue: 0,
  runtime: 0,
  spoken_languages: [],
  status: '',
  tagline: '',
  title: '',
  video: false,
  vote_average: 0,
  vote_count: 0,
};
