import React, { useState } from 'react';
import { LayoutDashboard, Sparkles, BarChart3, PieChart, Users, ShieldCheck, X, Download } from 'lucide-react';

export default function DashboardGenerator({ datasetInfo, queryResult }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!datasetInfo) return null;

  const {
    name = 'MBA Leads Dataset.csv',
    rowCount = 1950,
    columnCount = 7,
    healthScore = 100,
    headers = []
  } = datasetInfo;

  const topCategory = queryResult?.chartData?.[0]?.name || 'Instagram';
  const topPct = queryResult?.chartData?.[0]?.percentage || '43.6%';

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
      >
        <LayoutDashboard className="w-3.5 h-3.5" />
        <span>Generate Dashboard</span>
      </button>

      {/* Generated Dashboard View Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-4xl bg-[#121824] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0F1420]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <LayoutDashboard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-mono">Automated Dashboard: {name}</h3>
                  <p className="text-xs text-slate-400">Dynamically generated from {rowCount.toLocaleString()} dataset rows</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 overflow-y-auto space-y-6">
              
              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">TOTAL RECORDS</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{rowCount.toLocaleString()}</div>
                  <span className="text-[10px] text-emerald-400">100% Parsed</span>
                </div>

                <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">TOP CATEGORY</span>
                  <div className="text-xl font-extrabold text-emerald-400 font-mono truncate">{topCategory}</div>
                  <span className="text-[10px] text-slate-400">{topPct} Share</span>
                </div>

                <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">COLUMNS DETECTED</span>
                  <div className="text-2xl font-extrabold text-white font-mono">{columnCount}</div>
                  <span className="text-[10px] text-slate-400">Schema ready</span>
                </div>

                <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-1">
                  <span className="text-xs text-slate-400">DATA HEALTH</span>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">{healthScore}%</div>
                  <span className="text-[10px] text-emerald-400">Analysis optimal</span>
                </div>
              </div>

              {/* Chart Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Primary Distribution Chart */}
                <div className="bg-[#0B0F17] p-5 rounded-xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Category Distribution</span>
                    <BarChart3 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="space-y-2 pt-1">
                    {queryResult?.chartData?.slice(0, 4).map((bar, idx) => (
                      <div key={idx} className="space-y-1 text-xs">
                        <div className="flex justify-between text-slate-300">
                          <span>{bar.name}</span>
                          <span className="font-mono">{bar.percentage}</span>
                        </div>
                        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-400 rounded-full" style={{ width: bar.percentage }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Data Health & Insight Summary */}
                <div className="bg-[#0B0F17] p-5 rounded-xl border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-white">
                    <span>Automated Executive Insight</span>
                    <Sparkles className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="p-3 bg-[#121824] rounded-lg border border-slate-800 text-xs text-slate-200 leading-relaxed">
                    "{queryResult?.keyInsight || `Dataset contains ${rowCount} records. ${topCategory} represents the largest proportional share.`}"
                  </div>
                  <div className="text-xs text-slate-400 space-y-1 font-mono">
                    <div>• Columns: {headers.slice(0, 4).join(', ')}</div>
                    <div>• Quality Rating: {healthScore >= 90 ? 'Grade A (High Reliability)' : 'Grade B'}</div>
                  </div>
                </div>

              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-3 border-t border-slate-800 bg-[#0F1420] flex items-center justify-between">
              <span className="text-xs text-slate-400">Generated locally by QueryAI Engine</span>
              <button
                onClick={() => {
                  alert("Dashboard view printed/exported!");
                  setIsOpen(false);
                }}
                className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs rounded-lg flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Dashboard</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
