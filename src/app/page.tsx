import MediaSection from "@/components/MediaSection";
import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  getTopRatedTVShows,
  getTrending,
} from "@/lib/tmdb";
import type { Movie, TVShow } from "@/types/tmdb";

export default async function Home() {
  const [trending, popularMovies, popularTV, topRatedMovies, topRatedTV] =
    await Promise.all([
      getTrending("all", "week"),
      getPopularMovies(),
      getPopularTVShows(),
      getTopRatedMovies(),
      getTopRatedTVShows(),
    ]);

  const trendingMovies = trending.results.filter(
    (item) => item.media_type === "movie"
  ) as Movie[];
  const trendingTV = trending.results.filter(
    (item) => item.media_type === "tv"
  ) as TVShow[];

  return (
    <div className="pb-12">
      <MediaSection
        title="Bu Hafta Trend — Filmler"
        items={trendingMovies.slice(0, 12)}
        mediaType="movie"
        seeAllHref="/filmler"
      />
      <MediaSection
        title="Bu Hafta Trend — Diziler"
        items={trendingTV.slice(0, 12)}
        mediaType="tv"
        seeAllHref="/diziler"
      />
      <MediaSection
        title="Popüler Filmler"
        items={popularMovies.results.slice(0, 12)}
        mediaType="movie"
        seeAllHref="/filmler"
      />
      <MediaSection
        title="Popüler Diziler"
        items={popularTV.results.slice(0, 12)}
        mediaType="tv"
        seeAllHref="/diziler"
      />
      <MediaSection
        title="En Yüksek Puanlı Filmler"
        items={topRatedMovies.results.slice(0, 12)}
        mediaType="movie"
        seeAllHref="/filmler"
      />
      <MediaSection
        title="En Yüksek Puanlı Diziler"
        items={topRatedTV.results.slice(0, 12)}
        mediaType="tv"
        seeAllHref="/diziler"
      />
    </div>
  );
}
