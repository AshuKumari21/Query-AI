import React, { useEffect, useRef } from 'react';
import { Upload, MessageSquare, PieChart, FileSpreadsheet, Sparkles, Check } from 'lucide-react';

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.15 }
    );

    const revealElements = sectionRef.current?.querySelectorAll('.reveal-on-scroll');
    revealElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const steps = [
    {
      step: '01',
      title: 'Upload',
      desc: 'Drop in your CSV or dataset.',
      subtext: 'Supports CSV, Excel, and JSON exports up to 100MB with automatic header parsing.',
      icon: Upload,
      uiMockup: (
        <div className="bg-[#090D15] rounded-xl p-4 border border-dashed border-slate-700/80 flex flex-col items-center justify-center text-center space-y-2 group-hover:border-emerald-500/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <p className="text-xs font-mono text-slate-300">Drag & drop MBA_Leads_Dataset.csv</p>
          <span className="text-[10px] text-slate-500">1,950 rows parsed automatically</span>
        </div>
      )
    },
    {
      step: '02',
      title: 'Ask',
      desc: 'Ask questions in plain language.',
      subtext: 'Type questions naturally like "Which campaign generated the most leads?" without SQL knowledge.',
      icon: MessageSquare,
      uiMockup: (
        <div className="bg-[#090D15] rounded-xl p-3.5 border border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Query Prompt</span>
          </div>
          <div className="p-2.5 rounded-lg bg-[#141C2B] text-xs text-emerald-300 font-medium border border-slate-700/50 flex items-center justify-between">
            <span>"Which platform performed best?"</span>
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
          </div>
        </div>
      )
    },
    {
      step: '03',
      title: 'Understand',
      desc: 'Get answers, charts, and insights you can act on.',
      subtext: 'Receive direct natural-language answers, dynamic charts, and executive-level decision summaries.',
      icon: PieChart,
      uiMockup: (
        <div className="bg-[#090D15] rounded-xl p-3.5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <Check className="w-3.5 h-3.5" /> Direct Answer
            </span>
            <span className="text-[10px] text-slate-500 font-mono">Instant</span>
          </div>
          <p className="text-xs text-slate-300 font-medium line-clamp-2">
            Instagram generated 850 leads (43.6%), leading all acquisition channels.
          </p>
        </div>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 sm:py-28 bg-[#0B0F17] relative" id="how-it-works">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 reveal-on-scroll">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            3-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Your data. Your questions. Clear answers.
          </h2>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
            Three simple steps between your raw file and decision-ready clarity.
          </p>
        </div>

        {/* 3 Steps Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="reveal-on-scroll bg-[#121824] border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 shadow-xl group"
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="space-y-6">
                  {/* Step Header */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/40 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-extrabold text-slate-700 font-mono group-hover:text-emerald-500/40 transition-colors">
                      {item.step}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-base font-semibold text-slate-200">
                      {item.desc}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed pt-1">
                      {item.subtext}
                    </p>
                  </div>
                </div>

                {/* Micro UI Preview Mockup */}
                <div className="pt-4 border-t border-slate-800/80">
                  {item.uiMockup}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
