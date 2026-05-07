import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ArrowLeft, Check, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { servicesData } from '../data/mock';

const ServiceDetail = () => {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === parseInt(id));

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <h1 className="text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Button asChild>
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" className="mb-6" data-testid="service-back-btn">
              <Link to="/services">
                <ArrowLeft className="mr-2" size={20} />
                Back to Services
              </Link>
            </Button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="service-title">
                  {service.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {service.fullDescription}
                </p>
                <Button asChild size="lg" className="rounded-full px-8" data-testid="service-cta">
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
              <div>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-auto rounded-2xl shadow-2xl border border-border"
                  data-testid="service-image"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              What's Included
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-6">
              {service.features.map((feature, index) => (
                <div
                  key={feature}
                  data-testid={`service-feature-${index}`}
                  className="flex items-start p-6 bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors duration-300"
                >
                  <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center mr-4">
                    <Check className="text-primary-foreground" size={18} />
                  </div>
                  <span className="text-lg text-foreground font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Services */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center">
              Other Services
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {servicesData
                .filter(s => s.id !== service.id)
                .slice(0, 3)
                .map((relatedService) => (
                  <Link
                    key={relatedService.id}
                    to={`/services/${relatedService.id}`}
                    data-testid={`related-service-${relatedService.id}`}
                    className="group bg-card border border-border p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                  >
                    <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {relatedService.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {relatedService.shortDescription}
                    </p>
                    <span className="text-sm text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8">
              Let's discuss how we can help your business succeed
            </p>
            <Button asChild size="lg" className="rounded-full px-8 bg-background text-foreground hover:opacity-90">
              <Link to="/contact">Contact Us Now</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default ServiceDetail;
