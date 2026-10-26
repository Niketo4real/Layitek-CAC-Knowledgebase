import React from 'react';
import { OFFICIAL_CAC_SOURCES } from '../data/sourceInventory';
import { ExternalLink, CheckCircle, Shield, RefreshCw } from 'lucide-react';

export const SourceInventoryView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Phase 1 Research & Compliance Audit</span>
          <span aria-hidden="true">·</span>
          <span>Regulatory Registry</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Official CAC Research & Crawl Inventory
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Traceable inventory of crawled official primary government sources, statutory instruments,
          and verification metadata supporting all publications across this knowledge base.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {OFFICIAL_CAC_SOURCES.map((source) => (
          <div
            key={source.id}
            className="p-5 bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                  Status: {source.verificationStatus.toUpperCase()}
                </span>
                <span className="text-[11px] text-slate-400">
                  Retrieved: {source.retrievalDate}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 mt-2">
                {source.title}
              </h2>

              <p className="text-xs font-medium text-slate-500 mt-0.5">
                Authority: {source.authority}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100">
                <div className="text-xs font-bold text-slate-700 mb-1.5">
                  Verified Extracted Regulatory Facts:
                </div>
                <ul className="space-y-1 text-xs text-slate-600">
                  {source.keyFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold shrink-0">✓</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 italic text-[11px] truncate max-w-[200px]">
                {source.notes}
              </span>
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 shrink-0"
              >
                <span>Visit Primary Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
