import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[120px] pb-16">
        <div className="max-w-[800px] mx-auto px-6 lg:px-12">
          <h1 className="text-3xl sm:text-4xl font-medium text-[#111827] mb-4" data-testid="privacy-heading">
            Privacy Policy
          </h1>
          <p className="text-[#6B7280] mb-10">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

          <div className="space-y-10 text-[#6B7280] leading-relaxed">
            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">1. Information We Collect</h2>
              <p className="mb-3">We collect information you provide directly, such as when you fill out a territory claim form, request a quote, or communicate with us. This may include:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Name, email address, and phone number</li>
                <li>Business name and team size</li>
                <li>Trade category and service area</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">2. How We Use Your Information</h2>
              <p className="mb-3">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Check territory availability in your market</li>
                <li>Send you market audits and reports</li>
                <li>Improve our website, products, and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">3. Information Sharing</h2>
              <p>We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and conducting our business, provided they agree to keep your information confidential.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">4. Data Security</h2>
              <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">5. Your Rights</h2>
              <p className="mb-3">You have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 ml-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-medium text-[#111827] mb-3">6. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at <a href="mailto:hello@tradeflowmarketing.com" className="text-[#1F6FEB] hover:underline">hello@tradeflowmarketing.com</a>.</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
