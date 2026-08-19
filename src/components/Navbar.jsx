import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, BarChart3, LayoutDashboard } from 'lucide-react';

export default function Navbar({ onOpenTryModal, onOpenDashboardModal }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B0F17]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-xl shadow-black/40'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-emerald-500/50 rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500/20 to-teal-400/20 border border-emerald-500/30 flex items-center justify-center group-hover:border-emerald-400/60 transition-colors">
              <BarChart3 className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Query<span className="text-emerald-400">AI</span>
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <button
              onClick={() => scrollToSection('product')}
              className="hover:text-white transition-colors focus:outline-none focus:text-emerald-400"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="hover:text-white transition-colors focus:outline-none focus:text-emerald-400"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="hover:text-white transition-colors focus:outline-none focus:text-emerald-400"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="hover:text-white transition-colors focus:outline-none focus:text-emerald-400"
            >
              Use Cases
            </button>
            <button
              onClick={onOpenDashboardModal}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors flex items-center gap-1.5 focus:outline-none"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard</span>
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenTryModal}
              className="relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400 active:scale-[0.98]"
            >
              <span>Try QueryAI</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={onOpenTryModal}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-md transition-all shadow-md shadow-emerald-500/20"
            >
              Try QueryAI
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0D131F] border-b border-white/10 px-4 pt-4 pb-6 mt-2 animate-fade-in shadow-2xl">
          <div className="flex flex-col gap-4 text-slate-200 font-medium text-base">
            <button
              onClick={() => scrollToSection('product')}
              className="text-left py-2 border-b border-white/5 hover:text-emerald-400 transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection('how-it-works')}
              className="text-left py-2 border-b border-white/5 hover:text-emerald-400 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection('features')}
              className="text-left py-2 border-b border-white/5 hover:text-emerald-400 transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('use-cases')}
              className="text-left py-2 border-b border-white/5 hover:text-emerald-400 transition-colors"
            >
              Use Cases
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDashboardModal();
              }}
              className="text-left py-2 text-emerald-400 font-bold flex items-center gap-2"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Advanced Dashboard</span>
            </button>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTryModal();
                }}
                className="w-full py-3 px-4 text-center font-semibold text-white bg-emerald-500 hover:bg-emerald-400 rounded-lg shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <span>Try QueryAI Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
