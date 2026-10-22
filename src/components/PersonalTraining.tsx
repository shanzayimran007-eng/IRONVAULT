import React, { useState } from 'react';
import { Target, TrendingUp, Shield, Award, CheckCircle2, Calendar, Send, Sparkles } from 'lucide-react';
import { ASSETS, TRAINERS } from '../data/gymData.ts';
import { Trainer } from '../types.ts';

interface PersonalTrainingProps {
  onTrainerSelect?: (trainer: Trainer) => void;
}

export const PersonalTraining: React.FC<PersonalTrainingProps> = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    fitnessGoal: 'strength',
    preferredTime: 'morning',
    coachPreference: 'any',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [showTrainerRoster, setShowTrainerRoster] = useState(false);

  const pillars = [
    {
      title: 'One-on-One Coaching',
      description: 'Undivided 60-minute focus on your biomechanics, execution intensity, and movement safety.',
      icon: Target,
    },
    {
      title: 'Goal-Based Workout Plans',
      description: 'Periodized training blueprints tailored to your body composition targets, race events, or power goals.',
      icon: TrendingUp,
    },
    {
      title: 'Strength & Conditioning Guidance',
      description: 'Evidence-based barbell, dumbbell, and functional conditioning to build dense, functional muscle.',
      icon: Award,
    },
    {
      title: 'Beginner-Friendly Onboarding',
      description: 'Gentle, empowering ramp-up for newcomers. Master proper posture, breathing, and confidence.',
      icon: Shield,
    },
    {
      title: 'Progress Tracking & Biometrics',
      description: 'Monthly 3D BodyScan scans, strength metric logs, and nutritional accountability check-ins.',
      icon: CheckCircle2,
    },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Please enter a contact phone number.';
    }
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    // Simulate consultation scheduling API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 600);
  };

  return (
    <section id="training" className="py-24 bg-[#0F1116] border-t border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Split Hero / Image Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7">
            <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              WORLD-CLASS COACHING SYSTEM
            </p>
            <h2 className="font-athletic text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] mb-6 text-balance">
              EXPERT COACHING. <br />
              <span className="text-[#D2F800]">REAL PROGRESS.</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8">
              No generic cookie-cutter routines. At IronVault, our personal trainers are collegiate-accredited performance coaches who combine biomechanical rigor with genuine human accountability to help you break through plateaus.
            </p>

            {/* 5 Pillars List */}
            <div className="space-y-4 mb-8">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5">
                    <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 stroke-[2.2]" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white uppercase font-athletic tracking-wide">
                        {pillar.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-400 mt-0.5">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowTrainerRoster(!showTrainerRoster)}
                className="px-6 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 hover:border-neutral-500 text-white font-athletic text-sm font-bold uppercase tracking-wider rounded transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>{showTrainerRoster ? 'HIDE TRAINER ROSTER' : 'MEET OUR TRAINERS'}</span>
                <span className="text-[#D2F800]">{showTrainerRoster ? '▲' : '▼'}</span>
              </button>
            </div>
          </div>

          {/* Trainer Photograph Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 shadow-2xl bg-neutral-900">
              <img
                src={ASSETS.trainer}
                alt="Personal trainer coaching an athlete through a barbell deadlift at IronVault Fitness"
                referrerPolicy="no-referrer"
                className="w-full h-[480px] object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0C0E] via-transparent to-transparent opacity-80" />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-[#0B0C0E]/90 backdrop-blur-sm border border-neutral-800 text-left">
                <div className="flex items-center justify-between text-xs text-[#D2F800] font-mono mb-1">
                  <span>CERTIFIED COACHING</span>
                  <span>100% ACCREDITED</span>
                </div>
                <p className="text-sm font-bold text-white leading-tight">
                  "Movement quality first. Strength progression forever."
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  1-on-1, Partner & Small Group Coaching Bays Available
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable Meet Our Trainers Roster */}
        {showTrainerRoster && (
          <div className="mb-16 pt-8 border-t border-neutral-800 animate-fadeIn">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h3 className="font-athletic text-3xl font-extrabold text-white uppercase tracking-tight">
                OUR CERTIFIED MASTER COACHES
              </h3>
              <p className="text-sm text-neutral-400 mt-1">
                Each coach specializes in distinct training methodologies to align perfectly with your ambitions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRAINERS.map((trainer) => (
                <div
                  key={trainer.id}
                  className="bg-[#14171F] border border-neutral-800 rounded-lg p-5 flex flex-col justify-between hover:border-neutral-700 transition-colors"
                >
                  <div>
                    <div className="w-12 h-12 rounded-full bg-neutral-800 border border-neutral-700 text-[#D2F800] font-black font-athletic flex items-center justify-center text-lg mb-3">
                      {trainer.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <h4 className="font-athletic text-xl font-bold text-white uppercase tracking-tight">
                      {trainer.name}
                    </h4>
                    <p className="text-xs text-[#D2F800] font-medium mb-3">
                      {trainer.title}
                    </p>

                    <div className="text-[11px] text-neutral-400 space-y-1 mb-3 pb-3 border-b border-neutral-800">
                      <div><strong className="text-neutral-300">Experience:</strong> {trainer.experienceYears} Years</div>
                      <div>
                        <strong className="text-neutral-300">Credentials:</strong> {trainer.certifications.join(', ')}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-300 leading-relaxed mb-4">
                      {trainer.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-800">
                    <button
                      onClick={() => {
                        setFormData((prev) => ({ ...prev, coachPreference: trainer.name }));
                        const formElem = document.querySelector('#pt-consultation-form');
                        formElem?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-white uppercase tracking-wider rounded transition-colors cursor-pointer"
                    >
                      Request with {trainer.name.split(' ')[0]}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Functional Consultation Request Form */}
        <div id="pt-consultation-form" className="bg-[#14171F] border border-neutral-800 rounded-xl p-6 sm:p-10 max-w-4xl mx-auto shadow-2xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMPLIMENTARY SESSION</span>
            </div>
            <h3 className="font-athletic text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
              BOOK A 1-ON-1 COACHING CONSULTATION
            </h3>
            <p className="text-sm text-neutral-400 mt-2">
              Includes a 45-minute movement assessment, posture and mobility screening, and personalized goal roadmap with a certified head coach.
            </p>
          </div>

          {submittedSuccess ? (
            <div className="p-8 bg-neutral-900 border border-[#D2F800]/50 rounded-lg text-center animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-[#D2F800]/20 text-[#D2F800] mx-auto flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mb-2">
                Consultation Request Received!
              </h4>
              <p className="text-sm text-neutral-300 max-w-md mx-auto mb-4">
                Thank you, <strong className="text-white">{formData.fullName}</strong>. Our Lead Coach will contact you at <strong className="text-white">{formData.phone || formData.email}</strong> within 4 business hours to lock in your preferred {formData.preferredTime} session.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-neutral-400 font-mono bg-black/40 px-3 py-1.5 rounded border border-neutral-800">
                <span>Confirmation ID: IV-PT-{Math.floor(100000 + Math.random() * 900000)}</span>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({
                      fullName: '',
                      email: '',
                      phone: '',
                      fitnessGoal: 'strength',
                      preferredTime: 'morning',
                      coachPreference: 'any',
                      message: '',
                    });
                  }}
                  className="text-xs text-[#D2F800] hover:underline uppercase tracking-wider font-bold"
                >
                  Submit Another Consultation Request
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Jordan Smith"
                    className={`w-full px-4 py-3 bg-neutral-900 border ${
                      formErrors.fullName ? 'border-red-500' : 'border-neutral-800'
                    } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                  />
                  {formErrors.fullName && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.fullName}</p>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="jordan@example.com"
                    className={`w-full px-4 py-3 bg-neutral-900 border ${
                      formErrors.email ? 'border-red-500' : 'border-neutral-800'
                    } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                  />
                  {formErrors.email && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(555) 000-0000"
                    className={`w-full px-4 py-3 bg-neutral-900 border ${
                      formErrors.phone ? 'border-red-500' : 'border-neutral-800'
                    } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                  />
                  {formErrors.phone && (
                    <p className="text-xs text-red-400 mt-1">{formErrors.phone}</p>
                  )}
                </div>

                {/* Fitness Goal */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Primary Fitness Goal
                  </label>
                  <select
                    name="fitnessGoal"
                    value={formData.fitnessGoal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                  >
                    <option value="strength">Heavy Strength & Hypertrophy</option>
                    <option value="fatloss">Body Recomposition & Fat Loss</option>
                    <option value="athletic">Athletic Speed & Conditioning</option>
                    <option value="rehab">Joint Mobility & Injury Rehab</option>
                    <option value="beginner">Beginner Ramp-up & Habit Building</option>
                  </select>
                </div>

                {/* Preferred Time */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Preferred Time Slot
                  </label>
                  <select
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                  >
                    <option value="morning">Morning (6:00 AM – 10:00 AM)</option>
                    <option value="midday">Mid-Day (11:00 AM – 2:00 PM)</option>
                    <option value="evening">Evening (4:30 PM – 8:30 PM)</option>
                    <option value="weekend">Weekend Mornings</option>
                  </select>
                </div>

                {/* Coach Preference */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                    Preferred Trainer
                  </label>
                  <select
                    name="coachPreference"
                    value={formData.coachPreference}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                  >
                    <option value="any">Match me with the best coach for my goal</option>
                    <option value="Marcus Sterling">Marcus Sterling (Head Strength / CSCS)</option>
                    <option value="Sarah Jenkins">Sarah Jenkins (Corrective / Rehab)</option>
                    <option value="Dante Vance">Dante Vance (Transformation / Fat Loss)</option>
                    <option value="Alyssa Torres">Alyssa Torres (Women's Strength & Conditioning)</option>
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Tell Us About Your Fitness Background & Any Past Injuries (Optional)
                </label>
                <textarea
                  name="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="e.g. Trained consistently in college, looking to rebuild routine after back tightness. Goal is deadlifting pain-free."
                  className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors resize-none"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <span className="text-xs text-neutral-500">
                  🔒 We respect your privacy. No spam. Consultation is 100% complimentary.
                </span>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-base font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-[#D2F800]/20 disabled:opacity-60"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Submitting...' : 'Request Consultation'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
