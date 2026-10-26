import React, { useState, useMemo } from 'react';
import { GLOSSARY_TERMS } from '../data/glossary';
import { GlossaryTerm } from '../types';
import { Search, BookOpen, ExternalLink, Bookmark } from 'lucide-react';

interface GlossaryViewProps {
  onOpenLeadModal: (service?: string) => void;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ onOpenLeadModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLetter, setSelectedLetter] = useState<string>('ALL');

  // Compute available letters
  const alphabet = useMemo(() => {
    const letters = new Set(
      GLOSSARY_TERMS.map((t) => t.term.charAt(0).toUpperCase())
    );
    return Array.from(letters).sort();
  }, []);

  const filteredTerms = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return GLOSSARY_TERMS.filter((item) => {
      const matchLetter =
        selectedLetter === 'ALL' ||
        item.term.charAt(0).toUpperCase() === selectedLetter;
      if (!matchLetter) return false;

      if (!q) return true;
      return (
        item.term.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.example.toLowerCase().includes(q)
      );
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [searchQuery, selectedLetter]);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Legal Lexicon</span>
          <span aria-hidden="true">·</span>
          <span>CAMA 2020 & CAC Compliance Dictionary</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          CAC & Corporate Law Glossary
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Plain-English legal definitions, statutory citations, and practical examples
          of Nigerian corporate compliance terminology.
        </p>
      </div>

      {/* Search Input & Alphabet Filter */}
      <div className="space-y-4 mb-8">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search glossary terms (e.g., 'PSC', 'MEMART', 'Special Resolution')..."
            className="w-full pl-10 pr-4 py-3 bg-white rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600 shadow-2xs"
          />
        </div>

        {/* Letter Jumps */}
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => setSelectedLetter('ALL')}
            className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
              selectedLetter === 'ALL'
                ? 'bg-emerald-800 text-white'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            All
          </button>
          {alphabet.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`w-7 h-7 text-xs font-bold rounded-md transition-colors flex items-center justify-center ${
                selectedLetter === letter
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTerms.map((term) => (
          <div
            key={term.term}
            className="p-5 bg-white rounded-xl border border-slate-200 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                  {term.category}
                </span>
                {term.camaReference && (
                  <span className="text-[10px] text-slate-400 font-mono">
                    {term.camaReference}
                  </span>
                )}
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {term.term}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {term.definition}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 text-xs">
              <div className="text-[11px] text-slate-500 italic bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <strong>Practical Example:</strong> {term.example}
              </div>

              {term.relatedTerms.length > 0 && (
                <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                  <span className="text-[10px] text-slate-400">Related:</span>
                  {term.relatedTerms.map((rel) => (
                    <button
                      key={rel}
                      onClick={() => setSearchQuery(rel)}
                      className="text-[11px] text-emerald-800 hover:underline font-medium"
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
