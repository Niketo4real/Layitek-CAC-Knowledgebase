import React, { useState } from 'react';
import {
  Sparkles,
  HelpCircle,
  AlertTriangle,
  Calculator,
  ArrowRight,
  RotateCcw,
  CheckCircle,
  Shield,
  FileCheck,
} from 'lucide-react';

interface DecisionToolsProps {
  onOpenLeadModal: (service?: string) => void;
  onSelectArticleSlug?: (slug: string) => void;
}

export const DecisionTools: React.FC<DecisionToolsProps> = ({
  onOpenLeadModal,
  onSelectArticleSlug,
}) => {
  const [activeTool, setActiveTool] = useState<
    'entity-selector' | 'pre-vs-post' | 'query-resolver' | 'fee-calculator'
  >('entity-selector');

  // Tool 1: Entity Selector State
  const [entityStep, setEntityStep] = useState(1);
  const [entityAnswers, setEntityAnswers] = useState({
    purpose: '', // 'profit' | 'non-profit' | 'professional'
    owners: '', // 'solo' | 'partners' | 'investors'
    liability: '', // 'limited' | 'not-concerned'
  });

  // Tool 3: Query Resolver State
  const [selectedQueryReason, setSelectedQueryReason] = useState<string>('');

  // Tool 4: Fee Calculator State
  const [calcEntityType, setCalcEntityType] = useState<'business-name' | 'private-ltd' | 'trustees' | 'annual-return'>('private-ltd');
  const [calcShareCapital, setCalcShareCapital] = useState<number>(1000000);

  // Entity Selector Logic
  const getEntityRecommendation = () => {
    if (entityAnswers.purpose === 'non-profit') {
      return {
        title: 'Incorporated Trustees (NGO / Foundation / Association)',
        code: 'Part F, CAMA 2020',
        description:
          'Ideal for charities, religious bodies, alumni associations, social clubs, and non-profit initiatives.',
        statutoryFee: '₦35,000',
        timeline: '30 – 45 days (includes mandatory 28-day newspaper publication)',
        pros: ['Perpetual succession', 'Eligible for donor grants and tax exemptions', 'High public trust'],
        cons: ['Profits cannot be distributed to members', 'Subject to strict regulatory scrutiny'],
      };
    }
    if (entityAnswers.purpose === 'professional') {
      return {
        title: 'Limited Liability Partnership (LLP)',
        code: 'Part C, CAMA 2020',
        description:
          'Specifically designed for professional service firms (lawyers, accountants, engineers, architects) wanting limited liability.',
        statutoryFee: '₦20,000',
        timeline: '3 – 5 working days',
        pros: ['Partners are shielded from debts of negligent co-partners', 'Flexible partnership agreement'],
        cons: ['Only suitable for multi-member professional practices'],
      };
    }
    if (entityAnswers.liability === 'limited' || entityAnswers.owners === 'investors') {
      return {
        title: 'Private Company Limited by Shares (LTD)',
        code: 'Part B, CAMA 2020',
        description:
          'The premier corporate vehicle for Nigerian startups, SMEs, and commercial companies. Protects personal assets and allows issuing equity.',
        statutoryFee: '₦10,000 (Base) + 0.75% Stamp Duty',
        timeline: '2 – 4 working days',
        pros: ['Distinct legal personality', 'Personal assets 100% protected', 'Can raise venture capital & take corporate bank loans'],
        cons: ['Annual return filings and formal board resolutions required'],
      };
    }
    return {
      title: 'Business Name (Enterprise / Sole Proprietorship)',
      code: 'Part E, CAMA 2020',
      description:
        'Fastest and most affordable option for solo trades, freelancers, retail shops, and small personal ventures.',
      statutoryFee: '₦10,000 (No stamp duty)',
      timeline: '48 – 72 hours',
      pros: ['Very quick registration', 'Minimal annual compliance fees (₦3,000/yr)', 'Simple accounting'],
      cons: ['Unlimited personal liability for business debts', 'Cannot issue shares to investors'],
    };
  };

  // Fee calculation helper
  const calculateFees = () => {
    if (calcEntityType === 'business-name') {
      return {
        cacFee: 10000,
        stampDuty: 0,
        nameReservation: 500,
        remitaEstimate: 160,
        total: 10660,
      };
    }
    if (calcEntityType === 'trustees') {
      return {
        cacFee: 35000,
        stampDuty: 0,
        nameReservation: 500,
        remitaEstimate: 250,
        total: 35750,
      };
    }
    if (calcEntityType === 'annual-return') {
      return {
        cacFee: 5000,
        stampDuty: 0,
        nameReservation: 0,
        remitaEstimate: 160,
        total: 5160,
      };
    }
    // Private Ltd
    const baseFee = 10000;
    const extraMillions = Math.max(0, Math.ceil((calcShareCapital - 1000000) / 1000000));
    const cacFee = baseFee + extraMillions * 5000;
    const stampDuty = Math.round(calcShareCapital * 0.0075);
    const nameReservation = 500;
    const remitaEstimate = 250;
    return {
      cacFee,
      stampDuty,
      nameReservation,
      remitaEstimate,
      total: cacFee + stampDuty + nameReservation + remitaEstimate,
    };
  };

  const fees = calculateFees();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
          <span>Interactive Decision Tools</span>
          <span aria-hidden="true">·</span>
          <span>Educational Compliance Wizards</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          CAC Guided Decision Tools & Diagnostics
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Use our interactive diagnostic wizards to determine your optimal entity structure,
          resolve application queries, calculate statutory fees, and navigate post-incorporation procedures.
        </p>
      </div>

      {/* Tool Selector Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-8">
        {[
          {
            id: 'entity-selector',
            label: 'Entity Type Selector',
            icon: Sparkles,
          },
          {
            id: 'pre-vs-post',
            label: 'Pre vs Post Diagnostic',
            icon: HelpCircle,
          },
          {
            id: 'query-resolver',
            label: 'Query Diagnostic',
            icon: AlertTriangle,
          },
          {
            id: 'fee-calculator',
            label: 'Fee & Duty Calculator',
            icon: Calculator,
          },
        ].map((t) => {
          const Icon = t.icon;
          const isActive = activeTool === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTool(t.id as any)}
              className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                isActive
                  ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-amber-400' : 'text-emerald-700'}`} />
              <span className="text-xs font-bold whitespace-nowrap">{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* TOOL 1: Entity Type Selector */}
      {activeTool === 'entity-selector' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Step {entityStep} of 3
            </span>
            <h2 className="text-xl font-bold text-slate-900 mt-1">
              Which Nigerian Corporate Entity Suits Your Purpose?
            </h2>
          </div>

          {entityStep === 1 && (
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-800 block">
                What is the primary mission or purpose of your organization?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    val: 'profit',
                    title: 'Commercial Business',
                    desc: 'Selling products, offering commercial services, earning profits.',
                  },
                  {
                    val: 'non-profit',
                    title: 'Non-Profit / Charity',
                    desc: 'NGO, religious body, community association, social foundation.',
                  },
                  {
                    val: 'professional',
                    title: 'Professional Practice',
                    desc: 'Law firm, accounting practice, architectural or engineering partnership.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => {
                      setEntityAnswers({ ...entityAnswers, purpose: opt.val });
                      setEntityStep(2);
                    }}
                    className={`p-4 rounded-xl border text-left hover:border-emerald-600 transition-all ${
                      entityAnswers.purpose === opt.val
                        ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{opt.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {entityStep === 2 && (
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-800 block">
                Who will own and control the entity?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    val: 'solo',
                    title: 'Just Myself (Sole Owner)',
                    desc: 'Single individual retaining 100% control.',
                  },
                  {
                    val: 'partners',
                    title: '2 or More Partners / Co-Founders',
                    desc: 'Equal or shared operational equity.',
                  },
                  {
                    val: 'investors',
                    title: 'Seeking Outside Investors',
                    desc: 'Planning to issue shares to venture funds or angel investors.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => {
                      setEntityAnswers({ ...entityAnswers, owners: opt.val });
                      setEntityStep(3);
                    }}
                    className={`p-4 rounded-xl border text-left hover:border-emerald-600 transition-all ${
                      entityAnswers.owners === opt.val
                        ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{opt.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setEntityStep(1)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Back to previous question
              </button>
            </div>
          )}

          {entityStep === 3 && (
            <div className="space-y-4">
              <label className="text-sm font-semibold text-slate-800 block">
                How important is personal asset protection (Limited Liability)?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    val: 'limited',
                    title: 'Critical: Protect My Personal Assets',
                    desc: 'My personal house, cars, and personal bank accounts must never be seized for business debts.',
                  },
                  {
                    val: 'not-concerned',
                    title: 'Simple / Low-Risk Venture',
                    desc: 'I am a solo freelancer or trader; low liability risk and lowest registration cost is priority.',
                  },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => {
                      setEntityAnswers({ ...entityAnswers, liability: opt.val });
                      setEntityStep(4);
                    }}
                    className={`p-4 rounded-xl border text-left hover:border-emerald-600 transition-all ${
                      entityAnswers.liability === opt.val
                        ? 'bg-emerald-50/70 border-emerald-600 ring-2 ring-emerald-600/20'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <div className="text-sm font-bold text-slate-900">{opt.title}</div>
                    <div className="text-xs text-slate-500 mt-1">{opt.desc}</div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setEntityStep(2)}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                ← Back to previous question
              </button>
            </div>
          )}

          {entityStep === 4 && (
            <div className="p-6 bg-emerald-50/80 rounded-xl border border-emerald-200 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                    Recommended Corporate Structure
                  </span>
                  <h3 className="text-xl font-extrabold text-emerald-950 mt-0.5">
                    {getEntityRecommendation().title}
                  </h3>
                  <span className="text-xs font-mono text-emerald-700">
                    {getEntityRecommendation().code}
                  </span>
                </div>
                <button
                  onClick={() => setEntityStep(1)}
                  className="flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Restart</span>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {getEntityRecommendation().description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-emerald-100">
                  <span className="font-bold text-emerald-900 block mb-1">Key Advantages:</span>
                  <ul className="space-y-1 text-slate-600">
                    {getEntityRecommendation().pros.map((p, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="text-emerald-700 font-bold">✓</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 bg-white rounded-lg border border-emerald-100">
                  <span className="font-bold text-amber-900 block mb-1">Statutory Details:</span>
                  <div className="text-slate-700 space-y-1">
                    <div><strong>Statutory Fee:</strong> {getEntityRecommendation().statutoryFee}</div>
                    <div><strong>Standard SLA:</strong> {getEntityRecommendation().timeline}</div>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    onOpenLeadModal(`Register ${getEntityRecommendation().title}`)
                  }
                  className="px-4 py-2 text-xs font-bold text-white rounded-lg shadow-sm hover:brightness-105"
                  style={{ backgroundColor: '#1c8512' }}
                >
                  Get Layitek Filing Assistance
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOOL 2: Pre vs Post Incorporation Diagnostic */}
      {activeTool === 'pre-vs-post' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Pre-Incorporation vs Post-Incorporation Diagnostic
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Identify whether you require a new registration or an amendment to an existing registered entity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h3 className="text-base font-bold text-slate-900">
                  Pre-Incorporation Services
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies when you do <strong>NOT</strong> yet possess a registered CAC number (RC, BN, IT, or LLP).
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li>• Name Availability Search & Reservation</li>
                <li>• New Business Name Registration (Sole Trader / Firm)</li>
                <li>• New Private Limited Company (LTD) Incorporation</li>
                <li>• NGO / Foundation / Church Registration (Part F)</li>
                <li>• Limited Liability Partnership (LLP) Registration</li>
              </ul>
              <button
                onClick={() => onOpenLeadModal('New Pre-Incorporation Registration')}
                className="w-full mt-3 py-2 text-xs font-bold text-white rounded-lg"
                style={{ backgroundColor: '#1c8512' }}
              >
                Start New Registration
              </button>
            </div>

            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-base font-bold text-slate-900">
                  Post-Incorporation Services
                </h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Applies when your business is <strong>ALREADY REGISTERED</strong> and you need to update statutory records.
              </p>
              <ul className="text-xs text-slate-700 space-y-1.5 pt-2">
                <li>• Appointing or Removing Directors</li>
                <li>• Changing Registered Office Physical Address</li>
                <li>• Share Transfers & Allotment of New Capital</li>
                <li>• Alteration of Memorandum & Articles (MEMART)</li>
                <li>• Filing Outstanding Annual Returns & Status Regularisation</li>
                <li>• Certified True Copies (CTC) & Status Reports</li>
              </ul>
              <button
                onClick={() => onOpenLeadModal('Post-Incorporation Filing')}
                className="w-full mt-3 py-2 text-xs font-bold text-amber-950 bg-amber-400 hover:bg-amber-500 rounded-lg"
              >
                File Post-Incorporation Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: Query Diagnostic */}
      {activeTool === 'query-resolver' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              CAC Application Query Diagnostic & Remedy Wizard
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Select the exact query remark received on your i-CRP portal to understand the cause and required remedial action.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                id: 'nin-mismatch',
                label: 'Query: "NIN particulars do not match subscriber/director profile"',
                cause: 'The applicant entered a date of birth, surname, or first name that differs from the NIMC National Identity database.',
                remedy: 'Log in, click "Resolve Query", and edit the portal profile fields to match the exact spelling and birth date on the NIN slip. If the NIN record is wrong, rectify at NIMC first.',
              },
              {
                id: 'unissued-shares',
                label: 'Query: "Unissued shares detected / Capital not fully allocated"',
                cause: 'Under CAMA 2020 Section 124, a company cannot have unallocated shares. All issued shares must be allocated to subscribers.',
                remedy: 'Reallocate 100% of the issued share capital among initial subscribers on the share distribution page.',
              },
              {
                id: 'illegible-id',
                label: 'Query: "Attached identification/signature is blurred or illegible"',
                cause: 'The uploaded scan resolution is poor, cropped, or under-illuminated.',
                remedy: 'Sign cleanly in black ink on unlined white paper. Scan in high resolution (300 DPI) as PDF or clear JPG under 2MB and re-upload.',
              },
              {
                id: 'restricted-word',
                label: 'Query: "Name contains restricted words requiring consent"',
                cause: 'Proposed name contains terms like "Federal", "National", "Group", "Holdings", "Bank", or "Council".',
                remedy: 'Upload official written ministerial/regulatory consent letter, or alter the name by filing an amended name reservation.',
              },
            ].map((q) => (
              <div
                key={q.id}
                onClick={() => setSelectedQueryReason(q.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  selectedQueryReason === q.id
                    ? 'bg-amber-50/70 border-amber-400 ring-2 ring-amber-400/20'
                    : 'bg-white border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="text-sm font-bold text-slate-900">{q.label}</div>
                {selectedQueryReason === q.id && (
                  <div className="mt-3 pt-3 border-t border-amber-200 space-y-2 text-xs">
                    <div>
                      <strong className="text-amber-950">Underlying Cause:</strong>{' '}
                      <span className="text-slate-700">{q.cause}</span>
                    </div>
                    <div>
                      <strong className="text-emerald-900">How to Fix on i-CRP:</strong>{' '}
                      <span className="text-slate-700">{q.remedy}</span>
                    </div>
                    <div className="pt-2">
                      <button
                        onClick={() => onOpenLeadModal(`Resolving CAC Query: ${q.id}`)}
                        className="px-3 py-1.5 text-xs font-bold text-white rounded bg-emerald-800 hover:bg-emerald-900"
                      >
                        Let Layitek Fix This Query
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TOOL 4: Fee Calculator */}
      {activeTool === 'fee-calculator' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Statutory Fee & Stamp Duty Estimator
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Calculate official CAC government fees and FIRS stamp duties based on entity type and issued share capital.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1.5">
                  Select Entity Type
                </label>
                <select
                  value={calcEntityType}
                  onChange={(e) => setCalcEntityType(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-50 rounded-lg border border-slate-300 text-sm font-medium text-slate-800 focus:outline-none focus:border-emerald-600"
                >
                  <option value="private-ltd">Private Company Limited by Shares (LTD)</option>
                  <option value="business-name">Business Name (Sole Proprietor / Partnership)</option>
                  <option value="trustees">Incorporated Trustees (NGO / Foundation)</option>
                  <option value="annual-return">Annual Returns (Small Company)</option>
                </select>
              </div>

              {calcEntityType === 'private-ltd' && (
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Issued Share Capital (NGN)
                    </label>
                    <span className="text-xs font-mono font-bold text-emerald-800">
                      ₦{calcShareCapital.toLocaleString()}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="100000"
                    max="20000000"
                    step="500000"
                    value={calcShareCapital}
                    onChange={(e) => setCalcShareCapital(Number(e.target.value))}
                    className="w-full accent-emerald-700 cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>₦100,000 (Min)</span>
                    <span>₦1,000,000 (Standard)</span>
                    <span>₦20,000,000</span>
                  </div>
                </div>
              )}

              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-600 border border-slate-200">
                <strong>Statutory Rule:</strong> CAMA 2020 charges ₦10,000 for the first ₦1,000,000 issued capital, plus ₦5,000 per subsequent ₦1,000,000. FIRS stamp duty is approximately 0.75%.
              </div>
            </div>

            {/* Breakdown Card */}
            <div className="p-5 bg-emerald-50/70 rounded-xl border border-emerald-200/90 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Statutory Breakdown (Official Charges)
              </div>
              <div className="space-y-2 text-xs sm:text-sm divide-y divide-emerald-200/60">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">CAC Statutory Filing Fee</span>
                  <span className="font-bold text-slate-900 tabular-nums">₦{fees.cacFee.toLocaleString()}</span>
                </div>
                {fees.stampDuty > 0 && (
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-600">FIRS Stamp Duty (0.75%)</span>
                    <span className="font-bold text-slate-900 tabular-nums">₦{fees.stampDuty.toLocaleString()}</span>
                  </div>
                )}
                {fees.nameReservation > 0 && (
                  <div className="flex justify-between pt-2">
                    <span className="text-slate-600">Name Reservation Fee</span>
                    <span className="font-bold text-slate-900 tabular-nums">₦{fees.nameReservation.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between pt-2">
                  <span className="text-slate-600">Remita Processing (Estimate)</span>
                  <span className="font-bold text-slate-900 tabular-nums">₦{fees.remitaEstimate.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-3 text-base font-extrabold text-emerald-950">
                  <span>Estimated Total Statutory Cost</span>
                  <span className="tabular-nums">₦{fees.total.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-3">
                <button
                  onClick={() => onOpenLeadModal(`Registration with ₦${calcShareCapital.toLocaleString()} Capital`)}
                  className="w-full py-2.5 text-xs font-bold text-white rounded-lg shadow-sm hover:brightness-105"
                  style={{ backgroundColor: '#1c8512' }}
                >
                  Have Layitek Process This Filing
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
