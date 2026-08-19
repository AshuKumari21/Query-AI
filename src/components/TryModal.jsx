import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, FileText, CheckCircle2, ArrowRight, Loader2, BarChart2 } from 'lucide-react';
import { DATASETS, MOCK_ANALYSES } from '../data/mockData';

export default function TryModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1); // 1: Dataset choice / upload, 2: Query input, 3: Result
  const [selectedDs, setSelectedDs] = useState(DATASETS[0]);
  const [customQuestion, setCustomQuestion] = useState("Which campaign generated the most leads?");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleRunAnalysis = (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      const match = MOCK_ANALYSES[customQuestion] || MOCK_ANALYSES["Which campaign generated the most leads?"];
      setResult(match);
      setIsProcessing(false);
      setStep(3);
    }, 450);
  };

  const handleReset = () => {
    setStep(1);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-[#121824] border border-slate-700/80 rounded-2xl shadow-2xl shadow-black overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0F1420]">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-white text-base">Try QueryAI Interactive Workspace</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Stepper Progress */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-slate-800 pb-3">
            <span className={step >= 1 ? "text-emerald-400 font-semibold" : ""}>1. Select Dataset</span>
            <span>→</span>
            <span className={step >= 2 ? "text-emerald-400 font-semibold" : ""}>2. Ask Question</span>
            <span>→</span>
            <span className={step === 3 ? "text-emerald-400 font-semibold" : ""}>3. Insights</span>
          </div>

          {step === 1 && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-lg font-bold text-white">Choose a sample dataset or drop a CSV</h4>
                <p className="text-xs text-slate-400 mt-1">Select one of our pre-parsed sample datasets to test analysis speeds.</p>
              </div>

              {/* Dataset Cards */}
              <div className="space-y-2.5">
                {DATASETS.map((ds) => (
                  <button
                    key={ds.id}
                    onClick={() => setSelectedDs(ds)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                      selectedDs.id === ds.id
                        ? 'bg-[#182335] border-emerald-500 text-white shadow-md'
                        : 'bg-[#0B0F17] border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <FileText className={`w-5 h-5 ${selectedDs.id === ds.id ? 'text-emerald-400' : 'text-slate-400'}`} />
                      <div>
                        <div className="font-mono font-semibold text-sm">{ds.name}</div>
                        <div className="text-[11px] text-slate-500">{ds.rowCount} rows • {ds.size}</div>
                      </div>
                    </div>
                    {selectedDs.id === ds.id && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  </button>
                ))}
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2"
                >
                  <span>Continue to Query</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleRunAnalysis} className="space-y-4 animate-fade-in">
              <div>
                <h4 className="text-lg font-bold text-white">Ask anything about {selectedDs.name}</h4>
                <p className="text-xs text-slate-400 mt-1">Type your question in natural language below.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-400">Natural-Language Query</label>
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. Which platform generated the most leads?"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white"
                >
                  ← Back to Datasets
                </button>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-sm rounded-lg transition-all flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Run Query</span>
                      <Sparkles className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && result && (
            <div className="space-y-5 animate-fade-in">
              <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 space-y-1">
                <span className="text-[11px] font-mono text-emerald-400 font-semibold uppercase">Query Result</span>
                <p className="text-base font-bold text-white">"{result.answer}"</p>
              </div>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                  <span>{result.chartTitle}</span>
                  <BarChart2 className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="space-y-2">
                  {result.chartData.map((bar, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-300">
                        <span>{bar.name}</span>
                        <span className="font-mono">{bar.percentage}</span>
                      </div>
                      <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: bar.percentage }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white bg-slate-800 rounded-lg"
                >
                  Try Another Dataset
                </button>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-sm rounded-lg"
                >
                  Close & Continue Exploring
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
