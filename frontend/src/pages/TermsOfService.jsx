import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[120px] pb-16">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl sm:text-4xl font-medium text-[#111827] mb-4" data-testid="terms-heading">
            Terms of Service
          </h1>
          <p className="text-[#6B7280] mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-10 text-[#6B7280] leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">1. Acceptance of Terms</h2>
              <p>By accessing and using this website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">2. Services</h2>
              <p>TradeFlow Marketing provides performance marketing services exclusively for residential trades contractors, including Google Ads management, Meta advertising, SEO content, Google Business Profile optimization, and AI-powered lead follow-up. The specific scope of services will be outlined in individual agreements.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">3. Territory Exclusivity</h2>
              <p>TradeFlow operates on a one-contractor-per-trade-per-market basis. Territory claims are subject to availability and approval. Once a territory is claimed and confirmed, it is exclusively reserved for that contractor within their trade category.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">4. Billing and Payments</h2>
              <p className="mb-3">Services are billed on a monthly retainer basis as specified in your plan:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Retainer fees are fixed and do not change as ad spend scales</li>
                <li>Ad spend is billed directly to you by Google/Meta</li>
                <li>One-time setup fees are due upon contract signing</li>
                <li>Month-to-month contracts with no long-term commitments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">5. Intellectual Property</h2>
              <p>All content on this website, including text, graphics, logos, images, and software, is the property of TradeFlow Marketing and is protected by intellectual property laws.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">6. Limitation of Liability</h2>
              <p>TradeFlow Marketing shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services. Marketing results may vary based on market conditions, competition, and other factors outside our control.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">7. Termination</h2>
              <p>Either party may terminate services with 30 days written notice. Upon termination, your territory exclusivity ends and becomes available to other contractors.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">8. Changes to Terms</h2>
              <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">9. Contact Us</h2>
              <p>If you have any questions about these Terms of Service, please contact us at <a href="mailto:hello@tradeflowmarketing.com" className="text-[#1F6FEB] hover:underline">hello@tradeflowmarketing.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
