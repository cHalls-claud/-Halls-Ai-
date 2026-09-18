import React, { useState } from 'react';
import { Bot, CheckCircle2, AlertCircle, Quote, BarChart2, ExternalLink } from 'lucide-react';
import { ModelMetric } from '../types';

interface ModelMatrixViewProps {
  metrics: ModelMetric[];
  brandName: string;
}

export const ModelMatrixView: React.FC<ModelMatrixViewProps> = ({ metrics, brandName }) => {
  const [selectedModel, setSelectedModel] = useState<string>(metrics[0]?.model || '');

  const activeMetric = metrics.find((m) => m.model === selectedModel) || metrics[0];

  const getCitationBadge = (presence: string) => {
    switch (presence.toLowerCase()) {
      case 'very high':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'high':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-700/50 text-slate-300 border-slate-600/30';
    }
  };

  return (
    <div id="model-matrix-view" className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Bot className="w-4 h-4 text-indigo-400" />
            <span>AI Model Visibility & Recommendation Matrix</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Compare brand rank, citation presence, and sentiment across major AI engines
          </p>
        </div>

        {/* Model Tabs for mobile / detail inspect */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {metrics.map((m) => (
            <button
              key={m.model}
              onClick={() => setSelectedModel(m.model)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedModel === m.model
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {m.model.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Benchmarking Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <th className="py-2.5 px-3">AI Engine / LLM</th>
              <th className="py-2.5 px-3">Mention Rate</th>
              <th className="py-2.5 px-3">#1 Recommendation %</th>
              <th className="py-2.5 px-3">Avg Rank</th>
              <th className="py-2.5 px-3">Citation Density</th>
              <th className="py-2.5 px-3">Sentiment</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {metrics.map((m) => {
              const isSelected = m.model === selectedModel;
              return (
                <tr
                  key={m.model}
                  onClick={() => setSelectedModel(m.model)}
                  className={`cursor-pointer transition-colors ${
                    isSelected ? 'bg-indigo-950/20 text-white' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <td className="py-3 px-3 font-semibold text-slate-200 flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400"></span>
                    <span>{m.model}</span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono font-medium">{m.mentionRate}%</span>
                      <div className="w-16 bg-slate-800 h-1.5 rounded-full overflow-hidden hidden sm:block">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: `${m.mentionRate}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono text-emerald-400 font-medium">
                      {m.firstRecommendationRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-semibold text-slate-100">
                    #{m.averageRank.toFixed(1)}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider border ${getCitationBadge(
                        m.citationPresence
                      )}`}
                    >
                      {m.citationPresence}
                    </span>
                  </td>
                  <td className="py-3 px-3 capitalize text-slate-300">
                    <span className="flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{m.sentiment}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Selected Model Narrative Card */}
      {activeMetric && (
        <div className="mt-3 p-3.5 rounded-xl bg-slate-800/40 border border-slate-700/60 flex items-start space-x-3">
          <Quote className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <div className="font-semibold text-indigo-300">
              How <strong className="text-white">{activeMetric.model}</strong> portrays{' '}
              <strong className="text-white">{brandName}</strong>:
            </div>
            <p className="text-slate-300 leading-relaxed italic">
              "{activeMetric.summarySnippet}"
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
