import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ArticleView } from './components/ArticleView';
import { InteractiveChecklists } from './components/InteractiveChecklists';
import { DecisionTools } from './components/DecisionTools';
import { FAQCenter } from './components/FAQCenter';
import { GlossaryView } from './components/GlossaryView';
import { FeeTimelinesView } from './components/FeeTimelinesView';
import { SourceInventoryView } from './components/SourceInventoryView';
import { LeadModal } from './components/LeadModal';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

import { ARTICLES_DATA } from './data/articles';
import { FAQS_DATA } from './data/faqs';
import { GLOSSARY_TERMS } from './data/glossary';
import { OFFICIAL_FEE_SCHEDULE } from './data/feeSchedule';
import { CATEGORIES } from './data/categories';
import { Article, FAQItem, GlossaryTerm, FeeItem, CategoryId, ArticleFeedback, BrandLogoConfig } from './types';

import {
  Compass,
  Store,
  Building2,
  Users,
  FileEdit,
  CalendarCheck,
  Receipt,
  AlertCircle,
  BookOpen,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

const defaultLogoConfig: BrandLogoConfig = {
  headerLogoUrl: '',
  footerLogoUrl: '',
  headerHeight: 46,
  footerHeight: 50,
  showTagline: false,
};

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [leadModalService, setLeadModalService] = useState<string>('General Filing Assistance');

  // Logo & Branding configuration with localStorage persistence
  const [logoConfig, setLogoConfig] = useState<BrandLogoConfig>(() => {
    try {
      const saved = localStorage.getItem('layitek_brand_logo_config');
      return saved ? JSON.parse(saved) : defaultLogoConfig;
    } catch {
      return defaultLogoConfig;
    }
  });

  const handleUpdateLogoConfig = (updated: BrandLogoConfig) => {
    setLogoConfig(updated);
    try {
      localStorage.setItem('layitek_brand_logo_config', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save logo config to localStorage', e);
    }
  };

  // Articles state with localStorage persistence
  const [articles, setArticles] = useState<Article[]>(() => {
    try {
      const saved = localStorage.getItem('layitek_cac_articles');
      return saved ? JSON.parse(saved) : ARTICLES_DATA;
    } catch {
      return ARTICLES_DATA;
    }
  });

  // FAQs state with localStorage persistence
  const [faqs, setFaqs] = useState<FAQItem[]>(() => {
    try {
      const saved = localStorage.getItem('layitek_cac_faqs');
      return saved ? JSON.parse(saved) : FAQS_DATA;
    } catch {
      return FAQS_DATA;
    }
  });

  // Fees state with localStorage persistence
  const [fees, setFees] = useState<FeeItem[]>(() => {
    try {
      const saved = localStorage.getItem('layitek_cac_fees');
      return saved ? JSON.parse(saved) : OFFICIAL_FEE_SCHEDULE;
    } catch {
      return OFFICIAL_FEE_SCHEDULE;
    }
  });

  // Feedback list for editorial review
  const [feedbackList, setFeedbackList] = useState<ArticleFeedback[]>(() => {
    try {
      const saved = localStorage.getItem('layitek_cac_feedback');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const handleUpdateArticles = (updated: Article[]) => {
    setArticles(updated);
    try {
      localStorage.setItem('layitek_cac_articles', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save articles to localStorage', e);
    }
    if (selectedArticle) {
      const matched = updated.find((a) => a.id === selectedArticle.id);
      if (matched) setSelectedArticle(matched);
    }
  };

  const handleUpdateFaqs = (updated: FAQItem[]) => {
    setFaqs(updated);
    try {
      localStorage.setItem('layitek_cac_faqs', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save faqs to localStorage', e);
    }
  };

  const handleUpdateFees = (updated: FeeItem[]) => {
    setFees(updated);
    try {
      localStorage.setItem('layitek_cac_fees', JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to save fees to localStorage', e);
    }
  };

  // Category Icon Map
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-700" />;
      case 'Store':
        return <Store className="w-5 h-5 text-emerald-700" />;
      case 'Building2':
        return <Building2 className="w-5 h-5 text-emerald-700" />;
      case 'Users':
        return <Users className="w-5 h-5 text-emerald-700" />;
      case 'FileEdit':
        return <FileEdit className="w-5 h-5 text-emerald-700" />;
      case 'CalendarCheck':
        return <CalendarCheck className="w-5 h-5 text-emerald-700" />;
      case 'Receipt':
        return <Receipt className="w-5 h-5 text-emerald-700" />;
      case 'AlertCircle':
        return <AlertCircle className="w-5 h-5 text-amber-600" />;
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-emerald-700" />;
      case 'HelpCircle':
        return <HelpCircle className="w-5 h-5 text-emerald-700" />;
      default:
        return <FileEdit className="w-5 h-5 text-emerald-700" />;
    }
  };

  const handleOpenLead = (serviceName?: string) => {
    if (serviceName) {
      setLeadModalService(serviceName);
    }
    setLeadModalOpen(true);
  };

  const handleSelectArticle = (art: Article) => {
    setSelectedArticle(art);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFaq = (faq: FAQItem) => {
    setCurrentTab('faqs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGlossary = (term: GlossaryTerm) => {
    setCurrentTab('glossary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectFee = (fee: FeeItem) => {
    setCurrentTab('fees');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitFeedback = (feedback: ArticleFeedback) => {
    setFeedbackList((prev) => {
      const updated = [feedback, ...prev];
      try {
        localStorage.setItem('layitek_cac_feedback', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to save feedback to localStorage', e);
      }
      return updated;
    });
  };

  // Filtered articles on Home view
  const displayArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((a) => a.categoryId === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      {/* If currentTab === 'admin', show the full Admin Panel */}
      {currentTab === 'admin' ? (
        <AdminPanel
          articles={articles}
          faqs={faqs}
          fees={fees}
          feedbackList={feedbackList}
          logoConfig={logoConfig}
          onUpdateArticles={handleUpdateArticles}
          onUpdateFaqs={handleUpdateFaqs}
          onUpdateFees={handleUpdateFees}
          onUpdateLogoConfig={handleUpdateLogoConfig}
          onExit={() => {
            setCurrentTab('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />
      ) : (
        <>
          {/* Universal Top Navigation Header */}
          <Header
            currentTab={currentTab}
            logoConfig={logoConfig}
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLeadModal={handleOpenLead}
            onOpenAdmin={() => {
              setCurrentTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          {/* Main Content Area */}
          <main className="flex-1">
            {selectedArticle ? (
              <ArticleView
                article={selectedArticle}
                allArticles={articles}
                onBack={() => setSelectedArticle(null)}
                onSelectArticle={handleSelectArticle}
                onOpenLeadModal={handleOpenLead}
                onSubmitFeedback={handleSubmitFeedback}
              />
            ) : (
              <>
                {currentTab === 'home' && (
                  <>
                    {/* Hero with Search and Trust strip */}
                    <Hero
                      articles={articles}
                      faqs={faqs}
                      glossary={GLOSSARY_TERMS}
                      fees={fees}
                      onSelectArticle={handleSelectArticle}
                      onSelectFaq={handleSelectFaq}
                      onSelectGlossary={handleSelectGlossary}
                      onSelectFee={handleSelectFee}
                      onOpenChecklists={() => setCurrentTab('checklists')}
                      onOpenDecisionTools={() => setCurrentTab('decision-tools')}
                      onOpenLeadModal={handleOpenLead}
                    />

                    {/* Section: 10 Knowledge-Base Categories Grid */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                        <div>
                          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
                            Comprehensive Architecture
                          </div>
                          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                            Browse by Category
                          </h2>
                          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                            Explore authoritative procedural guides, CAMA requirements, and official portal workflows.
                          </p>
                        </div>

                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                              selectedCategory === 'all'
                                ? 'bg-emerald-800 text-white shadow-2xs'
                                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                            }`}
                          >
                            All Categories
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                        {CATEGORIES.map((cat) => {
                          const isSelected = selectedCategory === cat.id;
                          return (
                            <div
                              key={cat.id}
                              onClick={() => {
                                if (cat.id === 'faqs') {
                                  setCurrentTab('faqs');
                                } else if (cat.id === 'glossary') {
                                  setCurrentTab('glossary');
                                } else if (cat.id === 'fees-and-forms') {
                                  setCurrentTab('fees');
                                } else {
                                  setSelectedCategory(cat.id);
                                }
                              }}
                              className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                                isSelected
                                  ? 'bg-emerald-50/70 border-emerald-500 shadow-sm'
                                  : 'bg-white border-slate-200 hover:border-emerald-600 hover:shadow-xs'
                              }`}
                            >
                              <div>
                                <div className="flex items-center justify-between mb-3">
                                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-emerald-100/70 transition-colors">
                                    {getCategoryIcon(cat.iconName)}
                                  </div>
                                  <span className="text-[11px] font-semibold text-slate-600">
                                    {cat.countLabel}
                                  </span>
                                </div>

                                <div className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800">
                                  {cat.code}
                                </div>
                                <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors mt-0.5">
                                  {cat.name}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                                  {cat.shortDescription}
                                </p>
                              </div>

                              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-800 group-hover:text-emerald-950">
                                <span>Explore Guides</span>
                                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </section>

                    {/* Section: In-Depth Articles & Guides List */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                            {selectedCategory === 'all'
                              ? 'Featured Regulatory Articles & Procedures'
                              : `Articles in ${CATEGORIES.find((c) => c.id === selectedCategory)?.name}`}
                          </h2>
                          <p className="text-xs text-slate-500 mt-0.5">
                            Structured step-by-step instructions, required document checklists, and verified fees.
                          </p>
                        </div>

                        {selectedCategory !== 'all' && (
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="text-xs font-bold text-emerald-800 hover:underline"
                          >
                            Show All Categories
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {displayArticles.map((article) => (
                          <div
                            key={article.id}
                            onClick={() => handleSelectArticle(article)}
                            className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-emerald-600 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between group"
                          >
                            <div>
                              {/* Unboxed Metadata Header */}
                              <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                                <span>{article.categoryId.replace('-', ' ')}</span>
                                <span aria-hidden="true">·</span>
                                <span>Entity: {article.entityType.replace('-', ' ')}</span>
                                <span aria-hidden="true">·</span>
                                <span className="text-emerald-700 font-bold">
                                  Verified {article.lastVerifiedDate}
                                </span>
                              </div>

                              <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-800 transition-colors leading-snug">
                                {article.title}
                              </h3>

                              <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                                {article.summary}
                              </p>
                            </div>

                            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                              <div className="flex items-center gap-1.5 text-slate-500">
                                <Clock className="w-3.5 h-3.5 text-slate-400" />
                                <span>SLA: {article.processingTimeline}</span>
                              </div>
                              <span className="font-bold text-emerald-800 group-hover:underline flex items-center gap-1">
                                <span>View Full Guide</span>
                                <ArrowRight className="w-3 h-3" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>

                    {/* Section: Diagnostic Banner CTA */}
                    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                      <div className="p-8 bg-gradient-to-br from-emerald-900 to-emerald-950 rounded-2xl text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="space-y-2 max-w-2xl">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Interactive Decision Tools</span>
                          </div>
                          <h3 className="text-2xl font-extrabold text-white tracking-tight">
                            Unsure which corporate structure or filing you need?
                          </h3>
                          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed">
                            Use our guided entity selector tool to find the right registration type, calculate
                            exact government fees, or diagnose application queries on i-CRP.
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                          <button
                            onClick={() => setCurrentTab('decision-tools')}
                            className="px-5 py-3 text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:brightness-105 transition-all text-center whitespace-nowrap cursor-pointer"
                            style={{ backgroundColor: '#ffc758', color: '#18540e' }}
                          >
                            Launch Decision Tool
                          </button>
                          <button
                            onClick={() => handleOpenLead('General Consultation')}
                            className="px-4 py-3 text-xs sm:text-sm font-bold rounded-lg bg-emerald-800 hover:bg-emerald-700 text-white border border-emerald-600 transition-colors text-center whitespace-nowrap cursor-pointer"
                          >
                            Talk to a Specialist
                          </button>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {currentTab === 'checklists' && (
                  <InteractiveChecklists onOpenLeadModal={handleOpenLead} />
                )}

                {currentTab === 'decision-tools' && (
                  <DecisionTools
                    onOpenLeadModal={handleOpenLead}
                    onSelectArticleSlug={(slug) => {
                      const found = articles.find((a) => a.slug === slug);
                      if (found) setSelectedArticle(found);
                    }}
                  />
                )}

                {currentTab === 'fees' && (
                  <FeeTimelinesView onOpenLeadModal={handleOpenLead} />
                )}

                {currentTab === 'glossary' && (
                  <GlossaryView onOpenLeadModal={handleOpenLead} />
                )}

                {currentTab === 'faqs' && (
                  <FAQCenter
                    onSelectArticleBySlug={(slug) => {
                      const found = articles.find((a) => a.slug === slug);
                      if (found) setSelectedArticle(found);
                    }}
                    onOpenLeadModal={handleOpenLead}
                  />
                )}

                {currentTab === 'source-inventory' && <SourceInventoryView />}
              </>
            )}
          </main>

          {/* Compliance Quiet Footer */}
          <Footer
            onSelectTab={(tab) => {
              setCurrentTab(tab);
              setSelectedArticle(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenLeadModal={handleOpenLead}
            onOpenAdmin={() => {
              setCurrentTab('admin');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            logoConfig={logoConfig}
          />

          {/* Service Request & Conversion Modal */}
          <LeadModal
            isOpen={leadModalOpen}
            onClose={() => setLeadModalOpen(false)}
            defaultService={leadModalService}
          />
        </>
      )}
    </div>
  );
}
