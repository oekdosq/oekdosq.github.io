"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

type ProfilePhotoProps = {
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

/**
 * Foto profil dari `/public/images/profile.jpg`.
 * Cukup ganti file-nya saja — kalau belum ada, otomatis pakai placeholder.
 */
export function ProfilePhoto({
  className,
  imgClassName,
  priority,
}: ProfilePhotoProps) {
  const [src, setSrc] = useState<string>(site.profileImage);

  return (
    <div className={cn("relative aspect-[4/5] overflow-hidden", className)}>
      <Image
        src={src}
        alt={`Foto ${site.name}`}
        fill
        sizes="(max-width: 768px) 100vw, 420px"
        priority={priority}
        onError={() => setSrc(site.profileFallback)}
        className={cn(
          "object-cover transition-transform duration-700 ease-out hover:scale-105",
          imgClassName,
        )}
      />
    </div>
  );
}
