"use client";

import { useMemo, useState } from "react";
import { ContentImage } from "@/components/shared/content-image";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function DirectoryImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!safeImages.length) return null;

  const activeSrc = safeImages[Math.min(activeIndex, safeImages.length - 1)];

  return (
    <>
      <div className="overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-[0_24px_70px_rgba(15,23,42,0.08)]">
        <button
          type="button"
          className="relative block h-[420px] w-full overflow-hidden bg-slate-100"
          onClick={() => setOpen(true)}
          aria-label="Open photo"
        >
          <ContentImage src={activeSrc} alt={title} fill className="object-cover" />
        </button>

        {safeImages.length > 1 ? (
          <div className="grid grid-cols-4 gap-3 p-4">
            {safeImages.slice(0, 4).map((src, index) => (
              <button
                key={`${src}-${index}`}
                type="button"
                className="relative h-24 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50"
                onClick={() => {
                  setActiveIndex(index);
                  setOpen(true);
                }}
                aria-label={`View photo ${index + 1}`}
              >
                <ContentImage src={src} alt={`${title} thumbnail ${index + 1}`} fill className="object-cover" />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="h-[85vh] w-[92vw] max-w-5xl border-0 bg-transparent p-0 shadow-none"
          showCloseButton
        >
          <DialogTitle className="sr-only">{title}</DialogTitle>
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <ContentImage
              src={activeSrc}
              alt={title}
              fill
              className="object-contain"
              sizes="92vw"
              quality={92}
              priority
              intrinsicWidth={2000}
              intrinsicHeight={1500}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
