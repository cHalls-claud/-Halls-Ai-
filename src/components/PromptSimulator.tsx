import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, XCircle, Link as LinkIcon, Sparkles, Loader2, Lightbulb } from 'lucide-react';
import { SimulationResult, QueryPerformance } from '../types';

interface PromptSimulatorProps {
  brandName: string;
  presetQueries: QueryPerformance[];
}

export const PromptSimulator: React.FC<PromptSimulatorProps> = ({ brandName, presetQueries }) => {
  const [customPrompt, setCustomPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const runSimulation = async (promptToRun: string) => {
    if (!promptToRun.trim()) return;
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/geo/simulate-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToRun,
          brandName: brandName,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      if (data.result) {
        setSimulationResult(data.result);
      }
    } catch (err: any) {
      console.error('Simulation error:', err);
      setErrorMsg('Failed to run live simulation. Please check connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectPreset = (queryText: string) => {
    setCustomPrompt(queryText);
    runSimulation(queryText);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPrompt.trim()) {
      runSimulation(customPrompt);
    }
  };

  return (
    <div id="prompt-simulator-section" className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>AI Prompt Simulation & Live Ranking Tester</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Test how AI engines respond to high-intent queries and whether <strong className="text-slate-200">{brandName}</strong> is recommended
          </p>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Sample High-Intent Buyer Queries:
        </span>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((pq, idx) => (
            <button
              key={idx}
              onClick={() => handleSelectPreset(pq.query)}
              disabled={isLoading}
              className="text-xs px-2.5 py-1.5 rounded-lg bg-slate-800/70 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/60 text-left transition-all flex items-center space-x-1.5 disabled:opacity-50"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              <span>{pq.query}</span>
              <span className="text-[10px] font-mono px-1 rounded bg-indigo-900/50 text-indigo-300 ml-1">
                Rank #{pq.brandRank}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Prompt Input Form */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          id="input-prompt-test"
          type="text"
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder={`e.g., What are the best tools for ${brandName}'s category? or Is ${brandName} good for high scale?`}
          disabled={isLoading}
          className="w-full pl-3.5 pr-28 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 text-xs placeholder:text-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
        />
        <button
          id="btn-run-simulation"
          type="submit"
          disabled={isLoading || !customPrompt.trim()}
          className="absolute right-1.5 top-1.5 bottom-1.5 px-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 text-white disabled:text-slate-500 font-semibold text-xs flex items-center space-x-1.5 transition-all shadow-sm"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Simulating...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Test AI</span>
            </>
          )}
        </button>
      </form>

      {errorMsg && (
        <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800/60 text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      {/* Simulation Result Output */}
      {simulationResult && (
        <div className="mt-4 p-4 rounded-xl bg-slate-950 border border-slate-800/90 space-y-3 animate-fadeIn">
          {/* Header & Badges */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold text-slate-300 font-mono">
                Query: "{simulationResult.prompt}"
              </span>
            </div>
            <div className="flex items-center space-x-2">
              {simulationResult.analysis.brandMentioned ? (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center space-x-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Mentioned in AI Answer</span>
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center space-x-1">
                  <XCircle className="w-3 h-3" />
                  <span>Not Mentioned</span>
                </span>
              )}

              {simulationResult.analysis.rankPosition !== null && (
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                  Ranked #{simulationResult.analysis.rankPosition}
                </span>
              )}
            </div>
          </div>

          {/* AI Generated Response Text */}
          <div className="text-xs text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/60">
            <div className="text-[10px] uppercase font-bold text-slate-500 mb-1 tracking-wider">
              Simulated Generative Engine Answer:
            </div>
            <p className="whitespace-pre-line">{simulationResult.generatedResponse}</p>
          </div>

          {/* Citation Links & GEO Optimization Tip */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {/* Citations identified */}
            <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/60 space-y-1.5">
              <div className="text-[11px] font-semibold text-slate-400 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-indigo-400" />
                <span>Citations & Referenced Sources:</span>
              </div>
              {simulationResult.analysis.citationsIdentified.length > 0 ? (
                <ul className="space-y-1 text-xs text-indigo-300">
                  {simulationResult.analysis.citationsIdentified.map((url, i) => (
                    <li key={i} className="truncate hover:underline">
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-xs text-slate-500 italic">
                  No direct external citation footnoted in this generative passage.
                </span>
              )}
            </div>

            {/* GEO Tip */}
            <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-500/20 space-y-1.5">
              <div className="text-[11px] font-semibold text-indigo-300 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                <span>Actionable GEO Optimization Tip:</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {simulationResult.analysis.geoOptimizationTip}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
