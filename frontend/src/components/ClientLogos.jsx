import React from 'react';
import { clientLogos } from '../data/mock';
import { Cpu, Rocket, Globe, Layers, Zap, BarChart3, Shield, Hexagon } from 'lucide-react';

const iconMap = [Cpu, Rocket, Globe, Layers, Zap, BarChart3, Shield, Hexagon];

const ClientLogos = () => {
  const allLogos = [...clientLogos, ...clientLogos];

  return (
    <section data-testid="client-logos-section" className="py-12 sm:py-16 bg-background border-y border-border/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 sm:mb-10">
        <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
          Trusted by leading companies
        </p>
      </div>
      
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-marquee" style={{ width: 'max-content' }}>
          {allLogos.map((client, index) => {
            const Icon = iconMap[index % iconMap.length];
            return (
              <div
                key={`${client.name}-${index}`}
                data-testid={index < clientLogos.length ? `client-logo-${index}` : undefined}
                className="flex items-center gap-3 mx-8 sm:mx-12 flex-shrink-0"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-muted/80 flex items-center justify-center">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground/50" strokeWidth={1.5} />
                </div>
                <span className="text-sm sm:text-base font-medium text-muted-foreground/50 whitespace-nowrap">
                  {client.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;
