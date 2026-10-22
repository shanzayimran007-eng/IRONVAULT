import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle2, ArrowRight } from 'lucide-react';
import { CONTACT_CONFIG } from '../data/gymData.ts';

export const ContactSection: React.FC = () => {
  // Contact Form State
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'General Membership Inquiry',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>({});
  const [contactSuccess, setContactSuccess] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterConsent, setNewsletterConsent] = useState(true);
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};
    if (!contactForm.name.trim()) errors.name = 'Please provide your name.';
    if (!contactForm.email.trim()) {
      errors.email = 'Please provide your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      errors.email = 'Please provide a valid email format.';
    }
    if (!contactForm.message.trim()) {
      errors.message = 'Please provide your message.';
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setContactSuccess(true);
    }, 500);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail)) {
      setNewsletterError('Please enter a valid email address.');
      return;
    }
    if (!newsletterConsent) {
      setNewsletterError('Please agree to receive newsletter updates.');
      return;
    }

    setNewsletterError('');
    setNewsletterSuccess(true);
  };

  return (
    <section id="contact" className="py-24 bg-[#0F1116] border-t border-neutral-800/80 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            CONNECT WITH IRONVAULT
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            WE ARE HERE TO HELP YOU TRAIN
          </h2>
          <p className="text-base text-neutral-400">
            Have questions about club tours, corporate wellness partnerships, or personal training packages? Reach out directly to our team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Contact Details & Direct Connect (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#14171F] border border-neutral-800 rounded-xl p-7">
              <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mb-6">
                HEADQUARTERS & DIRECT ACCESS
              </h3>

              <div className="space-y-5 text-sm text-neutral-300">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-medium">National HQ</span>
                    <p className="font-semibold text-white mt-0.5 leading-snug">
                      {CONTACT_CONFIG.address.street}
                    </p>
                    <p className="text-neutral-400 text-xs">
                      {CONTACT_CONFIG.address.city}, {CONTACT_CONFIG.address.state} {CONTACT_CONFIG.address.zip}, USA
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-medium">Toll-Free USA Support</span>
                    <a
                      href={`tel:${CONTACT_CONFIG.phone}`}
                      className="font-semibold text-white hover:text-[#D2F800] transition-colors mt-0.5 block font-mono"
                    >
                      {CONTACT_CONFIG.phoneDisplay}
                    </a>
                    <span className="text-xs text-neutral-500">Mon–Sun 6:00 AM – 9:00 PM CST</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 uppercase block font-medium">Official Inquiries</span>
                    <a
                      href={`mailto:${CONTACT_CONFIG.email}`}
                      className="font-semibold text-[#D2F800] hover:underline mt-0.5 block font-mono text-xs sm:text-sm"
                    >
                      {CONTACT_CONFIG.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Direct Instant Action Buttons */}
              <div className="pt-6 mt-6 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Business Email Button */}
                <a
                  href={`mailto:${CONTACT_CONFIG.email}?subject=IronVault%20Gym%20Inquiry`}
                  className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-white uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors font-athletic cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#D2F800]" />
                  <span>Send Email</span>
                </a>

                {/* WhatsApp Chat Button */}
                <a
                  href={CONTACT_CONFIG.socials.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-black font-athletic text-xs font-black uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-black" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>

              {/* Social Channels */}
              <div className="pt-6 mt-6 border-t border-neutral-800">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider block mb-3 font-athletic">
                  Official Channels:
                </span>
                <div className="flex items-center gap-2.5">
                  <a
                    href={CONTACT_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href={CONTACT_CONFIG.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    Facebook
                  </a>
                  <a
                    href={CONTACT_CONFIG.socials.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 rounded text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
                  >
                    TikTok
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right 7 Cols) */}
          <div className="lg:col-span-7 bg-[#14171F] border border-neutral-800 rounded-xl p-7 sm:p-9">
            <h3 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mb-2">
              SEND US A MESSAGE
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Our concierge team typically replies within 2–4 hours during club hours.
            </p>

            {contactSuccess ? (
              <div className="p-8 bg-neutral-900 border border-[#D2F800]/50 rounded-lg text-center animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-[#D2F800]/20 text-[#D2F800] mx-auto flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-athletic text-2xl font-bold text-white uppercase tracking-tight mb-1">
                  Message Sent Successfully
                </h4>
                <p className="text-xs text-neutral-300 max-w-sm mx-auto mb-4">
                  Thank you, <strong className="text-white">{contactForm.name}</strong>. A receipt has been routed to our Member Services desk.
                </p>
                <button
                  onClick={() => {
                    setContactSuccess(false);
                    setContactForm({
                      name: '',
                      email: '',
                      subject: 'General Membership Inquiry',
                      message: '',
                    });
                  }}
                  className="text-xs text-[#D2F800] hover:underline font-bold uppercase tracking-wider"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, name: e.target.value });
                        if (contactErrors.name) setContactErrors({ ...contactErrors, name: '' });
                      }}
                      placeholder="Taylor Adams"
                      className={`w-full px-4 py-2.5 bg-neutral-900 border ${
                        contactErrors.name ? 'border-red-500' : 'border-neutral-800'
                      } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                    />
                    {contactErrors.name && (
                      <p className="text-xs text-red-400 mt-1">{contactErrors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => {
                        setContactForm({ ...contactForm, email: e.target.value });
                        if (contactErrors.email) setContactErrors({ ...contactErrors, email: '' });
                      }}
                      placeholder="taylor@example.com"
                      className={`w-full px-4 py-2.5 bg-neutral-900 border ${
                        contactErrors.email ? 'border-red-500' : 'border-neutral-800'
                      } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors`}
                    />
                    {contactErrors.email && (
                      <p className="text-xs text-red-400 mt-1">{contactErrors.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Subject / Topic
                  </label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-neutral-900 border border-neutral-800 rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors"
                  >
                    <option value="General Membership Inquiry">General Membership Inquiry</option>
                    <option value="Personal Training Packages">Personal Training Packages</option>
                    <option value="Corporate Wellness Accounts">Corporate Wellness Accounts</option>
                    <option value="Facility & Locker Amenities">Facility & Locker Amenities</option>
                    <option value="Billing & Account Support">Billing & Account Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => {
                      setContactForm({ ...contactForm, message: e.target.value });
                      if (contactErrors.message) setContactErrors({ ...contactErrors, message: '' });
                    }}
                    placeholder="How can we help you crush your goals?"
                    className={`w-full px-4 py-2.5 bg-neutral-900 border ${
                      contactErrors.message ? 'border-red-500' : 'border-neutral-800'
                    } rounded text-white text-sm focus:outline-none focus:border-[#D2F800] transition-colors resize-none`}
                  />
                  {contactErrors.message && (
                    <p className="text-xs text-red-400 mt-1">{contactErrors.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs text-neutral-500">
                    * Configuration placeholder: Emails routed to {CONTACT_CONFIG.email}.
                  </span>
                  <button
                    type="submit"
                    disabled={isSending}
                    className="px-6 py-3 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-sm font-extrabold uppercase tracking-wider rounded transition-colors flex items-center gap-2 cursor-pointer shadow-md shadow-[#D2F800]/10 disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Newsletter Subscription Block */}
        <div className="bg-[#14171F] border border-neutral-800 rounded-2xl p-8 sm:p-10 max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-md">
              <span className="text-xs font-bold text-[#D2F800] tracking-widest uppercase font-mono">
                THE IRONVAULT DISPATCH
              </span>
              <h3 className="font-athletic text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mt-1">
                WEEKLY WORKOUTS & RECOVERY SCIENCE
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-2">
                Join 35,000+ American athletes receiving our Sunday newsletter with science-backed lifting programming, nutritional blueprints, and club events.
              </p>
            </div>

            <div className="w-full md:max-w-md">
              {newsletterSuccess ? (
                <div className="p-4 bg-neutral-900 border border-[#D2F800]/60 rounded-lg text-center animate-fadeIn">
                  <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#D2F800] uppercase font-mono mb-1">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SUBSCRIBED TO THE DISPATCH</span>
                  </div>
                  <p className="text-xs text-neutral-300">
                    Check your inbox for this week's strength template!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                  <div className="flex items-center bg-neutral-900 border border-neutral-700 rounded-lg p-1.5 focus-within:border-[#D2F800] transition-colors">
                    <input
                      type="email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address..."
                      className="w-full px-3 py-2 bg-transparent text-white placeholder-neutral-500 text-xs sm:text-sm focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#D2F800] hover:bg-[#bedf00] text-black font-athletic text-xs font-extrabold uppercase tracking-wider rounded transition-colors whitespace-nowrap cursor-pointer"
                    >
                      Subscribe
                    </button>
                  </div>

                  {newsletterError && (
                    <p className="text-xs text-red-400">{newsletterError}</p>
                  )}

                  <div className="flex items-start gap-2 pt-1">
                    <input
                      type="checkbox"
                      id="newsletterConsent"
                      checked={newsletterConsent}
                      onChange={(e) => setNewsletterConsent(e.target.checked)}
                      className="mt-0.5 w-3.5 h-3.5 rounded border-neutral-700 bg-neutral-900 text-[#D2F800] focus:ring-0 cursor-pointer"
                    />
                    <label htmlFor="newsletterConsent" className="text-[11px] text-neutral-500 leading-tight cursor-pointer">
                      I agree to receive weekly fitness insights and club updates. Opt out anytime.
                    </label>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
