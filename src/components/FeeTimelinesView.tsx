import React, { useState, useMemo } from 'react';
import { OFFICIAL_FEE_SCHEDULE } from '../data/feeSchedule';
import { FeeItem } from '../types';
import { Search, ExternalLink, Clock, ShieldCheck, Download, AlertCircle } from 'lucide-react';

interface FeeTimelinesViewProps {
  onOpenLeadModal: (service?: string) => void;
}

export const FeeTimelinesView: React.FC<FeeTimelinesViewProps> = ({ onOpenLeadModal }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string>('all');

  const filteredFees = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return OFFICIAL_FEE_SCHEDULE.filter((item) => {
      const matchEntity =
        selectedEntity === 'all' ||
        item.entityType.toLowerCase().includes(selectedEntity.toLowerCase());
      if (!matchEntity) return false;

      if (!q) return true;
      return (
        item.serviceName.toLowerCase().includes(q) ||
        item.camaReference.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q)
      );
    });
  }, [searchQuery, selectedEntity]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Official Schedules</span>
          <span aria-hidden="true">·</span>
          <span>Companies Regulations 2021 & FIRS Stamp Duty</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Statutory Fees & Service Timelines
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Verified government fees, stamp duty rates, and published processing benchmarks
          for pre-incorporation and post-incorporation services in Nigeria.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
        <div className="relative w-full sm:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search service fees (e.g. 'incorporation', 'annual returns')..."
            className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-emerald-600"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 no-scrollbar">
          {[
            ['all', 'All Services'],
            ['business name', 'Business Name'],
            ['company', 'Companies (LTD/PLC)'],
            ['trustees', 'Incorporated Trustees'],
          ].map(([val, label]) => (
            <button
              key={val}
              onClick={() => setSelectedEntity(val)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg whitespace-nowrap transition-colors ${
                selectedEntity === val
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Structured Fee Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase text-[11px] font-bold tracking-wider">
              <tr>
                <th className="py-3 px-4">Service & Filing Type</th>
                <th className="py-3 px-4">Applicable Entity</th>
                <th className="py-3 px-4">Statutory Fee (CAC)</th>
                <th className="py-3 px-4">Stamp Duty (FIRS)</th>
                <th className="py-3 px-4">Published SLA</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredFees.map((fee, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-900 max-w-xs">
                    <div>{fee.serviceName}</div>
                    <div className="text-[11px] font-normal text-slate-400 mt-0.5">
                      {fee.camaReference}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs">
                    {fee.entityType}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-800 tabular-nums">
                    {fee.statutoryFeeNgn}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 tabular-nums text-xs">
                    {fee.stampDutyNgn || 'None'}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 text-xs flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{fee.serviceTimeline}</span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onOpenLeadModal(`Assistance with: ${fee.serviceName}`)}
                      className="text-xs font-bold text-emerald-800 hover:text-emerald-950 underline"
                    >
                      File with Layitek
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory Banner */}
      <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-bold">Official Statutory Fee Transparency</div>
          <p className="text-[11px] leading-relaxed">
            Statutory filing fees are paid directly to the Corporate Affairs Commission through
            the federal government Remita e-collection gateway. Third-party professional handling,
            stamp duty notarization, and verification charges are independent of the statutory fees shown above.
          </p>
        </div>
      </div>
    </div>
  );
};
