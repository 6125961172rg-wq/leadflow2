import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import LeadCaptureModal from './LeadCaptureModal';

const CTABanner = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section data-testid="cta-banner-section" className="relative py-20 sm:py-24 md:py-32 overflow-hidden">
      {/* Gradient background - distinct from footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/70" />
      
      {/* Animated mesh pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.3)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(255,255,255,0.2)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-white/10 rounded-full" />
      <div className="absolute bottom-10 right-10 w-32 h-32 border border-white/10 rounded-full" />
      <div className="absolute top-1/2 left-1/4 w-3 h-3 bg-white/20 rounded-full" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-white/30 rounded-full" />
      
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6 sm:mb-8 backdrop-blur-sm">
          <Sparkles className="w-4 h-4 text-white/80" />
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80">Limited Time Offer</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 tracking-tight">
          Ready to Transform<br className="hidden sm:block" /> Your Business?
        </h2>
        <p className="text-base sm:text-lg text-white/70 mb-8 sm:mb-10 max-w-2xl mx-auto font-light leading-relaxed">
          Join hundreds of successful businesses that have partnered with us. Start your growth journey today with a free consultation.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button 
            onClick={() => setIsModalOpen(true)}
            size="lg" 
            data-testid="cta-get-started-btn"
            className="text-base px-8 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl shadow-black/20 hover:scale-105 active:scale-95 transition-all duration-300 font-semibold"
          >
            Get Started Free
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            asChild 
            size="lg" 
            variant="outline"
            data-testid="cta-contact-btn"
            className="text-base px-8 rounded-full border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 bg-transparent"
          >
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default CTABanner;
