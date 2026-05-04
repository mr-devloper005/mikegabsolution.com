"use client";

import { useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function ArticleFeaturedImage({ src, alt }: { src: string; alt: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="relative block aspect-[16/9] w-full overflow-hidden rounded-3xl border border-border bg-muted"
        onClick={() => setOpen(true)}
        aria-label="Open featured image"
      >
        <ContentImage
          src={src}
          alt={alt}
          fill
          className="object-cover"
          intrinsicWidth={1600}
          intrinsicHeight={900}
        />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none" showCloseButton>
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative overflow-hidden rounded-2xl bg-black">
            <div className="relative h-[75vh] w-[92vw] max-w-5xl">
              <ContentImage
                src={src}
                alt={alt}
                fill
                className="object-contain"
                sizes="(max-width: 1024px) 92vw, 900px"
                quality={86}
                priority
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
