import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, X, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { pricingPlans, includedFeatures } from '../data/tradeflow';

const Pricing = () => {
  // ROI Calculator state
  const [jobValue, setJobValue] = useState(5000);
  const [leadsPerMonth, setLeadsPerMonth] = useState(10);
  const [closeRate, setCloseRate] = useState(40);
  const [selectedPlan, setSelectedPlan] = useState('growth');

  const planRetainers = {
    starter: 1000,
    growth: 1750,
    'market-leader': 3000
  };

  const monthlyRevenue = (leadsPerMonth * (closeRate / 100) * jobValue);
  const retainer = planRetainers[selectedPlan];
  const roi = retainer > 0 ? Math.round(monthlyRevenue / retainer) : 0;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-[120px] pb-16">
        {/* Header */}
        <section className="max-w-[1080px] mx-auto px-6 lg:px-12 text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-medium text-[#111827] mb-4">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl mx-auto">
            Fixed monthly retainer — no surprise bills as your ad spend scales. All plans include exclusive territory protection.
          </p>
        </section>

        {/* Pricing Cards */}
        <section className="max-w-[1080px] mx-auto px-6 lg:px-12 mb-20">
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                data-testid={`pricing-card-${plan.id}`}
                className={`relative rounded-2xl border ${
                  plan.highlighted 
                    ? 'border-[#1F6FEB] shadow-lg' 
                    : 'border-[#E5E7EB]'
                } bg-white p-6 md:p-8 flex flex-col`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-[#1F6FEB] text-white text-xs font-medium px-3 py-1 rounded-full">
                      Most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-medium text-[#111827]">{plan.name}</h3>
                  <p className="text-sm text-[#6B7280]">{plan.subtitle}</p>
                </div>

                <p className="text-sm text-[#6B7280] mb-6 min-h-[48px]">
                  {plan.description}
                </p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-medium text-[#111827]">{plan.price}</span>
                    <span className="text-sm text-[#6B7280]">{plan.period}</span>
                  </div>
                  <p className="text-xs text-[#6B7280] mt-2">+ {plan.adSpend}</p>
                  <p className="text-xs text-[#6B7280]">{plan.setupFee}</p>
                  <p className="text-xs text-[#1F6FEB] font-medium mt-2">{plan.territory}</p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature, index) => (
                    <li key={`${plan.id}-feature-${index}`} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-[#1D9E75] flex-shrink-0 mt-0.5" />
                      ) : (
                        <X className="w-5 h-5 text-[#D1D5DB] flex-shrink-0 mt-0.5" />
                      )}
                      <span className={`text-sm ${feature.included ? 'text-[#374151]' : 'text-[#9CA3AF]'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link to={`/claim?plan=${plan.id}`}>
                  <Button 
                    data-testid={`pricing-cta-${plan.id}`}
                    className={`w-full rounded-[10px] py-3 text-sm font-medium transition-all duration-150 flex items-center justify-center gap-2 ${
                      plan.highlighted 
                        ? 'bg-[#1F6FEB] hover:bg-[#185FA5] text-white' 
                        : 'bg-white border border-[#D1D5DB] text-[#111827] hover:bg-gray-50'
                    }`}
                  >
                    Claim {plan.name.toLowerCase()} territory <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Included Features */}
        <section className="bg-[#F9FAFB] py-16">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <h2 className="text-2xl font-medium text-[#111827] mb-10 text-center">
              Included in every plan
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {includedFeatures.map((feature, index) => (
                <div key={`included-${index}`}>
                  <h4 className="text-base font-medium text-[#111827] mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ROI Calculator */}
        <section className="py-16 md:py-20">
          <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
            <h2 className="text-2xl md:text-3xl font-medium text-[#111827] mb-4 text-center">
              Run your own numbers
            </h2>
            <p className="text-lg text-[#6B7280] mb-12 text-center max-w-xl mx-auto">
              See what a consistent lead pipeline is worth to your business.
            </p>

            <div className="max-w-3xl mx-auto bg-white border border-[#E5E7EB] rounded-2xl p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Inputs */}
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Average job value ($)
                    </label>
                    <input
                      type="number"
                      value={jobValue}
                      onChange={(e) => setJobValue(Number(e.target.value))}
                      data-testid="roi-job-value"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      New leads per month (est.)
                    </label>
                    <input
                      type="number"
                      value={leadsPerMonth}
                      onChange={(e) => setLeadsPerMonth(Number(e.target.value))}
                      data-testid="roi-leads"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Your close rate (%)
                    </label>
                    <input
                      type="number"
                      value={closeRate}
                      onChange={(e) => setCloseRate(Number(e.target.value))}
                      data-testid="roi-close-rate"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#374151] mb-2">
                      Monthly plan retainer ($)
                    </label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      data-testid="roi-plan-select"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent appearance-none cursor-pointer bg-white"
                    >
                      <option value="starter">Starter — ~$1,000/mo</option>
                      <option value="growth">Growth — ~$1,750/mo</option>
                      <option value="market-leader">Market Leader — ~$3,000/mo</option>
                    </select>
                  </div>
                </div>

                {/* Results */}
                <div className="flex flex-col justify-center bg-[#F9FAFB] rounded-xl p-6">
                  <div className="mb-8">
                    <p className="text-sm text-[#6B7280] mb-1">Monthly revenue generated</p>
                    <p className="text-4xl font-medium text-[#111827]" data-testid="roi-revenue">
                      ${monthlyRevenue.toLocaleString()}
                    </p>
                    <p className="text-sm text-[#6B7280]">from new TradeFlow leads</p>
                  </div>

                  <div>
                    <p className="text-sm text-[#6B7280] mb-1">Return on retainer</p>
                    <p className="text-4xl font-medium text-[#1F6FEB]" data-testid="roi-multiplier">
                      {roi}×
                    </p>
                    <p className="text-sm text-[#6B7280]">every dollar spent on TradeFlow</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-[1080px] mx-auto px-6 lg:px-12">
          <div className="text-center">
            <Link to="/claim">
              <Button 
                data-testid="pricing-bottom-cta"
                className="bg-[#1F6FEB] hover:bg-[#185FA5] text-white rounded-[10px] px-8 py-3 text-[15px] font-medium transition-all duration-150 flex items-center gap-2 mx-auto"
              >
                Claim your territory <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
