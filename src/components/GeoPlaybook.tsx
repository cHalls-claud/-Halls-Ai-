import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Code2, Zap, ArrowUpRight } from 'lucide-react';
import { GeoPlaybookItem } from '../types';

interface GeoPlaybookProps {
  playbook: GeoPlaybookItem[];
  brandName: string;
}

export const GeoPlaybook: React.FC<GeoPlaybookProps> = ({ playbook, brandName }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(playbook[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(playbook.map((p) => p.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? playbook
      : playbook.filter((item) => item.category === selectedCategory);

  const handleCopy = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      case 'medium':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
    }
  };

  return (
    <div id="geo-playbook-section" className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Generative Engine Optimization (GEO) Playbook</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Tactical engineering & content directives to increase <strong className="text-slate-200">{brandName}</strong>'s citation frequency and top ranking in LLMs
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Playbook Items Accordion */}
      <div className="space-y-3">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isCopied = copiedId === item.id;

          return (
            <div
              key={item.id}
              className="rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden transition-all"
            >
              {/* Header row */}
              <div
                onClick={() => setExpandedId(isExpanded ? null : item.id)}
                className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-slate-900/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                    <Zap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-xs font-bold text-white tracking-tight">{item.title}</h4>
                      <span
                        className={`px-1.5 py-0.2 rounded text-[10px] font-semibold uppercase tracking-wider border ${getPriorityBadge(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-[11px] text-slate-400 mt-0.5">
                      <span>Category: {item.category}</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold font-mono">{item.impact}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.id, item.actionableCode);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
                    title="Copy code template"
                  >
                    {isCopied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <div className="text-slate-400">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Expanded details */}
              {isExpanded && (
                <div className="p-3.5 border-t border-slate-900 bg-slate-900/30 space-y-3">
                  <p className="text-xs text-slate-300 leading-relaxed">{item.description}</p>

                  {/* Code snippet block */}
                  {item.actionableCode && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Code2 className="w-3 h-3 text-indigo-400" />
                          <span>Implementation Blueprint & Artifact</span>
                        </span>
                        <button
                          onClick={() => handleCopy(item.id, item.actionableCode)}
                          className="text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-sans"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400 font-medium">Copied to clipboard</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-200 overflow-x-auto leading-relaxed">
                        <code>{item.actionableCode}</code>
                      </pre>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
