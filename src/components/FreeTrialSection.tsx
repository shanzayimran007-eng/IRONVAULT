import React, { useState } from 'react';
import { Sparkles, Calendar, MapPin, User, Mail, Phone, CheckCircle2, QrCode, Download, Printer } from 'lucide-react';
import { GYM_LOCATIONS } from '../data/gymData.ts';

interface FreeTrialSectionProps {
  initialLocationId?: string;
}

export const FreeTrialSection: React.FC<FreeTrialSectionProps> = ({ initialLocationId }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredLocation: initialLocationId || GYM_LOCATIONS[0].name,
    preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    fitnessExperience: 'intermediate',
    marketingConsent: true,
  });

  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passData, setPassData] = useState<{
    passId: string;
    fullName: string;
    email: string;
    location: string;
    date: string;
    expirationDate: string;
  } | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!formData.preferredDate) {
      errors.preferredDate = 'Please select a preferred visit date.';
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
    // Simulate real local pass generation
    setTimeout(() => {
      setIsSubmitting(false);
      const expiry = new Date(Date.now() + 7 * 86400000).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      setPassData({
        passId: `IV-${Math.floor(100000 + Math.random() * 900000)}-VIP`,
        fullName: formData.fullName,
        email: formData.email,
        location: formData.preferredLocation,
        date: formData.preferredDate,
        expirationDate: expiry,
      });
    }, 600);
  };

  return (
    <section id="free-trial" className="py-24 bg-[#0B0C0E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>3-DAY VIP GUEST PASS</span>
            </div>
            <h2 className="font-athletic text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[0.95] text-balance mb-4">
              YOUR FIRST WORKOUT IS THE START OF SOMETHING BIG.
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto">
              Experience the full IronVault floor, sample an energizing group fitness class, and test our recovery sauna with zero pressure or commitment.
            </p>
          </div>

          {passData ? (
            /* Digital VIP Pass Display */
            <div className="bg-[#14171F] border-2 border-[#D2F800] rounded-2xl p-6 sm:p-10 shadow-2xl animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-neutral-800 gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-[#D2F800] uppercase font-mono">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>PASS ACTIVATED · READY FOR CHECK-IN</span>
                  </div>
                  <h3 className="font-athletic text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                    IRONVAULT 3-DAY VIP GUEST PASS
                  </h3>
                </div>

                <div className="bg-black/60 border border-neutral-800 px-4 py-2 rounded text-right">
                  <span className="text-[10px] text-neutral-500 uppercase font-mono block">Pass ID</span>
                  <span className="text-sm font-mono font-bold text-[#D2F800]">
                    {passData.passId}
                  </span>
                </div>
              </div>

              {/* Pass Details Card Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-neutral-900 border border-neutral-800 mb-6">
                <div>
                  <span className="text-xs text-neutral-500 uppercase block font-medium">Guest Name</span>
                  <span className="text-base font-bold text-white mt-0.5 block">{passData.fullName}</span>
                  <span className="text-xs text-neutral-400 font-mono">{passData.email}</span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 uppercase block font-medium">Assigned Club</span>
                  <span className="text-sm font-bold text-white mt-0.5 block">{passData.location}</span>
                  <span className="text-xs text-[#D2F800]">All Access Privileges</span>
                </div>

                <div>
                  <span className="text-xs text-neutral-500 uppercase block font-medium">Pass Valid Until</span>
                  <span className="text-base font-bold text-[#D2F800] mt-0.5 block font-mono">
                    {passData.expirationDate}
                  </span>
                  <span className="text-xs text-neutral-400">Target Visit: {passData.date}</span>
                </div>
              </div>

              {/* Barcode & Front Desk Instructions */}
              <div className="bg-white text-black p-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 mb-6">
                <div className="text-center sm:text-left">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Front Desk Fast Scan
                  </span>
                  <p className="text-xs text-neutral-800 font-medium max-w-sm">
                    Show this barcode alongside any valid government photo ID at the club turnstile. Our team will issue your RFID locker token.
                  </p>
                </div>

                {/* Simulated Scannable Barcode SVG */}
                <div className="flex flex-col items-center">
                  <svg className="w-56 h-12" viewBox="0 0 200 40">
                    <rect x="0" y="0" width="200" height="40" fill="#ffffff" />
                    {/* Barcode lines */}
                    <rect x="10" y="5" width="4" height="30" fill="#000" />
                    <rect x="18" y="5" width="2" height="30" fill="#000" />
                    <rect x="24" y="5" width="6" height="30" fill="#000" />
                    <rect x="34" y="5" width="3" height="30" fill="#000" />
                    <rect x="42" y="5" width="8" height="30" fill="#000" />
                    <rect x="54" y="5" width="2" height="30" fill="#000" />
                    <rect x="60" y="5" width="5" height="30" fill="#000" />
                    <rect x="70" y="5" width="3" height="30" fill="#000" />
                    <rect x="78" y="5" width="6" height="30" fill="#000" />
                    <rect x="88" y="5" width="4" height="30" fill="#000" />
                    <rect x="96" y="5" width="2" height="30" fill="#000" />
                    <rect x="102" y="5" width="7" height="30" fill="#000" />
                    <rect x="114" y="5" width="3" height="30" fill="#000" />
                    <rect x="122" y="5" width="5" height="30" fill="#000" />
                    <rect x="132" y="5" width="2" height="30" fill="#000" />
                    <rect x="138" y="5" width="6" height="30" fill="#000" />
                    <rect x="148" y="5" width="3" height="30" fill="#000" />
                    <rect x="156" y="5" width="7" height="30" fill="#000" />
                    <rect x="168" y="5" width="4" height="30" fill="#000" />
                    <rect x="176" y="5" width="2" height="30" fill="#000" />
                    <rect x="182" y="5" width="6" height="30" fill="#000" />
                  </svg>
                  <span className="text-[10px] font-mono tracking-widest text-neutral-700 mt-1">
                    *{passData.passId}*
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-neutral-800">
                <span className="text-xs text-neutral-400">
                  Confirmation copy sent to <strong className="text-white">{passData.email}</strong>.
                </span>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-semibold text-white rounded flex items-center gap-1.5 cursor-pointer uppercase tracking-wider"
                  >
                    <Printer className="w-4 h-4 text-[#D2F800]" />
                    <span>Print VIP Pass</span>
                  </button>

                  <button
                    onClick={() => {
                      setPassData(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        preferredLocation: GYM_LOCATIONS[0].name,
                        preferredDate: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                        fitnessExperience: 'intermediate',
                        marketingConsent: true,
                      });
                    }}
                    className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs text-neutral-400 hover:text-white rounded cursor-pointer"
                  >
                    Request Another
                  </button>
                </div>
              </div>

              {/* Integration note */}
              <p className="text-[11px] text-neutral-500 mt-5 pt-3 border-t border-neutral-800/80">
                🔒 CRM Integration Note: Free trial data is verified client-side. Webhooks for Mindbody, ABC Fitness, or Zapier can be configured with your API credentials.
              </p>
            </div>
          ) : (
            /* Free Trial Registration Form */
            <div className="bg-[#14171F] border border-neutral-800 rounded-2xl p-6 sm:p-10 shadow-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Full Name *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-4 py-3 bg-neutral-900 border ${
                          formErrors.fullName ? 'border-red-500' : 'border-neutral-800'
                        } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                      />
                    </div>
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
                      placeholder="alex@example.com"
                      className={`w-full px-4 py-3 bg-neutral-900 border ${
                        formErrors.email ? 'border-red-500' : 'border-neutral-800'
                      } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Phone Number (Optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Phone Number (Optional for SMS pass)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 234-5678"
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                    />
                  </div>

                  {/* Preferred Gym Location */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Preferred Gym Location *
                    </label>
                    <select
                      name="preferredLocation"
                      value={formData.preferredLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                    >
                      {GYM_LOCATIONS.map((loc) => (
                        <option key={loc.id} value={loc.name}>
                          {loc.name} ({loc.city}, {loc.state})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Preferred Visit Date */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Preferred Visit Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 bg-neutral-900 border ${
                        formErrors.preferredDate ? 'border-red-500' : 'border-neutral-800'
                      } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                    />
                    {formErrors.preferredDate && (
                      <p className="text-xs text-red-400 mt-1">{formErrors.preferredDate}</p>
                    )}
                  </div>

                  {/* Fitness Experience Level */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                      Fitness Experience Level
                    </label>
                    <select
                      name="fitnessExperience"
                      value={formData.fitnessExperience}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                    >
                      <option value="beginner">Beginner (New to gyms or returning after break)</option>
                      <option value="intermediate">Intermediate (Train 2-3x per week)</option>
                      <option value="advanced">Advanced (Experienced lifter / athlete)</option>
                    </select>
                  </div>
                </div>

                {/* Consent Checkbox */}
                <div className="flex items-start gap-3 pt-2">
                  <input
                    type="checkbox"
                    id="marketingConsent"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 rounded border-neutral-700 bg-neutral-900 text-[#D2F800] focus:ring-0 cursor-pointer"
                  />
                  <label htmlFor="marketingConsent" className="text-xs text-neutral-400 leading-normal cursor-pointer">
                    I agree to receive my 3-Day VIP pass and relevant club information via email/SMS. You can opt out anytime with one click.
                  </label>
                </div>

                {/* Submit Action */}
                <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs text-neutral-500">
                    Must be 18+ with valid photo ID. One trial pass per guest per year.
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-4 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-base font-extrabold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#D2F800]/20 disabled:opacity-60"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>{isSubmitting ? 'Generating VIP Pass...' : 'Submit Request & Get Pass'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
