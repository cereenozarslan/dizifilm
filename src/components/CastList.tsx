import Image from "next/image";
import { getImageUrl } from "@/lib/tmdb";
import type { CastMember } from "@/types/tmdb";

export default function CastList({ cast }: { cast: CastMember[] | undefined }) {
  if (!cast || cast.length === 0) return null;

  return (
    <div className="flex gap-3 overflow-x-auto pb-2">
      {cast.slice(0, 12).map((member) => {
        const photo = getImageUrl(member.profile_path, "w200");
        return (
          <div key={member.id} className="w-24 flex-shrink-0 text-center">
            <div className="mx-auto mb-1.5 h-24 w-24 overflow-hidden rounded-full bg-zinc-800">
              {photo ? (
                <Image
                  src={photo}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-2xl text-zinc-600">
                  ?
                </div>
              )}
            </div>
            <p className="truncate text-xs font-medium text-white">
              {member.name}
            </p>
            <p className="truncate text-[11px] text-zinc-500">
              {member.character}
            </p>
          </div>
        );
      })}
    </div>
  );
}
