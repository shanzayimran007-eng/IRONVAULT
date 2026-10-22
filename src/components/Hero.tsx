import React from 'react';
import { ArrowRight, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';
import { ASSETS } from '../data/gymData.ts';

interface HeroProps {
  onJoinClick: () => void;
  onFreeTrialClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onJoinClick, onFreeTrialClick }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#0B0C0E]">
      {/* Background Photography with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSETS.hero}
          alt="Athletes training with heavy weights inside IronVault Fitness club"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 motion-safe:animate-[pulse_10s_ease-in-out_infinite] brightness-75 contrast-110"
        />
        {/* Measured Scrim Gradient for WCAG AA Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0C0E] via-[#0B0C0E]/85 to-[#0B0C0E]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-[#0B0C0E]/40" />
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#262a34_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          {/* Small Supporting Line (Zero-Pill Discipline: unboxed clean text) */}
          <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-4">
            <span>STRENGTH</span>
            <span className="text-neutral-500" aria-hidden="true">·</span>
            <span>ENERGY</span>
            <span className="text-neutral-500" aria-hidden="true">·</span>
            <span>COMMUNITY</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-athletic text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[0.92] tracking-tight uppercase mb-6 text-balance">
            YOUR STRONGEST SELF <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#D2F800]">STARTS HERE.</span>
          </h1>

          {/* Supporting Body Text */}
          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed mb-8 max-w-2xl">
            Train with purpose, build lasting strength, and find your community at a gym designed around your goals. Elite Eleiko free weights, immersive studio classes, and science-backed coaching.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
            <button
              onClick={onJoinClick}
              className="px-8 py-4 bg-[#D2F800] hover:bg-[#bde100] text-black font-athletic text-lg font-black uppercase tracking-wider rounded transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#D2F800]/25 flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>JOIN NOW</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onFreeTrialClick}
              className="px-7 py-4 bg-neutral-900/80 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500 font-athletic text-lg font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#D2F800]" />
              <span>CLAIM YOUR FREE TRIAL</span>
            </button>
          </div>

          {/* Quick Credibility Markers */}
          <div className="pt-6 border-t border-neutral-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-neutral-400">
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl font-athletic tracking-tight">45+ CLUBS</span>
              <span className="text-neutral-400">Across Major US Metros</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl font-athletic tracking-tight">120+ CLASSES</span>
              <span className="text-neutral-400">Weekly Studio Sessions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl font-athletic tracking-tight">100% CSCS/NASM</span>
              <span className="text-neutral-400">Certified Elite Coaches</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-extrabold text-xl font-athletic tracking-tight">4.9 / 5.0 ★</span>
              <span className="text-neutral-400">Member Rated Nationwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
