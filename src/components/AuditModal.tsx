import React, { useState } from 'react';
import { X, Sparkles, Building2, Globe, Layers, Users, Loader2 } from 'lucide-react';

interface AuditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitAudit: (brandData: {
    brandName: string;
    domain: string;
    category: string;
    competitors: string[];
  }) => void;
  isAuditing: boolean;
}

export const AuditModal: React.FC<AuditModalProps> = ({
  isOpen,
  onClose,
  onSubmitAudit,
  isAuditing,
}) => {
  const [brandName, setBrandName] = useState('');
  const [domain, setDomain] = useState('');
  const [category, setCategory] = useState('');
  const [competitors, setCompetitors] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName.trim()) return;

    const competitorList = competitors
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    onSubmitAudit({
      brandName: brandName.trim(),
      domain: domain.trim(),
      category: category.trim() || 'Software & Technology',
      competitors: competitorList.length > 0 ? competitorList : ['Competitor A', 'Competitor B'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div
        id="audit-modal-container"
        className="w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 space-y-5 text-slate-100 relative"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3.5">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Run Multi-Model GEO Audit
              </h3>
              <p className="text-xs text-slate-400">
                Track AI visibility across ChatGPT, Gemini, Perplexity, Claude & Copilot
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isAuditing}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Brand Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-indigo-400" />
              <span>Brand / Product Name *</span>
            </label>
            <input
              id="input-audit-brand"
              type="text"
              required
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g., Raycast, Vercel, Allbirds, Stripe, or your brand"
              disabled={isAuditing}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Domain */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>Official Website / Domain</span>
            </label>
            <input
              id="input-audit-domain"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              placeholder="e.g., raycast.com"
              disabled={isAuditing}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>Industry or Category</span>
            </label>
            <input
              id="input-audit-category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Developer Productivity Launcher, Cloud Database, E-commerce Shoes"
              disabled={isAuditing}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Competitors */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-indigo-400" />
              <span>Key Competitors (comma separated)</span>
            </label>
            <input
              id="input-audit-competitors"
              type="text"
              value={competitors}
              onChange={(e) => setCompetitors(e.target.value)}
              placeholder="e.g., Alfred, Spotlight, CommandBar"
              disabled={isAuditing}
              className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end space-x-2.5">
            <button
              type="button"
              onClick={onClose}
              disabled={isAuditing}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              id="btn-submit-audit"
              type="submit"
              disabled={isAuditing || !brandName.trim()}
              className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-xs font-semibold text-white shadow-md shadow-indigo-600/30 flex items-center space-x-2 transition-all"
            >
              {isAuditing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating AI Engines...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute GEO Audit</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
