import React from 'react';
import { HeartHandshake, Sparkles, ShieldCheck } from 'lucide-react';
import { COMMUNITY_VALUES } from '../data/gymData.ts';

export const ValuesSection: React.FC = () => {
  const icons = [HeartHandshake, Sparkles, ShieldCheck];

  return (
    <section id="community" className="py-24 bg-[#0F1116] border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            OUR CORE ETHOS
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            FITNESS FOR EVERY BODY.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            IronVault is built on the belief that strength belongs to anyone willing to step onto the floor. We champion hard work, mutual respect, and genuine community over fitness elitism.
          </p>
        </div>

        {/* 3 Simple Icon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {COMMUNITY_VALUES.map((val, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={val.id}
                className="bg-[#14171F] border border-neutral-800 rounded-xl p-8 hover:border-neutral-700 transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] mb-6">
                    <Icon className="w-7 h-7 stroke-[2]" />
                  </div>

                  <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
                    Pillar 0{idx + 1}
                  </span>

                  <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mb-3">
                    {val.title}
                  </h3>

                  <p className="text-sm text-neutral-300 leading-relaxed">
                    {val.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-neutral-800/80 flex items-center gap-2 text-xs text-neutral-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2F800]" />
                  <span>Standard across all 45+ US clubs</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
