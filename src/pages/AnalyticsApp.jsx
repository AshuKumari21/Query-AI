import React from 'react';
import Navbar from '../components/Navbar';
import QueryDemo from '../components/QueryDemo';

export default function AnalyticsApp() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Sticky App Header */}
      <Navbar />

      {/* Main Full-Width Analytics Workspace */}
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <QueryDemo />
        </div>
      </main>

      {/* App Footer */}
      <footer className="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
        QueryAI Analytics Workspace v2.4 • Client-Side In-Browser Engine • © 2026 QueryAI
      </footer>

    </div>
  );
}
