import React, { useState } from 'react';
import { PERSONAS } from '../data/mockData';
import { LineChart, Briefcase, GraduationCap, CheckCircle2, Quote, Sparkles } from 'lucide-react';

export default function UseCases() {
  const [activePersonaId, setActivePersonaId] = useState('analysts');

  const getPersonaIcon = (id) => {
    switch (id) {
      case 'analysts':
        return LineChart;
      case 'business':
        return Briefcase;
      case 'students':
        return GraduationCap;
      default:
        return LineChart;
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-[#0B0F17] border-t border-slate-800/80 relative" id="use-cases">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            Tailored Workflows
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Built for people who work with data.
          </h2>
          <p className="text-base sm:text-lg text-slate-300">
            Whether you run complex models or just need quick answers for your team.
          </p>
        </div>

        {/* Personas Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PERSONAS.map((persona) => {
            const Icon = getPersonaIcon(persona.id);
            const isSelected = activePersonaId === persona.id;

            return (
              <div
                key={persona.id}
                onClick={() => setActivePersonaId(persona.id)}
                className={`cursor-pointer rounded-2xl p-6 sm:p-8 transition-all duration-300 flex flex-col justify-between space-y-6 border ${
                  isSelected
                    ? 'bg-[#141C2B] border-emerald-500/60 shadow-2xl shadow-emerald-500/10'
                    : 'bg-[#121824] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                      {persona.metric}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-white">
                      {persona.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-300 leading-snug">
                      {persona.tagline}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#0B0F17] border border-slate-800 space-y-1.5">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">Typical Prompt</span>
                    <p className="text-xs text-emerald-300 font-mono italic">
                      "{persona.sampleQuery}"
                    </p>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                  {persona.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
