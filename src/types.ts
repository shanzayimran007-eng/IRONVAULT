export interface GymLocation {
  id: string;
  name: string;
  city: string;
  state: string;
  zip: string;
  address: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursWeekend: string;
  currentStatus: string;
  facilities: string[];
  lat: number;
  lng: number;
  isFlagship?: boolean;
}

export interface FitnessClass {
  id: string;
  title: string;
  category: 'strength' | 'hiit' | 'cycling' | 'mobility' | 'dance' | 'core';
  categoryLabel: string;
  description: string;
  fullOverview: string;
  level: 'All Levels' | 'Beginner Friendly' | 'Intermediate' | 'Advanced';
  duration: string;
  caloriesBurned: string;
  equipmentNeeded: string[];
  targetMuscles: string[];
  instructorLead: string;
}

export interface ScheduleItem {
  id: string;
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun';
  time: string;
  endTime: string;
  classId: string;
  className: string;
  category: string;
  instructor: string;
  room: string;
  totalSpots: number;
  spotsLeft: number;
  intensity: 'Medium' | 'High' | 'Max Peak';
}

export interface Trainer {
  id: string;
  name: string;
  title: string;
  certifications: string[];
  specialties: string[];
  experienceYears: number;
  bio: string;
  quote: string;
}

export interface MembershipPlan {
  id: 'basic' | 'plus' | 'premium';
  name: string;
  tierSubtitle: string;
  monthlyPrice: number;
  annualPrice: number;
  popular?: boolean;
  benefits: string[];
  notIncluded?: string[];
  colorAccent?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  description: string;
  aspectRatio?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  memberSince: string;
  rating: number;
  headline: string;
  quote: string;
  achievement: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Membership' | 'Workouts' | 'Facilities' | 'Policies';
}

export interface FreeTrialRequest {
  fullName: string;
  email: string;
  phone: string;
  preferredLocation: string;
  preferredDate: string;
  fitnessExperience: string;
  marketingConsent: boolean;
}

export interface BookingConfirmation {
  bookingId: string;
  className: string;
  instructor: string;
  day: string;
  time: string;
  room: string;
  attendeeName: string;
  attendeeEmail: string;
  stationNumber: number;
  timestamp: string;
}
