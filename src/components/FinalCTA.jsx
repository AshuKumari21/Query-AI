import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function FinalCTA({ onOpenTryModal }) {
  return (
    <section className="py-20 sm:py-28 bg-[#090D15] border-t border-slate-800/80 relative overflow-hidden">
      
      {/* Background Subtle Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <div className="bg-gradient-to-b from-[#121927] to-[#0D131F] border border-slate-800 rounded-3xl p-8 sm:p-14 space-y-8 shadow-2xl shadow-black relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Ready to transform your analysis workflow?</span>
          </div>

          <div className="space-y-4 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Your data already has the answers.
            </h2>
            <p className="text-xl sm:text-2xl text-emerald-400 font-semibold">
              QueryAI helps you find them.
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <button
              onClick={onOpenTryModal}
              className="px-8 py-4 text-lg font-bold text-white bg-emerald-500 hover:bg-emerald-400 rounded-xl transition-all shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]"
            >
              <span>Try QueryAI</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-slate-500">
            No credit card required • Instant CSV analysis • Honest mock environment
          </p>

        </div>

      </div>
    </section>
  );
}
