import React from 'react';
import { LayitekLogo } from './LayitekLogo';
import { Phone, MessageCircle, Globe, Shield, ExternalLink } from 'lucide-react';
import { BrandLogoConfig } from '../types';

interface FooterProps {
  onSelectTab: (tab: string) => void;
  onOpenLeadModal: (service?: string) => void;
  onOpenAdmin: () => void;
  logoConfig?: BrandLogoConfig;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onOpenLeadModal,
  onOpenAdmin,
  logoConfig,
}) => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-14 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Brand & Overview */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-white/95 p-2.5 rounded-xl inline-block shadow-sm">
              <LayitekLogo size="md" target="footer" logoConfig={logoConfig} />
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Layitek Limited provides practical guides, statutory workflows, and
              hands-on compliance support for Corporate Affairs Commission (CAC)
              business registrations and post-incorporation procedures in Nigeria.
            </p>
            <div className="flex flex-col space-y-2 text-xs">
              <a
                href="https://wa.me/2347064506982"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp: +234 706 450 6982</span>
              </a>
              <a
                href="tel:08105554731"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Phone: 08105554731</span>
              </a>
              <a
                href="https://www.layitek.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>www.layitek.com</span>
              </a>
            </div>
          </div>

          {/* Col 2: Knowledge Base Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Knowledge Base Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Getting Started with CAC
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Business Name Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Company Incorporation (LTD)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Post-Incorporation Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-white transition-colors text-left"
                >
                  Annual Returns Compliance
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Interactive Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Interactive Compliance Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('checklists')}
                  className="hover:text-white transition-colors text-left"
                >
                  Filing Document Checklists
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('decision-tools')}
                  className="hover:text-white transition-colors text-left"
                >
                  Entity Type Selector Wizard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('decision-tools')}
                  className="hover:text-white transition-colors text-left"
                >
                  Query Diagnostic Tool
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('fees')}
                  className="hover:text-white transition-colors text-left"
                >
                  Statutory Fees & Timelines Table
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('glossary')}
                  className="hover:text-white transition-colors text-left"
                >
                  CAMA Legal Glossary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('faqs')}
                  className="hover:text-white transition-colors text-left"
                >
                  100+ Compliance FAQs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official CAC Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Official Federal Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://icrp.cac.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>CAC i-CRP Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://search.cac.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>CAC Public Entity Search</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://bor.cac.gov.ng/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                  <span>Beneficial Ownership Register (BOR)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('source-inventory')}
                  className="hover:text-white transition-colors text-left text-emerald-400 font-medium"
                >
                  Research & Source Inventory Registry
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="pt-8 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed bg-slate-950/40 p-4 rounded-xl space-y-1">
          <div className="font-bold text-slate-300">
            Regulatory Notice & Educational Disclaimer
          </div>
          <p>
            This knowledge base is provided by Layitek Limited for general
            information and educational purposes. It is not a substitute for
            applicable legislation, official CAC instructions, or professional
            legal, accounting, or tax advice. Requirements, fees, procedures, and
            timelines may change. Confirm the latest applicable requirements through
            the official Corporate Affairs Commission before filing.
          </p>
          <p className="text-slate-500 pt-1">
            Layitek Limited is an independent Nigerian corporate advisory firm and
            does not represent itself as an official organ of the Federal Government
            of Nigeria or the Corporate Affairs Commission.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            © {new Date().getFullYear()} Layitek Limited. All rights reserved. Proposed domain: <span className="text-slate-400">incorporations.layitek.com</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenLeadModal('General Inquiry')}
              className="hover:text-slate-300 transition-colors"
            >
              Contact Support
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-slate-400 hover:text-amber-400 transition-colors"
            >
              Editorial CMS Console
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
