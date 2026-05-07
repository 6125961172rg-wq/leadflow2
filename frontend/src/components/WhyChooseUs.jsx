import React from 'react';
import { Award, Users, Heart, Zap } from 'lucide-react';
import { whyChooseUsData } from '../data/mock';
import { useCountUp } from '../hooks/useCountUp';

const iconMap = {
  Award: Award,
  Users: Users,
  Heart: Heart,
  Zap: Zap
};

const TrackRecordStat = ({ label, value, index }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const { count, ref } = useCountUp(numericValue, 1800 + index * 200);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl sm:text-4xl font-bold tracking-tight text-background tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm text-background/50 mt-1 font-light">{label}</div>
    </div>
  );
};

const WhyChooseUs = () => {
  const trackRecordData = [
    { label: 'Client Satisfaction', value: '98%' },
    { label: 'Projects Delivered', value: '1000+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Team Members', value: '50+' },
  ];

  return (
    <section data-testid="why-choose-us-section" className="py-20 sm:py-24 md:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Why Us</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Why Choose Us
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-10 sm:mb-12 font-light max-w-xl">
              We combine expertise, innovation, and dedication to deliver exceptional value.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10">
              {whyChooseUsData.map((item) => {
                const IconComponent = iconMap[item.icon] || Award;
                return (
                  <div key={item.title} data-testid={`why-choose-${whyChooseUsData.indexOf(item)}`} className="group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors duration-500">
                      <IconComponent className="text-primary" size={22} />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-muted-foreground font-light leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right - Track Record Card */}
          <div className="lg:col-span-5">
            <div className="relative lg:sticky lg:top-24">
              {/* Glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/25 via-primary/10 to-primary/5 rounded-[2rem] blur-xl opacity-70" />
              
              <div className="relative bg-foreground rounded-2xl overflow-hidden">
                {/* Decorative top bar */}
                <div className="h-1.5 bg-gradient-to-r from-primary via-primary/70 to-primary/40" />
                
                {/* Header */}
                <div className="px-6 sm:px-8 pt-8 pb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-background tracking-tight">Our Track Record</h3>
                  <p className="text-sm text-background/40 mt-1 font-light">Numbers that speak for themselves</p>
                </div>
                
                {/* Stats Grid */}
                <div className="px-6 sm:px-8 pb-8">
                  <div className="grid grid-cols-2 gap-6">
                    {trackRecordData.map((stat) => (
                      <div 
                        key={stat.label} 
                        className="bg-background/8 rounded-xl p-4 sm:p-5 border border-background/10 hover:bg-background/12 transition-colors duration-300"
                      >
                        <TrackRecordStat label={stat.label} value={stat.value} index={trackRecordData.indexOf(stat)} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom accent */}
                <div className="px-6 sm:px-8 pb-6 flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[0,1,2,3].map(i => (
                      <div key={i} className="w-7 h-7 rounded-full bg-background/15 border-2 border-foreground flex items-center justify-center">
                        <span className="text-[10px] font-bold text-background/60">{['MC','SA','DR','EW'][i]}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-background/40 font-light">
                    Join 500+ satisfied clients
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
