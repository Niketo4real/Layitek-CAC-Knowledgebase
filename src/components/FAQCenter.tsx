import React, { useState, useMemo } from 'react';
import { FAQS_DATA } from '../data/faqs';
import { CATEGORIES } from '../data/categories';
import { CategoryId, FAQItem, Article } from '../types';
import { Search, ChevronDown, ChevronUp, HelpCircle, ExternalLink, MessageCircle } from 'lucide-react';

interface FAQCenterProps {
  onSelectArticleBySlug?: (slug: string) => void;
  onOpenLeadModal: (service?: string) => void;
}

export const FAQCenter: React.FC<FAQCenterProps> = ({
  onSelectArticleBySlug,
  onOpenLeadModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIds, setOpenFaqIds] = useState<Record<string, boolean>>({
    'faq-1': true,
    'faq-4': true,
    'faq-6': true,
  });

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredFaqs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return FAQS_DATA.filter((item) => {
      const matchCat =
        selectedCategory === 'all' || item.categoryId === selectedCategory;
      if (!matchCat) return false;

      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        (item.camaSection && item.camaSection.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Official Compliance FAQ Hub</span>
          <span aria-hidden="true">·</span>
          <span>Verified Nigerian CAMA Rules</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Search over 100 verified answers to Nigerian corporate compliance,
          registration procedures, statutory fees, and post-incorporation queries.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-4 mb-8">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search FAQs by question or keyword (e.g. 'sole proprietor', 'minimum capital', 'director removal')..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Category Pills / Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-emerald-800 text-white shadow-2xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All Topics ({FAQS_DATA.length})
          </button>
          {CATEGORIES.filter((c) => c.id !== 'faqs').map((cat) => {
            const count = FAQS_DATA.filter((f) => f.categoryId === cat.id).length;
            if (count === 0) return null;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-800 text-white shadow-2xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.name.replace('Category ', '')} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* FAQ Accordion List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
            <HelpCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-bold text-slate-700">
              No FAQs matched your search &ldquo;{searchQuery}&rdquo;
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Have a specific question not listed here? Ask Layitek directly.
            </p>
            <button
              onClick={() => onOpenLeadModal(`Question: ${searchQuery}`)}
              className="mt-4 px-4 py-2 text-xs font-bold text-white rounded-lg"
              style={{ backgroundColor: '#1c8512' }}
            >
              Ask Our Compliance Team
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = !!openFaqIds[faq.id];
            return (
              <div
                key={faq.id}
                className="bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/70 transition-colors"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                      {faq.categoryId.replace('-', ' ')}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {faq.question}
                    </h3>
                  </div>
                  <div className="text-slate-400 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 bg-slate-50/40">
                    <p>{faq.answer}</p>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60 text-xs">
                      {faq.camaSection && (
                        <span className="font-semibold text-emerald-900 bg-emerald-100/70 px-2 py-0.5 rounded text-[11px]">
                          Statutory Authority: {faq.camaSection}
                        </span>
                      )}

                      <div className="flex items-center gap-3">
                        <span className="text-[11px] text-slate-400">
                          Verified: {faq.verifiedDate}
                        </span>
                        <button
                          onClick={() => onOpenLeadModal(`Assistance with: ${faq.question}`)}
                          className="text-xs font-bold text-emerald-800 hover:underline flex items-center gap-1"
                        >
                          <span>Get Help with This</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Bottom Assistance Callout */}
      <div className="mt-12 p-6 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-white">
            Have a unique corporate question or complex CAC filing?
          </div>
          <div className="text-xs text-emerald-200 mt-0.5">
            Layitek Limited provides tailored guidance for mergers, foreign participation, and disputed shareholdings.
          </div>
        </div>
        <button
          onClick={() => onOpenLeadModal('General Corporate Advisory')}
          className="px-4 py-2 text-xs font-bold rounded-lg shadow-sm whitespace-nowrap"
          style={{ backgroundColor: '#ffc758', color: '#18540e' }}
        >
          Speak with a Consultant
        </button>
      </div>
    </div>
  );
};
