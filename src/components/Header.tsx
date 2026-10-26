import React, { useState } from 'react';
import { LayitekLogo } from './LayitekLogo';
import { Menu, X, PhoneCall, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  onOpenLeadModal: (service?: string) => void;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenLeadModal,
  onOpenAdmin,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: string) => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Strictly One-Row, Three-Zone Top Bar Contract */}
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark with recolored CAC logo */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left hover:opacity-95 transition-opacity focus:outline-none shrink-0"
          >
            <LayitekLogo size="md" showTagline={true} />
          </button>

          {/* Zone 2: 4-5 Single-Line Concise Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <button
              onClick={() => handleNavClick('home')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'home'
                  ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                  : 'hover:text-emerald-700'
              }`}
            >
              Knowledge Base
            </button>
            <button
              onClick={() => handleNavClick('checklists')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'checklists'
                  ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                  : 'hover:text-emerald-700'
              }`}
            >
              Document Checklists
            </button>
            <button
              onClick={() => handleNavClick('decision-tools')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'decision-tools'
                  ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                  : 'hover:text-emerald-700'
              }`}
            >
              Filing Decision Tools
            </button>
            <button
              onClick={() => handleNavClick('fees')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'fees'
                  ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                  : 'hover:text-emerald-700'
              }`}
            >
              Statutory Fees
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className={`whitespace-nowrap transition-colors py-1 ${
                currentTab === 'faqs'
                  ? 'text-emerald-700 font-bold border-b-2 border-emerald-700'
                  : 'hover:text-emerald-700'
              }`}
            >
              FAQ Hub
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action + Discrete Admin Access */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => onOpenLeadModal('General Filing Assistance')}
              className="px-4 py-2 text-xs sm:text-sm font-bold text-white rounded-lg shadow-sm hover:brightness-105 active:scale-95 transition-all whitespace-nowrap cursor-pointer"
              style={{ backgroundColor: '#1c8512' }}
            >
              Get Filing Assistance
            </button>

            {/* Discrete Admin Access Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 text-slate-500 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
              title="Admin Panel"
              aria-label="Admin Panel"
            >
              <ShieldCheck className="w-4 h-4" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-slate-800">
            <button
              onClick={() => handleNavClick('home')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Knowledge Base Guides
            </button>
            <button
              onClick={() => handleNavClick('checklists')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Interactive Document Checklists
            </button>
            <button
              onClick={() => handleNavClick('decision-tools')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Filing Decision Tools & Diagnostics
            </button>
            <button
              onClick={() => handleNavClick('fees')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              CAC Statutory Fees & Timelines
            </button>
            <button
              onClick={() => handleNavClick('glossary')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              CAC & CAMA Glossary
            </button>
            <button
              onClick={() => handleNavClick('faqs')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors"
            >
              Frequently Asked Questions (100+)
            </button>
            <button
              onClick={() => handleNavClick('source-inventory')}
              className="text-left py-2 px-3 rounded-md hover:bg-slate-100 transition-colors text-emerald-800"
            >
              CAC Research & Source Inventory
            </button>

            <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
              <a
                href="https://wa.me/2347064506982"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold rounded-lg border border-emerald-600 text-emerald-800 hover:bg-emerald-50"
              >
                <span>WhatsApp: 07064506982</span>
              </a>
              <a
                href="tel:08105554731"
                className="flex items-center justify-center gap-2 py-2 px-4 text-xs font-bold rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Call: 08105554731</span>
              </a>
              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="text-xs text-slate-500 py-1 text-center hover:underline"
              >
                Editorial CMS & Review Console
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
