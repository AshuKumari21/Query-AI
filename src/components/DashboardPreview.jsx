import React, { useState } from 'react';
import { BarChart3, PieChart, Users, Layers, MapPin, Sparkles, Filter, Download, HelpCircle, Lightbulb, Check, X, FileText, Share2 } from 'lucide-react';

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState('platform');
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterActive, setFilterActive] = useState(false);

  return (
    <section className="py-20 sm:py-28 bg-[#090D15] border-t border-slate-800/80 relative" id="showcase">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Studio Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            See the analysis, not just the promise.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            A real look at how QueryAI structures insights from your uploaded datasets.
          </p>
        </div>

        {/* Large Dashboard Application Preview Container */}
        <div className="bg-[#121824] border border-slate-800 rounded-2xl shadow-2xl shadow-black/90 overflow-hidden">
          
          {/* Dashboard Header Bar */}
          <div className="bg-[#0D131F] px-4 sm:px-6 py-4 border-b border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-mono">MBA Leads Dataset</h3>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded uppercase tracking-wider">
                    Demo analysis
                  </span>
                </div>
                <p className="text-xs text-slate-400">1,950 records • Updated 2 mins ago</p>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end text-xs">
              <button
                onClick={() => setFilterActive(!filterActive)}
                className={`px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  filterActive ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-semibold' : 'bg-slate-800 text-slate-300 border-slate-700/60 hover:text-white'
                }`}
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{filterActive ? 'Filter Active (High Conversion)' : 'Filter (All Records)'}</span>
              </button>
              <button
                onClick={() => setShowExportModal(true)}
                className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5 hover:bg-emerald-500/30 transition-colors font-semibold shadow-md shadow-emerald-500/10"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </button>
            </div>
          </div>

          {/* Main Dashboard Content Grid */}
          <div className="p-4 sm:p-8 space-y-8">
            
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Total Leads</span>
                  <Users className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                  {filterActive ? '850' : '1,950'}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <span>{filterActive ? 'Filtered by Top Platform' : 'Sample dataset count'}</span>
                </div>
              </div>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Platforms</span>
                  <BarChart3 className="w-4 h-4 text-teal-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">3</div>
                <div className="text-[11px] text-slate-400">Instagram, Google, FB</div>
              </div>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Campaigns</span>
                  <Layers className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">7</div>
                <div className="text-[11px] text-slate-400">Active ad variations</div>
              </div>

              <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800/80 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Cities</span>
                  <MapPin className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">43</div>
                <div className="text-[11px] text-slate-400">Geographic spread</div>
              </div>
            </div>

            {/* AI Query & Response Showcase Box */}
            <div className="bg-[#0B0F17] rounded-xl border border-slate-800 p-5 space-y-4">
              
              <div className="flex items-start gap-3 pb-4 border-b border-slate-800/80">
                <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shrink-0 text-teal-400">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-semibold text-slate-400 uppercase">Natural-language Question</span>
                  <p className="text-base font-bold text-white mt-0.5">"Which platform performed best?"</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
                  <Check className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-semibold text-emerald-400 uppercase">AI Answer</span>
                  <p className="text-base font-semibold text-slate-100 leading-snug">
                    "Instagram generated the highest number of leads in this dataset."
                  </p>
                </div>
              </div>

            </div>

            {/* Interactive Tabbed Chart Area */}
            <div className="bg-[#0B0F17] p-5 rounded-xl border border-slate-800 space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('platform')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'platform' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Leads by Platform
                  </button>
                  <button
                    onClick={() => setActiveTab('campaign')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'campaign' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Campaign Breakdown
                  </button>
                  <button
                    onClick={() => setActiveTab('city')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      activeTab === 'city' ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/20' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Top Cities
                  </button>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Real-time Visualization</span>
              </div>

              {/* Chart Content View */}
              {activeTab === 'platform' && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span className="text-emerald-400 font-bold">Instagram (850 leads)</span>
                      <span className="font-mono">43.6%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full w-[43.6%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Google Search (620 leads)</span>
                      <span className="font-mono">31.8%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-teal-500/80 rounded-full w-[31.8%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Facebook Ads (480 leads)</span>
                      <span className="font-mono">24.6%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-cyan-500/80 rounded-full w-[24.6%]"></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'campaign' && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span className="text-emerald-400 font-bold">Spring Growth Blitz (612 leads)</span>
                      <span className="font-mono">31.4%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-emerald-500 rounded-full w-[31.4%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Retargeting V2 (485 leads)</span>
                      <span className="font-mono">24.9%</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-teal-500/80 rounded-full w-[24.9%]"></div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'city' && (
                <div className="space-y-3 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span className="text-emerald-400 font-bold">Austin (14.8% Conv.)</span>
                      <span className="font-mono">Top Conv.</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-emerald-500 rounded-full w-[85%]"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium text-slate-300">
                      <span>Seattle (12.3% Conv.)</span>
                      <span className="font-mono">High</span>
                    </div>
                    <div className="h-4 bg-slate-800 rounded-full overflow-hidden p-0.5">
                      <div className="h-full bg-teal-500/80 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                </div>
              )}

            </div>

            {/* Insight Box */}
            <div className="bg-[#151D2A] p-4 rounded-xl border border-slate-800 flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                <Lightbulb className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Key Insight</span>
                <p className="text-xs sm:text-sm text-slate-200 mt-0.5 leading-relaxed">
                  Instagram accounts for the largest share of leads, making it the strongest-performing platform in the selected sample.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Export Report Preview Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-[#121824] border border-slate-700/80 rounded-2xl shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" />
                <h4 className="font-bold text-white text-base">Executive Briefing Report</h4>
              </div>
              <button
                onClick={() => setShowExportModal(false)}
                className="p-1 rounded text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-[#0B0F17] p-4 rounded-xl border border-slate-800 space-y-3 text-xs font-mono text-slate-300">
              <div className="text-emerald-400 font-bold text-sm font-sans"># Executive Report: MBA Leads Dataset</div>
              <p className="text-slate-400 font-sans text-xs">Generated by QueryAI on 2026-08-19</p>
              
              <div className="pt-2 space-y-1">
                <div className="font-bold text-white font-sans">• Primary Answer:</div>
                <div className="pl-3 text-emerald-300 font-sans font-medium">"Instagram generated the highest number of leads."</div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white font-sans">• Key Metrics:</div>
                <div className="pl-3 space-y-0.5 text-slate-400">
                  <div>- Total Analyzed Rows: 1,950</div>
                  <div>- Instagram Share: 850 leads (43.6%)</div>
                  <div>- Google Search Share: 620 leads (31.8%)</div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="font-bold text-white font-sans">• Actionable Recommendation:</div>
                <div className="pl-3 text-amber-300 font-sans">Scale Instagram ad allocation by 25% to maximize high-intent customer acquisition.</div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-[11px] text-slate-500">Formats: PDF, Markdown, CSV</span>
              <button
                onClick={() => {
                  alert("Executive Briefing Report exported successfully!");
                  setShowExportModal(false);
                }}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold text-xs rounded-lg flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download PDF Report</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
