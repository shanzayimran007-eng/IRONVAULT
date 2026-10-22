import React, { useState } from 'react';
import { Clock, Flame, Calendar, Filter, Info, ArrowUpRight, Check, User } from 'lucide-react';
import { FITNESS_CLASSES, WEEKLY_SCHEDULE } from '../data/gymData.ts';
import { FitnessClass, ScheduleItem } from '../types.ts';

interface ClassesSectionProps {
  onSelectClassDetails: (cls: FitnessClass) => void;
  onBookClass: (item: ScheduleItem) => void;
}

export const ClassesSection: React.FC<ClassesSectionProps> = ({
  onSelectClassDetails,
  onBookClass,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDay, setSelectedDay] = useState<string>('Mon');

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const categories = [
    { id: 'all', label: 'All Classes' },
    { id: 'strength', label: 'Strength' },
    { id: 'hiit', label: 'HIIT & Cardio' },
    { id: 'cycling', label: 'Cycling' },
    { id: 'mobility', label: 'Mobility & Yoga' },
    { id: 'dance', label: 'Dance' },
    { id: 'core', label: 'Functional Core' },
  ];

  const filteredClasses = selectedCategory === 'all'
    ? FITNESS_CLASSES
    : FITNESS_CLASSES.filter((c) => c.category === selectedCategory);

  const filteredSchedule = WEEKLY_SCHEDULE.filter(
    (item) => item.day === selectedDay
  );

  return (
    <section id="classes" className="py-24 bg-[#0B0C0E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              ENERGETIC STUDIO SESSIONS
            </p>
            <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase">
              STUDIO CLASSES & WEEKLY SCHEDULE
            </h2>
            <p className="text-base text-neutral-400 mt-3">
              World-class programming led by master trainers in specialized acoustic studios. Every class is designed with clear progressions for beginners and advanced athletes alike.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#14171F] border border-neutral-800 rounded-lg overflow-x-auto max-w-full">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded transition-all whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#D2F800] text-black shadow-sm'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Classes Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {filteredClasses.map((cls) => (
            <div
              key={cls.id}
              className="group bg-[#12151C] border border-neutral-800 hover:border-neutral-700 rounded-lg p-6 flex flex-col justify-between transition-all duration-200"
            >
              <div>
                {/* Clean Unboxed Metadata Line (Zero-Pill Discipline) */}
                <div className="flex items-center gap-2 text-xs font-medium text-neutral-400 mb-3">
                  <span className="text-[#D2F800] font-semibold">{cls.categoryLabel}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{cls.duration}</span>
                  <span aria-hidden="true" className="text-neutral-600">·</span>
                  <span>{cls.level}</span>
                </div>

                <h3 className="font-athletic text-2xl font-bold text-white mb-2.5 tracking-tight uppercase group-hover:text-[#D2F800] transition-colors">
                  {cls.title}
                </h3>

                <p className="text-sm text-neutral-300 leading-relaxed mb-5">
                  {cls.description}
                </p>

                <div className="pt-3 border-t border-neutral-800/80 text-xs text-neutral-400 space-y-1.5 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Est. Burn:</span>
                    <span className="text-neutral-200 font-medium font-mono">{cls.caloriesBurned}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-neutral-500">Lead Coach:</span>
                    <span className="text-neutral-200">{cls.instructorLead}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectClassDetails(cls)}
                className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-bold uppercase tracking-wider text-neutral-200 hover:text-white rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Info className="w-4 h-4 text-[#D2F800]" />
                <span>View Class Details</span>
              </button>
            </div>
          ))}
        </div>

        {/* Weekly Class Schedule Section */}
        <div className="bg-[#12151C] border border-neutral-800 rounded-xl p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-6">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase">
                LIVE TIMETABLE
              </p>
              <h3 className="font-athletic text-3xl font-extrabold text-white tracking-tight uppercase">
                WEEKLY CLASS SCHEDULE
              </h3>
            </div>

            {/* Day Selector Buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-neutral-900 border border-neutral-800 rounded-lg">
              {days.map((d) => (
                <button
                  key={d}
                  onClick={() => setSelectedDay(d)}
                  className={`px-3 py-1.5 text-xs font-bold rounded transition-colors whitespace-nowrap cursor-pointer uppercase font-athletic tracking-wider ${
                    selectedDay === d
                      ? 'bg-[#D2F800] text-black'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Schedule List */}
          <div className="space-y-3">
            {filteredSchedule.length === 0 ? (
              <div className="py-12 text-center text-neutral-400 text-sm">
                No classes scheduled for this day yet. Check other days or book private training.
              </div>
            ) : (
              filteredSchedule.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-lg bg-neutral-900/60 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
                >
                  {/* Time & Room */}
                  <div className="flex items-center gap-4 min-w-[180px]">
                    <div className="text-left">
                      <div className="text-base font-bold font-mono text-white">
                        {item.time}
                      </div>
                      <div className="text-xs text-neutral-500 font-mono">
                        to {item.endTime}
                      </div>
                    </div>
                    <div className="h-8 w-px bg-neutral-800 hidden sm:block" />
                    <div>
                      <span className="text-xs font-semibold text-[#D2F800] block">
                        {item.room}
                      </span>
                      <span className="text-[11px] text-neutral-500">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  {/* Class Name & Instructor */}
                  <div className="flex-1 sm:px-4">
                    <h4 className="text-base font-bold text-white tracking-tight">
                      {item.className}
                    </h4>
                    <div className="flex items-center gap-3 text-xs text-neutral-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-neutral-500" />
                        Instructor: <span className="text-neutral-300">{item.instructor}</span>
                      </span>
                      <span aria-hidden="true" className="text-neutral-600">·</span>
                      <span>Intensity: <strong className="text-neutral-300 font-normal">{item.intensity}</strong></span>
                    </div>
                  </div>

                  {/* Spots & Booking CTA */}
                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                    <div className="text-right text-xs">
                      <span className={`font-mono font-medium ${item.spotsLeft <= 3 ? 'text-amber-400 font-bold' : 'text-neutral-400'}`}>
                        {item.spotsLeft} spots left
                      </span>
                      <span className="text-neutral-600 text-[11px] block">
                        of {item.totalSpots} max
                      </span>
                    </div>

                    <button
                      onClick={() => onBookClass(item)}
                      className="px-4 py-2 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer shadow-sm shadow-[#D2F800]/10"
                    >
                      Book a Class
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-400 gap-2">
            <span>
              ℹ️ Members can book studio classes up to 7 days in advance through the portal.
            </span>
            <span className="text-neutral-500">
              Schedule applies to Austin Flagship. Select your club in Locations for local timetable.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
