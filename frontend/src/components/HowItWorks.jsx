import React from 'react';
import { howItWorksData } from '../data/mock';

const HowItWorks = () => {
  return (
    <section data-testid="how-it-works-section" className="py-20 sm:py-24 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-20">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Process</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Our streamlined process ensures efficient delivery and outstanding results.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-8">
          {howItWorksData.map((step, index) => (
            <div key={step.step} data-testid={`step-${step.step}`} className="relative group">
              {/* Connector line (desktop only) */}
              {index < howItWorksData.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-border to-transparent" />
              )}
              
              {/* Step Number */}
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 sm:mb-6 group-hover:bg-primary/20 transition-colors duration-500">
                <span className="text-xl sm:text-2xl font-bold text-primary">
                  {String(step.step).padStart(2, '0')}
                </span>
              </div>
              
              {/* Content */}
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 sm:mb-3 tracking-tight">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground font-light leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
