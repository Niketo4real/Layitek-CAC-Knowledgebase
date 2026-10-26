import { CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  code: string;
  name: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  countLabel: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'getting-started',
    code: 'Category A',
    name: 'Getting Started with CAC',
    shortDescription: 'Core fundamentals of Nigerian corporate registration under CAMA 2020.',
    detailedDescription: 'Understand what the Corporate Affairs Commission does, why legal registration matters, entity classification, CAMA 2020 rules, and how to verify registered companies.',
    iconName: 'Compass',
    countLabel: '7 Guides',
  },
  {
    id: 'business-name',
    code: 'Category B',
    name: 'Business Name Registration',
    shortDescription: 'Sole proprietorships & partnerships registration on the i-CRP portal.',
    detailedDescription: 'Step-by-step guidance on name availability reservations, restricted words, required proprietor particulars, fee payments, and post-approval certificate issuance.',
    iconName: 'Store',
    countLabel: '9 Guides',
  },
  {
    id: 'company-incorporation',
    code: 'Category C',
    name: 'Company Incorporation',
    shortDescription: 'Private limited (LTD), public (PLC), and guarantee companies.',
    detailedDescription: 'Comprehensive procedures for minimum share capital, MEMART, subscriber allocation, Persons with Significant Control (PSC) registration, and electronic certificates.',
    iconName: 'Building2',
    countLabel: '12 Guides',
  },
  {
    id: 'incorporated-trustees',
    code: 'Category D',
    name: 'Incorporated Trustees & Other Entities',
    shortDescription: 'NGOs, faith-based charities, clubs, associations, LLPs & LPs.',
    detailedDescription: 'Statutory procedures for Part F CAMA registrations, newspaper publications, constitution drafting, trustee vetting, and ongoing governance compliance.',
    iconName: 'Users',
    countLabel: '6 Guides',
  },
  {
    id: 'post-incorporation',
    code: 'Category E',
    name: 'Post-Incorporation Services',
    shortDescription: 'Director changes, share allotments, registered office, MEMART changes.',
    detailedDescription: 'Individual service guides covering 20+ post-registration filings on i-CRP, including board changes, share transfers, certified true copies (CTC), and status reports.',
    iconName: 'FileEdit',
    countLabel: '18 Guides',
  },
  {
    id: 'annual-returns',
    code: 'Category F',
    name: 'Annual Returns & Ongoing Compliance',
    shortDescription: 'Mandatory annual filings, statutory deadlines, and regularisation.',
    detailedDescription: 'How and when to file annual returns for businesses and companies, penalty calculations for late filing, and differentiating CAC filings from FIRS/State taxes.',
    iconName: 'CalendarCheck',
    countLabel: '6 Guides',
  },
  {
    id: 'fees-and-forms',
    code: 'Category G',
    name: 'Documents, Fees & Timelines',
    shortDescription: 'Official statutory fee schedules, stamp duties, and service timelines.',
    detailedDescription: 'Verified filing costs across share capital bands, stamp duty rates, official downloadable formats, and realistic portal processing turnaround benchmarks.',
    iconName: 'Receipt',
    countLabel: 'Structured Reference',
  },
  {
    id: 'troubleshooting',
    code: 'Category H',
    name: 'Troubleshooting & Common Problems',
    shortDescription: 'Resolving queried applications, payment glitches, and name rejections.',
    detailedDescription: 'Practical fixes for queried filings, name availability rejections, duplicate user profiles, 2FA recovery, and official CAC ticketing escalation channels.',
    iconName: 'AlertCircle',
    countLabel: '10 Solutions',
  },
  {
    id: 'glossary',
    code: 'Category I',
    name: 'CAC Glossary & CAMA Definitions',
    shortDescription: 'Alphabetical legal and corporate compliance dictionary.',
    detailedDescription: 'Plain-English legal definitions and practical examples for statutory concepts: PSC, MEMART, Allotment, Special Resolution, CTC, CRP, and Nominal Capital.',
    iconName: 'BookOpen',
    countLabel: '35+ Terms',
  },
  {
    id: 'faqs',
    code: 'Category J',
    name: 'Frequently Asked Questions (FAQ)',
    shortDescription: '100+ verified answers to everyday CAC compliance questions.',
    detailedDescription: 'Searchable questions categorized by entity and service stage, each linked to authoritative statutory citations and detailed step-by-step guides.',
    iconName: 'HelpCircle',
    countLabel: '100+ FAQs',
  },
];
