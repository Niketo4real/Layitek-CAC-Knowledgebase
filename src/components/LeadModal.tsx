import React, { useState } from 'react';
import { X, Send, CheckCircle2, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'General CAC Filing Assistance',
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate safe local storage lead recording
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    onClose();
  };

  const whatsappUrl = `https://wa.me/2347064506982?text=${encodeURIComponent(
    `Hello Layitek, I would like to request assistance with: ${service}. My Name is ${fullName || 'Client'}.`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in zoom-in-95 duration-150">
        {/* Header */}
        <div
          className="p-5 text-white flex items-center justify-between"
          style={{ backgroundColor: '#18540e' }}
        >
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
              Layitek Limited
            </div>
            <h2 className="text-lg font-bold">Request Filing Assistance</h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
            <h3 className="text-xl font-bold text-slate-900">
              Request Received Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Thank you, <strong>{fullName}</strong>. A dedicated compliance
              officer from Layitek Limited will review your request regarding{' '}
              <strong>{service}</strong> and contact you via phone or WhatsApp shortly.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold text-white rounded-lg bg-emerald-700 hover:bg-emerald-800 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Continue on WhatsApp Now</span>
              </a>
              <button
                onClick={resetAndClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Full Legal Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Babatunde Adeyemi"
                className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Nigerian Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 08105554731"
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Service Required <span className="text-red-500">*</span>
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600 bg-slate-50"
              >
                <option value="Business Name Registration">Business Name Registration</option>
                <option value="Private Limited Company (LTD)">Private Limited Company (LTD)</option>
                <option value="Incorporated Trustees (NGO / Foundation)">Incorporated Trustees (NGO / Foundation)</option>
                <option value="Annual Returns & Status Regularisation">Annual Returns & Status Regularisation</option>
                <option value="Change of Directors / Secretary">Change of Directors / Secretary</option>
                <option value="Change of Registered Address">Change of Registered Address</option>
                <option value="Share Allotment & Transfer">Share Allotment & Transfer</option>
                <option value="Queried Application Remedy">Queried Application Remedy</option>
                <option value="Certified True Copies (CTC)">Certified True Copies (CTC)</option>
                <option value="General CAC Filing Assistance">General CAC Filing Assistance</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Additional Notes or Proposed Entity Name
              </label>
              <textarea
                rows={2}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share any specific requirements or CAC query remarks..."
                className="w-full text-sm p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-emerald-600"
              />
            </div>

            <div className="pt-2 flex items-center justify-between gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 px-4 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm hover:brightness-105 transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: '#1c8512' }}
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Assistance Request'}</span>
              </button>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-800 font-semibold hover:underline"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp (07064506982)</span>
              </a>
              <span aria-hidden="true">·</span>
              <a
                href="tel:08105554731"
                className="flex items-center gap-1 text-slate-700 font-semibold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call: 08105554731</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
