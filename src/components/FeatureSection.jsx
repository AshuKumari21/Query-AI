import React from 'react';
import { FEATURES } from '../data/mockData';
import { MessageSquare, BarChart2, TrendingUp, RefreshCw, Files, FileText, CheckCircle, Sparkles, ArrowRight } from 'lucide-react';

export default function FeatureSection() {
  const getMicroUi = (type) => {
    switch (type) {
      case 'query-box':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-2 font-mono">
            <div className="text-slate-400 text-[10px] uppercase">Query Input</div>
            <div className="text-emerald-400 font-semibold bg-[#121824] p-2 rounded border border-slate-700/60 truncate">
              "Which platform generated the most leads?"
            </div>
            <div className="text-slate-500 text-[10px] flex items-center gap-1">
              <CheckCircle className="w-3 h-3 text-emerald-400" />
              <span>SQL generated: SELECT platform, COUNT(*)...</span>
            </div>
          </div>
        );
      case 'chart-picker':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-[10px] text-slate-400">
              <span>Chart Type</span>
              <span className="text-emerald-400 font-semibold">Auto-Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-semibold text-[11px] border border-emerald-500/30">
                Bar Chart
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">
                Donut
              </span>
              <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-400 text-[11px]">
                Line Trend
              </span>
            </div>
          </div>
        );
      case 'insight-card':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-amber-400 font-semibold text-[11px]">Anomaly Detector</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[9px] font-mono">+42% Spike</span>
            </div>
            <p className="text-[11px] text-slate-300">
              Organic leads surged 42% in March following content launch.
            </p>
          </div>
        );
      case 'thread':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-2">
            <div className="p-1.5 rounded bg-slate-800/80 text-slate-300 text-[11px]">
              Q1: "Which platform performed best?"
            </div>
            <div className="p-1.5 rounded bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] font-medium">
              Q2: "What about in Texas only?"
            </div>
          </div>
        );
      case 'file-list':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-1.5">
            <div className="flex items-center justify-between p-1.5 rounded bg-[#131B28] text-slate-200 text-[11px]">
              <span className="font-mono text-emerald-400">MBA_Leads.csv</span>
              <span className="text-[10px] text-slate-400">Active</span>
            </div>
            <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 text-slate-400 text-[11px]">
              <span className="font-mono">Q1_Sales_Data.csv</span>
              <span className="text-[10px] text-slate-500">Ready</span>
            </div>
          </div>
        );
      case 'explanation':
        return (
          <div className="bg-[#090D15] p-3 rounded-lg border border-slate-800 text-xs space-y-1">
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">Decision Summary</span>
            <p className="text-[11px] text-slate-300 leading-snug">
              Reallocate 15% budget from low-performing channels to Instagram for +280 monthly leads.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0B0F17] relative" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Everything you need to understand your data.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Built from the ground up to replace manual spreadsheets, SQL queries, and complex dashboard software.
          </p>
        </div>

        {/* 6 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {FEATURES.map((feat) => (
            <div
              key={feat.id}
              className="bg-[#121824] border border-slate-800 rounded-2xl p-6 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-5 group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {feat.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition-colors" />
                </div>

                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>

              {/* Realistic Visual UI Example Widget */}
              <div className="pt-3 border-t border-slate-800/80">
                {getMicroUi(feat.uiPreviewType)}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
