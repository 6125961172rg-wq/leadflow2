import React from 'react';
import { Star } from 'lucide-react';
import { testimonialsData } from '../data/mock';

const TestimonialCard = ({ testimonial }) => (
  <div
    data-testid={`testimonial-${testimonial.id}`}
    className="flex-shrink-0 w-[340px] sm:w-[380px] bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 sm:p-8 mx-3 hover:border-primary/20 transition-all duration-500"
  >
    {/* Stars */}
    <div className="flex gap-1 mb-5">
      {[...Array(testimonial.rating)].map((_, i) => (
        <Star key={`star-${i}`} className="w-4 h-4 text-primary fill-primary" />
      ))}
    </div>
    
    {/* Content */}
    <p className="text-sm sm:text-base text-foreground leading-relaxed font-light mb-6 line-clamp-4">
      "{testimonial.content}"
    </p>
    
    {/* Author */}
    <div className="flex items-center gap-3 mt-auto">
      <img
        src={testimonial.image}
        alt={testimonial.name}
        className="w-10 h-10 rounded-full object-cover ring-2 ring-border/50"
      />
      <div>
        <div className="font-semibold text-foreground text-sm">
          {testimonial.name}
        </div>
        <div className="text-xs text-muted-foreground">
          {testimonial.role}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  // Duplicate for infinite scroll
  const allTestimonials = [...testimonialsData, ...testimonialsData];

  return (
    <section data-testid="testimonials-section" className="py-20 sm:py-24 md:py-32 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="text-xs font-semibold tracking-widest uppercase text-primary mb-4 block">Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground font-light">
            Don't just take our word for it - hear from businesses we've helped succeed.
          </p>
        </div>
      </div>

      {/* Infinite Carousel */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        <div className="flex animate-scroll-testimonials" style={{ width: 'max-content' }}>
          {allTestimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
