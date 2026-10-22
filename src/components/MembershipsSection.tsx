import React, { useState } from 'react';
import { Check, X, Shield, Star, Sparkles, Settings2, ArrowRight } from 'lucide-react';
import { MEMBERSHIP_PLANS } from '../data/gymData.ts';
import { MembershipPlan } from '../types.ts';

interface MembershipsSectionProps {
  onSelectPlan: (plan: MembershipPlan, billingCycle: 'monthly' | 'annual') => void;
}

export const MembershipsSection: React.FC<MembershipsSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [plans, setPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [showOwnerCustomizer, setShowOwnerCustomizer] = useState(false);

  const handlePriceChange = (planId: string, newMonthly: number) => {
    setPlans((prev) =>
      prev.map((p) => {
        if (p.id === planId) {
          return {
            ...p,
            monthlyPrice: newMonthly,
            annualPrice: parseFloat((newMonthly * 0.85).toFixed(2)),
          };
        }
        return p;
      })
    );
  };

  return (
    <section id="memberships" className="py-24 bg-[#0B0C0E] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            TRANSPARENT US MEMBERSHIP TIERS
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            NO GIMMICKS. NO HIDDEN FEES.
          </h2>
          <p className="text-base sm:text-lg text-neutral-400">
            Pick the membership built for how you train. All memberships include flexible cancellation, digital mobile check-in, and full club access.
          </p>

          {/* Billing Switch (Segmented interactive control) */}
          <div className="inline-flex items-center gap-1 p-1 bg-[#14171F] border border-neutral-800 rounded-lg mt-8">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer font-athletic ${
                billingCycle === 'monthly'
                  ? 'bg-white text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Monthly Agreement
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer font-athletic flex items-center gap-1.5 ${
                billingCycle === 'annual'
                  ? 'bg-[#D2F800] text-black shadow-md'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>Annual Commitment</span>
              <span className="text-[10px] bg-black/80 text-[#D2F800] px-1.5 py-0.5 rounded font-mono font-bold">
                SAVE 15%
              </span>
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {plans.map((plan) => {
            const price =
              billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl flex flex-col justify-between transition-all duration-200 ${
                  plan.popular
                    ? 'bg-[#151922] border-2 border-[#D2F800] shadow-2xl shadow-[#D2F800]/10 lg:-translate-y-2'
                    : 'bg-[#12151C] border border-neutral-800 hover:border-neutral-700'
                } p-7 sm:p-8`}
              >
                {/* Popular Pill Marker */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#D2F800] text-black text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded shadow-md font-athletic">
                    MOST POPULAR CLUB PLAN
                  </div>
                )}

                <div>
                  {/* Plan Header */}
                  <div className="border-b border-neutral-800 pb-6 mb-6">
                    <span className="text-xs font-bold tracking-widest text-[#D2F800] uppercase font-mono">
                      TIER 0{plan.id === 'basic' ? '1' : plan.id === 'plus' ? '2' : '3'}
                    </span>
                    <h3 className="font-athletic text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mt-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      {plan.tierSubtitle}
                    </p>

                    {/* Price in USD */}
                    <div className="mt-5 flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-neutral-400">$</span>
                      <span className="text-5xl font-black font-athletic tracking-tight text-white tabular-nums">
                        {price.toFixed(2)}
                      </span>
                      <span className="text-xs text-neutral-400 font-medium">
                        / month
                      </span>
                    </div>

                    <p className="text-[11px] text-neutral-500 mt-1">
                      {billingCycle === 'annual'
                        ? 'Billed annually with 15% discount'
                        : 'Month-to-month agreement · Cancel anytime'}
                    </p>
                  </div>

                  {/* Included Benefits List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider font-athletic">
                      Included Privileges:
                    </p>
                    {plan.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-200">
                        <Check className="w-4 h-4 text-[#D2F800] shrink-0 mt-0.5" />
                        <span className="leading-snug">{benefit}</span>
                      </div>
                    ))}

                    {/* Excluded items (to clearly set honest expectations) */}
                    {plan.notIncluded && plan.notIncluded.length > 0 && (
                      <div className="pt-3 mt-3 border-t border-neutral-800/80 space-y-2">
                        {plan.notIncluded.map((excluded, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-neutral-500">
                            <X className="w-3.5 h-3.5 text-neutral-600 shrink-0 mt-0.5" />
                            <span className="line-through decoration-neutral-700 leading-snug">
                              {excluded}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Choose Plan Action */}
                <div className="pt-4 border-t border-neutral-800/80">
                  <button
                    onClick={() => onSelectPlan(plan, billingCycle)}
                    className={`w-full py-3.5 rounded font-athletic text-base font-extrabold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-[#D2F800] hover:bg-[#bedf00] text-black shadow-lg shadow-[#D2F800]/20'
                        : 'bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 hover:border-neutral-500'
                    }`}
                  >
                    <span>Choose {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gym Owner Customizer Notice & Drawer Toggle */}
        <div className="bg-[#12151C] border border-neutral-800 rounded-lg p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#D2F800] shrink-0">
              <Settings2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-200">Owner Configurable Pricing Notice:</span> Prices and tier perks can be updated by club management in real time.
            </div>
          </div>

          <button
            onClick={() => setShowOwnerCustomizer(!showOwnerCustomizer)}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-200 text-xs font-semibold rounded cursor-pointer whitespace-nowrap"
          >
            {showOwnerCustomizer ? 'Close Price Editor' : 'Edit Club Rates (Demo)'}
          </button>
        </div>

        {/* Interactive Price Customizer Drawer for Owner Testing */}
        {showOwnerCustomizer && (
          <div className="mt-4 p-5 bg-[#14171F] border border-[#D2F800]/30 rounded-lg animate-fadeIn text-xs">
            <h4 className="font-bold text-white uppercase font-athletic text-sm mb-3 text-[#D2F800]">
              Club Owner Tier Rate Editor
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {plans.map((p) => (
                <div key={p.id} className="bg-neutral-900 p-3 rounded border border-neutral-800">
                  <label className="block text-neutral-300 font-semibold mb-1">
                    {p.name} Monthly Rate ($USD):
                  </label>
                  <input
                    type="number"
                    step="1"
                    min="10"
                    max="300"
                    value={p.monthlyPrice}
                    onChange={(e) => handlePriceChange(p.id, parseFloat(e.target.value) || 0)}
                    className="w-full px-3 py-1.5 bg-black border border-neutral-700 rounded text-white font-mono text-sm focus:border-[#D2F800] outline-none"
                  />
                  <span className="text-[10px] text-neutral-500 mt-1 block">
                    Annual auto-discounted to ${(p.monthlyPrice * 0.85).toFixed(2)}/mo
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
