import React, { useState, useEffect } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/gymData.ts';
import { GalleryItem } from '../types.ts';

export const GallerySection: React.FC = () => {
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeLightboxIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex]);

  const activeItem =
    activeLightboxIndex !== null ? GALLERY_ITEMS[activeLightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#0B0C0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              FACILITY ARCHITECTURE
            </p>
            <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              INSIDE THE VAULT
            </h2>
            <p className="text-base text-neutral-400 mt-3">
              Explore our competition-certified lifting platforms, dedicated turf sprint lanes, and luxury recovery zones. Click any image to view in high definition.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 self-start md:self-end">
            <Camera className="w-4 h-4 text-[#D2F800]" />
            <span>5 Authentic Club Perspectives</span>
          </div>
        </div>

        {/* Dynamic Bento Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Card 1: Large Featured (Span 7) */}
          <div
            onClick={() => openLightbox(0)}
            className="md:col-span-7 group relative h-[380px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[0].imageSrc}
              alt={GALLERY_ITEMS[0].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-[#D2F800]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-[#D2F800] tracking-wider uppercase font-mono">
                {GALLERY_ITEMS[0].category}
              </span>
              <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_ITEMS[0].title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                {GALLERY_ITEMS[0].description}
              </p>
            </div>
          </div>

          {/* Card 2: Modern Gym Interior (Span 5) */}
          <div
            onClick={() => openLightbox(1)}
            className="md:col-span-5 group relative h-[380px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[1].imageSrc}
              alt={GALLERY_ITEMS[1].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-[#D2F800]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-[#D2F800] tracking-wider uppercase font-mono">
                {GALLERY_ITEMS[1].category}
              </span>
              <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_ITEMS[1].title}
              </h3>
              <p className="text-xs text-neutral-300 mt-1 line-clamp-2">
                {GALLERY_ITEMS[1].description}
              </p>
            </div>
          </div>

          {/* Card 3: Personal Training (Span 4) */}
          <div
            onClick={() => openLightbox(2)}
            className="md:col-span-4 group relative h-[320px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[2].imageSrc}
              alt={GALLERY_ITEMS[2].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-[#D2F800]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-[#D2F800] tracking-wider uppercase font-mono">
                {GALLERY_ITEMS[2].category}
              </span>
              <h3 className="font-athletic text-xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_ITEMS[2].title}
              </h3>
            </div>
          </div>

          {/* Card 4: Group Fitness Studio (Span 4) */}
          <div
            onClick={() => openLightbox(3)}
            className="md:col-span-4 group relative h-[320px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[3].imageSrc}
              alt={GALLERY_ITEMS[3].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-[#D2F800]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-[#D2F800] tracking-wider uppercase font-mono">
                {GALLERY_ITEMS[3].category}
              </span>
              <h3 className="font-athletic text-xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_ITEMS[3].title}
              </h3>
            </div>
          </div>

          {/* Card 5: Cardio Zone (Span 4) */}
          <div
            onClick={() => openLightbox(4)}
            className="md:col-span-4 group relative h-[320px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 cursor-pointer"
          >
            <img
              src={GALLERY_ITEMS[4].imageSrc}
              alt={GALLERY_ITEMS[4].title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 className="w-4 h-4 text-[#D2F800]" />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-bold text-[#D2F800] tracking-wider uppercase font-mono">
                {GALLERY_ITEMS[4].category}
              </span>
              <h3 className="font-athletic text-xl font-bold text-white uppercase tracking-tight mt-1">
                {GALLERY_ITEMS[4].title}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeItem !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 p-2 rounded-full bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-700 z-50 cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Previous image */}
          <button
            onClick={prevImage}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-700 z-50 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next image */}
          <button
            onClick={nextImage}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-neutral-900/80 text-white hover:bg-neutral-800 border border-neutral-700 z-50 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image and Caption Container */}
          <div className="max-w-5xl w-full flex flex-col items-center">
            <div className="relative max-h-[75vh] w-auto rounded-lg overflow-hidden border border-neutral-800 shadow-2xl">
              <img
                src={activeItem.imageSrc}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="max-h-[75vh] w-auto object-contain"
              />
            </div>

            <div className="mt-4 text-center max-w-2xl">
              <span className="text-xs font-bold text-[#D2F800] uppercase tracking-wider font-mono">
                {activeItem.category} · Photo {activeLightboxIndex! + 1} of {GALLERY_ITEMS.length}
              </span>
              <h4 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mt-1">
                {activeItem.title}
              </h4>
              <p className="text-sm text-neutral-300 mt-1">
                {activeItem.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
