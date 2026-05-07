import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Headphones, Laptop, TrendingUp } from 'lucide-react';
import { servicesData } from '../data/mock';

const iconMap = {
  Briefcase: Briefcase,
  Headphones: Headphones,
  Laptop: Laptop,
  TrendingUp: TrendingUp
};

const ServicesOverview = () => {
  return (
    <section data-testid="services-section" className="py-20 sm:py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            Our Services
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Comprehensive solutions designed to help your business thrive in today's competitive landscape.
          </p>
        </div>

        {/* Services Grid - Vertical cards with fixed height */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Link
                key={service.id}
                to={`/services/${service.id}`}
                data-testid={`service-card-${service.id}`}
                className="group relative bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 hover:border-primary/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col h-[320px]"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative flex flex-col" style={{ gap: '40px' }}>
                  {/* Icon */}
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-500 flex-shrink-0">
                    <IconComponent className="text-primary" size={26} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 tracking-tight">
                      {service.title}
                    </h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed flex-1">
                      {service.shortDescription}
                    </p>
                  </div>
                </div>
                
                {/* Arrow link at bottom */}
                <div className="relative mt-auto pt-6">
                  <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all duration-300">
                    Learn more
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesOverview;
