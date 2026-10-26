import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, HelpCircle, FileCheck, DollarSign } from 'lucide-react';
import { Article, FAQItem, GlossaryTerm, FeeItem, CategoryId, EntityType } from '../types';
import { CATEGORIES } from '../data/categories';

interface GlobalSearchProps {
  articles: Article[];
  faqs: FAQItem[];
  glossary: GlossaryTerm[];
  fees: FeeItem[];
  onSelectArticle: (article: Article) => void;
  onSelectFaq: (faq: FAQItem) => void;
  onSelectGlossary: (term: GlossaryTerm) => void;
  onSelectFee: (fee: FeeItem) => void;
  onLogSearchQuery?: (query: string, resultsCount: number) => void;
  initialQuery?: string;
  className?: string;
}

export const GlobalSearch: React.FC<GlobalSearchProps> = ({
  articles,
  faqs,
  glossary,
  fees,
  onSelectArticle,
  onSelectFaq,
  onSelectGlossary,
  onSelectFee,
  onLogSearchQuery,
  initialQuery = '',
  className = '',
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedEntity, setSelectedEntity] = useState<EntityType>('all');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Popular and suggested quick search queries
  const popularSearches = [
    'Register a business name',
    'Private company LTD',
    'Change of directors',
    'File annual returns',
    'Persons with Significant Control',
    'Resolve queried application',
    'Certified True Copy CTC',
    'Share transfer',
  ];

  // Perform search matching with synonym expansion
  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return { articles: [], faqs: [], glossary: [], fees: [], total: 0 };
    }

    // Synonym dictionary
    const terms = [q];
    if (q.includes('remove director') || q.includes('change director')) {
      terms.push('director', 'cama 2020 sec 288', 'ordinary resolution');
    }
    if (q.includes('address') || q.includes('relocation')) {
      terms.push('registered office', 'sec 28');
    }
    if (q.includes('annual returns') || q.includes('overdue')) {
      terms.push('penalties', 'compliance', 'inactive', 'sec 417');
    }
    if (q.includes('memart') || q.includes('memorandum')) {
      terms.push('articles of association', 'special resolution', 'sec 51');
    }
    if (q.includes('ngo') || q.includes('church') || q.includes('charity')) {
      terms.push('incorporated trustees', 'part f');
    }

    const matchesQuery = (text: string) => {
      const lower = text.toLowerCase();
      return terms.some((t) => lower.includes(t));
    };

    // Filter articles
    const matchedArticles = articles.filter((art) => {
      const catMatch = selectedCategory === 'all' || art.categoryId === selectedCategory;
      const entMatch = selectedEntity === 'all' || art.entityType === selectedEntity || art.entityType === 'all';
      if (!catMatch || !entMatch) return false;

      return (
        matchesQuery(art.title) ||
        matchesQuery(art.summary) ||
        matchesQuery(art.whoIsThisFor) ||
        art.requiredDocuments.some((d) => matchesQuery(d)) ||
        art.steps.some((s) => matchesQuery(s.title) || matchesQuery(s.description))
      );
    });

    // Filter FAQs
    const matchedFaqs = faqs.filter((faq) => {
      const catMatch = selectedCategory === 'all' || faq.categoryId === selectedCategory;
      const entMatch = selectedEntity === 'all' || faq.entityType === selectedEntity || faq.entityType === 'all';
      if (!catMatch || !entMatch) return false;

      return matchesQuery(faq.question) || matchesQuery(faq.answer);
    });

    // Filter Glossary
    const matchedGlossary = glossary.filter((g) => {
      return matchesQuery(g.term) || matchesQuery(g.definition) || matchesQuery(g.example);
    });

    // Filter Fees
    const matchedFees = fees.filter((f) => {
      return matchesQuery(f.serviceName) || matchesQuery(f.entityType) || matchesQuery(f.notes);
    });

    const total = matchedArticles.length + matchedFaqs.length + matchedGlossary.length + matchedFees.length;
    return {
      articles: matchedArticles.slice(0, 5),
      faqs: matchedFaqs.slice(0, 5),
      glossary: matchedGlossary.slice(0, 4),
      fees: matchedFees.slice(0, 3),
      total,
    };
  }, [query, selectedCategory, selectedEntity, articles, faqs, glossary, fees]);

  // Log queries when user types
  const handleQueryChange = (val: string) => {
    setQuery(val);
    setIsOpen(true);
  };

  const handleClear = () => {
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectQuickQuery = (term: string) => {
    setQuery(term);
    setIsOpen(true);
    if (onLogSearchQuery) {
      onLogSearchQuery(term, 1);
    }
  };

  return (
    <div ref={containerRef} className={`relative w-full max-w-4xl mx-auto ${className}`}>
      {/* Search Input Box */}
      <div className="relative flex items-center bg-white rounded-xl shadow-md border-2 border-emerald-700/80 focus-within:border-emerald-700 focus-within:ring-4 focus-within:ring-emerald-700/15 transition-all">
        <div className="pl-4 pr-2 text-emerald-800 shrink-0">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search CAC guides, procedures, statutory fees, or CAMA questions (e.g. 'remove director', 'annual returns')..."
          className="w-full py-3.5 px-2 text-sm sm:text-base text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
        />
        {query && (
          <button
            onClick={handleClear}
            className="p-2 mr-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            title="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Filter Tabs Under Search */}
      <div className="flex flex-wrap items-center gap-1.5 mt-2.5 px-1">
        <span className="text-xs font-semibold text-slate-500 mr-1">Filter Entity:</span>
        <div className="flex items-center gap-1 p-0.5 bg-slate-200/70 rounded-lg">
          {(
            [
              ['all', 'All Entities'],
              ['business-name', 'Business Name'],
              ['private-ltd', 'Company (LTD)'],
              ['incorporated-trustees', 'NGO / Trustees'],
            ] as const
          ).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSelectedEntity(val as EntityType)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md whitespace-nowrap transition-colors ${
                selectedEntity === val
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Live Dropdown Results Modal / Popover */}
      {isOpen && query.trim().length > 0 && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 max-h-[75vh] overflow-y-auto divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
          {searchResults.total === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm font-semibold text-slate-700">
                No verified articles or FAQs matching &ldquo;{query}&rdquo;
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Try searching by broader terms such as &ldquo;incorporation&rdquo;, &ldquo;name reservation&rdquo;, or &ldquo;status report&rdquo;.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {popularSearches.slice(0, 4).map((p) => (
                  <button
                    key={p}
                    onClick={() => handleSelectQuickQuery(p)}
                    className="text-xs font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-md transition-colors"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 space-y-5">
              {/* Articles Section */}
              {searchResults.articles.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-700" />
                    <span>In-Depth Procedural Guides ({searchResults.articles.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.articles.map((art) => (
                      <button
                        key={art.id}
                        onClick={() => {
                          onSelectArticle(art);
                          setIsOpen(false);
                        }}
                        className="w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200 group"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {art.title}
                          </h4>
                          <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-700 shrink-0" />
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {art.summary}
                        </p>
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 mt-1.5">
                          <span>Verified {art.lastVerifiedDate}</span>
                          <span aria-hidden="true">·</span>
                          <span className="capitalize">{art.categoryId.replace('-', ' ')}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-emerald-700 font-medium">SLA: {art.processingTimeline}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQs Section */}
              {searchResults.faqs.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Verified FAQs ({searchResults.faqs.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {searchResults.faqs.map((faq) => (
                      <button
                        key={faq.id}
                        onClick={() => {
                          onSelectFaq(faq);
                          setIsOpen(false);
                        }}
                        className="w-full text-left p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200"
                      >
                        <h5 className="text-xs sm:text-sm font-semibold text-slate-800">
                          {faq.question}
                        </h5>
                        <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
                          {faq.answer}
                        </p>
                        {faq.camaSection && (
                          <span className="text-[10px] text-emerald-700 font-medium block mt-1">
                            {faq.camaSection}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Glossary Section */}
              {searchResults.glossary.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-700" />
                    <span>CAMA 2020 Legal Definitions ({searchResults.glossary.length})</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {searchResults.glossary.map((g) => (
                      <button
                        key={g.term}
                        onClick={() => {
                          onSelectGlossary(g);
                          setIsOpen(false);
                        }}
                        className="text-left p-2.5 bg-slate-50/80 rounded-lg hover:bg-emerald-50/70 border border-slate-200/70 transition-colors"
                      >
                        <span className="text-xs font-bold text-slate-900 block">{g.term}</span>
                        <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                          {g.definition}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Fees Section */}
              {searchResults.fees.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Statutory Fees ({searchResults.fees.length})</span>
                  </div>
                  <div className="space-y-1">
                    {searchResults.fees.map((fee) => (
                      <div
                        key={fee.serviceName}
                        onClick={() => {
                          onSelectFee(fee);
                          setIsOpen(false);
                        }}
                        className="flex items-center justify-between p-2 rounded hover:bg-slate-50 text-xs cursor-pointer"
                      >
                        <div>
                          <span className="font-semibold text-slate-800">{fee.serviceName}</span>
                          <span className="text-slate-400 block text-[11px]">{fee.camaReference}</span>
                        </div>
                        <div className="text-right shrink-0 ml-3">
                          <span className="font-bold text-emerald-800">{fee.statutoryFeeNgn}</span>
                          <span className="text-[10px] text-slate-600 block">{fee.serviceTimeline}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
