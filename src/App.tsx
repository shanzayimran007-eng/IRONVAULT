import React, { useState } from 'react';
import { Header } from './components/Header.tsx';
import { Hero } from './components/Hero.tsx';
import { Features } from './components/Features.tsx';
import { ClassesSection } from './components/ClassesSection.tsx';
import { PersonalTraining } from './components/PersonalTraining.tsx';
import { MembershipsSection } from './components/MembershipsSection.tsx';
import { LocationsSection } from './components/LocationsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { ValuesSection } from './components/ValuesSection.tsx';
import { FreeTrialSection } from './components/FreeTrialSection.tsx';
import { TestimonialsSection } from './components/TestimonialsSection.tsx';
import { FaqSection } from './components/FaqSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import {
  ClassBookingModal,
  MembershipSignupModal,
  MemberLoginModal,
  ClassDetailModal,
  ClubDetailModal,
  LegalModal,
} from './components/Modals.tsx';

import { FitnessClass, ScheduleItem, GymLocation, MembershipPlan } from './types.ts';
import { MEMBERSHIP_PLANS } from './data/gymData.ts';

export default function App() {
  // Modal states
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [freeTrialModalOpen, setFreeTrialModalOpen] = useState(false);
  const [membershipModalOpen, setMembershipModalOpen] = useState(false);
  const [selectedPlanForSignup, setSelectedPlanForSignup] = useState<MembershipPlan>(MEMBERSHIP_PLANS[1]);
  const [billingForSignup, setBillingForSignup] = useState<'monthly' | 'annual'>('monthly');

  const [bookingItem, setBookingItem] = useState<ScheduleItem | null>(null);
  const [detailClass, setDetailClass] = useState<FitnessClass | null>(null);
  const [detailLocation, setDetailLocation] = useState<GymLocation | null>(null);
  const [legalModalType, setLegalModalType] = useState<'privacy' | 'terms' | 'accessibility' | null>(null);

  const handleOpenJoin = (plan?: MembershipPlan, cycle: 'monthly' | 'annual' = 'monthly') => {
    setSelectedPlanForSignup(plan || MEMBERSHIP_PLANS[1]);
    setBillingForSignup(cycle);
    setMembershipModalOpen(true);
  };

  const scrollToFreeTrial = () => {
    const el = document.querySelector('#free-trial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToClasses = () => {
    const el = document.querySelector('#classes');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTraining = () => {
    const el = document.querySelector('#training');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0C0E] text-[#F3F4F6] selection:bg-[#D2F800] selection:text-black font-sans">
      {/* 1. Header & Navigation */}
      <Header
        onOpenLogin={() => setLoginModalOpen(true)}
        onOpenFreeTrial={scrollToFreeTrial}
        onOpenJoin={() => handleOpenJoin()}
      />

      {/* Main Content Flow */}
      <main>
        {/* 2. Hero Section */}
        <Hero
          onJoinClick={() => handleOpenJoin()}
          onFreeTrialClick={scrollToFreeTrial}
        />

        {/* 3. Gym Features (Everything You Need to Level Up) */}
        <Features
          onExploreClasses={scrollToClasses}
          onExploreTraining={scrollToTraining}
        />

        {/* 4. Fitness Classes & Weekly Timetable */}
        <ClassesSection
          onSelectClassDetails={(cls) => setDetailClass(cls)}
          onBookClass={(item) => setBookingItem(item)}
        />

        {/* 5. Personal Training & Consultation Form */}
        <PersonalTraining />

        {/* 6. Membership Plans & Owner Pricing Editor */}
        <MembershipsSection
          onSelectPlan={(plan, cycle) => handleOpenJoin(plan, cycle)}
        />

        {/* 7. Locations & Gym Finder */}
        <LocationsSection
          onJoinClub={(loc) => handleOpenJoin()}
          onViewClubDetails={(loc) => setDetailLocation(loc)}
        />

        {/* 8. Gym Gallery & Lightbox */}
        <GallerySection />

        {/* 9. Fitness Community & Values */}
        <ValuesSection />

        {/* 10. Free Trial Registration (VIP Guest Pass Generator) */}
        <FreeTrialSection />

        {/* 11. Testimonials Carousel */}
        <TestimonialsSection />

        {/* 12. FAQ Section */}
        <FaqSection />

        {/* 13. Contact & Social Media */}
        <ContactSection />
      </main>

      {/* 14. Footer */}
      <Footer
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenJoin={() => handleOpenJoin()}
        onOpenFreeTrial={scrollToFreeTrial}
      />

      {/* Interactive Modals */}
      {bookingItem && (
        <ClassBookingModal
          scheduleItem={bookingItem}
          onClose={() => setBookingItem(null)}
        />
      )}

      {detailClass && (
        <ClassDetailModal
          cls={detailClass}
          onClose={() => setDetailClass(null)}
          onBook={() => {
            setDetailClass(null);
            scrollToClasses();
          }}
        />
      )}

      {detailLocation && (
        <ClubDetailModal
          location={detailLocation}
          onClose={() => setDetailLocation(null)}
          onJoin={() => {
            setDetailLocation(null);
            handleOpenJoin();
          }}
        />
      )}

      {membershipModalOpen && (
        <MembershipSignupModal
          initialPlan={selectedPlanForSignup}
          initialBilling={billingForSignup}
          onClose={() => setMembershipModalOpen(false)}
        />
      )}

      {loginModalOpen && (
        <MemberLoginModal onClose={() => setLoginModalOpen(false)} />
      )}

      {legalModalType && (
        <LegalModal
          type={legalModalType}
          onClose={() => setLegalModalType(null)}
        />
      )}
    </div>
  );
}
