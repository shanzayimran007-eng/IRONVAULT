import React, { useState, useEffect } from 'react';
import { Menu, X, Dumbbell, User, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onOpenLogin: () => void;
  onOpenFreeTrial: () => void;
  onOpenJoin: (planId?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenLogin,
  onOpenFreeTrial,
  onOpenJoin,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Locations', href: '#locations' },
    { label: 'Classes', href: '#classes' },
    { label: 'Personal Training', href: '#training' },
    { label: 'Memberships', href: '#memberships' },
    { label: 'About', href: '#community' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0B0C0E]/95 backdrop-blur-md border-b border-neutral-800 shadow-xl py-3.5'
          : 'bg-gradient-to-b from-[#0B0C0E]/90 to-transparent border-b border-white/5 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2.5 text-white hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 group"
          >
            <div className="w-9 h-9 rounded bg-[#D2F800] text-black flex items-center justify-center font-black transition-transform group-hover:scale-105">
              <Dumbbell className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-athletic text-2xl tracking-tight leading-none text-white font-extrabold">
                IRONVAULT<span className="text-[#D2F800]">.</span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 font-bold uppercase leading-tight">
                FITNESS USA
              </span>
            </div>
          </a>

          {/* Zone 2: Primary Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-neutral-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="whitespace-nowrap shrink-0 transition-colors hover:text-[#D2F800] py-1 border-b-2 border-transparent hover:border-[#D2F800]/60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenLogin}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-300 hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <User className="w-4 h-4 text-neutral-400" />
              Member Login
            </button>

            <button
              onClick={onOpenFreeTrial}
              className="px-3.5 py-2 text-xs font-bold text-neutral-200 border border-neutral-700 hover:border-neutral-500 rounded bg-neutral-900/60 hover:bg-neutral-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer uppercase tracking-wider"
            >
              Free Trial
            </button>

            <button
              onClick={() => onOpenJoin()}
              className="px-4 py-2 text-xs font-bold text-black bg-[#D2F800] hover:bg-[#bce000] rounded transition-all shadow-sm shadow-[#D2F800]/20 whitespace-nowrap shrink-0 cursor-pointer uppercase tracking-wider font-athletic"
            >
              Join Now
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenJoin()}
              className="px-3 py-1.5 text-xs font-bold text-black bg-[#D2F800] rounded font-athletic uppercase"
            >
              Join
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white rounded-md bg-neutral-900/80 border border-neutral-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0C0E] border-b border-neutral-800 px-5 pt-3 pb-6 shadow-2xl transition-all">
          <div className="flex flex-col space-y-3.5 py-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium text-neutral-300 hover:text-[#D2F800] py-1 border-b border-neutral-800/60 flex items-center justify-between"
              >
                <span>{link.label}</span>
                <span className="text-neutral-600 text-xs">→</span>
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-800/80 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFreeTrial();
              }}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center text-white bg-neutral-900 border border-neutral-700 rounded cursor-pointer"
            >
              Claim Free 3-Day Pass
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenJoin();
              }}
              className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-center text-black bg-[#D2F800] hover:bg-[#bce000] rounded cursor-pointer font-athletic"
            >
              Join IronVault Now
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLogin();
              }}
              className="flex items-center justify-center gap-2 py-2 text-xs font-medium text-neutral-400 hover:text-white"
            >
              <ShieldCheck className="w-4 h-4 text-[#D2F800]" />
              Member Portal & Turnstile Check-in
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
