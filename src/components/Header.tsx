import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/filmler", label: "Filmler" },
  { href: "/diziler", label: "Diziler" },
  { href: "/yayin-akisi", label: "Yayın Akışı" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          Dizi<span className="text-red-500">Film</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-zinc-300 sm:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <form action="/ara" className="flex-1 max-w-xs">
          <input
            type="search"
            name="q"
            placeholder="Film veya dizi ara..."
            className="w-full rounded-full border border-zinc-700 bg-zinc-900 px-4 py-1.5 text-sm text-white placeholder-zinc-500 outline-none focus:border-red-500"
          />
        </form>
      </div>
    </header>
  );
}
