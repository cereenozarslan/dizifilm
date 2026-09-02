import type { Video } from "@/types/tmdb";

function pickTrailer(videos: Video[] | undefined): Video | null {
  if (!videos || videos.length === 0) return null;
  const youtube = videos.filter((v) => v.site === "YouTube");
  return (
    youtube.find((v) => v.type === "Trailer" && v.official) ??
    youtube.find((v) => v.type === "Trailer") ??
    youtube[0] ??
    null
  );
}

export default function TrailerEmbed({
  videos,
}: {
  videos: Video[] | undefined;
}) {
  const trailer = pickTrailer(videos);
  if (!trailer) return null;

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg bg-black">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${trailer.key}`}
        title={trailer.name}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
