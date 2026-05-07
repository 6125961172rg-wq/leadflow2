import React, { useState } from 'react';
import { ExternalLink, X, ArrowRight, Layers, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { portfolioData } from '../data/extendedMock';

const Portfolio = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our Work</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight" data-testid="portfolio-heading">
              {portfolioData.headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {portfolioData.subheadline}
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2">
            {portfolioData.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                data-testid={`portfolio-filter-${category.toLowerCase().replace(/\s/g, '-')}`}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                    : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Grid - Masonry-style */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <div
                key={project.id}
                data-testid={`portfolio-project-${project.id}`}
                className={`group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer ${
                  i === 0 ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
                onClick={() => setSelectedProject(project)}
              >
                <div className={`relative overflow-hidden ${i === 0 ? 'aspect-[2/1]' : 'aspect-video'}`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium flex items-center gap-2 text-sm">
                      View Details <ExternalLink className="w-4 h-4" />
                    </span>
                  </div>
                </div>
                <div className="p-5 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wide">{project.category}</span>
                    <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full">{project.year}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                  <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Client: <span className="font-medium text-foreground">{project.client}</span></span>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-foreground/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
            data-testid="portfolio-modal"
          >
            <div
              className="bg-card rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  data-testid="portfolio-modal-close"
                  className="absolute top-4 right-4 bg-foreground/50 backdrop-blur-sm text-background w-10 h-10 rounded-full flex items-center justify-center hover:bg-foreground/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
                    {selectedProject.category}
                  </span>
                  <span className="text-muted-foreground text-sm">{selectedProject.year}</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{selectedProject.title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{selectedProject.description}</p>
                <div className="border-t border-border pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-sm text-muted-foreground">
                    Client: <span className="font-semibold text-foreground">{selectedProject.client}</span>
                  </p>
                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    onClick={() => setSelectedProject(null)}
                  >
                    Start a Similar Project <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Ready to Start Your Project?
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-2xl mx-auto">
              Let's discuss how we can help bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/quote"
                data-testid="portfolio-cta-quote"
                className="inline-flex items-center justify-center px-8 py-3 bg-background text-foreground rounded-full font-medium hover:opacity-90 transition-all gap-2"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-primary-foreground/30 text-primary-foreground rounded-full font-medium hover:bg-primary-foreground/10 transition-all"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Portfolio;
