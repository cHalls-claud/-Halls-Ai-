import React from 'react';
import { Globe, ArrowRight, Layers, Building2, CheckCircle2, Loader2, Plus } from 'lucide-react';
import { BrandProfile } from '../types';
import { POPULAR_BRANDS } from '../data/mockData';

interface BrandAuditorBarProps {
  brand: BrandProfile;
  onSelectPreset: (brandName: string) => void;
  onOpenAuditModal: () => void;
  isAuditing: boolean;
  auditProgressMessage: string;
}

export const BrandAuditorBar: React.FC<BrandAuditorBarProps> = ({
  brand,
  onSelectPreset,
  onOpenAuditModal,
  isAuditing,
  auditProgressMessage,
}) => {
  return (
    <div id="brand-auditor-bar" className="w-full bg-slate-900/60 border-b border-slate-800/80 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Details Card */}
        <div className="flex items-center space-x-3.5">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500/20 via-slate-800 to-slate-900 border border-indigo-500/30 flex items-center justify-center text-white font-bold text-lg shadow-inner">
            {brand.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-lg font-bold text-white tracking-tight">{brand.name}</h1>
              {brand.domain && (
                <a
                  href={`https://${brand.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono hover:underline"
                >
                  <Globe className="w-3 h-3" />
                  {brand.domain}
                </a>
              )}
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {brand.category}
              </span>
            </div>

            {/* Competitors tracked */}
            <div className="flex items-center space-x-1.5 mt-1 text-xs text-slate-400">
              <span className="text-slate-500">Benchmark Competitors:</span>
              {brand.competitors.slice(0, 3).map((comp, idx) => (
                <span
                  key={idx}
                  className="px-1.5 py-0.2 rounded bg-slate-800/80 text-slate-300 border border-slate-700/60 text-[11px]"
                >
                  {comp}
                </span>
              ))}
              {brand.competitors.length > 3 && (
                <span className="text-slate-500 text-[11px]">+{brand.competitors.length - 3}</span>
              )}
            </div>
          </div>
        </div>

        {/* Brand Presets & Custom Audit Button */}
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-xs font-medium text-slate-400 mr-1 hidden lg:inline">Presets:</span>
          {POPULAR_BRANDS.map((preset) => {
            const isActive = preset.name.toLowerCase() === brand.name.toLowerCase();
            return (
              <button
                key={preset.name}
                id={`preset-btn-${preset.name.toLowerCase()}`}
                onClick={() => onSelectPreset(preset.name)}
                disabled={isAuditing}
                className={`text-xs px-2.5 py-1 rounded-md font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/30 text-indigo-200 border border-indigo-500/50 shadow-sm'
                    : 'bg-slate-800/70 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
                } disabled:opacity-50`}
              >
                {preset.name}
              </button>
            );
          })}

          <button
            id="btn-custom-brand-modal"
            onClick={onOpenAuditModal}
            disabled={isAuditing}
            className="text-xs px-2.5 py-1 rounded-md font-medium bg-slate-800 hover:bg-slate-700 text-indigo-300 hover:text-white border border-indigo-500/30 flex items-center space-x-1 transition-colors"
          >
            <Plus className="w-3 h-3" />
            <span>Custom Brand</span>
          </button>
        </div>
      </div>

      {/* Real-time audit progress banner */}
      {isAuditing && (
        <div className="max-w-7xl mx-auto mt-3 p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center space-x-3 text-xs text-indigo-200 animate-pulse">
          <Loader2 className="w-4 h-4 text-indigo-400 animate-spin flex-shrink-0" />
          <span className="font-medium">
            Running GEO Multi-Model Audit for <strong className="text-white">{brand.name}</strong>: {auditProgressMessage || 'Querying ChatGPT, Gemini, Perplexity, Claude, Copilot...'}
          </span>
        </div>
      )}
    </div>
  );
};
