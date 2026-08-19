import React from 'react';
import { SAMPLE_QUESTIONS } from '../data/mockData';
import { HelpCircle, ArrowUpRight, Sparkles } from 'lucide-react';

export default function QuestionChips({ onSelectQuestion }) {
  const handleClick = (question) => {
    onSelectQuestion(question);
    // Smooth scroll up to hero query box
    const heroSection = document.getElementById('product');
    if (heroSection) {
      const offset = 90;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = heroSection.getBoundingClientRect().top;
      window.scrollTo({
        top: elementRect - bodyRect - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#090D15] border-t border-slate-800/80 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Section Header */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Interactive Prompts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Start with a question.
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-lg mx-auto">
            Click any question below to test how QueryAI analyzes datasets in real-time.
          </p>
        </div>

        {/* Clickable Question Chips */}
        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto pt-2">
          {SAMPLE_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleClick(q)}
              className="group px-4 py-3 rounded-xl bg-[#121824] hover:bg-[#1A2332] border border-slate-700/80 hover:border-emerald-500/60 text-slate-200 hover:text-white font-medium text-xs sm:text-sm transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-emerald-500/10 active:scale-[0.98] text-left"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform shrink-0" />
              <span>"{q}"</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors shrink-0" />
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}
