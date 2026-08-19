import React from 'react';
import { Table, HelpCircle, Cpu, BarChart3, ArrowRight, Sparkles } from 'lucide-react';

export default function TrustIntro() {
  const steps = [
    {
      icon: Table,
      title: "Raw CSV / Dataset",
      desc: "Messy rows, numbers, and unformatted dates",
      tag: "Input Data",
      color: "text-slate-400",
      bgColor: "bg-slate-800/60"
    },
    {
      icon: HelpCircle,
      title: "Natural Question",
      desc: '"Which platform generated the most leads?"',
      tag: "Plain English",
      color: "text-teal-400",
      bgColor: "bg-teal-500/10"
    },
    {
      icon: Cpu,
      title: "QueryAI Engine",
      desc: "Fast column correlation & vector aggregation",
      tag: "AI Analysis",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      icon: BarChart3,
      title: "Answer + Chart",
      desc: "Direct answer, animated bar chart & key insight",
      tag: "Decision Ready",
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    }
  ];

  return (
    <section className="py-16 sm:py-24 border-y border-slate-800/80 bg-[#0A0E17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
            From raw rows to useful answers.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Stop digging through spreadsheets to find the story hidden inside your data.
          </p>
        </div>

        {/* Visual Transformation Pipeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 relative">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                
                {/* Connector Arrow for Desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-600 group-hover:text-emerald-400 transition-colors">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}

                {/* Card Container */}
                <div className="h-full bg-[#121824] border border-slate-800 rounded-2xl p-5 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-4 shadow-lg group-hover:shadow-emerald-500/5">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-10 h-10 rounded-xl ${step.bgColor} border border-white/5 flex items-center justify-center`}>
                        <Icon className={`w-5 h-5 ${step.color}`} />
                      </div>
                      <span className="text-[10px] font-mono font-semibold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 border border-slate-700/50">
                        Step 0{index + 1}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 font-mono">{step.tag}</span>
                    {index === 3 && (
                      <span className="text-emerald-400 font-semibold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Ready
                      </span>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
