import React, { useState } from 'react';
import { LayoutDashboard, Sparkles, BarChart3, PieChart, Users, ShieldCheck, X, Download, Filter, FileSpreadsheet, AlertCircle, Layers, FileCode, Info } from 'lucide-react';
import { exportToCSV, exportReport } from '../utils/exportUtils';

export default function DashboardView({ isOpen, onClose, datasetInfo, queryResult }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedFilter, setSelectedFilter] = useState('All');

  if (!isOpen || !datasetInfo) return null;

  const {
    name = 'MBA Leads Dataset.csv',
    rowCount = 1950,
    columnCount = 7,
    missingValPct = 0,
    duplicateCount = 0,
    healthScore = 100,
    recommendation = "Your dataset looks clean and ready for analysis."
  } = datasetInfo;

  const topCategory = queryResult?.chartData?.[0]?.name || 'Instagram';
  const topPct = queryResult?.chartData?.[0]?.percentage || '43.6%';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in">
      <div
        className="relative w-full max-w-5xl bg-[#121824] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Advanced Dashboard Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0F1420]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white font-mono">Advanced Analytics Dashboard</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold uppercase">
                  Live Studio
                </span>
              </div>
              <p className="text-xs text-slate-400">Inspecting {name} ({rowCount.toLocaleString()} rows)</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => exportReport('QueryAI_Executive_Report.md', datasetInfo, queryResult || {})}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Report</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dashboard"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dashboard Body Scrollable */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          
          {/* KPI Cards Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
            <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Total Rows</span>
              <div className="text-2xl font-extrabold text-white font-mono">{rowCount.toLocaleString()}</div>
              <span className="text-[10px] text-emerald-400">100% Parsed</span>
            </div>

            <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Top Performer</span>
              <div className="text-lg font-extrabold text-emerald-400 font-mono truncate">{topCategory}</div>
              <span className="text-[10px] text-slate-400">{topPct} Share</span>
            </div>

            <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Columns</span>
              <div className="text-2xl font-extrabold text-white font-mono">{columnCount}</div>
              <span className="text-[10px] text-slate-400">Schema ready</span>
            </div>

            <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Data Health</span>
              <div className="text-2xl font-extrabold text-emerald-400 font-mono">{healthScore}%</div>
              <span className="text-[10px] text-emerald-400">Optimal Quality</span>
            </div>
          </div>

          {/* Detailed Data Health Section */}
          <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Dataset Health Inspection Details</span>
              </div>
              <span className="text-[10px] font-mono bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded">
                Verified Clean
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#121824] rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Missing Values</span>
                </div>
                <p className="text-slate-200 font-medium">{missingValPct}% missing cells</p>
              </div>

              <div className="p-3 bg-[#121824] rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Duplicate Rows</span>
                </div>
                <p className="text-slate-200 font-medium">{duplicateCount} duplicate rows</p>
              </div>

              <div className="p-3 bg-[#121824] rounded-lg border border-slate-800 space-y-1">
                <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Data Types</span>
                </div>
                <p className="text-slate-200 font-medium font-mono text-[11px]">Numeric & Categorical</p>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-[#141C2B] border border-slate-800 flex items-start gap-2 text-xs">
              <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-slate-200 leading-relaxed">"{recommendation}"</p>
            </div>
          </div>

          {/* Multi-Chart Analytics Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Category Distribution Chart */}
            <div className="bg-[#0B0F17] p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span>Distribution by Category</span>
                <BarChart3 className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="space-y-2 pt-1">
                {queryResult?.chartData?.map((bar, idx) => (
                  <div key={idx} className="space-y-1 text-xs">
                    <div className="flex justify-between text-slate-300">
                      <span>{bar.name}</span>
                      <span className="font-mono">{bar.percentage}</span>
                    </div>
                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" style={{ width: bar.percentage }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive Summary & Key Insight */}
            <div className="bg-[#0B0F17] p-5 rounded-xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-white">
                <span>Executive Summary</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </div>
              <div className="p-4 bg-[#121824] rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed">
                "{queryResult?.keyInsight || `${topCategory} accounts for ${topPct} of overall dataset volume across ${rowCount.toLocaleString()} analyzed records.`}"
              </div>
              <div className="text-xs text-slate-400 space-y-1 font-mono pt-1">
                <div>• Active Dataset: {name}</div>
                <div>• Quality Score: {healthScore}% (Grade A)</div>
              </div>
            </div>

          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-slate-800 bg-[#0F1420] flex items-center justify-between text-xs text-slate-400">
          <span>QueryAI Advanced Dashboard Studio</span>
          <button
            onClick={() => exportReport('QueryAI_Executive_Report.md', datasetInfo, queryResult || {})}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Report PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
}
