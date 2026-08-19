import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import TrustIntro from '../components/TrustIntro';
import HowItWorks from '../components/HowItWorks';
import DashboardPreview from '../components/DashboardPreview';
import FeatureSection from '../components/FeatureSection';
import QuestionChips from '../components/QuestionChips';
import UseCases from '../components/UseCases';
import FinalCTA from '../components/FinalCTA';
import Footer from '../components/Footer';

export default function LandingPage() {
  const [activeQuestion, setActiveQuestion] = useState(null);

  const handleSelectQuestion = (q) => {
    setActiveQuestion(q);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#F8FAFC] flex flex-col font-sans selection:bg-emerald-500/30 selection:text-emerald-300">
      
      {/* Sticky Marketing Header */}
      <Navbar />

      {/* Main Landing Page Content */}
      <main className="flex-grow">
        {/* 1. Hero Section */}
        <Hero
          activeQuestion={activeQuestion}
          onSelectQuestion={handleSelectQuestion}
        />

        {/* 2. Trust Intro / Data Transformation Pipeline */}
        <TrustIntro />

        {/* 3. How It Works (3 Steps) */}
        <HowItWorks />

        {/* 4. Product Showcase (Dashboard Preview) */}
        <DashboardPreview />

        {/* 5. Feature Section */}
        <FeatureSection />

        {/* 6. Interactive Question Chips */}
        <QuestionChips onSelectQuestion={handleSelectQuestion} />

        {/* 7. Persona Use Cases */}
        <UseCases />

        {/* 8. Final CTA */}
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
