import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import CalendlyEmbed from '../components/CalendlyEmbed';
import { calendlyConfig } from '../data/extendedMock';

const Booking = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            {calendlyConfig.headline}
          </h1>
          <p className="text-xl text-muted-foreground">
            {calendlyConfig.subheadline}
          </p>
        </div>

        {/* Calendly Embed */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <CalendlyEmbed url={calendlyConfig.url} />
        </div>

        {/* Alternative Contact */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-muted rounded-xl p-6 text-center">
            <p className="text-muted-foreground">
              Prefer to reach out directly?{' '}
              <a href="/contact" className="text-primary hover:underline font-medium">
                Contact us
              </a>{' '}
              or call us at{' '}
              <a href="tel:+15551234567" className="text-primary hover:underline font-medium">
                +1 (555) 123-4567
              </a>
            </p>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Booking;
