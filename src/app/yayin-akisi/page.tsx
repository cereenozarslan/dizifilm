import MediaSection from "@/components/MediaSection";
import { getUpcomingMovies, getOnTheAirTVShows } from "@/lib/tmdb";

export default async function ReleaseCalendarPage() {
  const [upcomingMovies, onTheAirTV] = await Promise.all([
    getUpcomingMovies(),
    getOnTheAirTVShows(),
  ]);

  return (
    <div className="pb-12">
      <h1 className="mx-auto max-w-6xl px-4 pt-6 text-xl font-semibold text-white sm:text-2xl">
        Yayın Akışı
      </h1>
      <MediaSection
        title="Yakında Vizyona Girecek Filmler"
        items={upcomingMovies.results}
        mediaType="movie"
        seeAllHref="/filmler?sort=upcoming"
      />
      <MediaSection
        title="Şu An Yayında Olan Diziler"
        items={onTheAirTV.results}
        mediaType="tv"
        seeAllHref="/diziler?sort=on_the_air"
      />
    </div>
  );
}
