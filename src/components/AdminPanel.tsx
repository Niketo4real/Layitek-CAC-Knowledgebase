import React, { useState, useEffect } from 'react';
import {
  Article,
  FAQItem,
  FeeItem,
  ArticleFeedback,
  ContentStatus,
  CategoryId,
  EntityType,
  ArticleStep,
} from '../types';
import { CATEGORIES } from '../data/categories';
import {
  Lock,
  Unlock,
  LogOut,
  Save,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Download,
  RotateCcw,
  BookOpen,
  HelpCircle,
  DollarSign,
  MessageSquare,
  Search,
  ExternalLink,
  ArrowLeft,
  Eye,
} from 'lucide-react';

interface AdminPanelProps {
  articles: Article[];
  faqs: FAQItem[];
  fees: FeeItem[];
  feedbackList: ArticleFeedback[];
  onUpdateArticles: (articles: Article[]) => void;
  onUpdateFaqs: (faqs: FAQItem[]) => void;
  onUpdateFees: (fees: FeeItem[]) => void;
  onExit: () => void;
}

const ADMIN_SECRET = 'cac8734.hDR#';

export const AdminPanel: React.FC<AdminPanelProps> = ({
  articles,
  faqs,
  fees,
  feedbackList,
  onUpdateArticles,
  onUpdateFaqs,
  onUpdateFees,
  onExit,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('layitek_admin_session') === 'cac_auth_active';
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState(false);

  // Active Management Section
  const [activeSection, setActiveSection] = useState<
    'articles' | 'new-article' | 'faqs' | 'fees' | 'feedback'
  >('articles');

  // Search & Filters
  const [articleSearch, setArticleSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState('');
  const [feeSearch, setFeeSearch] = useState('');

  // Editing Article State
  const [selectedArticleId, setSelectedArticleId] = useState<string>(
    articles[0]?.id || ''
  );
  const [editingArticle, setEditingArticle] = useState<Article | null>(
    articles[0] || null
  );

  // Editing FAQ State
  const [editingFaq, setEditingFaq] = useState<FAQItem | null>(null);
  const [isCreatingFaq, setIsCreatingFaq] = useState(false);

  // Notification Banner
  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ADMIN_SECRET) {
      setIsAuthenticated(true);
      sessionStorage.setItem('layitek_admin_session', 'cac_auth_active');
      setAuthError(false);
      setPasswordInput('');
    } else {
      setAuthError(true);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('layitek_admin_session');
  };

  // Sync selected article when articles list updates
  useEffect(() => {
    if (articles.length > 0 && (!editingArticle || !articles.find((a) => a.id === editingArticle.id))) {
      setSelectedArticleId(articles[0].id);
      setEditingArticle({ ...articles[0] });
    }
  }, [articles]);

  const handleSelectArticle = (art: Article) => {
    setSelectedArticleId(art.id);
    setEditingArticle({ ...art });
  };

  // Save changes to current article
  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingArticle) return;

    const updatedList = articles.map((a) =>
      a.id === editingArticle.id ? editingArticle : a
    );
    onUpdateArticles(updatedList);
    showNotification('Article updated and published to knowledge base!');
  };

  // Create New Article
  const handleCreateNewArticle = () => {
    const newId = `art-${Date.now()}`;
    const newArticle: Article = {
      id: newId,
      slug: `new-cac-guide-${Date.now()}`,
      title: 'New CAC Compliance Procedure',
      categoryId: 'getting-started',
      entityType: 'all',
      summary: 'Provide an executive summary of the statutory procedure...',
      whoIsThisFor: 'Nigerian business owners and company directors.',
      whenNecessary: 'Mandatory upon corporate change or formation.',
      eligibilityPrerequisites: ['Valid National Identity Number (NIN).'],
      requiredDocuments: ['Copy of Government-issued Identification.'],
      steps: [
        {
          stepNumber: 1,
          title: 'Initiate Filing on i-CRP Portal',
          description: 'Log into icrp.cac.gov.ng and select the appropriate statutory filing.',
          portalAction: 'Select Filing Category',
        },
      ],
      officialFees: {
        statutoryFee: '₦10,000',
        notes: 'Statutory fee payable via Remita.',
      },
      processingTimeline: '48 to 72 hours',
      commonMistakes: ['Mismatched identity particulars with NIMC records.'],
      faqs: [],
      sources: [
        {
          title: 'CAC Official Portal',
          url: 'https://cac.gov.ng/',
          retrievalDate: new Date().toISOString().split('T')[0],
          sourceType: 'official-portal',
        },
      ],
      relatedArticleIds: [],
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      status: 'verified',
      ctaText: 'Need Assistance with this CAC Filing?',
    };

    const updatedList = [newArticle, ...articles];
    onUpdateArticles(updatedList);
    setSelectedArticleId(newId);
    setEditingArticle(newArticle);
    setActiveSection('articles');
    showNotification('New article created! Customize fields below and click save.');
  };

  // Delete Article
  const handleDeleteArticle = (id: string) => {
    if (articles.length <= 1) {
      alert('Cannot delete the last remaining article.');
      return;
    }
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updatedList = articles.filter((a) => a.id !== id);
      onUpdateArticles(updatedList);
      setSelectedArticleId(updatedList[0].id);
      setEditingArticle({ ...updatedList[0] });
      showNotification('Article removed.');
    }
  };

  // Step item management
  const handleAddStep = () => {
    if (!editingArticle) return;
    const newStepNumber = editingArticle.steps.length + 1;
    const newStep: ArticleStep = {
      stepNumber: newStepNumber,
      title: `Step ${newStepNumber}: Action Title`,
      description: 'Describe the filing action...',
    };
    setEditingArticle({
      ...editingArticle,
      steps: [...editingArticle.steps, newStep],
    });
  };

  const handleRemoveStep = (idx: number) => {
    if (!editingArticle) return;
    const updatedSteps = editingArticle.steps
      .filter((_, i) => i !== idx)
      .map((step, i) => ({ ...step, stepNumber: i + 1 }));
    setEditingArticle({
      ...editingArticle,
      steps: updatedSteps,
    });
  };

  // FAQ Management
  const handleSaveFaq = (faq: FAQItem) => {
    if (isCreatingFaq) {
      onUpdateFaqs([faq, ...faqs]);
      setIsCreatingFaq(false);
      showNotification('New FAQ added successfully!');
    } else {
      onUpdateFaqs(faqs.map((f) => (f.id === faq.id ? faq : f)));
      showNotification('FAQ updated successfully!');
    }
    setEditingFaq(null);
  };

  const handleDeleteFaq = (id: string) => {
    if (window.confirm('Are you sure you want to delete this FAQ?')) {
      onUpdateFaqs(faqs.filter((f) => f.id !== id));
      showNotification('FAQ deleted.');
    }
  };

  // Fee Management
  const handleUpdateFee = (index: number, updated: FeeItem) => {
    const updatedFees = [...fees];
    updatedFees[index] = updated;
    onUpdateFees(updatedFees);
    showNotification('Statutory fee schedule updated!');
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      timestamp: new Date().toISOString(),
      articles,
      faqs,
      fees,
    };
    const dataStr =
      'data:text/json;charset=utf-8,' +
      encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute(
      'download',
      `layitek_cac_backup_${new Date().toISOString().split('T')[0]}.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // If Not Authenticated, show Clean Password Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          <div
            className="p-6 text-white text-center space-y-1"
            style={{ backgroundColor: '#18540e' }}
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6 text-amber-300" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">
              Layitek Compliance Admin
            </h2>
            <p className="text-xs text-emerald-200">
              Restricted portal for authorized regulatory compliance personnel
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {authError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Invalid credentials. Access denied.</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                Administrator Password
              </label>
              <input
                type="password"
                required
                autoFocus
                value={passwordInput}
                onChange={(e) => {
                  setPasswordInput(e.target.value);
                  setAuthError(false);
                }}
                placeholder="Enter authorized password"
                className="w-full text-sm p-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 text-sm font-bold text-white rounded-xl shadow-sm hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
              style={{ backgroundColor: '#1c8512' }}
            >
              <Unlock className="w-4 h-4" />
              <span>Verify & Access Console</span>
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={onExit}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Return to Public Website
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Filtered articles list
  const filteredArticles = articles.filter((art) => {
    const matchStatus = statusFilter === 'all' || art.status === statusFilter;
    const matchCat = categoryFilter === 'all' || art.categoryId === categoryFilter;
    const matchSearch =
      !articleSearch ||
      art.title.toLowerCase().includes(articleSearch.toLowerCase()) ||
      art.summary.toLowerCase().includes(articleSearch.toLowerCase());
    return matchStatus && matchCat && matchSearch;
  });

  // Filtered FAQs list
  const filteredFaqs = faqs.filter(
    (f) =>
      !faqSearch ||
      f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col animate-in fade-in duration-150">
      {/* Admin Top Navigation Bar */}
      <header
        className="text-white px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-md shrink-0 sticky top-0 z-30"
        style={{ backgroundColor: '#18540e' }}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={onExit}
            className="flex items-center gap-1.5 text-xs font-bold text-emerald-200 hover:text-white bg-white/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Public Site</span>
          </button>
          <div className="border-l border-emerald-700 pl-4 hidden sm:block">
            <h1 className="text-base font-extrabold tracking-tight">
              Layitek CAC Compliance CMS
            </h1>
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block">
              Editorial & Policy Management
            </span>
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div className="flex items-center gap-1.5 bg-black/20 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveSection('articles')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'articles'
                ? 'bg-white text-emerald-950 font-bold shadow-xs'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            Articles ({articles.length})
          </button>
          <button
            onClick={() => setActiveSection('faqs')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'faqs'
                ? 'bg-white text-emerald-950 font-bold shadow-xs'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            FAQs ({faqs.length})
          </button>
          <button
            onClick={() => setActiveSection('fees')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'fees'
                ? 'bg-white text-emerald-950 font-bold shadow-xs'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            Fees & Timelines ({fees.length})
          </button>
          <button
            onClick={() => setActiveSection('feedback')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeSection === 'feedback'
                ? 'bg-white text-emerald-950 font-bold shadow-xs'
                : 'text-emerald-100 hover:text-white'
            }`}
          >
            User Feedback ({feedbackList.length})
          </button>
        </div>

        {/* Actions & Logout */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportBackup}
            className="hidden md:flex items-center gap-1 text-xs font-semibold bg-emerald-800 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            title="Download JSON Backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1 text-xs font-bold text-amber-200 hover:text-white bg-red-950/40 hover:bg-red-900/60 px-3 py-1.5 rounded-lg transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Floating Save Notification Banner */}
      {notification && (
        <div className="bg-emerald-700 text-white text-xs font-bold py-2 px-4 text-center flex items-center justify-center gap-2 shadow-sm animate-in slide-in-from-top">
          <CheckCircle className="w-4 h-4 text-amber-300" />
          <span>{notification}</span>
        </div>
      )}

      {/* SECTION 1: Articles Manager */}
      {activeSection === 'articles' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar List */}
          <div className="w-80 lg:w-96 bg-white border-r border-slate-200 flex flex-col shrink-0 overflow-hidden">
            {/* Action Bar */}
            <div className="p-3 border-b border-slate-200 space-y-2 bg-slate-50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Knowledge Base Articles
                </span>
                <button
                  onClick={handleCreateNewArticle}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white rounded-lg shadow-2xs hover:brightness-105"
                  style={{ backgroundColor: '#1c8512' }}
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Guide</span>
                </button>
              </div>

              {/* Search Articles */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={articleSearch}
                  onChange={(e) => setArticleSearch(e.target.value)}
                  placeholder="Filter articles..."
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-white rounded-md border border-slate-300 focus:outline-none focus:border-emerald-700"
                />
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1 text-[11px] font-semibold">
                {['all', 'verified', 'in-review', 'needs-verification'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`flex-1 py-1 rounded text-center capitalize transition-colors ${
                      statusFilter === st
                        ? 'bg-emerald-800 text-white font-bold'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    {st === 'all' ? 'All' : st.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-2 space-y-1">
              {filteredArticles.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  No articles matched criteria.
                </div>
              ) : (
                filteredArticles.map((art) => {
                  const isSelected = selectedArticleId === art.id;
                  return (
                    <button
                      key={art.id}
                      onClick={() => handleSelectArticle(art)}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all ${
                        isSelected
                          ? 'bg-emerald-50 border-2 border-emerald-700 font-semibold text-emerald-950 shadow-xs'
                          : 'hover:bg-slate-50 text-slate-800 border border-transparent'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                          {art.categoryId.replace('-', ' ')}
                        </span>
                        <span
                          className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                            art.status === 'verified'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-amber-100 text-amber-900'
                          }`}
                        >
                          {art.status}
                        </span>
                      </div>
                      <div className="font-bold line-clamp-1">{art.title}</div>
                      <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {art.summary}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-1 flex items-center justify-between">
                        <span>Verified: {art.lastVerifiedDate}</span>
                        <span>{art.steps.length} Steps</span>
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Editor Workspace */}
          {editingArticle ? (
            <form
              onSubmit={handleSaveArticle}
              className="flex-1 flex flex-col bg-white overflow-hidden"
            >
              <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Editing Article: <span className="text-emerald-800">{editingArticle.title}</span>
                  </h2>
                  <p className="text-[11px] text-slate-500 font-mono">
                    ID: {editingArticle.id} · Slug: /{editingArticle.slug}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleDeleteArticle(editingArticle.id)}
                    className="flex items-center gap-1 text-xs font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:brightness-105 transition-all"
                    style={{ backgroundColor: '#1c8512' }}
                  >
                    <Save className="w-4 h-4" />
                    <span>Publish Changes</span>
                  </button>
                </div>
              </div>

              {/* Form Scroll Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-4xl">
                {/* Core Particulars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Publication Title
                    </label>
                    <input
                      type="text"
                      required
                      value={editingArticle.title}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, title: e.target.value })
                      }
                      className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Category
                    </label>
                    <select
                      value={editingArticle.categoryId}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          categoryId: e.target.value as CategoryId,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.code}: {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Entity Scope
                    </label>
                    <select
                      value={editingArticle.entityType}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          entityType: e.target.value as EntityType,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                    >
                      <option value="all">All Entities</option>
                      <option value="business-name">Business Name</option>
                      <option value="private-ltd">Private Limited Company (LTD)</option>
                      <option value="public-plc">Public Limited Company (PLC)</option>
                      <option value="incorporated-trustees">Incorporated Trustees</option>
                      <option value="llp">Limited Liability Partnership (LLP)</option>
                      <option value="lp">Limited Partnership (LP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Regulatory Audit Status
                    </label>
                    <select
                      value={editingArticle.status}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          status: e.target.value as ContentStatus,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 bg-slate-50"
                    >
                      <option value="verified">Verified (Official Source Checked)</option>
                      <option value="in-review">In Review (Editorial Pending)</option>
                      <option value="needs-verification">Needs Verification</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Last Verified Date
                    </label>
                    <input
                      type="date"
                      value={editingArticle.lastVerifiedDate}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          lastVerifiedDate: e.target.value,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                {/* Summaries */}
                <div className="space-y-4 pt-2 border-t border-slate-200">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Executive Summary / Short Answer
                    </label>
                    <textarea
                      rows={3}
                      value={editingArticle.summary}
                      onChange={(e) =>
                        setEditingArticle({ ...editingArticle, summary: e.target.value })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-700"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        Who This Guide Is For
                      </label>
                      <input
                        type="text"
                        value={editingArticle.whoIsThisFor}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            whoIsThisFor: e.target.value,
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1">
                        When This Procedure Is Mandatory
                      </label>
                      <input
                        type="text"
                        value={editingArticle.whenNecessary}
                        onChange={(e) =>
                          setEditingArticle({
                            ...editingArticle,
                            whenNecessary: e.target.value,
                          })
                        }
                        className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                      />
                    </div>
                  </div>
                </div>

                {/* Step-by-Step Editor */}
                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                        Step-by-Step Filing Procedure ({editingArticle.steps.length} Steps)
                      </h3>
                      <p className="text-[11px] text-slate-500">
                        Numbered procedural actions displayed on the portal.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleAddStep}
                      className="flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-md"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Step</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editingArticle.steps.map((st, sIdx) => (
                      <div
                        key={sIdx}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-emerald-900 bg-emerald-100 px-2 py-0.5 rounded">
                            Step {st.stepNumber}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveStep(sIdx)}
                            className="text-red-500 hover:text-red-700 text-[11px] font-semibold"
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          type="text"
                          value={st.title}
                          placeholder="Action Title"
                          onChange={(e) => {
                            const updatedSteps = [...editingArticle.steps];
                            updatedSteps[sIdx].title = e.target.value;
                            setEditingArticle({ ...editingArticle, steps: updatedSteps });
                          }}
                          className="w-full font-bold p-1.5 bg-white border border-slate-300 rounded"
                        />
                        <textarea
                          rows={2}
                          value={st.description}
                          placeholder="Detailed description of the action..."
                          onChange={(e) => {
                            const updatedSteps = [...editingArticle.steps];
                            updatedSteps[sIdx].description = e.target.value;
                            setEditingArticle({ ...editingArticle, steps: updatedSteps });
                          }}
                          className="w-full p-1.5 bg-white border border-slate-300 rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Fees and SLA */}
                <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Official Statutory Fee
                    </label>
                    <input
                      type="text"
                      value={editingArticle.officialFees.statutoryFee}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          officialFees: {
                            ...editingArticle.officialFees,
                            statutoryFee: e.target.value,
                          },
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">
                      Published Processing Timeline (SLA)
                    </label>
                    <input
                      type="text"
                      value={editingArticle.processingTimeline}
                      onChange={(e) =>
                        setEditingArticle({
                          ...editingArticle,
                          processingTimeline: e.target.value,
                        })
                      }
                      className="w-full text-xs p-2.5 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>
              </div>
            </form>
          ) : (
            <div className="flex-1 flex items-center justify-center text-slate-400 text-sm">
              Select an article to edit or click &ldquo;New Guide&rdquo; above.
            </div>
          )}
        </div>
      )}

      {/* SECTION 2: FAQs Manager */}
      {activeSection === 'faqs' && (
        <div className="flex-1 p-6 overflow-y-auto max-w-6xl mx-auto w-full space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Frequently Asked Questions Manager ({faqs.length} Total)
              </h2>
              <p className="text-xs text-slate-500">
                Update statutory citations and answers to reflect current CAC policies.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                placeholder="Search FAQs..."
                className="text-xs p-2 rounded-lg border border-slate-300 bg-white w-64"
              />
              <button
                onClick={() => {
                  setEditingFaq({
                    id: `faq-${Date.now()}`,
                    question: '',
                    answer: '',
                    categoryId: 'getting-started',
                    entityType: 'all',
                    camaSection: 'CAMA 2020',
                    verifiedDate: new Date().toISOString().split('T')[0],
                  });
                  setIsCreatingFaq(true);
                }}
                className="px-3 py-2 text-xs font-bold text-white rounded-lg flex items-center gap-1 shrink-0"
                style={{ backgroundColor: '#1c8512' }}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add FAQ</span>
              </button>
            </div>
          </div>

          {/* FAQ Editor Form when Active */}
          {editingFaq && (
            <div className="p-5 bg-white rounded-2xl border-2 border-emerald-700 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {isCreatingFaq ? 'Create New FAQ' : 'Edit FAQ'}
                </span>
                <button
                  onClick={() => setEditingFaq(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Cancel
                </button>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Question
                </label>
                <input
                  type="text"
                  value={editingFaq.question}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, question: e.target.value })
                  }
                  className="w-full text-sm p-2 rounded border border-slate-300"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Verified Answer
                </label>
                <textarea
                  rows={3}
                  value={editingFaq.answer}
                  onChange={(e) =>
                    setEditingFaq({ ...editingFaq, answer: e.target.value })
                  }
                  className="w-full text-xs p-2 rounded border border-slate-300"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    CAMA / Regulatory Section
                  </label>
                  <input
                    type="text"
                    value={editingFaq.camaSection || ''}
                    onChange={(e) =>
                      setEditingFaq({ ...editingFaq, camaSection: e.target.value })
                    }
                    className="w-full text-xs p-2 rounded border border-slate-300"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={editingFaq.categoryId}
                    onChange={(e) =>
                      setEditingFaq({
                        ...editingFaq,
                        categoryId: e.target.value as CategoryId,
                      })
                    }
                    className="w-full text-xs p-2 rounded border border-slate-300 bg-slate-50"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingFaq(null)}
                  className="px-3 py-1.5 text-xs text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveFaq(editingFaq)}
                  className="px-4 py-1.5 text-xs font-bold text-white rounded bg-emerald-800 hover:bg-emerald-900"
                >
                  Save FAQ
                </button>
              </div>
            </div>
          )}

          {/* FAQs List Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="divide-y divide-slate-100">
              {filteredFaqs.map((faq) => (
                <div
                  key={faq.id}
                  className="p-4 hover:bg-slate-50 flex items-start justify-between gap-4 text-xs"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block">
                      {faq.categoryId} · {faq.camaSection}
                    </span>
                    <div className="text-sm font-bold text-slate-900">
                      {faq.question}
                    </div>
                    <p className="text-slate-600 line-clamp-2">{faq.answer}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => {
                        setEditingFaq(faq);
                        setIsCreatingFaq(false);
                      }}
                      className="p-1.5 rounded text-slate-500 hover:text-emerald-700 hover:bg-slate-100"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteFaq(faq.id)}
                      className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: Fees & Timelines Manager */}
      {activeSection === 'fees' && (
        <div className="flex-1 p-6 overflow-y-auto max-w-6xl mx-auto w-full space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Statutory Fees & Service Timelines Editor
            </h2>
            <p className="text-xs text-slate-500">
              Directly edit statutory fee figures and processing SLAs to match official gazetted notices.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold">
                <tr>
                  <th className="py-3 px-4">Service Name</th>
                  <th className="py-3 px-4">Statutory Fee</th>
                  <th className="py-3 px-4">Stamp Duty</th>
                  <th className="py-3 px-4">SLA Timeline</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {fees.map((fee, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="py-3 px-4 font-bold text-slate-900 max-w-xs">
                      <input
                        type="text"
                        value={fee.serviceName}
                        onChange={(e) =>
                          handleUpdateFee(idx, { ...fee, serviceName: e.target.value })
                        }
                        className="w-full p-1 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-emerald-700 focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        {fee.camaReference}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={fee.statutoryFeeNgn}
                        onChange={(e) =>
                          handleUpdateFee(idx, {
                            ...fee,
                            statutoryFeeNgn: e.target.value,
                          })
                        }
                        className="font-bold text-emerald-800 p-1 border-b border-transparent hover:border-slate-300 focus:border-emerald-700 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={fee.stampDutyNgn || ''}
                        onChange={(e) =>
                          handleUpdateFee(idx, {
                            ...fee,
                            stampDutyNgn: e.target.value,
                          })
                        }
                        placeholder="N/A"
                        className="p-1 border-b border-transparent hover:border-slate-300 focus:border-emerald-700 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        value={fee.serviceTimeline}
                        onChange={(e) =>
                          handleUpdateFee(idx, {
                            ...fee,
                            serviceTimeline: e.target.value,
                          })
                        }
                        className="p-1 border-b border-transparent hover:border-slate-300 focus:border-emerald-700 focus:outline-none"
                      />
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="text-[11px] text-emerald-700 font-semibold">
                        Auto-Saved
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 4: User Feedback */}
      {activeSection === 'feedback' && (
        <div className="flex-1 p-6 overflow-y-auto max-w-5xl mx-auto w-full space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Article Feedback & Content Improvement Submissions
            </h2>
            <p className="text-xs text-slate-500">
              Review reader evaluations (&ldquo;Was this helpful?&rdquo;) and questions to identify content gaps.
            </p>
          </div>

          {feedbackList.length === 0 ? (
            <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
              <MessageSquare className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-700">No reader feedback logged yet</p>
              <p className="text-xs text-slate-400 mt-1">
                When readers rate articles or leave feedback questions, they will display here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {feedbackList.map((fb, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{fb.articleTitle}</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded text-[10px] uppercase ${
                        fb.isHelpful
                          ? 'bg-emerald-100 text-emerald-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {fb.isHelpful ? 'Helpful' : 'Needs Work'}
                    </span>
                  </div>
                  {fb.comment && (
                    <p className="text-slate-700 italic bg-slate-50 p-2 rounded">
                      &ldquo;{fb.comment}&rdquo;
                    </p>
                  )}
                  <div className="text-[10px] text-slate-400">
                    Logged: {new Date(fb.timestamp).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
