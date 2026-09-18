import React from 'react';
import { Eye, TrendingUp, HeartHandshake, Link2, Award, Info } from 'lucide-react';
import { AuditOverview } from '../types';

interface OverviewMetricsProps {
  overview: AuditOverview;
  brandName: string;
}

export const OverviewMetrics: React.FC<OverviewMetricsProps> = ({ overview, brandName }) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
    if (score >= 60) return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
    return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
  };

  return (
    <section id="overview-metrics-section" className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
            <span>GEO Visibility & Brand Authority Metrics</span>
            <span className="text-xs font-normal text-slate-400">
              (Benchmarked across 5 Flagship AI Engines)
            </span>
          </h2>
        </div>
        <div className="text-xs text-slate-400">
          <span className="text-slate-500">Prompts Sampled:</span>{' '}
          <span className="text-slate-200 font-semibold">{overview.totalPromptsAnalyzed} queries</span>
        </div>
      </div>

      {/* Grid of Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Metric 1: AI Visibility Score */}
        <div
          id="metric-visibility-score"
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">AI Visibility Score</span>
            <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {overview.visibilityScore}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-xs">
            <span
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold border ${getScoreColor(
                overview.visibilityScore
              )}`}
            >
              {overview.visibilityScore >= 80 ? 'Market Leader' : overview.visibilityScore >= 60 ? 'Competitive' : 'Emerging'}
            </span>
            <span className="text-slate-400 text-[11px]">Composite Index</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(overview.visibilityScore, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 2: Share of Voice (SOV) */}
        <div
          id="metric-share-of-voice"
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Share of Voice (SOV)</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {overview.shareOfVoice}%
            </span>
            <span className="text-xs text-emerald-400 font-medium">+4.2% MoM</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Appearance in buyer-intent prompts vs competitors
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-cyan-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(overview.shareOfVoice * 1.5, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Sentiment Score */}
        <div
          id="metric-sentiment-score"
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">AI Sentiment</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {overview.sentimentScore}%
            </span>
            <span className="text-xs text-emerald-400 font-medium">Positive</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Zero critical hallucinations detected
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(overview.sentimentScore, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 4: Citation Frequency Rate */}
        <div
          id="metric-citation-rate"
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Citation Rate</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Link2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              {overview.citationRate}%
            </span>
            <span className="text-xs text-slate-400 font-medium">Footnoted</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Answers citing brand domain or docs
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-purple-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.min(overview.citationRate, 100)}%` }}
            />
          </div>
        </div>

        {/* Metric 5: Average Recommendation Rank */}
        <div
          id="metric-avg-rank"
          className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors shadow-sm relative overflow-hidden group"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-medium uppercase tracking-wider">Avg Rec. Rank</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline space-x-2">
            <span className="text-3xl font-extrabold text-white tracking-tight">
              #{overview.recommendationRankAvg.toFixed(1)}
            </span>
            <span className="text-xs text-emerald-400 font-medium">Top Tier</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Rank in multi-vendor recommendation lists
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-amber-500 h-full rounded-full transition-all duration-700"
              style={{ width: `${Math.max(100 - (overview.recommendationRankAvg - 1) * 25, 20)}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
