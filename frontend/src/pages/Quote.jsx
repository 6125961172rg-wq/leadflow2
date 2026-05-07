import React, { useState } from 'react';
import { toast } from 'sonner';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { servicesData } from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Quote = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service_type: '',
    budget_range: '',
    timeline: '',
    project_description: '',
    additional_requirements: ''
  });

  const budgetRanges = [
    'Under $5,000',
    '$5,000 - $10,000',
    '$10,000 - $25,000',
    '$25,000 - $50,000',
    '$50,000+',
    'Not sure yet'
  ];

  const timelines = [
    'ASAP (Within 2 weeks)',
    '1-2 months',
    '2-3 months',
    '3-6 months',
    '6+ months',
    'Flexible'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${BACKEND_URL}/api/quotes/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to submit quote request');
      }

      toast.success('Quote request submitted successfully! We\'ll get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service_type: '',
        budget_range: '',
        timeline: '',
        project_description: '',
        additional_requirements: ''
      });
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-muted-foreground">
            Tell us about your project and we'll provide a customized quote.
          </p>
        </div>

        {/* Quote Form */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-card border border-border rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Acme Corp"
                    />
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4 pt-4 border-t border-border">
                <h2 className="text-lg font-semibold text-foreground">Project Details</h2>
                
                <div className="space-y-2">
                  <Label htmlFor="service_type">Service Type *</Label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a service...</option>
                    {servicesData.map((service) => (
                      <option key={service.id} value={service.title}>
                        {service.title}
                      </option>
                    ))}
                    <option value="Multiple Services">Multiple Services</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="budget_range">Budget Range</Label>
                    <select
                      id="budget_range"
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select budget range...</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Preferred Timeline</Label>
                    <select
                      id="timeline"
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select timeline...</option>
                      {timelines.map((timeline) => (
                        <option key={timeline} value={timeline}>
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project_description">Project Description *</Label>
                  <Textarea
                    id="project_description"
                    name="project_description"
                    value={formData.project_description}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Please describe your project, goals, and any specific requirements..."
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additional_requirements">Additional Requirements</Label>
                  <Textarea
                    id="additional_requirements"
                    name="additional_requirements"
                    value={formData.additional_requirements}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any additional details or special requirements..."
                  />
                </div>
              </div>

              <Button type="submit" disabled={isLoading} className="w-full" size="lg">
                {isLoading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Submit Quote Request</>
                )}
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Quote;
