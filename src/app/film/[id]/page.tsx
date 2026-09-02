import Image from "next/image";
import type { Metadata } from "next";
import { getImageUrl, getMovieDetails, DEFAULT_WATCH_REGION } from "@/lib/tmdb";
import CastList from "@/components/CastList";
import TrailerEmbed from "@/components/TrailerEmbed";
import WatchProviders from "@/components/WatchProviders";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const movie = await getMovieDetails(id);
  return {
    title: `${movie.title} — DiziFilm`,
    description: movie.overview || undefined,
  };
}

export default async function MovieDetailPage({ params }: PageProps) {
  const { id } = await params;
  const movie = await getMovieDetails(id);

  const backdrop = getImageUrl(movie.backdrop_path, "original");
  const poster = getImageUrl(movie.poster_path, "w500");
  const year = movie.release_date ? movie.release_date.slice(0, 4) : null;
  const region = movie["watch/providers"]?.results?.[DEFAULT_WATCH_REGION];

  return (
    <div className="pb-12">
      <div className="relative h-[45vh] w-full overflow-hidden sm:h-[55vh]">
        {backdrop && (
          <Image
            src={backdrop}
            alt={movie.title}
            fill
            priority
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/10" />
      </div>

      <div className="mx-auto -mt-32 max-w-6xl px-4 sm:-mt-40">
        <div className="flex flex-col gap-6 sm:flex-row">
          <div className="w-40 flex-shrink-0 overflow-hidden rounded-lg shadow-xl sm:w-56">
            {poster && (
              <Image
                src={poster}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full"
              />
            )}
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-white sm:text-4xl">
              {movie.title}
            </h1>
            {movie.tagline && (
              <p className="mt-1 italic text-zinc-400">{movie.tagline}</p>
            )}

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-300">
              {movie.vote_average > 0 && (
                <span className="font-semibold text-yellow-400">
                  ⭐ {movie.vote_average.toFixed(1)}{" "}
                  <span className="text-zinc-500">
                    ({movie.vote_count.toLocaleString("tr-TR")} oy)
                  </span>
                </span>
              )}
              {year && <span>{year}</span>}
              {movie.runtime ? <span>{movie.runtime} dk</span> : null}
              {movie.genres.length > 0 && (
                <span>{movie.genres.map((g) => g.name).join(", ")}</span>
              )}
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
              {movie.overview || "Bu yapım için özet bulunmuyor."}
            </p>
          </div>
        </div>

        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold text-white">
            Nerede İzlenir
          </h2>
          <WatchProviders region={region} />
        </section>

        {movie.videos?.results && movie.videos.results.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-white">Fragman</h2>
            <TrailerEmbed videos={movie.videos.results} />
          </section>
        )}

        {movie.credits?.cast && movie.credits.cast.length > 0 && (
          <section className="mt-8">
            <h2 className="mb-3 text-lg font-semibold text-white">
              Oyuncular
            </h2>
            <CastList cast={movie.credits.cast} />
          </section>
        )}
      </div>
    </div>
  );
}
