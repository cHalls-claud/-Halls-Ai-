import React from 'react';
import { Sparkles, Activity, ShieldCheck, Download, Search, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentBrand: string;
  hasApiKey: boolean;
  onOpenAuditModal: () => void;
  onRefreshAudit: () => void;
  isAuditing: boolean;
  onExportReport: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentBrand,
  hasApiKey,
  onOpenAuditModal,
  onRefreshAudit,
  isAuditing,
  onExportReport,
}) => {
  return (
    <header id="main-header" className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Trademark */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1">
                Halls AI
                <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  ©Halls AI
                </span>
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Generative Engine Optimization (GEO) & AI Brand Visibility
            </p>
          </div>
        </div>

        {/* Status and Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Engine Status Badge */}
          <div className="hidden md:flex items-center space-x-2 px-2.5 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs text-slate-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-medium">
              {hasApiKey ? 'Gemini 3.8 Live Engine' : 'GEO Multi-Model Engine'}
            </span>
          </div>

          {/* Quick audit refresh */}
          <button
            id="btn-refresh-audit"
            onClick={onRefreshAudit}
            disabled={isAuditing}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 transition-all disabled:opacity-50"
            title="Re-run GEO audit"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-indigo-400' : ''}`} />
            <span className="hidden sm:inline">Refresh Audit</span>
          </button>

          {/* Switch/Audit New Brand */}
          <button
            id="btn-audit-new-brand"
            onClick={onOpenAuditModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm shadow-indigo-600/30 ring-1 ring-indigo-400/40"
          >
            <Search className="w-3.5 h-3.5" />
            <span>Audit Brand</span>
          </button>

          {/* Export Report */}
          <button
            id="btn-export-report"
            onClick={onExportReport}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-700/80 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>
    </header>
  );
};
