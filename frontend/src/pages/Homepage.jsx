import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { 
  heroData, 
  statsData, 
  tradesData, 
  leadMachineSteps 
} from '../data/tradeflow';

const Homepage = () => {
  const [selectedTrade, setSelectedTrade] = useState('');
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    if (selectedTrade) {
      navigate(`/claim?trade=${encodeURIComponent(selectedTrade)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="pt-[120px] pb-16 md:pb-24">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#E6F1FB] rounded-full mb-8">
              <span className="w-2 h-2 bg-[#1F6FEB] rounded-full"></span>
              <span className="text-sm font-medium text-[#1F6FEB]">{heroData.badge}</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-medium text-[#111827] leading-[1.1] tracking-tight max-w-3xl mb-6">
              {heroData.headline}{' '}
              <span className="italic">{heroData.headlineEmphasis}</span>{' '}
              {heroData.headlineSuffix}
            </h1>

            {/* Description */}
            <p className="text-lg text-[#6B7280] max-w-2xl mb-8 leading-relaxed">
              {heroData.description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link to="/claim">
                <Button 
                  data-testid="hero-claim-btn"
                  className="bg-[#1F6FEB] hover:bg-[#185FA5] text-white rounded-[10px] px-6 py-3 text-[15px] font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-0.5 flex items-center gap-2"
                >
                  {heroData.ctaPrimary} <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/pricing">
                <Button 
                  variant="outline"
                  data-testid="hero-pricing-btn"
                  className="border-[#D1D5DB] text-[#111827] rounded-[10px] px-6 py-3 text-[15px] font-medium hover:bg-gray-50"
                >
                  {heroData.ctaSecondary}
                </Button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              {heroData.features.map((feature, index) => (
                <div key={`hero-feature-${index}`} className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Check className="w-4 h-4 text-[#1D9E75]" />
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-[#F9FAFB]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
              {statsData.map((stat, index) => (
                <div key={`stat-${index}`} className="text-center md:text-left">
                  <div className="text-4xl md:text-5xl font-medium text-[#1F6FEB] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#6B7280] leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trades Section */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <p className="text-sm font-medium text-[#6B7280] mb-6">Trades we serve</p>
            <div className="flex flex-wrap gap-3">
              {tradesData.map((trade, index) => (
                <span 
                  key={`trade-${index}`}
                  className="px-4 py-2 bg-white border border-[#E5E7EB] rounded-full text-sm text-[#374151] hover:border-[#1F6FEB] hover:text-[#1F6FEB] transition-colors cursor-default"
                >
                  {trade}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* 5-Layer Lead Machine */}
        <section className="py-16 md:py-20 bg-[#F9FAFB]">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-medium text-[#111827] mb-4">
              The 5-layer lead machine
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 max-w-2xl">
              Every TradeFlow client gets the same proven system, customized for your trade and city.
            </p>

            <div className="space-y-8">
              {leadMachineSteps.map((step, index) => (
                <div 
                  key={`step-${index}`}
                  className="bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-8 hover:border-[#1F6FEB]/30 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
                    <div className="flex items-center gap-4 md:min-w-[180px]">
                      <span className="text-sm font-medium text-[#1F6FEB]">{step.step}</span>
                      <span className="text-xs font-medium text-[#6B7280] uppercase tracking-wider">— {step.label}</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-[#111827] mb-2">
                        {step.title}
                      </h3>
                      <p className="text-[#6B7280] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Territory Checker CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <div className="bg-[#042C53] rounded-2xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-medium text-white mb-4">
                Check if your territory is still open
              </h2>
              <p className="text-[#94A3B8] mb-8 max-w-xl">
                We only work with one contractor per trade per area. Once it's claimed, it's gone. See if your spot is available.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedTrade}
                  onChange={(e) => setSelectedTrade(e.target.value)}
                  data-testid="territory-trade-select"
                  className="flex-1 max-w-sm px-4 py-3 bg-white border border-[#D1D5DB] rounded-[10px] text-sm text-[#374151] focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent appearance-none cursor-pointer"
                >
                  <option value="">Select your trade</option>
                  {tradesData.map((trade, index) => (
                    <option key={`select-trade-${index}`} value={trade}>{trade}</option>
                  ))}
                </select>
                <Button 
                  onClick={handleCheckAvailability}
                  disabled={!selectedTrade}
                  data-testid="check-availability-btn"
                  className="bg-[#1F6FEB] hover:bg-[#185FA5] disabled:bg-[#1F6FEB]/50 text-white rounded-[10px] px-6 py-3 text-[15px] font-medium transition-all duration-150 flex items-center gap-2"
                >
                  Check availability <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-sm text-[#64748B] mt-4">
                No obligation. 30 seconds. We'll follow up with a free audit of your online presence.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Homepage;
