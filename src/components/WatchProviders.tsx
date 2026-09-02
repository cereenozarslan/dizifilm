import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb";
import type { WatchProviderRegion } from "@/types/tmdb";

const CATEGORY_LABELS: Record<string, string> = {
  flatrate: "Abonelik",
  free: "Ücretsiz",
  ads: "Reklamlı",
  rent: "Kiralama",
  buy: "Satın Alma",
};

export default function WatchProviders({
  region,
}: {
  region: WatchProviderRegion | undefined;
}) {
  if (!region) {
    return (
      <div className="rounded-lg bg-zinc-900 p-4 text-sm text-zinc-400">
        Türkiye için yayın platformu bilgisi bulunamadı.
      </div>
    );
  }

  const categories = (
    ["flatrate", "free", "ads", "rent", "buy"] as const
  ).filter((key) => region[key] && region[key]!.length > 0);

  return (
    <div className="rounded-lg bg-zinc-900 p-4">
      {categories.map((key) => (
        <div key={key} className="mb-3 last:mb-0">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            {CATEGORY_LABELS[key]}
          </p>
          <div className="flex flex-wrap gap-2">
            {region[key]!.map((provider) => {
              const logo = getImageUrl(provider.logo_path, "w92");
              return (
                <a
                  key={provider.provider_id}
                  href={region.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={provider.provider_name}
                  className="overflow-hidden rounded-lg"
                >
                  {logo && (
                    <Image
                      src={logo}
                      alt={provider.provider_name}
                      width={48}
                      height={48}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      ))}
      <p className="mt-3 text-[11px] text-zinc-500">
        Yayın platformu verileri{" "}
        <a
          href={region.link}
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-zinc-300"
        >
          JustWatch
        </a>{" "}
        tarafından sağlanmaktadır.
      </p>
    </div>
  );
}
