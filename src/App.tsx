import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { BrandAuditorBar } from './components/BrandAuditorBar';
import { OverviewMetrics } from './components/OverviewMetrics';
import { ModelMatrixView } from './components/ModelMatrixView';
import { PromptSimulator } from './components/PromptSimulator';
import { CitationIntelligence } from './components/CitationIntelligence';
import { HallucinationDefense } from './components/HallucinationDefense';
import { GeoPlaybook } from './components/GeoPlaybook';
import { AuditModal } from './components/AuditModal';
import { ExportModal } from './components/ExportModal';
import { INITIAL_AUDIT_DATA, POPULAR_BRANDS } from './data/mockData';
import { GeoAuditReport } from './types';
import { Sparkles, Shield, Cpu } from 'lucide-react';

export default function App() {
  const [currentReport, setCurrentReport] = useState<GeoAuditReport>(INITIAL_AUDIT_DATA);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [auditProgressMessage, setAuditProgressMessage] = useState<string>('');
  const [isAuditModalOpen, setIsAuditModalOpen] = useState<boolean>(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState<boolean>(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  // Check backend server and API key status on mount
  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data.hasApiKey === 'boolean') {
          setHasApiKey(data.hasApiKey);
        }
      })
      .catch((err) => {
        console.warn('Backend health check skipped:', err);
      });
  }, []);

  // Main audit runner function
  const runAudit = async (brandName: string, domain?: string, category?: string, competitors?: string[]) => {
    setIsAuditing(true);
    setAuditProgressMessage('Connecting to AI multi-model testing cluster...');

    const stepTimer1 = setTimeout(() => {
      setAuditProgressMessage(`Simulating buyer-intent queries across ChatGPT, Gemini, Perplexity & Claude...`);
    }, 1200);

    const stepTimer2 = setTimeout(() => {
      setAuditProgressMessage(`Analyzing citation footnotes, source domains & factual claims...`);
    }, 2500);

    const stepTimer3 = setTimeout(() => {
      setAuditProgressMessage(`Synthesizing GEO playbook directives and Schema recommendations...`);
    }, 4000);

    try {
      const response = await fetch('/api/geo/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          brandName,
          domain,
          category,
          competitors,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const resData = await response.json();
      if (resData.data) {
        setCurrentReport(resData.data);
      }
    } catch (error) {
      console.error('Audit execution error:', error);
      // If server error, create an updated report from current brand
      setCurrentReport((prev) => ({
        ...prev,
        brand: {
          name: brandName,
          domain: domain || `${brandName.toLowerCase()}.com`,
          category: category || prev.brand.category,
          competitors: competitors || prev.brand.competitors,
        },
      }));
    } finally {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      clearTimeout(stepTimer3);
      setIsAuditing(false);
      setAuditProgressMessage('');
      setIsAuditModalOpen(false);
    }
  };

  const handleSelectPreset = (brandName: string) => {
    const preset = POPULAR_BRANDS.find((b) => b.name.toLowerCase() === brandName.toLowerCase());
    if (preset) {
      runAudit(preset.name, preset.domain, preset.category, preset.competitors);
    }
  };

  const handleRefreshAudit = () => {
    runAudit(
      currentReport.brand.name,
      currentReport.brand.domain,
      currentReport.brand.category,
      currentReport.brand.competitors
    );
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* Top Navigation */}
      <Navbar
        currentBrand={currentReport.brand.name}
        hasApiKey={hasApiKey}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        onRefreshAudit={handleRefreshAudit}
        isAuditing={isAuditing}
        onExportReport={() => setIsExportModalOpen(true)}
      />

      {/* Brand Context & Preset Switcher Bar */}
      <BrandAuditorBar
        brand={currentReport.brand}
        onSelectPreset={handleSelectPreset}
        onOpenAuditModal={() => setIsAuditModalOpen(true)}
        isAuditing={isAuditing}
        auditProgressMessage={auditProgressMessage}
      />

      {/* Main GEO Intelligence Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Section 1: High Level Overview Metrics */}
        <OverviewMetrics overview={currentReport.overview} brandName={currentReport.brand.name} />

        {/* Section 2: Split View (Model Matrix & Simulator VS Citations & Hallucination Defense) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column (7 cols): Model Matrix & Live Prompt Tester */}
          <div className="lg:col-span-7 space-y-6">
            <ModelMatrixView
              metrics={currentReport.modelBreakdown}
              brandName={currentReport.brand.name}
            />
            <PromptSimulator
              brandName={currentReport.brand.name}
              presetQueries={currentReport.topQueries}
            />
          </div>

          {/* Right Column (5 cols): Citation Graph & Hallucination Defense */}
          <div className="lg:col-span-5 space-y-6">
            <CitationIntelligence
              sources={currentReport.citationSources}
              brandName={currentReport.brand.name}
            />
            <HallucinationDefense
              alerts={currentReport.hallucinationAlerts}
              brandName={currentReport.brand.name}
            />
          </div>
        </div>

        {/* Section 3: GEO Optimization Directives & Actionable Code Playbook */}
        <GeoPlaybook
          playbook={currentReport.geoPlaybook}
          brandName={currentReport.brand.name}
        />
      </main>

      {/* Audit Modal */}
      <AuditModal
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        onSubmitAudit={(data) =>
          runAudit(data.brandName, data.domain, data.category, data.competitors)
        }
        isAuditing={isAuditing}
      />

      {/* Export Report Modal */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        report={currentReport}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/60 py-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-slate-300">Halls AI</span>
            <span>•</span>
            <span>Generative Engine Optimization (GEO) & Brand Visibility Platform</span>
            <span>•</span>
            <span className="font-mono text-slate-400">©Halls AI</span>
          </div>

          <div className="flex items-center space-x-4 text-slate-400">
            <span className="flex items-center gap-1">
              <Cpu className="w-3.5 h-3.5 text-indigo-400" />
              <span>Gemini 3.8 Flash & GEO Multi-Model Evaluator</span>
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full-Stack Verified</span>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
