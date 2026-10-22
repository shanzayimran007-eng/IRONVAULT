import React, { useState } from 'react';
import { Dumbbell, Activity, Users, UserCheck, Flame, ChevronRight, Check } from 'lucide-react';

interface FeaturesProps {
  onSelectFeature?: (featureId: string) => void;
  onExploreClasses: () => void;
  onExploreTraining: () => void;
}

export const Features: React.FC<FeaturesProps> = ({ onExploreClasses, onExploreTraining }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const features = [
    {
      id: 'strength',
      title: 'Strength Training',
      tagline: 'Heavy Iron, Zero Waiting',
      description: 'Free weights, racks, and resistance machines built for high-performance progression.',
      details: 'Over 12 competition-grade Olympic squat racks, calibrated Eleiko steel plates, custom dumbbells up to 150 lbs, and full pin-select selectorized circuits.',
      icon: Dumbbell,
      actionText: 'View Equipment Details',
      actionHandler: () => {
        const el = document.querySelector('#gallery');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'cardio',
      title: 'Cardio Zone',
      tagline: 'Endurance Powered by Science',
      description: 'Modern treadmills, bikes, and cardio equipment with immersive media screens.',
      details: 'Featuring Woodway curved runners, Concept2 RowErgs and SkiErgs, StairMasters, and Technogym touchscreens connected to fitness wearables.',
      icon: Activity,
      actionText: 'Tour Cardio Mezzanine',
      actionHandler: () => {
        const el = document.querySelector('#gallery');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
    {
      id: 'group',
      title: 'Group Fitness',
      tagline: 'Electrifying Collective Energy',
      description: 'Energizing instructor-led classes that turn sweat into an athletic team experience.',
      details: 'Studio programs spanning HIIT, rhythmic indoor cycling, power yoga, and athletic conditioning set to concert acoustics and ambient lighting.',
      icon: Users,
      actionText: 'Browse 120+ Classes',
      actionHandler: onExploreClasses,
    },
    {
      id: 'training',
      title: 'Personal Training',
      tagline: 'Precision 1-on-1 Guidance',
      description: 'Coaching tailored to individual fitness goals, biomechanics, and lifestyle demands.',
      details: 'Every coach holds accredited CSCS or NASM certifications with regular 3D BodyScan metrics and personalized nutritional habit tracking.',
      icon: UserCheck,
      actionText: 'Meet Our Trainers',
      actionHandler: onExploreTraining,
    },
    {
      id: 'functional',
      title: 'Functional Training',
      tagline: 'Built for Real-World Power',
      description: 'Dynamic workouts for strength, endurance, agility, and joint mobility.',
      details: '100-yard indoor turf tracks, heavy sleds, farmer-carry bars, Bulgarian bags, wall balls, and rogue pull-up rigs for unconstrained athletic movement.',
      icon: Flame,
      actionText: 'Explore Turf Arenas',
      actionHandler: () => {
        const el = document.querySelector('#gallery');
        el?.scrollIntoView({ behavior: 'smooth' });
      },
    },
  ];

  return (
    <section id="features" className="py-24 bg-[#0F1116] border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            THE IRONVAULT STANDARD
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            EVERYTHING YOU NEED TO LEVEL UP.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400 font-normal">
            Every square foot of our American clubs is engineered for focused training, unmatched equipment availability, and long-term athletic longevity.
          </p>
        </div>

        {/* 5-Feature Balanced Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.slice(0, 3).map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative bg-[#14171F] border border-neutral-800 rounded-lg p-7 hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] mb-5 group-hover:scale-105 group-hover:border-[#D2F800]/40 transition-all">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <div className="text-xs font-mono text-neutral-500 mb-1">
                    0{index + 1}
                  </div>
                  <h3 className="font-athletic text-2xl font-bold text-white mb-2 tracking-tight uppercase">
                    {feat.title}
                  </h3>
                  <p className="text-sm font-medium text-[#D2F800] mb-3">
                    {feat.tagline}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {feat.description}
                  </p>
                  <p className="text-xs text-neutral-400 border-t border-neutral-800/80 pt-3 leading-normal">
                    {feat.details}
                  </p>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={feat.actionHandler}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#D2F800] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{feat.actionText}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom 2 Features across 2 columns for asymmetric rhythm */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.slice(3, 5).map((feat, index) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.id}
                className="group relative bg-[#14171F] border border-neutral-800 rounded-lg p-7 hover:border-neutral-600 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] group-hover:scale-105 group-hover:border-[#D2F800]/40 transition-all">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>
                    <span className="text-xs font-mono text-neutral-500">
                      0{index + 4}
                    </span>
                  </div>
                  <h3 className="font-athletic text-2xl font-bold text-white mb-2 tracking-tight uppercase">
                    {feat.title}
                  </h3>
                  <p className="text-sm font-medium text-[#D2F800] mb-3">
                    {feat.tagline}
                  </p>
                  <p className="text-sm text-neutral-300 leading-relaxed mb-4">
                    {feat.description}
                  </p>
                  <p className="text-xs text-neutral-400 border-t border-neutral-800/80 pt-3 leading-normal">
                    {feat.details}
                  </p>
                </div>

                <div className="pt-6 mt-4">
                  <button
                    onClick={feat.actionHandler}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-white group-hover:text-[#D2F800] transition-colors uppercase tracking-wider cursor-pointer"
                  >
                    <span>{feat.actionText}</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
