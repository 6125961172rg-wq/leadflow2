import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { ArrowRight, Briefcase, Headphones, Laptop, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { servicesData } from '../data/mock';

const iconMap = {
  Briefcase: Briefcase,
  Headphones: Headphones,
  Laptop: Laptop,
  TrendingUp: TrendingUp
};

const Services = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-muted to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Our Services
              </h1>
              <p className="text-xl text-muted-foreground">
                Comprehensive solutions tailored to help your business thrive and grow
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16 md:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {servicesData.map((service) => {
                const IconComponent = iconMap[service.icon];
                return (
                  <Card
                    key={service.id}
                    className="group hover:shadow-xl transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="mb-4">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="flex items-center mb-2">
                        <div className="inline-flex p-2 bg-muted rounded-lg mr-3">
                          <IconComponent className="text-foreground" size={24} />
                        </div>
                        <CardTitle className="text-2xl">{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-muted-foreground mb-4 text-base">
                        {service.shortDescription}
                      </CardDescription>
                      <Button asChild variant="default" className="group/btn">
                        <Link to={`/services/${service.id}`}>
                          View Details
                          <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform duration-200" size={16} />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-gray-900 dark:bg-gray-950">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Need a Custom Solution?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              We can tailor our services to meet your specific business needs
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link to="/contact">Contact Us Today</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Services;
