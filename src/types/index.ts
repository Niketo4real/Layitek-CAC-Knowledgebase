export type CategoryId =
  | 'getting-started'
  | 'business-name'
  | 'company-incorporation'
  | 'incorporated-trustees'
  | 'post-incorporation'
  | 'annual-returns'
  | 'fees-and-forms'
  | 'troubleshooting'
  | 'glossary'
  | 'faqs';

export type EntityType =
  | 'all'
  | 'business-name'
  | 'private-ltd'
  | 'public-plc'
  | 'incorporated-trustees'
  | 'llp'
  | 'lp'
  | 'foreign-company';

export type ContentStatus = 'verified' | 'in-review' | 'needs-verification';

export interface SourceReference {
  title: string;
  url: string;
  retrievalDate: string;
  sourceType: 'official-portal' | 'statute-cama' | 'cac-guideline' | 'gazette';
}

export interface ArticleStep {
  stepNumber: number;
  title: string;
  description: string;
  portalAction?: string;
  documentsNeeded?: string[];
  tips?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  categoryId: CategoryId;
  entityType: EntityType;
  summary: string;
  whoIsThisFor: string;
  whenNecessary: string;
  eligibilityPrerequisites: string[];
  requiredDocuments: string[];
  steps: ArticleStep[];
  officialFees: {
    statutoryFee: string;
    stampDuty?: string;
    extraCharges?: string;
    notes: string;
  };
  processingTimeline: string;
  commonMistakes: string[];
  faqs: { question: string; answer: string }[];
  sources: SourceReference[];
  relatedArticleIds: string[];
  lastVerifiedDate: string;
  status: ContentStatus;
  ctaText?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  categoryId: CategoryId;
  entityType: EntityType;
  camaSection?: string;
  relatedArticleSlug?: string;
  verifiedDate: string;
}

export interface GlossaryTerm {
  term: string;
  definition: string;
  camaReference?: string;
  example: string;
  relatedTerms: string[];
  category: string;
}

export interface ChecklistItem {
  id: string;
  title: string;
  description: string;
  isMandatory: boolean;
  sampleFormat?: string;
}

export interface ChecklistCategory {
  id: string;
  title: string;
  entityType: EntityType;
  description: string;
  items: ChecklistItem[];
}

export interface FeeItem {
  serviceName: string;
  entityType: string;
  statutoryFeeNgn: string;
  stampDutyNgn?: string;
  camaReference: string;
  serviceTimeline: string;
  portalLink: string;
  lastVerified: string;
  notes: string;
}

export interface SourceInventoryItem {
  id: string;
  url: string;
  title: string;
  authority: string;
  retrievalDate: string;
  lastUpdatedDate?: string;
  keyFacts: string[];
  verificationStatus: ContentStatus;
  notes: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  serviceType: string;
  entityName?: string;
  message: string;
  timestamp: string;
  status: 'new' | 'contacted' | 'completed';
}

export interface ArticleFeedback {
  articleId: string;
  articleTitle: string;
  isHelpful: boolean;
  comment?: string;
  timestamp: string;
}
