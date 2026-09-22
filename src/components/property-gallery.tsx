"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function PropertyGallery({
  images,
}: {
  images: { url: string; alt: string }[];
}) {
  const [active, setActive] = useState(0);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] items-center justify-center rounded-xl bg-muted text-muted-foreground">
        No photos available
      </div>
    );
  }

  const current = images[active];

  return (
    <div className="space-y-2">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-muted">
        <Image
          src={current.url}
          alt={current.alt}
          fill
          priority
          sizes="(min-width: 1024px) 700px, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((image, index) => (
            <button
              key={image.url + index}
              type="button"
              onClick={() => setActive(index)}
              className={cn(
                "relative aspect-[4/3] w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-opacity",
                index === active ? "ring-primary" : "opacity-70 ring-transparent hover:opacity-100"
              )}
              aria-label={`Show photo ${index + 1}`}
            >
              <Image src={image.url} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
