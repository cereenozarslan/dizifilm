import Link from "next/link";
import MediaCard from "./MediaCard";
import type { Movie, TVShow } from "@/types/tmdb";

interface MediaSectionProps {
  title: string;
  items: (Movie | TVShow)[];
  mediaType: "movie" | "tv";
  seeAllHref?: string;
}

export default function MediaSection({
  title,
  items,
  mediaType,
  seeAllHref,
}: MediaSectionProps) {
  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white sm:text-xl">{title}</h2>
        {seeAllHref && (
          <Link
            href={seeAllHref}
            className="text-sm font-medium text-red-500 hover:text-red-400"
          >
            Tümü →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {items.map((item) => (
          <MediaCard key={item.id} item={item} mediaType={mediaType} />
        ))}
      </div>
    </section>
  );
}
