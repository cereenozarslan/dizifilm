import "server-only";
import type {
  MovieDetails,
  PaginatedResponse,
  TVDetails,
  Movie,
  TVShow,
  MediaItem,
  WatchProvidersResponse,
} from "@/types/tmdb";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

const DEFAULT_LANGUAGE = "tr-TR";
const DEFAULT_REGION = "TR";
export const DEFAULT_WATCH_REGION = "TR";

async function tmdbFetch<T>(
  path: string,
  params: Record<string, string> = {},
  revalidateSeconds = 3600
): Promise<T> {
  const token = process.env.TMDB_API_READ_ACCESS_TOKEN;
  if (!token) {
    throw new Error("TMDB_API_READ_ACCESS_TOKEN ortam değişkeni tanımlı değil");
  }

  const searchParams = new URLSearchParams({
    language: DEFAULT_LANGUAGE,
    ...params,
  });

  const res = await fetch(`${TMDB_BASE_URL}${path}?${searchParams.toString()}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      accept: "application/json",
    },
    next: { revalidate: revalidateSeconds },
  });

  if (!res.ok) {
    throw new Error(`TMDB isteği başarısız (${res.status}): ${path}`);
  }

  return res.json() as Promise<T>;
}

export function getImageUrl(
  path: string | null,
  size: "w92" | "w200" | "w342" | "w500" | "w780" | "original" = "w500"
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export async function getPopularMovies(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>("/movie/popular", {
    region: DEFAULT_REGION,
    page: String(page),
  });
}

export async function getPopularTVShows(page = 1) {
  return tmdbFetch<PaginatedResponse<TVShow>>("/tv/popular", {
    page: String(page),
  });
}

export async function getTopRatedMovies(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>("/movie/top_rated", {
    region: DEFAULT_REGION,
    page: String(page),
  });
}

export async function getTopRatedTVShows(page = 1) {
  return tmdbFetch<PaginatedResponse<TVShow>>("/tv/top_rated", {
    page: String(page),
  });
}

export async function getTrending(
  mediaType: "all" | "movie" | "tv" = "all",
  timeWindow: "day" | "week" = "week"
) {
  return tmdbFetch<PaginatedResponse<MediaItem>>(
    `/trending/${mediaType}/${timeWindow}`
  );
}

export async function getUpcomingMovies(page = 1) {
  return tmdbFetch<PaginatedResponse<Movie>>("/movie/upcoming", {
    region: DEFAULT_REGION,
    page: String(page),
  });
}

export async function getOnTheAirTVShows(page = 1) {
  return tmdbFetch<PaginatedResponse<TVShow>>("/tv/on_the_air", {
    page: String(page),
  });
}

export async function getMovieDetails(id: number | string) {
  return tmdbFetch<MovieDetails>(`/movie/${id}`, {
    append_to_response: "credits,videos,watch/providers",
  });
}

export async function getTVDetails(id: number | string) {
  return tmdbFetch<TVDetails>(`/tv/${id}`, {
    append_to_response: "credits,videos,watch/providers",
  });
}

export async function getWatchProviders(
  mediaType: "movie" | "tv",
  id: number | string
) {
  return tmdbFetch<WatchProvidersResponse>(`/${mediaType}/${id}/watch/providers`);
}

export async function searchMulti(query: string, page = 1) {
  return tmdbFetch<PaginatedResponse<MediaItem>>("/search/multi", {
    query,
    page: String(page),
    include_adult: "false",
  });
}
