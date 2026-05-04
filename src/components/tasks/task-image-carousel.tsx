"use client";

import { useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ContentImage } from "@/components/shared/content-image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function TaskImageCarousel({ images }: { images: string[] }) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: safeImages.length > 1,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanPrev(emblaApi.canScrollPrev());
      setCanNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  if (!safeImages.length) return null;

  const activeSrc = safeImages[Math.min(lightboxIndex, safeImages.length - 1)];

  return (
    <>
      <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {safeImages.map((src, index) => (
              <div key={`${src}-${index}`} className="min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  className="relative block aspect-[16/10] w-full"
                  onClick={() => {
                    setLightboxIndex(index);
                    setLightboxOpen(true);
                  }}
                  aria-label="Open photo"
                >
                  <ContentImage
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 900px"
                    quality={78}
                    className="object-cover"
                    intrinsicWidth={1440}
                    intrinsicHeight={900}
                    priority={index === 0}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {safeImages.length > 1 && (
          <>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent
          className="h-[85vh] w-[92vw] max-w-5xl border-0 bg-transparent p-0 shadow-none"
          showCloseButton
        >
          <DialogTitle className="sr-only">Image Gallery</DialogTitle>
          <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
            <ContentImage
              src={activeSrc}
              alt="Photo"
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



