import Link from "next/link";
import MediaCard from "@/components/MediaCard";
import { searchMulti } from "@/lib/tmdb";
import type { Movie, TVShow } from "@/types/tmdb";

interface PageProps {
  searchParams: Promise<{ q?: string; type?: string }>;
}

const TYPE_TABS = [
  { value: "all", label: "Tümü" },
  { value: "movie", label: "Filmler" },
  { value: "tv", label: "Diziler" },
];

export default async function SearchPage({ searchParams }: PageProps) {
  const { q = "", type = "all" } = await searchParams;
  const query = q.trim();

  const results = query
    ? (await searchMulti(query)).results.filter(
        (item) => item.media_type === "movie" || item.media_type === "tv"
      )
    : [];

  const filtered =
    type === "all" ? results : results.filter((item) => item.media_type === type);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-12">
      <h1 className="text-xl font-semibold text-white sm:text-2xl">
        {query ? `"${query}" için sonuçlar` : "Film veya dizi ara"}
      </h1>

      {query && (
        <div className="mt-4 flex gap-2">
          {TYPE_TABS.map((tab) => (
            <Link
              key={tab.value}
              href={`/ara?q=${encodeURIComponent(query)}&type=${tab.value}`}
              className={`rounded-full px-3 py-1 text-sm font-medium transition-colors ${
                type === tab.value
                  ? "bg-red-600 text-white"
                  : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      )}

      {query && filtered.length === 0 && (
        <p className="mt-8 text-zinc-400">
          &quot;{query}&quot; için sonuç bulunamadı.
        </p>
      )}

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {filtered.map((item) => (
          <MediaCard
            key={`${item.media_type}-${item.id}`}
            item={item as Movie | TVShow}
            mediaType={item.media_type}
          />
        ))}
      </div>
    </div>
  );
}
