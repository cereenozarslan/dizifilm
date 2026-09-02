import MediaCard from "@/components/MediaCard";
import SortTabs from "@/components/SortTabs";
import Pagination from "@/components/Pagination";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/tmdb";

interface PageProps {
  searchParams: Promise<{ sort?: string; page?: string }>;
}

const SORT_OPTIONS = [
  { value: "popular", label: "Popüler" },
  { value: "top_rated", label: "En Yüksek Puanlı" },
  { value: "upcoming", label: "Yakında" },
];

export default async function MoviesPage({ searchParams }: PageProps) {
  const { sort = "popular", page = "1" } = await searchParams;
  const currentPage = Math.max(1, parseInt(page, 10) || 1);

  const fetcher =
    sort === "top_rated"
      ? getTopRatedMovies
      : sort === "upcoming"
        ? getUpcomingMovies
        : getPopularMovies;

  const data = await fetcher(currentPage);

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pb-12">
      <h1 className="mb-4 text-xl font-semibold text-white sm:text-2xl">
        Filmler
      </h1>
      <SortTabs basePath="/filmler" current={sort} options={SORT_OPTIONS} />

      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {data.results.map((movie) => (
          <MediaCard key={movie.id} item={movie} mediaType="movie" />
        ))}
      </div>

      <Pagination
        basePath="/filmler"
        currentPage={currentPage}
        totalPages={data.total_pages}
        extraParams={{ sort }}
      />
    </div>
  );
}
