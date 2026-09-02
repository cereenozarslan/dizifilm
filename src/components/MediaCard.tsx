import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/lib/tmdb";
import type { Movie, TVShow } from "@/types/tmdb";

interface MediaCardProps {
  item: Movie | TVShow;
  mediaType: "movie" | "tv";
}

function isMovie(item: Movie | TVShow): item is Movie {
  return "title" in item;
}

export default function MediaCard({ item, mediaType }: MediaCardProps) {
  const title = isMovie(item) ? item.title : item.name;
  const date = isMovie(item) ? item.release_date : item.first_air_date;
  const year = date ? date.slice(0, 4) : null;
  const poster = getImageUrl(item.poster_path, "w342");
  const href = mediaType === "movie" ? `/film/${item.id}` : `/dizi/${item.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col overflow-hidden rounded-lg bg-zinc-900 transition-transform hover:-translate-y-1"
    >
      <div className="relative aspect-[2/3] w-full bg-zinc-800">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 768px) 45vw, 200px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-500">
            Görsel yok
          </div>
        )}
        {item.vote_average > 0 && (
          <span className="absolute right-1.5 top-1.5 rounded-md bg-black/80 px-1.5 py-0.5 text-xs font-semibold text-yellow-400">
            ⭐ {item.vote_average.toFixed(1)}
          </span>
        )}
      </div>
      <div className="p-2">
        <p className="truncate text-sm font-medium text-white">{title}</p>
        {year && <p className="text-xs text-zinc-500">{year}</p>}
      </div>
    </Link>
  );
}
