import React, { useState } from 'react';
import { INTERACTIVE_CHECKLISTS } from '../data/checklists';
import { ChecklistCategory } from '../types';
import { CheckSquare, Square, Printer, RotateCcw, MessageSquare, ShieldAlert } from 'lucide-react';

interface InteractiveChecklistsProps {
  onOpenLeadModal: (service?: string) => void;
}

export const InteractiveChecklists: React.FC<InteractiveChecklistsProps> = ({
  onOpenLeadModal,
}) => {
  const [activeChecklistId, setActiveChecklistId] = useState<string>(
    INTERACTIVE_CHECKLISTS[0].id
  );
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const activeChecklist =
    INTERACTIVE_CHECKLISTS.find((c) => c.id === activeChecklistId) ||
    INTERACTIVE_CHECKLISTS[0];

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const resetCurrentChecklist = () => {
    const updated = { ...checkedItems };
    activeChecklist.items.forEach((item) => {
      delete updated[item.id];
    });
    setCheckedItems(updated);
  };

  // Calculate completion percentage
  const totalItems = activeChecklist.items.length;
  const completedCount = activeChecklist.items.filter(
    (item) => checkedItems[item.id]
  ).length;
  const percentComplete = Math.round((completedCount / totalItems) * 100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Interactive Readiness Tools</span>
          <span aria-hidden="true">·</span>
          <span>Pre & Post Incorporation</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          CAC Filing Document Checklists
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Track, verify, and prepare all statutory documentation required for
          your registration or corporate filing before submitting on the CAC
          portal.
        </p>
      </div>

      {/* Checklist Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
        {INTERACTIVE_CHECKLISTS.map((chk) => (
          <button
            key={chk.id}
            onClick={() => setActiveChecklistId(chk.id)}
            className={`px-3.5 py-2 text-xs font-bold rounded-lg whitespace-nowrap transition-all cursor-pointer ${
              activeChecklistId === chk.id
                ? 'bg-emerald-800 text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {chk.title.replace(' Checklist', '')}
          </button>
        ))}
      </div>

      {/* Active Checklist Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Header & Progress Bar */}
        <div className="border-b border-slate-200 pb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                {activeChecklist.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {activeChecklist.description}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={resetCurrentChecklist}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                title="Reset checklist items"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-emerald-900 bg-emerald-50 hover:bg-emerald-100 rounded-md border border-emerald-300 transition-colors"
                title="Print checklist"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print / Save PDF</span>
              </button>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Readiness Progress</span>
              <span className="tabular-nums">
                {completedCount} of {totalItems} items prepared ({percentComplete}%)
              </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div
                className="h-full bg-emerald-700 transition-all duration-300"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </div>
        </div>

        {/* Checkable Items List */}
        <div className="space-y-3">
          {activeChecklist.items.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <div
                key={item.id}
                onClick={() => toggleItem(item.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none flex items-start gap-3.5 ${
                  isChecked
                    ? 'bg-emerald-50/60 border-emerald-300'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  className="mt-0.5 text-emerald-800 shrink-0 focus:outline-none"
                  aria-label={isChecked ? 'Mark uncompleted' : 'Mark completed'}
                >
                  {isChecked ? (
                    <CheckSquare className="w-5 h-5 fill-emerald-100" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm font-bold ${
                        isChecked
                          ? 'text-emerald-950 line-through decoration-emerald-600'
                          : 'text-slate-900'
                      }`}
                    >
                      {item.title}
                    </span>
                    {item.isMandatory && (
                      <span className="text-[10px] uppercase font-bold text-amber-900 bg-amber-100 px-1.5 py-0.5 rounded">
                        Mandatory
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.description}
                  </p>

                  {item.sampleFormat && (
                    <p className="text-[11px] text-slate-400 font-mono italic">
                      {item.sampleFormat}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Block */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-sm font-bold text-slate-900">
              Missing any required documents or resolutions?
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Layitek prepares board resolutions, constitutions, and verified
              filing packages for swift approval.
            </div>
          </div>

          <button
            onClick={() => onOpenLeadModal(`Assistance with ${activeChecklist.title}`)}
            className="px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:brightness-105 transition-all whitespace-nowrap"
            style={{ backgroundColor: '#1c8512' }}
          >
            Request Document Assistance
          </button>
        </div>

        {/* Advisory Warning */}
        <div className="flex items-start gap-2 text-[11px] text-slate-500 bg-amber-50/50 p-3 rounded-lg border border-amber-200/60">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span>
            <strong>Checklist Advisory:</strong> These checklists reflect
            standard statutory requirements under CAMA 2020. Reviewing officers
            at the CAC may occasionally request supplementary documentation based
            on specific industrial sectors or foreign participation.
          </span>
        </div>
      </div>
    </div>
  );
};
