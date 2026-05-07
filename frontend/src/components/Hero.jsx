import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from './ui/button';
import LeadCaptureModal from './LeadCaptureModal';
import { heroData, statsData } from '../data/mock';
import { useCountUp } from '../hooks/useCountUp';

const StatItem = ({ value, label, index }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const { count, ref } = useCountUp(numericValue, 2000 + index * 200);

  return (
    <div ref={ref} data-testid={`stat-${index}`} className="text-left">
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-muted-foreground mt-1.5 tracking-wide">{label}</div>
    </div>
  );
};

const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section data-testid="hero-section" className="relative pt-24 pb-16 md:pt-32 md:pb-24 lg:pt-36 lg:pb-28 bg-background overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-primary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Trusted by 500+ businesses</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-[1.05] tracking-tight">
              {heroData.headline.split(' ').slice(0, 2).join(' ')}{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                {heroData.headline.split(' ').slice(2).join(' ')}
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl font-light">
              {heroData.subheadline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2">
              <Button 
                onClick={() => setIsModalOpen(true)} 
                size="lg" 
                data-testid="hero-get-started-btn"
                className="text-base px-8 rounded-full shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-300"
              >
                {heroData.ctaText}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                data-testid="hero-learn-more-btn"
                className="text-base px-8 rounded-full border-2 hover:bg-muted/50 transition-all duration-300"
              >
                <Link to="/services">{heroData.ctaSecondary}</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2">
              {['Free Consultation', 'No Hidden Fees', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Visual - Photo Collage */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-sm lg:max-w-none">
              {/* Photo Collage Grid */}
              <div className="grid grid-cols-3 grid-rows-3 gap-2 rounded-2xl overflow-hidden shadow-2xl" data-testid="hero-image">
                <div className="col-span-2 row-span-2 overflow-hidden">
                  <img src="https://images.pexels.com/photos/7654185/pexels-photo-7654185.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Team meeting" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.pexels.com/photos/4175023/pexels-photo-4175023.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Business handshake" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1774600134168-b9ebd714e4e1?w=400&q=80" alt="Team collaboration" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1642522029686-5485ea7e6042?w=400&q=80" alt="Professional at work" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.pexels.com/photos/5833873/pexels-photo-5833873.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Analytics review" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="overflow-hidden">
                  <img src="https://images.pexels.com/photos/7654179/pexels-photo-7654179.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Office teamwork" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>

              {/* Floating stat cards */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-3 sm:p-4 shadow-xl z-10">
                <div className="text-xl sm:text-2xl font-bold text-foreground">98%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="absolute -top-2 -right-2 sm:-right-6 bg-card/90 backdrop-blur-xl border border-border/50 rounded-2xl p-3 sm:p-4 shadow-xl z-10">
                <div className="text-xl sm:text-2xl font-bold text-primary">500+</div>
                <div className="text-xs text-muted-foreground">Happy Clients</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar with Counter Animation */}
        <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 py-8 sm:py-10 border-t border-border/50">
          {statsData.map((stat) => (
            <StatItem key={stat.label} value={stat.value} label={stat.label} index={statsData.indexOf(stat)} />
          ))}
        </div>
      </div>

      <LeadCaptureModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default Hero;
