import React, { useState } from 'react';
import { Article, ArticleFeedback } from '../types';
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  ShieldAlert,
  ThumbsUp,
  ThumbsDown,
  HelpCircle,
  FileText,
  AlertTriangle,
  Calendar,
  Share2,
  Printer,
  MessageCircle,
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  allArticles: Article[];
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onOpenLeadModal: (service?: string) => void;
  onSubmitFeedback: (feedback: ArticleFeedback) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onSelectArticle,
  onOpenLeadModal,
  onSubmitFeedback,
}) => {
  const [feedbackGiven, setFeedbackGiven] = useState<'yes' | 'no' | null>(null);
  const [feedbackComment, setFeedbackComment] = useState('');
  const [commentSubmitted, setCommentSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'procedure' | 'documents' | 'faqs'>('procedure');

  const relatedArticles = allArticles.filter((a) =>
    article.relatedArticleIds.includes(a.id)
  );

  const handleFeedback = (isHelpful: boolean) => {
    setFeedbackGiven(isHelpful ? 'yes' : 'no');
    onSubmitFeedback({
      articleId: article.id,
      articleTitle: article.title,
      isHelpful,
      timestamp: new Date().toISOString(),
    });
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackComment.trim()) return;
    onSubmitFeedback({
      articleId: article.id,
      articleTitle: article.title,
      isHelpful: feedbackGiven === 'yes',
      comment: feedbackComment,
      timestamp: new Date().toISOString(),
    });
    setCommentSubmitted(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between gap-4 mb-6 text-xs text-slate-500 pb-3 border-b border-slate-200">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 font-bold text-emerald-800 hover:text-emerald-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Guides</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
            title="Print or Save as PDF"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Guide</span>
          </button>
          <div className="flex items-center gap-1.5 text-slate-500">
            <Calendar className="w-3.5 h-3.5" />
            <span>Verified {article.lastVerifiedDate}</span>
          </div>
        </div>
      </div>

      {/* Section 1: Title & Unboxed Metadata */}
      <header className="space-y-3 mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase tracking-wide">
          <span>{article.categoryId.replace('-', ' ')}</span>
          <span aria-hidden="true">·</span>
          <span>Entity: {article.entityType.replace('-', ' ')}</span>
          <span aria-hidden="true">·</span>
          <span className="text-emerald-700 font-bold">Status: {article.status.toUpperCase()}</span>
        </div>

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
          {article.title}
        </h1>

        {/* Section 2: Short Answer / Summary */}
        <div className="p-4 sm:p-5 bg-emerald-50/70 border border-emerald-200/90 rounded-xl text-emerald-950 font-normal leading-relaxed text-sm sm:text-base">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Summary & Regulatory Snapshot
          </div>
          {article.summary}
        </div>
      </header>

      {/* Grid: Who this is for & When Necessary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            Who This Guide Is For
          </div>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            {article.whoIsThisFor}
          </p>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
            When This Procedure Is Mandatory
          </div>
          <p className="text-sm text-slate-700 font-medium leading-relaxed">
            {article.whenNecessary}
          </p>
        </div>
      </div>

      {/* Section 5: Eligibility & Prerequisites */}
      <section className="mb-8 p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-emerald-700" />
          <span>Eligibility & Prerequisite Checks</span>
        </h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {article.eligibilityPrerequisites.map((p, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 mt-2 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 6: Required Documents Checklist */}
      <section className="mb-8 p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-emerald-700" />
          <span>Required Documents & Verification Checklist</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {article.requiredDocuments.map((doc, idx) => (
            <div
              key={idx}
              className="p-3 bg-slate-50 rounded-lg border border-slate-200/80 text-xs sm:text-sm font-semibold text-slate-800 flex items-start gap-2"
            >
              <span className="text-emerald-700 font-bold shrink-0">✓</span>
              <span>{doc}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Step-by-Step Procedure */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900">
            Official Step-by-Step Filing Procedure
          </h2>
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <Clock className="w-3.5 h-3.5 text-emerald-700" />
            <span>SLA: {article.processingTimeline}</span>
          </div>
        </div>

        <div className="space-y-4">
          {article.steps.map((st) => (
            <div
              key={st.stepNumber}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-2"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-900 text-xs font-extrabold flex items-center justify-center shrink-0">
                  {st.stepNumber}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {st.title}
                </h3>
              </div>
              <p className="text-sm text-slate-600 pl-10 leading-relaxed">
                {st.description}
              </p>
              {st.portalAction && (
                <div className="pl-10 text-xs text-emerald-800 font-semibold flex items-center gap-1.5">
                  <span className="text-slate-400">i-CRP Portal Action:</span>
                  <span>{st.portalAction}</span>
                </div>
              )}
              {st.tips && (
                <div className="pl-10 text-xs text-amber-900 bg-amber-50/80 p-2.5 rounded-md border border-amber-200/70 font-medium">
                  <strong>Practical Tip:</strong> {st.tips}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 8: Statutory Fees & Published Timelines */}
      <section className="mb-8 p-5 bg-white rounded-xl border border-slate-200 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
          Verified Statutory Fees & Processing Timelines
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-2 font-bold">Fee Component</th>
                <th className="pb-2 font-bold">Amount (NGN)</th>
                <th className="pb-2 font-bold">Published Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td className="py-2.5 font-medium">Statutory Filing Fee</td>
                <td className="py-2.5 font-bold text-emerald-800 tabular-nums">
                  {article.officialFees.statutoryFee}
                </td>
                <td className="py-2.5 tabular-nums">{article.processingTimeline}</td>
              </tr>
              {article.officialFees.stampDuty && (
                <tr>
                  <td className="py-2.5 font-medium">FIRS Stamp Duty</td>
                  <td className="py-2.5 font-bold text-emerald-800 tabular-nums">
                    {article.officialFees.stampDuty}
                  </td>
                  <td className="py-2.5">Integrated Portal Payment</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500 mt-3 italic">
          *Note: {article.officialFees.notes}. Fees and statutory requirements are governed by Companies Regulations 2021.
        </p>
      </section>

      {/* Section 9: Common Mistakes & Troubleshooting */}
      <section className="mb-8 p-5 bg-amber-50/40 rounded-xl border border-amber-200/80 shadow-2xs">
        <h2 className="text-base sm:text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-amber-600" />
          <span>Common Mistakes & Application Query Triggers</span>
        </h2>
        <ul className="space-y-2 text-xs sm:text-sm text-amber-900">
          {article.commonMistakes.map((m, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-600 font-bold shrink-0">✕</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Section 10: Frequently Asked Questions */}
      {article.faqs.length > 0 && (
        <section className="mb-10">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <span>Frequently Asked Questions for this Service</span>
          </h2>
          <div className="space-y-3">
            {article.faqs.map((f, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-1"
              >
                <h3 className="text-sm font-bold text-slate-900">{f.question}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Section 13: Contextual Layitek Service Call to Action */}
      <section className="mb-10 p-6 sm:p-8 bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl shadow-md space-y-4">
        <div className="text-xs font-bold uppercase tracking-wider text-amber-300">
          Layitek Professional Corporate Filing Service
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold text-white">
          {article.ctaText || 'Need Help with this CAC Service?'}
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed max-w-2xl">
          Avoid application queries, payment errors, and document delays. Layitek
          Limited handles end-to-end name reservations, company incorporation, and
          complex post-incorporation regularisations with speed and compliance rigor.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => onOpenLeadModal(article.title)}
            className="px-5 py-2.5 text-xs sm:text-sm font-bold rounded-lg shadow-sm hover:brightness-110 active:scale-95 transition-all"
            style={{ backgroundColor: '#ffc758', color: '#18540e' }}
          >
            Get Expert Assistance
          </button>
          <a
            href={`https://wa.me/2347064506982?text=${encodeURIComponent(
              `Hello Layitek, I need assistance with: ${article.title}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-bold rounded-lg bg-emerald-800/80 hover:bg-emerald-800 border border-emerald-600 text-white transition-colors"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us Now</span>
          </a>
          <a
            href="tel:08105554731"
            className="px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg text-emerald-200 hover:text-white transition-colors"
          >
            Call: 08105554731
          </a>
        </div>
      </section>

      {/* Section 11: Official Source References */}
      <section className="mb-8 p-4 sm:p-5 bg-slate-100/80 rounded-xl border border-slate-200/80 text-xs text-slate-600">
        <div className="text-xs font-bold uppercase tracking-wider text-slate-800 mb-2">
          Official Regulatory Sources & Statutory Citations
        </div>
        <div className="space-y-1.5">
          {article.sources.map((s, idx) => (
            <div key={idx} className="flex items-center justify-between gap-2">
              <span className="font-semibold text-slate-800">{s.title}</span>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-800 hover:underline shrink-0"
              >
                <span>Visit Official Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-slate-500 mt-2">
          Last verified on {article.lastVerifiedDate} against official CAC portal
          documentation and CAMA 2020 gazetted regulations.
        </p>
      </section>

      {/* Section 12: Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="mb-10">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-3">
            Related Guides & Compliance Procedures
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {relatedArticles.map((rel) => (
              <button
                key={rel.id}
                onClick={() => onSelectArticle(rel)}
                className="text-left p-3.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-600 hover:shadow-xs transition-all group"
              >
                <div className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {rel.title}
                </div>
                <div className="text-[11px] text-slate-500 line-clamp-1 mt-1">
                  {rel.summary}
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* Article Feedback Module: "Was this helpful?" */}
      <section className="p-5 bg-white rounded-xl border border-slate-200 text-center space-y-3 mb-8">
        <div className="text-sm font-bold text-slate-800">
          Was this guide helpful to you?
        </div>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => handleFeedback(true)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
              feedbackGiven === 'yes'
                ? 'bg-emerald-100 text-emerald-900 border-emerald-400'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-700" />
            <span>Yes, it helped!</span>
          </button>
          <button
            onClick={() => handleFeedback(false)}
            className={`flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg border transition-all ${
              feedbackGiven === 'no'
                ? 'bg-amber-100 text-amber-900 border-amber-400'
                : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            <ThumbsDown className="w-3.5 h-3.5 text-amber-700" />
            <span>Needs clarification</span>
          </button>
        </div>

        {feedbackGiven && !commentSubmitted && (
          <form onSubmit={handleCommentSubmit} className="max-w-md mx-auto pt-2 space-y-2">
            <input
              type="text"
              value={feedbackComment}
              onChange={(e) => setFeedbackComment(e.target.value)}
              placeholder="What questions remain unanswered? (Optional feedback)"
              className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="text-xs font-semibold text-emerald-800 hover:underline"
            >
              Submit Editorial Feedback
            </button>
          </form>
        )}

        {commentSubmitted && (
          <p className="text-xs text-emerald-700 font-medium">
            Thank you! Your feedback has been sent to the Layitek editorial team.
          </p>
        )}
      </section>

      {/* Mandatory General Legal Disclaimer */}
      <footer className="p-4 bg-slate-100/90 rounded-xl text-[11px] text-slate-500 leading-relaxed border border-slate-200">
        <strong>Statutory Notice:</strong> This knowledge base is provided by
        Layitek Limited for general information and educational purposes. It is
        not a substitute for applicable legislation, official CAC instructions,
        or professional legal, accounting, or tax advice. Requirements, fees,
        procedures, and timelines may change. Confirm the latest applicable
        requirements through the official Corporate Affairs Commission before
        filing.
      </footer>
    </article>
  );
};
