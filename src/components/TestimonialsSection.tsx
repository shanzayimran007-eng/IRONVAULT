import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/gymData.ts';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? TESTIMONIALS.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIdx) =>
      prevIdx === TESTIMONIALS.length - 1 ? 0 : prevIdx + 1
    );
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-[#0F1116] border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              REAL MEMBER EXPERIENCES
            </p>
            <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              ATHLETIC MILESTONES & STORIES
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <span className="text-xs font-mono text-neutral-400 mr-2">
              {currentIndex + 1} of {TESTIMONIALS.length}
            </span>
            <button
              onClick={prev}
              className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              className="p-2.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Display */}
        <div className="bg-[#14171F] border border-neutral-800 rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute top-8 right-8 text-neutral-800/40 pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <div className="max-w-3xl relative z-10">
            {/* Rating Stars */}
            <div className="flex items-center gap-1 mb-4 text-[#D2F800]">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
              <span className="ml-2 text-xs font-mono text-neutral-400">
                Verified Member Feedback
              </span>
            </div>

            {/* Headline */}
            <h3 className="font-athletic text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
              "{current.headline}"
            </h3>

            {/* Quote Body */}
            <p className="text-base sm:text-lg text-neutral-300 leading-relaxed mb-8">
              {current.quote}
            </p>

            {/* Member Profile Footer */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-neutral-800">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-athletic font-black text-white text-base">
                  {current.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-base font-bold text-white font-athletic uppercase tracking-wide">
                    {current.name}
                  </h4>
                  <p className="text-xs text-neutral-400">
                    {current.location} · {current.memberSince}
                  </p>
                </div>
              </div>

              <div className="inline-flex items-center gap-1.5 text-xs text-[#D2F800] bg-neutral-900 px-3 py-1.5 rounded border border-neutral-800">
                <CheckCircle2 className="w-4 h-4" />
                <span>Outcome: {current.achievement}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Developmental sample disclosure notice */}
        <p className="text-[11px] text-neutral-500 mt-4 text-center">
          * Representative member reviews displayed for illustration. Submit your verified story at stories@ironvaultfitness.com.
        </p>
      </div>
    </section>
  );
};
