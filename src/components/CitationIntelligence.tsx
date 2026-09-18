import React from 'react';
import { Network, ExternalLink, ShieldCheck, Database, MessageSquare, Code2, Newspaper, FileText } from 'lucide-react';
import { CitationSource } from '../types';

interface CitationIntelligenceProps {
  sources: CitationSource[];
  brandName: string;
}

export const CitationIntelligence: React.FC<CitationIntelligenceProps> = ({ sources, brandName }) => {
  const getSourceIcon = (type: string) => {
    const t = type.toLowerCase();
    if (t.includes('doc')) return <FileText className="w-4 h-4 text-indigo-400" />;
    if (t.includes('reddit') || t.includes('community') || t.includes('forum'))
      return <MessageSquare className="w-4 h-4 text-orange-400" />;
    if (t.includes('code') || t.includes('github')) return <Code2 className="w-4 h-4 text-slate-300" />;
    if (t.includes('review') || t.includes('g2')) return <ShieldCheck className="w-4 h-4 text-emerald-400" />;
    if (t.includes('press') || t.includes('news')) return <Newspaper className="w-4 h-4 text-cyan-400" />;
    return <Database className="w-4 h-4 text-indigo-400" />;
  };

  return (
    <div id="citation-intelligence-section" className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Network className="w-4 h-4 text-indigo-400" />
            <span>AI Citation Graph & Authority Source Intelligence</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Key domains, repositories, and community hubs indexed by LLMs to recommend{' '}
            <strong className="text-slate-200">{brandName}</strong>
          </p>
        </div>
      </div>

      {/* Grid of citation sources */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {sources.map((src, index) => (
          <div
            key={index}
            className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-2.5"
          >
            <div>
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <div className="p-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    {getSourceIcon(src.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-tight">{src.source}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{src.type}</span>
                  </div>
                </div>

                {/* Authority Score Gauge */}
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-indigo-400">
                    {src.authorityScore}
                  </span>
                  <span className="text-[10px] text-slate-500 block font-medium uppercase">Auth Score</span>
                </div>
              </div>

              {/* URL */}
              {src.url && (
                <div className="mt-2">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-indigo-400/80 hover:text-indigo-300 font-mono flex items-center gap-1 truncate"
                  >
                    <span>{src.url}</span>
                    <ExternalLink className="w-3 h-3 flex-shrink-0" />
                  </a>
                </div>
              )}

              {/* Influence description */}
              <p className="text-xs text-slate-300 mt-2 leading-relaxed bg-slate-900/40 p-2 rounded border border-slate-800/60">
                <span className="text-slate-400 font-medium">LLM Impact: </span>
                {src.influence}
              </p>
            </div>

            {/* Status pill */}
            <div className="flex items-center justify-between pt-1 text-[11px] border-t border-slate-900">
              <span className="text-slate-500">Crawling Status:</span>
              <span className="px-2 py-0.5 rounded bg-slate-900 text-emerald-400 border border-emerald-500/20 font-medium">
                {src.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
