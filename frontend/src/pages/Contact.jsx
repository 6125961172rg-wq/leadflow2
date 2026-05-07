import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import ContactForm from '../components/ContactForm';
import GoogleMap from '../components/GoogleMap';
import { Mail, Phone, MapPin, Clock, Calendar } from 'lucide-react';
import { contactData } from '../data/mock';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Page Header */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-b from-muted to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                Get In Touch
              </h1>
              <p className="text-xl text-muted-foreground">
                Have a question or ready to start your project? We'd love to hear from you.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                      <Mail className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Email</h3>
                      <a
                        href={`mailto:${contactData.email}`}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {contactData.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                      <Phone className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Phone</h3>
                      <a
                        href={`tel:${contactData.phone}`}
                        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {contactData.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                      <MapPin className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Address</h3>
                      <p className="text-muted-foreground">{contactData.address}</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-12 h-12 bg-muted rounded-full flex items-center justify-center mr-4">
                      <Clock className="text-foreground" size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 flex flex-wrap gap-4">
                  <a
                    href="/quote"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Request a Quote
                  </a>
                  <a
                    href="/booking"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule a Call
                  </a>
                </div>

                {/* Google Map */}
                <div className="mt-8">
                  <GoogleMap />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card border border-border p-8 rounded-2xl">
                <h2 className="text-3xl font-bold text-foreground mb-8">
                  Send Us a Message
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Contact;
