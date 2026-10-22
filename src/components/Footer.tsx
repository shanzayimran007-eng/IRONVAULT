import React from 'react';
import { Dumbbell, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/gymData.ts';

interface FooterProps {
  onOpenLegal: (type: 'privacy' | 'terms' | 'accessibility') => void;
  onOpenJoin: () => void;
  onOpenFreeTrial: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenLegal,
  onOpenJoin,
  onOpenFreeTrial,
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08090B] border-t border-neutral-800 text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1: Brand Info (2 Cols on LG) */}
          <div className="lg:col-span-2">
            <a
              href="#hero"
              className="flex items-center gap-2.5 text-white whitespace-nowrap mb-4 group inline-flex"
            >
              <div className="w-8 h-8 rounded bg-[#D2F800] text-black flex items-center justify-center font-black">
                <Dumbbell className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="font-athletic text-2xl tracking-tight text-white font-extrabold">
                IRONVAULT<span className="text-[#D2F800]">.</span>
              </span>
            </a>

            <p className="text-sm text-neutral-400 leading-relaxed mb-6 max-w-sm">
              IronVault Fitness is a premier American health club built for genuine strength progression, high-octane group fitness, and luxury recovery. Stronger every day.
            </p>

            <div className="space-y-2 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D2F800]" />
                <span>{CONTACT_CONFIG.address.street}, {CONTACT_CONFIG.address.city}, {CONTACT_CONFIG.address.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D2F800]" />
                <a href={`tel:${CONTACT_CONFIG.phone}`} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D2F800]" />
                <a href={`mailto:${CONTACT_CONFIG.email}`} className="hover:text-white transition-colors">
                  {CONTACT_CONFIG.email}
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="font-athletic text-sm font-bold text-white uppercase tracking-wider mb-4">
              Explore Clubs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#hero" className="hover:text-[#D2F800] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#locations" className="hover:text-[#D2F800] transition-colors">
                  Find Nearest Gym
                </a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#D2F800] transition-colors">
                  Facility Gallery
                </a>
              </li>
              <li>
                <a href="#community" className="hover:text-[#D2F800] transition-colors">
                  About Our Community
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-[#D2F800] transition-colors">
                  Member Testimonials
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#D2F800] transition-colors">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Programs & Classes */}
          <div>
            <h4 className="font-athletic text-sm font-bold text-white uppercase tracking-wider mb-4">
              Training & Programs
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#classes" className="hover:text-[#D2F800] transition-colors">
                  Strength & Conditioning
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-[#D2F800] transition-colors">
                  HIIT & Functional Cardio
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-[#D2F800] transition-colors">
                  Indoor Rhythm Cycling
                </a>
              </li>
              <li>
                <a href="#classes" className="hover:text-[#D2F800] transition-colors">
                  Athletic Yoga & Mobility
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-[#D2F800] transition-colors">
                  1-on-1 Personal Coaching
                </a>
              </li>
              <li>
                <a href="#training" className="hover:text-[#D2F800] transition-colors">
                  Meet Certified Trainers
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Membership & Legal */}
          <div>
            <h4 className="font-athletic text-sm font-bold text-white uppercase tracking-wider mb-4">
              Memberships & Policy
            </h4>
            <ul className="space-y-2.5">
              <li>
                <button
                  onClick={onOpenJoin}
                  className="hover:text-[#D2F800] transition-colors text-left cursor-pointer"
                >
                  Join IronVault Today
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenFreeTrial}
                  className="hover:text-[#D2F800] transition-colors text-left cursor-pointer"
                >
                  Claim 3-Day Free VIP Pass
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-[#D2F800] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-[#D2F800] transition-colors text-left cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('accessibility')}
                  className="hover:text-[#D2F800] transition-colors text-left cursor-pointer"
                >
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © {currentYear} IronVault Fitness USA, LLC. All rights reserved. STRONGER EVERY DAY.
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <a
                href={CONTACT_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D2F800] transition-colors"
              >
                Instagram
              </a>
              <span>·</span>
              <a
                href={CONTACT_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D2F800] transition-colors"
              >
                Facebook
              </a>
              <span>·</span>
              <a
                href={CONTACT_CONFIG.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D2F800] transition-colors"
              >
                TikTok
              </a>
              <span>·</span>
              <a
                href={CONTACT_CONFIG.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#D2F800] transition-colors"
              >
                WhatsApp
              </a>
            </div>

            <button
              onClick={scrollToTop}
              className="p-2 rounded bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600 transition-colors cursor-pointer"
              aria-label="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
