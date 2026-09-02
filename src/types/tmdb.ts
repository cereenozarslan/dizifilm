export interface Genre {
  id: number;
  name: string;
}

export interface MediaBase {
  id: number;
  overview: string;
  popularity: number;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  vote_count: number;
  genre_ids?: number[];
}

export interface Movie extends MediaBase {
  media_type?: "movie";
  title: string;
  original_title: string;
  release_date: string;
}

export interface TVShow extends MediaBase {
  media_type?: "tv";
  name: string;
  original_name: string;
  first_air_date: string;
}

export type MediaItem = (Movie | TVShow) & { media_type: "movie" | "tv" };

export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface CreditsResponse {
  cast: CastMember[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: "YouTube" | string;
  type: string;
  official: boolean;
}

export interface VideosResponse {
  results: Video[];
}

export interface WatchProviderOption {
  provider_id: number;
  provider_name: string;
  logo_path: string;
  display_priority: number;
}

export interface WatchProviderRegion {
  link: string;
  flatrate?: WatchProviderOption[];
  free?: WatchProviderOption[];
  ads?: WatchProviderOption[];
  rent?: WatchProviderOption[];
  buy?: WatchProviderOption[];
}

export interface WatchProvidersResponse {
  id: number;
  results: Record<string, WatchProviderRegion>;
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
}

export interface MovieDetails extends Movie {
  genres: Genre[];
  runtime: number | null;
  tagline: string | null;
  production_companies: ProductionCompany[];
  credits?: CreditsResponse;
  videos?: VideosResponse;
  "watch/providers"?: WatchProvidersResponse;
}

export interface TVDetails extends TVShow {
  genres: Genre[];
  number_of_seasons: number;
  number_of_episodes: number;
  tagline: string | null;
  production_companies: ProductionCompany[];
  credits?: CreditsResponse;
  videos?: VideosResponse;
  "watch/providers"?: WatchProvidersResponse;
}
