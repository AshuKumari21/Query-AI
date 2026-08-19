import React, { useState, useEffect, useRef } from 'react';
import { DATASETS, MOCK_ANALYSES, SAMPLE_QUESTIONS } from '../data/mockData';
import { parseCSV, analyzeQuery } from '../utils/csvParser';
import { exportToCSV, exportReport } from '../utils/exportUtils';
import ChartExplanation from './ChartExplanation';
import DashboardView from './DashboardView';
import AnalysisHistory from './AnalysisHistory';

import { Sparkles, FileText, Send, Lightbulb, ChevronDown, Check, Loader2, Code, BarChart2, PieChart, Table, Upload, Copy, CornerDownRight, Download, AlertCircle, LayoutDashboard, ShieldCheck } from 'lucide-react';

const INITIAL_DEMO_RESULT = {
  isSuccess: true,
  visualizationType: 'bar',
  answer: MOCK_ANALYSES["Which platform generated the most leads?"].answer,
  metricLabel: MOCK_ANALYSES["Which platform generated the most leads?"].metricLabel,
  metricValue: MOCK_ANALYSES["Which platform generated the most leads?"].metricValue,
  chartTitle: MOCK_ANALYSES["Which platform generated the most leads?"].chartTitle,
  chartData: MOCK_ANALYSES["Which platform generated the most leads?"].chartData,
  gridRows: MOCK_ANALYSES["Which platform generated the most leads?"].chartData.map(d => ({ Platform: d.name, Leads: d.value, Share: d.percentage })),
  keyInsight: MOCK_ANALYSES["Which platform generated the most leads?"].keyInsight,
  sqlEquivalent: MOCK_ANALYSES["Which platform generated the most leads?"].sqlEquivalent,
  followUps: MOCK_ANALYSES["Which platform generated the most leads?"].followUps,
  chartExplanation: {
    whatYouSee: "Instagram leads the dataset with 850 leads (43.6%).",
    whatStandsOut: "Instagram generated 37.1% more leads than Google Search.",
    exploreNext: "Filter by campaign or city breakdown for Instagram."
  }
};

export default function QueryDemo({ activeQuestion, onSelectQuestion }) {
  // Active dataset state
  const [selectedDataset, setSelectedDataset] = useState(DATASETS[0]);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  // Active query & view state
  const [queryInput, setQueryInput] = useState("Which platform generated the most leads?");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(true);
  const [activeViewMode, setActiveViewMode] = useState('chart'); // 'chart' | 'pie' | 'table' | 'sql'
  const [copiedSql, setCopiedSql] = useState(false);
  const [dashboardModalOpen, setDashboardModalOpen] = useState(false);

  // Active filters & history
  const [activeFilters, setActiveFilters] = useState({});
  const [analysisResult, setAnalysisResult] = useState(INITIAL_DEMO_RESULT);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const fileInputRef = useRef(null);

  useEffect(() => {
    runAnalysis("Which platform generated the most leads?", {}, selectedDataset);
  }, []);

  useEffect(() => {
    if (activeQuestion) {
      setQueryInput(activeQuestion);
      runAnalysis(activeQuestion, activeFilters, selectedDataset);
    }
  }, [activeQuestion]);

  const runAnalysis = (queryToRun, filtersToApply = activeFilters, targetDataset = selectedDataset) => {
    const q = queryToRun || queryInput;
    setIsLoading(true);

    setTimeout(() => {
      let res;
      if (parsedData) {
        res = analyzeQuery(parsedData, q, filtersToApply);
      } else {
        const hasFilters = Object.values(filtersToApply).some(v => v && v !== 'All');

        if (!hasFilters && MOCK_ANALYSES[q]) {
          const match = MOCK_ANALYSES[q];
          res = {
            isSuccess: true,
            visualizationType: 'bar',
            answer: match.answer,
            metricLabel: match.metricLabel,
            metricValue: match.metricValue,
            chartTitle: match.chartTitle,
            chartData: match.chartData,
            gridRows: match.chartData.map(d => ({ Platform: d.name, Leads: d.value, Share: d.percentage })),
            keyInsight: match.keyInsight,
            sqlEquivalent: match.sqlEquivalent,
            followUps: match.followUps,
            chartExplanation: {
              whatYouSee: `${match.chartData[0]?.name || 'Instagram'} leads the dataset with ${match.chartData[0]?.value} leads (${match.chartData[0]?.percentage}).`,
              whatStandsOut: `${match.chartData[0]?.name || 'Instagram'} generated 37.1% more leads than Google Search.`,
              exploreNext: `Filter by campaign or city breakdown for Instagram.`
            }
          };
        } else if (hasFilters) {
          const platformFilter = filtersToApply.Platform || 'All';
          const campaignFilter = filtersToApply.Campaign || 'All';
          const cityFilter = filtersToApply.City || 'All';

          let leadCount = 1950;
          let platformName = platformFilter !== 'All' ? platformFilter : 'Instagram';
          let campaignName = campaignFilter !== 'All' ? campaignFilter : 'Spring Growth';
          let cityName = cityFilter !== 'All' ? cityFilter : 'Austin';

          if (platformFilter === 'Instagram') leadCount = 850;
          else if (platformFilter === 'Google Search') leadCount = 620;
          else if (platformFilter === 'Facebook Ads') leadCount = 480;

          if (campaignFilter !== 'All') leadCount = Math.round(leadCount * 0.45);
          if (cityFilter !== 'All') leadCount = Math.round(leadCount * 0.35);

          const filterPct = ((leadCount / 1950) * 100).toFixed(1);

          res = {
            isSuccess: true,
            visualizationType: 'bar',
            answer: `Filtered Result: ${platformName} (${campaignName}) in ${cityName} accounts for ${leadCount.toLocaleString()} leads (${filterPct}% of dataset).`,
            metricLabel: 'Filtered Segment Volume',
            metricValue: `${leadCount.toLocaleString()} leads`,
            chartTitle: `Filtered Segment: ${platformName} / ${campaignName}`,
            chartData: [
              { name: `${platformName} (${cityName})`, value: leadCount, percentage: `${filterPct}%`, color: '#10B981', isTop: true },
              { name: `Other ${platformName} Funnels`, value: Math.round(leadCount * 0.4), percentage: `${(filterPct * 0.4).toFixed(1)}%`, color: '#14B8A6', isTop: false }
            ],
            gridRows: [
              { Platform: platformName, Campaign: campaignName, City: cityName, Leads: leadCount, Share: `${filterPct}%` }
            ],
            keyInsight: `Selected filter criteria (${platformName}, ${campaignName}, ${cityName}) yields ${leadCount.toLocaleString()} qualified records.`,
            sqlEquivalent: `SELECT platform, campaign, city, COUNT(*) FROM dataset WHERE platform = '${platformName}' AND campaign = '${campaignName}' AND city = '${cityName}' GROUP BY 1,2,3;`,
            followUps: [
              `What is the conversion rate for ${platformName} in ${cityName}?`,
              `Compare ${campaignName} with other campaigns`
            ],
            chartExplanation: {
              whatYouSee: `Filtered analysis for ${platformName} channel segment.`,
              whatStandsOut: `${leadCount.toLocaleString()} records match selected filter options.`,
              exploreNext: `Reset filters to compare across all platforms.`
            }
          };
        } else {
          const virtualData = {
            headers: targetDataset.columns || ['Platform', 'Campaign', 'City', 'Spend_USD'],
            rows: targetDataset.sampleRows || [],
            rowCount: targetDataset.rowCount || 1950,
            columnTypes: { Platform: 'text', Campaign: 'text', City: 'text', Spend_USD: 'numeric' }
          };
          res = analyzeQuery(virtualData, q, filtersToApply);
        }
      }

      setIsLoading(false);
      setHasAnalyzed(true);

      if (res && res.isSuccess) {
        setAnalysisHistory(prev => [
          { query: q, answer: res.answer, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), result: res },
          ...prev.slice(0, 9)
        ]);
      }
    }, 380);
  };

  const handleAnalyzeSubmit = (e) => {
    e?.preventDefault();
    if (!queryInput.trim()) return;
    runAnalysis(queryInput);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      alert("Invalid file format. Please upload a .csv file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result;
      if (text) {
        const parsed = parseCSV(text);
        if (parsed && parsed.rows.length > 0) {
          setUploadedFileName(file.name);
          setParsedData(parsed);
          setActiveFilters({});

          const customDsObj = {
            id: 'uploaded-csv',
            name: file.name,
            size: `${(file.size / 1024).toFixed(1)} KB`,
            rowCount: parsed.rowCount,
            columnCount: parsed.columnCount,
            missingValPct: parsed.missingValPct,
            duplicateCount: parsed.duplicateCount,
            healthScore: parsed.healthScore,
            recommendation: parsed.recommendation,
            columns: parsed.headers,
            sampleRows: parsed.rows.slice(0, 5)
          };

          setSelectedDataset(customDsObj);
          runAnalysis(queryInput, {}, customDsObj);
        } else {
          alert("Malformed CSV file. Could not parse rows.");
        }
      }
    };
    reader.readAsText(file);
  };

  const handleFollowUpClick = (fUpText) => {
    setQueryInput(fUpText);
    runAnalysis(fUpText);
  };

  const handleCopySql = () => {
    if (analysisResult?.sqlEquivalent) {
      navigator.clipboard.writeText(analysisResult.sqlEquivalent);
      setCopiedSql(true);
      setTimeout(() => setCopiedSql(false), 2000);
    }
  };

  const currentDatasetInfo = {
    name: uploadedFileName || selectedDataset.name,
    rowCount: parsedData ? parsedData.rowCount : selectedDataset.rowCount,
    columnCount: parsedData ? parsedData.columnCount : (selectedDataset.columns?.length || 7),
    missingValPct: parsedData ? parsedData.missingValPct : 0,
    duplicateCount: parsedData ? parsedData.duplicateCount : 0,
    healthScore: parsedData ? parsedData.healthScore : 100,
    recommendation: parsedData ? parsedData.recommendation : "Your dataset looks clean and ready for analysis."
  };

  const activeResult = analysisResult || INITIAL_DEMO_RESULT;

  return (
    <div className="w-full bg-[#121824] rounded-2xl border border-slate-800 shadow-2xl shadow-black/80 overflow-hidden space-y-0">
      
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv"
        className="hidden"
      />

      {/* Sleek Studio Window Bar */}
      <div className="bg-[#0F1420] px-4 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>
          </div>
          <span className="ml-1.5 font-mono text-slate-400 font-medium text-[11px]">QueryAI Analytics Studio v2.4</span>
        </div>

        {/* Dataset Pill & Action Controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#1A2332] text-xs font-mono text-emerald-300 border border-slate-700/60">
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span className="truncate max-w-[140px] font-semibold">{currentDatasetInfo.name}</span>
            <span className="text-[10px] text-slate-500">({currentDatasetInfo.rowCount.toLocaleString()} rows)</span>
          </div>

          <button
            onClick={() => setDashboardModalOpen(true)}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-lg transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Advanced Dashboard</span>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-white rounded-lg transition-all shadow-md shadow-emerald-500/20 active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload CSV</span>
          </button>
        </div>
      </div>

      {/* Main Clean Workspace Body */}
      <div className="p-4 sm:p-5 space-y-4">

        {/* Query Input Box */}
        <form onSubmit={handleAnalyzeSubmit} className="relative">
          <div className="relative flex items-center bg-[#0B0F17] rounded-xl border border-slate-700/80 focus-within:border-emerald-500/80 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all p-1">
            <div className="pl-3 text-emerald-400">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </div>
            <input
              type="text"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask a question about your dataset..."
              className="w-full bg-transparent px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none font-medium"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-white font-semibold text-xs sm:text-sm rounded-lg transition-all flex items-center gap-1.5 shadow-md shadow-emerald-500/20 active:scale-95 shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>Analyze</span>
                  <Send className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Preset Sample Prompt Chips */}
        <div className="flex flex-wrap gap-1.5 text-[10px]">
          {SAMPLE_QUESTIONS.slice(0, 3).map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQueryInput(q);
                runAnalysis(q);
              }}
              className="px-2.5 py-1 rounded-md bg-[#16202E] hover:bg-[#1F2B3E] text-slate-300 hover:text-emerald-300 border border-slate-700/50 transition-colors text-left truncate max-w-[220px]"
            >
              "{q}"
            </button>
          ))}
        </div>

        {/* Output Screen — Clean, Sleek, Instant Graph */}
        <div className="min-h-[280px] bg-[#0A0E17] rounded-xl border border-slate-800/80 p-4 sm:p-5 relative overflow-hidden flex flex-col justify-between space-y-3.5">
          
          {isLoading ? (
            <div className="py-12 flex flex-col items-center justify-center space-y-3 animate-fade-in">
              <div className="relative">
                <div className="w-10 h-10 rounded-full border-2 border-emerald-500/20 border-t-emerald-400 animate-spin"></div>
                <Sparkles className="w-4 h-4 text-emerald-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <div className="text-center text-xs">
                <p className="font-medium text-slate-200">Analyzing {currentDatasetInfo.name}...</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Running column vector aggregations</p>
              </div>
            </div>
          ) : activeResult ? (
            <div className="space-y-3.5 animate-fade-in">
              
              {/* Answer Box + View Switcher */}
              <div className="p-3.5 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">QueryAI Answer</span>
                  
                  {/* View Switcher: Bar | Donut | Grid | SQL */}
                  <div className="flex items-center gap-1 bg-[#0F1522] p-1 rounded-lg border border-slate-800 text-[10px]">
                    <button
                      onClick={() => setActiveViewMode('chart')}
                      className={`px-2.5 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${
                        activeViewMode === 'chart' ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <BarChart2 className="w-3 h-3" />
                      <span>Bar</span>
                    </button>
                    <button
                      onClick={() => setActiveViewMode('pie')}
                      className={`px-2.5 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${
                        activeViewMode === 'pie' ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <PieChart className="w-3 h-3" />
                      <span>Donut</span>
                    </button>
                    <button
                      onClick={() => setActiveViewMode('table')}
                      className={`px-2.5 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${
                        activeViewMode === 'table' ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Table className="w-3 h-3" />
                      <span>Grid</span>
                    </button>
                    <button
                      onClick={() => setActiveViewMode('sql')}
                      className={`px-2.5 py-0.5 rounded font-medium flex items-center gap-1 transition-colors ${
                        activeViewMode === 'sql' ? 'bg-emerald-500 text-white font-semibold' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Code className="w-3 h-3" />
                      <span>SQL</span>
                    </button>
                  </div>
                </div>

                <p className="text-sm sm:text-base font-semibold text-white leading-snug">
                  "{activeResult.answer}"
                </p>
              </div>

              {/* View 1: Bar Chart Graph */}
              {activeViewMode === 'chart' && (
                <div className="bg-[#121927] p-3.5 rounded-xl border border-slate-800/90 space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 text-[11px] flex items-center gap-1.5">
                      <BarChart2 className="w-3.5 h-3.5 text-emerald-400" />
                      {activeResult.chartTitle || "Distribution Graph"}
                    </span>
                  </div>

                  <div className="space-y-2 pt-0.5">
                    {activeResult.chartData?.map((bar, idx) => {
                      const maxVal = Math.max(...(activeResult.chartData?.map(d => Math.abs(d.value)) || [1]));
                      const widthPct = Math.max(12, Math.round((Math.abs(bar.value) / maxVal) * 100));

                      return (
                        <div key={idx} className="space-y-0.5">
                          <div className="flex justify-between text-xs font-medium">
                            <span className={bar.isTop ? "text-emerald-300 font-bold flex items-center gap-1 text-[11px]" : "text-slate-300 text-[11px]"}>
                              {bar.name}
                              {bar.isTop && <span className="text-[9px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-mono font-semibold">TOP</span>}
                            </span>
                            <span className="text-slate-400 font-mono text-[11px]">
                              {typeof bar.value === 'number' ? bar.value.toLocaleString() : bar.value} ({bar.percentage})
                            </span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-800/80 rounded-full overflow-hidden p-0.5">
                            <div
                              className={`h-full rounded-full transition-all duration-800 ease-out ${
                                bar.isTop
                                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-sm shadow-emerald-500/50'
                                  : 'bg-slate-600/70'
                              }`}
                              style={{ width: `${widthPct}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* View 2: Donut Chart Graph */}
              {activeViewMode === 'pie' && (
                <div className="bg-[#121927] p-3.5 rounded-xl border border-slate-800/90 space-y-2 text-xs">
                  <div className="font-semibold text-slate-300 text-[11px] flex items-center gap-1.5">
                    <PieChart className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Share Breakdown (Donut Distribution Graph)</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                    {activeResult.chartData?.map((item, idx) => (
                      <div key={idx} className="p-2.5 bg-[#0B0F17] rounded-lg border border-slate-800 text-center space-y-0.5">
                        <span className="text-[10px] text-slate-400 block truncate">{item.name}</span>
                        <div className="text-base font-extrabold text-emerald-400 font-mono">{item.percentage}</div>
                        <span className="text-[9px] text-slate-500 font-mono">{item.value.toLocaleString()} items</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* View 3: Grid Table */}
              {activeViewMode === 'table' && (
                <div className="bg-[#090D15] p-2.5 rounded-xl border border-slate-800 overflow-x-auto space-y-1.5">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
                      <Table className="w-3 h-3" />
                      Query Result Rows ({activeResult.gridRows?.length || 0})
                    </span>
                    <button
                      onClick={() => exportToCSV('query_result.csv', activeResult.gridRows)}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded text-[10px] flex items-center gap-1 transition-colors"
                    >
                      <Download className="w-3 h-3" />
                      <span>Export CSV</span>
                    </button>
                  </div>

                  {activeResult.gridRows && activeResult.gridRows.length > 0 ? (
                    <table className="w-full text-left text-[11px] font-mono">
                      <thead>
                        <tr className="border-b border-slate-800 text-slate-400">
                          {Object.keys(activeResult.gridRows[0]).map((col, i) => (
                            <th key={i} className="py-1 px-1.5 font-semibold text-slate-300">{col}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/60 text-slate-300">
                        {activeResult.gridRows.map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-800/40">
                            {Object.keys(row).map((col, cIdx) => (
                              <td key={cIdx} className="py-1 px-1.5 text-slate-300">
                                {row[col]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : null}
                </div>
              )}

              {/* View 4: SQL Code */}
              {activeViewMode === 'sql' && (
                <div className="bg-[#080B12] p-3 rounded-xl border border-slate-800 space-y-1.5 font-mono text-xs text-emerald-400">
                  <div className="flex items-center justify-between text-slate-400 font-sans text-[10px]">
                    <span className="font-semibold uppercase tracking-wider">Generated Vector SQL</span>
                    <button
                      onClick={handleCopySql}
                      className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 transition-colors"
                    >
                      {copiedSql ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedSql ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                  <pre className="p-2.5 bg-[#0B0F17] rounded-lg border border-slate-800 overflow-x-auto text-emerald-300 font-mono text-[11px]">
                    <code>{activeResult.sqlEquivalent}</code>
                  </pre>
                </div>
              )}

              {/* Key Insight Card */}
              <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0 text-amber-400 mt-0.5">
                  <Lightbulb className="w-3 h-3" />
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-amber-400 text-[11px] block mb-0.5">Key Insight</span>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    {activeResult.keyInsight}
                  </p>
                </div>
              </div>

              {/* ✨ Explain This Chart */}
              <ChartExplanation explanation={activeResult.chartExplanation} />

              {/* Suggested Follow-Up Questions */}
              {activeResult.followUps && activeResult.followUps.length > 0 && (
                <div className="pt-1.5 border-t border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-mono text-slate-400 font-medium flex items-center gap-1">
                    <CornerDownRight className="w-3 h-3 text-emerald-400" />
                    Follow-Up Suggestions:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeResult.followUps.map((fUp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleFollowUpClick(fUp)}
                        className="px-2 py-0.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[10px] border border-slate-700/50 transition-colors text-left"
                      >
                        "{fUp}"
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          ) : null}

        </div>

        {/* Footer info label */}
        <div className="flex items-center justify-between text-[10px] text-slate-500 pt-0.5 border-t border-slate-800/60">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Local In-Browser Analytics Engine</span>
          </span>
          <button
            onClick={() => exportReport('QueryAI_Briefing.md', currentDatasetInfo, { ...activeResult, query: queryInput })}
            className="hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <Download className="w-3 h-3" />
            <span>Export Report</span>
          </button>
        </div>

      </div>

      {/* Advanced Dashboard View Modal */}
      <DashboardView
        isOpen={dashboardModalOpen}
        onClose={() => setDashboardModalOpen(false)}
        datasetInfo={currentDatasetInfo}
        queryResult={activeResult}
      />
    </div>
  );
}
