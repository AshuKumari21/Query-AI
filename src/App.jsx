import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustIntro from './components/TrustIntro';
import HowItWorks from './components/HowItWorks';
import DashboardPreview from './components/DashboardPreview';
import FeatureSection from './components/FeatureSection';
import QuestionChips from './components/QuestionChips';
import UseCases from './components/UseCases';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import TryModal from './components/TryModal';
import DashboardView from './components/DashboardView';
import { DATASETS, MOCK_ANALYSES } from './data/mockData';

export default function App() {
  const [isTryModalOpen, setIsTryModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
  };

  const defaultDatasetInfo = {
    name: 'MBA Leads Dataset.csv',
    rowCount: 1950,
    columnCount: 7,
    missingValPct: 0,
    duplicateCount: 0,
    healthScore: 100,
    recommendation: "Your dataset looks clean and ready for analysis."
  };

  const defaultQueryResult = {
    isSuccess: true,
    visualizationType: 'bar',
    answer: MOCK_ANALYSES["Which platform generated the most leads?"].answer,
    metricLabel: MOCK_ANALYSES["Which platform generated the most leads?"].metricLabel,
    metricValue: MOCK_ANALYSES["Which platform generated the most leads?"].metricValue,
    chartTitle: MOCK_ANALYSES["Which platform generated the most leads?"].chartTitle,
    chartData: MOCK_ANALYSES["Which platform generated the most leads?"].chartData,
    keyInsight: MOCK_ANALYSES["Which platform generated the most leads?"].keyInsight,
    sqlEquivalent: MOCK_ANALYSES["Which platform generated the most leads?"].sqlEquivalent,
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* 1. Sticky Navigation Bar with Dashboard Header Option */}
      <Navbar
        onOpenTryModal={() => setIsTryModalOpen(true)}
        onOpenDashboardModal={() => setIsDashboardModalOpen(true)}
      />

      {/* 2. Main Page Layout */}
      <main className="flex-grow">
        {/* Hero Section & Interactive Query Demo */}
        <Hero
          onOpenTryModal={() => setIsTryModalOpen(true)}
          activeQuestion={activeQuestion}
          onSelectQuestion={handleSelectQuestion}
        />

        {/* Trust Intro / Pipeline Flow */}
        <TrustIntro />

        {/* How It Works (3 Steps) */}
        <HowItWorks />

        {/* Product Showcase (Dashboard Preview) */}
        <DashboardPreview />

        {/* Feature Grid */}
        <FeatureSection />

        {/* Interactive Question Chips */}
        <QuestionChips onSelectQuestion={handleSelectQuestion} />

        {/* Use Cases (Analysts, Business, Students) */}
        <UseCases />

        {/* Final CTA */}
        <FinalCTA onOpenTryModal={() => setIsTryModalOpen(true)} />
      </main>

      {/* 3. Footer */}
      <Footer />

      {/* 4. Interactive Try QueryAI Workspace Modal */}
      <TryModal
        isOpen={isTryModalOpen}
        onClose={() => setIsTryModalOpen(false)}
      />

      {/* 5. Advanced Dashboard View Modal */}
      <DashboardView
        isOpen={isDashboardModalOpen}
        onClose={() => setIsDashboardModalOpen(false)}
        datasetInfo={defaultDatasetInfo}
        queryResult={defaultQueryResult}
      />

    </div>
  );
}
