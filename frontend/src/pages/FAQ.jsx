import React, { useState } from 'react';
import { ChevronDown, Search, MessageCircle, ArrowRight, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { faqData } from '../data/extendedMock';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('General');
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const currentCategory = faqData.categories.find(cat => cat.name === activeCategory);

  // Filter questions by search
  const filteredQuestions = searchQuery
    ? faqData.categories.flatMap(cat => cat.questions).filter(
        q => q.question.toLowerCase().includes(searchQuery.toLowerCase()) || q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : currentCategory?.questions || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <HelpCircle className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Support</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight" data-testid="faq-heading">
              {faqData.headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              {faqData.subheadline}
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="faq-search"
                className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        {!searchQuery && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex flex-wrap justify-center gap-2">
              {faqData.categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => setActiveCategory(category.name)}
                  data-testid={`faq-tab-${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeCategory === category.name
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search results label */}
        {searchQuery && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredQuestions.length} result{filteredQuestions.length !== 1 ? 's' : ''} for "{searchQuery}"
              <button onClick={() => setSearchQuery('')} className="ml-2 text-primary hover:underline">Clear</button>
            </p>
          </div>
        )}

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-3">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No questions found. Try a different search term.</p>
              </div>
            ) : (
              filteredQuestions.map((item) => (
                <div
                  key={item.id}
                  data-testid={`faq-item-${item.id}`}
                  className={`bg-card border rounded-xl overflow-hidden transition-all duration-300 ${
                    openQuestions[item.id] ? 'border-primary/30 shadow-md shadow-primary/5' : 'border-border hover:border-border/80'
                  }`}
                >
                  <button
                    onClick={() => toggleQuestion(item.id)}
                    data-testid={`faq-toggle-${item.id}`}
                    className="w-full px-5 py-5 md:px-6 flex items-center justify-between text-left group"
                  >
                    <span className={`font-medium pr-4 transition-colors ${openQuestions[item.id] ? 'text-primary' : 'text-foreground'}`}>
                      {item.question}
                    </span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      openQuestions[item.id] ? 'bg-primary text-primary-foreground rotate-180' : 'bg-muted text-muted-foreground'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openQuestions[item.id] ? 'max-h-96' : 'max-h-0'}`}>
                    <div className="px-5 md:px-6 pb-5 text-muted-foreground leading-relaxed text-sm md:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 md:gap-10">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-7 h-7 text-primary" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">Still have questions?</h2>
              <p className="text-muted-foreground text-sm md:text-base">
                Can't find the answer you're looking for? Our team is here to help.
              </p>
            </div>
            <Link
              to="/contact"
              data-testid="faq-contact-cta"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Contact Support <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default FAQ;
