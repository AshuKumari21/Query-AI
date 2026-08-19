import React from 'react';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import QueryDemo from './QueryDemo';

export default function Hero({ onOpenTryModal, activeQuestion, onSelectQuestion }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden" id="product">
      
      {/* Background Subtle Gradient & Grid overlay */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[120px] rounded-full opacity-60"></div>
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/5 blur-[100px] rounded-full opacity-40"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293d15_1px,transparent_1px),linear-gradient(to_bottom,#1f293d15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline & Value Prop */}
          <div className="lg:col-span-6 space-y-6 text-left lg:-translate-y-[80px]">
            
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Next-Gen AI Data Intelligence</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Ask your data <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                anything.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl">
              QueryAI turns spreadsheets and datasets into clear answers, visual insights, and actionable summaries — just by asking questions in plain language.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenTryModal}
                className="px-6 py-3.5 text-base font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]"
              >
                <span>Try QueryAI</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={scrollToHowItWorks}
                className="px-6 py-3.5 text-base font-medium text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800/90 rounded-xl border border-slate-800 transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <span>See how it works</span>
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            {/* Trust bullet points */}
            <div className="pt-4 border-t border-slate-800/80 grid grid-cols-3 gap-2 text-xs text-slate-400 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>No SQL required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Instant CSV upload</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Automated charts</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Product Preview UI */}
          <div className="lg:col-span-6 relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-3xl blur-xl opacity-60"></div>
            <div className="relative">
              <QueryDemo activeQuestion={activeQuestion} onSelectQuestion={onSelectQuestion} />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
