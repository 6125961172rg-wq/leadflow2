import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { Award, Users, Target, Lightbulb, ArrowRight, Check, TrendingUp, Shield } from 'lucide-react';
import { aboutData, statsData } from '../data/mock';
import { useCountUp } from '../hooks/useCountUp';

const StatItem = ({ value, label }) => {
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''), 10);
  const suffix = value.replace(/[0-9]/g, '');
  const { count, ref } = useCountUp(numericValue, 2000);
  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary tabular-nums">{count}{suffix}</div>
      <div className="text-sm text-muted-foreground mt-1">{label}</div>
    </div>
  );
};

const teamMembers = [
  { name: 'Alex Morgan', role: 'CEO & Founder', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80' },
  { name: 'Sarah Chen', role: 'Head of Strategy', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'James Miller', role: 'Tech Director', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Emily Davis', role: 'Design Lead', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
];

const milestones = [
  { year: '2010', title: 'Founded', desc: 'Started with a vision to transform businesses through innovation.' },
  { year: '2015', title: '100+ Clients', desc: 'Reached our first major milestone, serving clients across industries.' },
  { year: '2020', title: 'Global Expansion', desc: 'Expanded operations to serve international markets and enterprises.' },
  { year: '2025', title: '500+ Partners', desc: 'Now trusted by over 500 businesses with a 98% satisfaction rate.' },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-background overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:64px_64px]" />
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">About Us</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight mb-6" data-testid="about-heading">
                We build the future of{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">business growth</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                A team of strategists, designers, and engineers dedicated to helping businesses thrive in the digital age.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section with Image */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                  <img
                    src="https://images.unsplash.com/photo-1551135049-8a33b5883817?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NDh8MHwxfHNlYXJjaHwzfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHRlYW0lMjB3b3JraW5nJTIwdG9nZXRoZXJ8ZW58MHx8fHwxNzczMzUyNDcyfDA&ixlib=rb-4.1.0&q=85"
                    alt="Our team collaborating"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 bg-primary text-primary-foreground rounded-2xl p-4 sm:p-5 shadow-xl">
                  <div className="text-2xl sm:text-3xl font-bold">15+</div>
                  <div className="text-xs sm:text-sm opacity-80">Years of Excellence</div>
                </div>
              </div>
              <div className="order-1 lg:order-2 space-y-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight">
                  From a bold idea to a trusted partner
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  {aboutData.mission}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  We started with a simple belief: every business deserves access to world-class strategy and technology. Today, we've helped hundreds of companies across industries unlock their full potential.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  {['Results-Driven', 'Client-Focused', 'Data-Informed', 'Always Innovating'].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <section className="py-12 md:py-16 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statsData.map((stat, i) => (
                <StatItem key={stat.label} value={stat.value} label={stat.label} />
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutData.mission}</p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 md:p-10 hover:shadow-lg transition-shadow duration-300">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <Lightbulb className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">{aboutData.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">What Drives Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">Our Core Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">The principles that guide everything we do</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {aboutData.values.map((value) => {
                const icons = [Shield, Award, TrendingUp, Users];
                const Icon = icons[aboutData.values.indexOf(value) % icons.length];
                return (
                  <div key={value.title} className="bg-card border border-border rounded-2xl p-6 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our Journey</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">Key Milestones</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {milestones.map((m) => (
                <div key={m.year} className="relative bg-card border border-border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-4xl font-bold text-primary/40 dark:text-primary/60 mb-3">{m.year}</div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">{m.title}</h3>
                  <p className="text-sm text-muted-foreground">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16 md:py-24 bg-muted" data-testid="team-section">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our People</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">{aboutData.team.headline}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">{aboutData.team.description}</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div key={member.name} className="group" data-testid={`team-member-${teamMembers.indexOf(member)}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[3/4] mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-base font-semibold text-white">{member.name}</h3>
                      <p className="text-xs text-white/70">{member.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-primary" data-testid="about-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Let's Build Something Great
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 max-w-2xl mx-auto">
              Ready to take your business to the next level? Let's start a conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground rounded-full font-medium hover:opacity-90 transition-all duration-300 gap-2"
                data-testid="about-cta-contact"
              >
                Contact Us <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground/30 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10 transition-all duration-300"
                data-testid="about-cta-portfolio"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default About;
