export interface BrandProfile {
  name: string;
  domain: string;
  category: string;
  competitors: string[];
}

export interface AuditOverview {
  visibilityScore: number; // 0 - 100
  shareOfVoice: number; // %
  sentimentScore: number; // %
  citationRate: number; // %
  recommendationRankAvg: number; // e.g. 1.8
  totalPromptsAnalyzed: number;
}

export interface ModelMetric {
  model: string;
  mentionRate: number; // %
  firstRecommendationRate: number; // %
  averageRank: number;
  sentiment: string;
  citationPresence: 'very high' | 'high' | 'medium' | 'low';
  summarySnippet: string;
}

export interface QueryPerformance {
  query: string;
  brandRank: number;
  isMentioned: boolean;
  isCited: boolean;
  snippet: string;
}

export interface CitationSource {
  source: string;
  url: string;
  authorityScore: number; // 0 - 100
  type: string;
  status: string;
  influence: string;
}

export interface HallucinationAlert {
  severity: 'high' | 'medium' | 'low';
  issue: string;
  detail: string;
  suggestedFix: string;
}

export interface GeoPlaybookItem {
  id: string;
  title: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  impact: string;
  description: string;
  actionableCode: string;
}

export interface GeoAuditReport {
  brand: BrandProfile;
  overview: AuditOverview;
  modelBreakdown: ModelMetric[];
  topQueries: QueryPerformance[];
  citationSources: CitationSource[];
  hallucinationAlerts: HallucinationAlert[];
  geoPlaybook: GeoPlaybookItem[];
}

export interface SimulationResult {
  prompt: string;
  brandName: string;
  generatedResponse: string;
  analysis: {
    brandMentioned: boolean;
    rankPosition: number | null;
    sentiment: string;
    citationsIdentified: string[];
    geoOptimizationTip: string;
  };
}
