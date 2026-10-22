import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { FAQS } from '../data/gymData.ts';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-24 bg-[#0B0C0E] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.2em] text-[#D2F800] uppercase mb-2">
            HELP & COMMON INQUIRIES
          </p>
          <h2 className="font-athletic text-4xl sm:text-5xl font-black text-white tracking-tight uppercase mb-4">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="text-base text-neutral-400 max-w-xl mx-auto">
            Everything you need to know about joining IronVault, booking classes, and getting the most out of your training.
          </p>

          {/* Quick Filter */}
          <div className="mt-6 max-w-md mx-auto relative">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter questions..."
              className="w-full pl-10 pr-4 py-2 bg-[#14171F] border border-neutral-800 rounded-lg text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-[#D2F800] transition-colors"
            />
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center text-neutral-400 bg-[#12151C] rounded-lg border border-neutral-800">
              No matching questions found. Contact our front desk at (800) 555-VAULT.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-[#12151C] border border-neutral-800 hover:border-neutral-700 rounded-lg overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-athletic text-xl sm:text-2xl font-bold text-white uppercase tracking-tight">
                      {faq.question}
                    </span>
                    <span
                      className={`p-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-[#D2F800] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-neutral-300 leading-relaxed border-t border-neutral-800/80 animate-fadeIn">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Additional Help Callout */}
        <div className="mt-12 p-6 rounded-xl bg-[#14171F] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-athletic text-xl font-bold text-white uppercase tracking-tight">
              Have a question not listed here?
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Our Member Services team responds within 2 hours during normal club hours.
            </p>
          </div>

          <a
            href="#contact"
            className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-xs font-bold text-white uppercase tracking-wider rounded font-athletic cursor-pointer whitespace-nowrap"
          >
            Contact Member Services
          </a>
        </div>
      </div>
    </section>
  );
};
