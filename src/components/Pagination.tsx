import Link from "next/link";

interface PaginationProps {
  basePath: string;
  currentPage: number;
  totalPages: number;
  extraParams?: Record<string, string>;
}

export default function Pagination({
  basePath,
  currentPage,
  totalPages,
  extraParams = {},
}: PaginationProps) {
  const capped = Math.min(totalPages, 500);
  if (capped <= 1) return null;

  const hrefFor = (page: number) => {
    const params = new URLSearchParams({ ...extraParams, page: String(page) });
    return `${basePath}?${params.toString()}`;
  };

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= capped;

  return (
    <div className="mt-8 flex items-center justify-center gap-4">
      {prevDisabled ? (
        <span className="cursor-not-allowed rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-600">
          ← Önceki
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage - 1)}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
        >
          ← Önceki
        </Link>
      )}
      <span className="text-sm text-zinc-400">
        Sayfa {currentPage} / {capped}
      </span>
      {nextDisabled ? (
        <span className="cursor-not-allowed rounded-full bg-zinc-900 px-4 py-2 text-sm text-zinc-600">
          Sonraki →
        </span>
      ) : (
        <Link
          href={hrefFor(currentPage + 1)}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm text-white hover:bg-zinc-800"
        >
          Sonraki →
        </Link>
      )}
    </div>
  );
}
