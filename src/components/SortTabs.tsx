import Link from "next/link";

interface SortTabsProps {
  basePath: string;
  current: string;
  options: { value: string; label: string }[];
}

export default function SortTabs({ basePath, current, options }: SortTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <Link
          key={option.value}
          href={`${basePath}?sort=${option.value}`}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            current === option.value
              ? "bg-red-600 text-white"
              : "bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
          }`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
