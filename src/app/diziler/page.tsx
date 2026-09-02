import MediaCard from "@/components/MediaCard";
import SortTabs from "@/components/SortTabs";
import Pagination from "@/components/Pagination";
import {
  getPopularTVShows,
  getTopRatedTVShows,
  getOnTheAirTVShows,
} from "@/lib/tmdb";

interface PageProps {
  searchParams: Promise<{ sort?: string; page?: string }>;
}

const SORT_OPTIONS = [
  { value: "popular", label: "Popüler" },
  { value: "top_rated", label: "En Yüksek Puanlı" },
  { value: "on_the_air", label: "Şu An Yayında" },
];

export default async function TVShowsPage({ searchParams }: PageProps) {
  const { sort = "popular", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const fetcher =
    sort === "top_rated"
      ? getTopRatedTVShows
      : sort === "on_the_air"
        ? getOnTheAirTVShows
        : getPopularTVShows;

  const data = await fetcher(currentPage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-12">
      <h1 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        Diziler
      </h1>
      <SortTabs basePath="/diziler" current={sort} options={SORT_OPTIONS} />

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {data.results.map((show) => (
          <MediaCard key={show.id} item={show} mediaType="tv" />
        ))}
      </div>

      <Pagination
        basePath="/diziler"
        currentPage={currentPage}
        totalPages={data.total_pages}
        extraParams={{ sort }}
      />
    </div>
  );
}
