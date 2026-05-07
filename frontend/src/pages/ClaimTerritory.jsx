import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { tradesData, teamSizes, claimSteps, pricingPlans } from '../data/tradeflow';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const ClaimTerritory = () => {
  const [searchParams] = useSearchParams();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('growth');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    businessName: '',
    phone: '',
    email: '',
    trade: '',
    city: '',
    teamSize: '',
  });

  useEffect(() => {
    const trade = searchParams.get('trade');
    const plan = searchParams.get('plan');
    if (trade) {
      setFormData(prev => ({ ...prev, trade }));
    }
    if (plan) {
      setSelectedPlan(plan);
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.trade || !formData.city) {
      toast.error('Please fill in required fields: name, trade, and city.');
      return;
    }

    setIsSubmitting(true);

    try {
      const leadData = {
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email || 'not-provided@placeholder.com',
        phone: formData.phone || 'Not provided',
        company: formData.businessName,
        message: `Territory Claim Request\n\nTrade: ${formData.trade}\nCity: ${formData.city}\nTeam Size: ${formData.teamSize}\nSelected Plan: ${selectedPlan}`
      };

      const response = await fetch(`${API_URL}/api/leads/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit');
      }

      setIsSubmitted(true);
      toast.success('Territory claim submitted successfully!');
    } catch (error) {
      console.error('Error submitting claim:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="pt-[120px] pb-16">
          <div className="max-w-[600px] mx-auto px-6 lg:px-12 text-center">
            <div className="w-16 h-16 bg-[#E6F1FB] rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-[#1F6FEB]" />
            </div>
            <h1 className="text-3xl font-medium text-[#111827] mb-4">
              Territory request received
            </h1>
            <p className="text-lg text-[#6B7280] mb-10">
              We're checking availability in your market now. Your free audit will arrive within one business day.
            </p>

            <div className="bg-[#F9FAFB] rounded-2xl p-8 text-left">
              <h3 className="text-sm font-medium text-[#374151] mb-6">What happens next</h3>
              <div className="space-y-6">
                {claimSteps.map((step) => (
                  <div key={`success-step-${step.step}`} className="flex gap-4">
                    <div className="w-6 h-6 bg-[#1F6FEB] text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                      {step.step}
                    </div>
                    <p className="text-sm text-[#6B7280]">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-[120px] pb-16">
        <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left Column - Info */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-medium text-[#111827] mb-6 leading-tight">
                Claim your <span className="italic">exclusive</span> territory before a competitor does.
              </h1>
              <p className="text-lg text-[#6B7280] mb-8">
                Fill out the form and we'll check availability in your market right away. You'll receive a free audit of your current online presence within one business day — no pitch, no pressure.
              </p>
              <p className="text-sm text-[#374151] mb-10">
                We work with <strong>one contractor per trade per market</strong> — exclusively. Once a territory is claimed, it's permanently closed to competitors in that area.
              </p>

              {/* What happens next */}
              <div className="bg-[#F9FAFB] rounded-2xl p-6">
                <h3 className="text-sm font-medium text-[#374151] mb-6">What happens after you submit</h3>
                <div className="space-y-6">
                  {claimSteps.map((step) => (
                    <div key={`info-step-${step.step}`} className="flex gap-4">
                      <div className="w-6 h-6 bg-[#1F6FEB] text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                        {step.step}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827] mb-1">{step.title}</p>
                        <p className="text-sm text-[#6B7280]">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="claim-form">
                {/* Your details */}
                <div>
                  <h3 className="text-sm font-medium text-[#374151] mb-4">Your details</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#6B7280] mb-1.5">First name *</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        data-testid="claim-firstname"
                        className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6B7280] mb-1.5">Last name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        data-testid="claim-lastname"
                        className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-[#6B7280] mb-1.5">Business name</label>
                    <input
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      data-testid="claim-business"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mt-4">
                    <div>
                      <label className="block text-sm text-[#6B7280] mb-1.5">Phone number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        data-testid="claim-phone"
                        className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#6B7280] mb-1.5">Email address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        data-testid="claim-email"
                        className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <hr className="border-[#E5E7EB]" />

                {/* Your territory */}
                <div>
                  <h3 className="text-sm font-medium text-[#374151] mb-4">Your territory</h3>
                  <div>
                    <label className="block text-sm text-[#6B7280] mb-1.5">Your trade *</label>
                    <select
                      name="trade"
                      value={formData.trade}
                      onChange={handleInputChange}
                      required
                      data-testid="claim-trade"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select your trade category</option>
                      {tradesData.map((trade, index) => (
                        <option key={`form-trade-${index}`} value={trade}>{trade}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-[#6B7280] mb-1.5">Primary city / town *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      data-testid="claim-city"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent"
                      placeholder="e.g., Austin, TX"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm text-[#6B7280] mb-1.5">Team size</label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      data-testid="claim-team-size"
                      className="w-full px-4 py-3 border border-[#D1D5DB] rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#1F6FEB] focus:border-transparent appearance-none cursor-pointer bg-white"
                    >
                      <option value="">Select</option>
                      {teamSizes.map((size) => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <hr className="border-[#E5E7EB]" />

                {/* Preferred plan */}
                <div>
                  <h3 className="text-sm font-medium text-[#374151] mb-4">Preferred plan</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {pricingPlans.map((plan) => (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        data-testid={`claim-plan-${plan.id}`}
                        className={`p-4 rounded-xl border text-left transition-all ${
                          selectedPlan === plan.id 
                            ? 'border-[#1F6FEB] bg-[#E6F1FB]' 
                            : 'border-[#E5E7EB] hover:border-[#D1D5DB]'
                        }`}
                      >
                        <p className="text-sm font-medium text-[#111827]">{plan.name}</p>
                        <p className="text-xs text-[#6B7280]">{plan.price}{plan.period}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  data-testid="claim-submit-btn"
                  className="w-full bg-[#1F6FEB] hover:bg-[#185FA5] disabled:bg-[#1F6FEB]/50 text-white rounded-[10px] py-3 text-[15px] font-medium transition-all duration-150 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? 'Submitting...' : (
                    <>Check my territory availability <ArrowRight className="w-4 h-4" /></>
                  )}
                </Button>

                <p className="text-xs text-[#6B7280] text-center">
                  No contracts. No obligation. Free audit delivered within 24 hours.
                </p>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ClaimTerritory;
