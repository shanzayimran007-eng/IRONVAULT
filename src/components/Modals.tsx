import React, { useState } from 'react';
import { X, CheckCircle2, Calendar, Clock, MapPin, User, ShieldCheck, Dumbbell, Download, QrCode, ArrowRight, ExternalLink } from 'lucide-react';
import { FitnessClass, ScheduleItem, GymLocation, MembershipPlan } from '../types.ts';
import { GYM_LOCATIONS, MEMBERSHIP_PLANS } from '../data/gymData.ts';

// -------------------------------------------------------------
// 1. CLASS BOOKING MODAL
// -------------------------------------------------------------
interface BookingModalProps {
  scheduleItem: ScheduleItem;
  onClose: () => void;
}

export const ClassBookingModal: React.FC<BookingModalProps> = ({ scheduleItem, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stationNumber, setStationNumber] = useState<number>(3);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState('');

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errs.email = 'Please provide a valid email address.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const genId = `IV-BK-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingId(genId);
    setBookingConfirmed(true);
  };

  const handleDownloadCalendar = () => {
    // Generate clean .ics calendar file
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IronVault Fitness//Class Reservation//EN',
      'BEGIN:VEVENT',
      `SUMMARY:IronVault: ${scheduleItem.className}`,
      `DESCRIPTION:Class with ${scheduleItem.instructor} at ${scheduleItem.room}. Reservation ID: ${bookingId}`,
      `LOCATION:IronVault Flagship Club - ${scheduleItem.room}`,
      `STATUS:CONFIRMED`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `IronVault-${scheduleItem.className.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl animate-fadeIn text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        {bookingConfirmed ? (
          <div>
            <div className="w-14 h-14 rounded-full bg-[#D2F800]/20 text-[#D2F800] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight text-center">
              Spot Reserved!
            </h3>
            <p className="text-xs text-neutral-400 text-center mt-1 mb-6">
              Your reservation reference: <strong className="text-white font-mono">{bookingId}</strong>
            </p>

            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-lg space-y-2 text-xs mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-500">Class:</span>
                <span className="font-bold text-white">{scheduleItem.className}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Day & Time:</span>
                <span className="text-neutral-200">{scheduleItem.day} · {scheduleItem.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Studio & Station:</span>
                <span className="text-[#D2F800]">{scheduleItem.room} (Station #{stationNumber})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Lead Coach:</span>
                <span className="text-neutral-200">{scheduleItem.instructor}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Attendee:</span>
                <span className="text-neutral-200">{name} ({email})</span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={handleDownloadCalendar}
                className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white font-athletic text-xs font-bold uppercase tracking-wider rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-[#D2F800]" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={onClose}
                className="w-full py-2.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D2F800] uppercase font-mono mb-1">
              <Calendar className="w-4 h-4" />
              <span>STUDIO RESERVATION</span>
            </div>
            <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight">
              {scheduleItem.className}
            </h3>
            <p className="text-xs text-neutral-400 mt-1 mb-6">
              {scheduleItem.day} at {scheduleItem.time} · {scheduleItem.room} · Coach {scheduleItem.instructor}
            </p>

            <form onSubmit={handleBook} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Smith"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                />
                {errors.name && <p className="text-xs text-red-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                />
                {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Choose Station / Bike Position
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setStationNumber(num)}
                      className={`py-1.5 text-xs font-mono font-bold rounded border cursor-pointer ${
                        stationNumber === num
                          ? 'bg-[#D2F800] text-black border-[#D2F800]'
                          : 'bg-neutral-900 text-neutral-300 border-neutral-800 hover:border-neutral-600'
                      }`}
                    >
                      #{num}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer"
                >
                  Confirm Reservation (Free Member Spot)
                </button>
              </div>

              <p className="text-[11px] text-neutral-500 text-center">
                Non-members: You can claim a 3-Day Free VIP Pass to attend this class without charge.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. MEMBERSHIP SIGNUP WIZARD
// -------------------------------------------------------------
interface MembershipSignupModalProps {
  initialPlan?: MembershipPlan;
  initialBilling?: 'monthly' | 'annual';
  onClose: () => void;
}

export const MembershipSignupModal: React.FC<MembershipSignupModalProps> = ({
  initialPlan,
  initialBilling = 'monthly',
  onClose,
}) => {
  const [selectedPlanId, setSelectedPlanId] = useState<'basic' | 'plus' | 'premium'>(
    initialPlan?.id || 'plus'
  );
  const [billing, setBilling] = useState<'monthly' | 'annual'>(initialBilling);
  const [selectedLocation, setSelectedLocation] = useState(GYM_LOCATIONS[0].id);
  const [step, setStep] = useState<1 | 2>(1);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess] = useState(false);
  const [memberId, setMemberId] = useState('');

  const currentPlan =
    MEMBERSHIP_PLANS.find((p) => p.id === selectedPlanId) || MEMBERSHIP_PLANS[1];
  const price = billing === 'monthly' ? currentPlan.monthlyPrice : currentPlan.annualPrice;

  const handleComplete = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    const generatedId = `IVM-${Math.floor(100000 + Math.random() * 900000)}`;
    setMemberId(generatedId);
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-xl w-full p-6 sm:p-8 relative shadow-2xl animate-fadeIn text-white my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-full bg-[#D2F800]/20 text-[#D2F800] mx-auto flex items-center justify-center mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight">
              WELCOME TO IRONVAULT
            </h3>
            <p className="text-sm text-neutral-300 mt-1 mb-6">
              Your membership has been activated! Your membership agreement and receipt have been dispatched to <strong className="text-white">{email}</strong>.
            </p>

            <div className="bg-black/60 border border-neutral-800 p-5 rounded-lg text-left text-xs space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-neutral-500">Member ID:</span>
                <span className="font-mono font-bold text-[#D2F800]">{memberId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Plan Enrolled:</span>
                <span className="font-bold text-white">{currentPlan.name} ({billing})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Home Club:</span>
                <span className="text-neutral-200">
                  {GYM_LOCATIONS.find((l) => l.id === selectedLocation)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Monthly Dues:</span>
                <span className="font-mono text-white">${price.toFixed(2)}/mo</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded cursor-pointer"
            >
              Access Member Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D2F800] uppercase font-mono mb-1">
              <Dumbbell className="w-4 h-4" />
              <span>JOIN IRONVAULT FITNESS</span>
            </div>
            <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight mb-2">
              SELECT YOUR MEMBERSHIP
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Flexible membership with full floor privileges and nationwide transferability.
            </p>

            {step === 1 ? (
              <div className="space-y-5">
                {/* Plan Selection Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  {MEMBERSHIP_PLANS.map((plan) => (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => setSelectedPlanId(plan.id)}
                      className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                        selectedPlanId === plan.id
                          ? 'bg-neutral-900 border-[#D2F800] text-white'
                          : 'bg-black/40 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span className="text-xs font-mono text-[#D2F800] uppercase block">
                        Tier
                      </span>
                      <span className="font-athletic text-lg font-bold text-white block uppercase">
                        {plan.name}
                      </span>
                      <span className="text-xs font-mono mt-1 block">
                        ${billing === 'monthly' ? plan.monthlyPrice : plan.annualPrice}/mo
                      </span>
                    </button>
                  ))}
                </div>

                {/* Home Club Selection */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Select Your Home Club
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                  >
                    {GYM_LOCATIONS.map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name} ({loc.city}, {loc.state})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Plan Summary Card */}
                <div className="bg-neutral-900/80 p-4 rounded-lg border border-neutral-800 text-xs space-y-2">
                  <div className="flex justify-between text-neutral-300">
                    <span>{currentPlan.name} Monthly Dues:</span>
                    <span className="font-bold font-mono text-white">${price.toFixed(2)}/mo</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Enrollment Fee:</span>
                    <span className="text-[#D2F800] font-bold">$0 (Limited Promo)</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>Cancellation:</span>
                    <span>30-Day Notice (No lock-in)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="w-full py-3.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Continue to Member Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <form onSubmit={handleComplete} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Jordan Smith"
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jordan@example.com"
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                    Mobile Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(555) 000-0000"
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                  />
                </div>

                <div className="p-3 bg-neutral-900/60 rounded border border-neutral-800 text-[11px] text-neutral-400">
                  💳 Payment processing is simulated in sandbox mode. No live credit card is charged.
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="w-1/3 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase rounded cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="w-2/3 py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded cursor-pointer"
                  >
                    Activate Membership
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 3. MEMBER LOGIN & PORTAL MODAL
// -------------------------------------------------------------
interface MemberLoginModalProps {
  onClose: () => void;
}

export const MemberLoginModal: React.FC<MemberLoginModalProps> = ({ onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [emailOrBarcode, setEmailOrBarcode] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  const handleDemoLogin = () => {
    setEmailOrBarcode('marcus.member@ironvault.com');
    setPassword('••••••••');
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        {isLoggedIn ? (
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-4">
              <div>
                <span className="text-[10px] font-mono text-[#D2F800] uppercase block">
                  ACTIVE MEMBER ACCOUNT
                </span>
                <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight">
                  MARCUS VANCE
                </h3>
              </div>
              <span className="text-xs bg-[#D2F800] text-black font-athletic font-extrabold px-2.5 py-0.5 rounded uppercase">
                PLUS TIER
              </span>
            </div>

            {/* Turnstile Check-in Barcode */}
            <div className="bg-white text-black p-4 rounded-lg text-center mb-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                Touchless Club Turnstile Barcode
              </span>
              <svg className="w-full h-10 mx-auto" viewBox="0 0 200 35">
                <rect x="0" y="0" width="200" height="35" fill="#ffffff" />
                <rect x="15" y="3" width="5" height="28" fill="#000" />
                <rect x="25" y="3" width="3" height="28" fill="#000" />
                <rect x="32" y="3" width="7" height="28" fill="#000" />
                <rect x="44" y="3" width="2" height="28" fill="#000" />
                <rect x="52" y="3" width="8" height="28" fill="#000" />
                <rect x="65" y="3" width="4" height="28" fill="#000" />
                <rect x="74" y="3" width="6" height="28" fill="#000" />
                <rect x="85" y="3" width="3" height="28" fill="#000" />
                <rect x="94" y="3" width="8" height="28" fill="#000" />
                <rect x="108" y="3" width="2" height="28" fill="#000" />
                <rect x="115" y="3" width="7" height="28" fill="#000" />
                <rect x="126" y="3" width="4" height="28" fill="#000" />
                <rect x="135" y="3" width="5" height="28" fill="#000" />
                <rect x="145" y="3" width="3" height="28" fill="#000" />
                <rect x="154" y="3" width="6" height="28" fill="#000" />
                <rect x="166" y="3" width="4" height="28" fill="#000" />
                <rect x="175" y="3" width="7" height="28" fill="#000" />
              </svg>
              <span className="text-[10px] font-mono text-neutral-600 tracking-widest">
                *IV-98234-AUSTIN*
              </span>
            </div>

            {/* Member Stats */}
            <div className="grid grid-cols-2 gap-3 text-xs mb-5">
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                <span className="text-neutral-500 block">Workout Streak:</span>
                <span className="text-base font-bold text-[#D2F800] font-mono">14 Days</span>
              </div>
              <div className="bg-neutral-900 p-3 rounded border border-neutral-800">
                <span className="text-neutral-500 block">Locker PIN:</span>
                <span className="text-base font-bold text-white font-mono">#428</span>
              </div>
            </div>

            <div className="bg-neutral-900 p-3 rounded border border-neutral-800 text-xs mb-5">
              <span className="text-neutral-400 font-bold block mb-1">
                Next Booked Class:
              </span>
              <p className="text-white">Strength & Conditioning · Tomorrow at 6:00 AM</p>
              <span className="text-neutral-500 text-[11px]">Vault Studio A with Marcus Sterling</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLoggedIn(false)}
                className="w-1/2 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-neutral-400 hover:text-white rounded"
              >
                Sign Out
              </button>
              <button
                onClick={onClose}
                className="w-1/2 py-2 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic font-bold text-xs uppercase tracking-wider rounded"
              >
                Close Portal
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-[#D2F800] uppercase font-mono mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>MEMBER SERVICES</span>
            </div>
            <h3 className="font-athletic text-2xl font-bold uppercase tracking-tight mb-2">
              MEMBER PORTAL LOGIN
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Access your digital turnstile barcode, manage class bookings, and view training logs.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 mb-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Email or Member ID
                </label>
                <input
                  type="text"
                  required
                  value={emailOrBarcode}
                  onChange={(e) => setEmailOrBarcode(e.target.value)}
                  placeholder="member@example.com or IV-XXXX"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-sm text-white focus:outline-none focus:border-[#D2F800]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Sign In to Member Portal
              </button>
            </form>

            {/* Quick Demo Preview Button */}
            <div className="pt-4 border-t border-neutral-800 text-center">
              <button
                type="button"
                onClick={handleDemoLogin}
                className="w-full py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs text-[#D2F800] font-semibold rounded cursor-pointer uppercase tracking-wider font-athletic"
              >
                ⚡ Preview Demo Member Dashboard
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 4. CLASS DETAIL MODAL
// -------------------------------------------------------------
interface ClassDetailModalProps {
  cls: FitnessClass;
  onClose: () => void;
  onBook: () => void;
}

export const ClassDetailModal: React.FC<ClassDetailModalProps> = ({ cls, onClose, onBook }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono font-bold text-[#D2F800] uppercase block mb-1">
          {cls.categoryLabel} · {cls.duration} · {cls.level}
        </span>
        <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight mb-4">
          {cls.title}
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          {cls.fullOverview}
        </p>

        <div className="space-y-4 text-xs mb-8">
          <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
            <span className="text-neutral-500 font-semibold block mb-1 uppercase tracking-wider">
              Equipment Utilized:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cls.equipmentNeeded.map((eq, i) => (
                <span key={i} className="bg-black/60 px-2 py-0.5 rounded text-neutral-300 border border-neutral-800">
                  {eq}
                </span>
              ))}
            </div>
          </div>

          <div className="p-3 bg-neutral-900 rounded border border-neutral-800">
            <span className="text-neutral-500 font-semibold block mb-1 uppercase tracking-wider">
              Primary Muscle Groups Targeted:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {cls.targetMuscles.map((m, i) => (
                <span key={i} className="text-[#D2F800] bg-black/60 px-2 py-0.5 rounded border border-neutral-800">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-1/3 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase rounded cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBook();
            }}
            className="w-2/3 py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded cursor-pointer"
          >
            Check Schedule & Book
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 5. CLUB DETAIL MODAL
// -------------------------------------------------------------
interface ClubDetailModalProps {
  location: GymLocation;
  onClose: () => void;
  onJoin: () => void;
}

export const ClubDetailModal: React.FC<ClubDetailModalProps> = ({ location, onClose, onJoin }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-xs font-mono font-bold text-[#D2F800] uppercase block mb-1">
          {location.city}, {location.state} Club
        </span>
        <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight mb-2">
          {location.name}
        </h3>
        <p className="text-xs text-neutral-400 mb-6">
          {location.address}, {location.city}, {location.state} {location.zip}
        </p>

        <div className="space-y-4 text-xs mb-6">
          <div className="bg-neutral-900 p-3.5 rounded border border-neutral-800 space-y-2">
            <div className="flex justify-between">
              <span className="text-neutral-500">Weekday Operating Hours:</span>
              <span className="text-white font-medium">{location.hoursWeekday}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Weekend Operating Hours:</span>
              <span className="text-white font-medium">{location.hoursWeekend}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Direct Phone:</span>
              <span className="text-[#D2F800] font-mono">{location.phone}</span>
            </div>
          </div>

          <div>
            <span className="text-xs font-bold text-neutral-300 uppercase tracking-wider block mb-2 font-athletic">
              Facility Equipment & Recovery Suites:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {location.facilities.map((fac, i) => (
                <div key={i} className="flex items-center gap-2 text-neutral-300 bg-neutral-900/60 p-2 rounded border border-neutral-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D2F800]" />
                  <span>{fac}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(
              `${location.address}, ${location.city}, ${location.state} ${location.zip}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-1/2 py-3 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold uppercase rounded text-center flex items-center justify-center gap-1.5"
          >
            <span>Open Maps</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#D2F800]" />
          </a>
          <button
            onClick={() => {
              onClose();
              onJoin();
            }}
            className="w-1/2 py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded cursor-pointer"
          >
            Join This Club
          </button>
        </div>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 6. LEGAL MODAL (Privacy, Terms, Accessibility)
// -------------------------------------------------------------
interface LegalModalProps {
  type: 'privacy' | 'terms' | 'accessibility';
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  const content = {
    privacy: {
      title: 'PRIVACY POLICY',
      text: `IronVault Fitness USA, LLC values your privacy. We collect minimal customer information strictly to process membership agreements, secure class reservations, and generate your 3-Day VIP passes. We never sell or rent your personal information to third parties. All stored data complies with applicable US privacy standards. For data deletion inquiries, contact privacy@ironvaultfitness.com.`,
    },
    terms: {
      title: 'TERMS OF SERVICE',
      text: `By utilizing IronVault Fitness facilities, members and guests agree to adhere to club etiquette, re-rack weights after use, wipe down machines with provided antimicrobial towels, and maintain mutual respect. Standard membership agreements are month-to-month or annual as selected, cancellable with 30 days written notice.`,
    },
    accessibility: {
      title: 'ACCESSIBILITY STATEMENT',
      text: `IronVault Fitness is committed to digital and physical accessibility. Our websites adhere to WCAG 2.1 AA contrast and screen-reader accessibility guidelines. All clubs feature ADA-compliant entrances, elevator access, wheelchair-friendly locker suites, and accessible strength equipment.`,
    },
  }[type];

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14171F] border border-neutral-800 rounded-xl max-w-lg w-full p-6 sm:p-8 relative shadow-2xl text-white animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-neutral-400 hover:text-white p-1 rounded-md"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-athletic text-3xl font-extrabold uppercase tracking-tight mb-4">
          {content.title}
        </h3>

        <p className="text-sm text-neutral-300 leading-relaxed mb-6">
          {content.text}
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded cursor-pointer"
        >
          Close
        </button>
      </div>
    </div>
  );
};
