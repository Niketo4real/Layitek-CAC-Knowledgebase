import React from 'react';
import { GlobalSearch } from './GlobalSearch';
import { Article, FAQItem, GlossaryTerm, FeeItem } from '../types';
import { CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

interface HeroProps {
  articles: Article[];
  faqs: FAQItem[];
  glossary: GlossaryTerm[];
  fees: FeeItem[];
  onSelectArticle: (article: Article) => void;
  onSelectFaq: (faq: FAQItem) => void;
  onSelectGlossary: (term: GlossaryTerm) => void;
  onSelectFee: (fee: FeeItem) => void;
  onOpenChecklists: () => void;
  onOpenDecisionTools: () => void;
  onOpenLeadModal: (service?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  articles,
  faqs,
  glossary,
  fees,
  onSelectArticle,
  onSelectFaq,
  onSelectGlossary,
  onSelectFee,
  onOpenChecklists,
  onOpenDecisionTools,
  onOpenLeadModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-8 pb-14 bg-gradient-to-b from-emerald-50/70 via-slate-50 to-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          {/* Unboxed Metadata Tagline with Clean Separators */}
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <span>Corporate Affairs Commission (CAC) Nigeria</span>
            <span aria-hidden="true">·</span>
            <span>CAMA 2020 Compliance</span>
            <span aria-hidden="true">·</span>
            <span>Layitek Limited</span>
          </div>

          {/* Master Prompt Mandated Headline */}
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            style={{ textWrap: 'balance' }}
          >
            Your Complete Guide to CAC Registration and Compliance
          </h1>

          {/* Master Prompt Mandated Subheading */}
          <p
            className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto"
            style={{ textWrap: 'balance' }}
          >
            Understand business registration, incorporation, and post-incorporation
            requirements in Nigeria with practical guides, verified information,
            and expert assistance from Layitek.
          </p>

          {/* Global Search Interface */}
          <div className="pt-4 pb-2">
            <GlobalSearch
              articles={articles}
              faqs={faqs}
              glossary={glossary}
              fees={fees}
              onSelectArticle={onSelectArticle}
              onSelectFaq={onSelectFaq}
              onSelectGlossary={onSelectGlossary}
              onSelectFee={onSelectFee}
            />
          </div>

          {/* Key Quick Launch Action Chips (Buttons) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 pt-3">
            <button
              onClick={onOpenDecisionTools}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 shadow-2xs transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Which Entity Suits My Business?</span>
            </button>
            <button
              onClick={onOpenChecklists}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-emerald-900 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50 hover:border-emerald-500 shadow-2xs transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Interactive Document Checklists</span>
            </button>
            <button
              onClick={() => onOpenLeadModal('Queried Application Assistance')}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-amber-950 bg-amber-50 border border-amber-300 rounded-lg hover:bg-amber-100 shadow-2xs transition-all cursor-pointer"
            >
              <span>Application Queried? Get Help</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-600" />
            </button>
          </div>
        </div>

        {/* 4-Item Trust & Compliance Strip Below Hero */}
        <div className="mt-12 pt-8 border-t border-slate-200/80 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-left">
          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 tabular-nums">
              100%
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Source-Verified Data
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Grounded in CAMA 2020 & official CAC i-CRP portal guidelines.
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 tabular-nums">
              10 Categories
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Full Spectrum Coverage
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              From business names to complex post-incorporation & NGO filings.
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 tabular-nums">
              100+ Verified FAQs
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Instant Compliance Answers
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Direct answers with statutory citations and common mistake warnings.
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-extrabold text-emerald-800 tabular-nums">
              Layitek Support
            </div>
            <div className="text-xs font-bold text-slate-800 mt-0.5">
              Certified Legal Guidance
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              Seamless professional assistance for complex pre & post incorporation.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
