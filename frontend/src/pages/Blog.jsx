import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search, Tag } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { blogData } from '../data/extendedMock';

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...new Set(blogData.posts.map(post => post.category))];

  const filteredPosts = blogData.posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = blogData.posts[0];
  const showFeatured = !searchQuery && selectedCategory === 'All';
  const gridPosts = showFeatured ? filteredPosts.filter(p => p.id !== featuredPost.id) : filteredPosts;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-6">
              <Tag className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-semibold tracking-widest uppercase text-primary">Our Blog</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 tracking-tight" data-testid="blog-heading">
              {blogData.headline}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              {blogData.subheadline}
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="blog-search"
                className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-full text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  data-testid={`blog-filter-${category.toLowerCase().replace(/\s/g, '-')}`}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                      : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {showFeatured && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14">
            <Link to={`/blog/${featuredPost.slug}`} className="block group" data-testid="featured-post">
              <div className="relative rounded-2xl overflow-hidden bg-card border border-border">
                <div className="grid md:grid-cols-2">
                  <div className="aspect-video md:aspect-auto md:min-h-[360px] overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-xs font-semibold tracking-widest uppercase text-primary bg-primary/10 px-3 py-1 rounded-full">Featured</span>
                      <span className="text-xs text-muted-foreground">{featuredPost.readTime}</span>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-muted-foreground mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-8 h-8 rounded-full object-cover" />
                        <span className="font-medium text-foreground">{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {gridPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No articles found matching your criteria.</p>
              <button onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }} className="mt-4 text-primary hover:underline text-sm">Clear filters</button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {gridPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/blog/${post.slug}`}
                  data-testid={`blog-post-${post.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xs text-primary font-semibold uppercase tracking-wide">{post.category}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt={post.author} className="w-6 h-6 rounded-full object-cover" />
                        <span className="text-xs text-muted-foreground">{post.author}</span>
                      </div>
                      <span className="text-xs text-primary font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Newsletter CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-primary rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-3">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-primary-foreground/70 mb-6 max-w-2xl mx-auto">
              Get the latest insights and articles delivered directly to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                data-testid="blog-newsletter-email"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 rounded-full text-sm text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary-foreground/50"
              />
              <button
                type="submit"
                data-testid="blog-newsletter-submit"
                className="px-6 py-3 bg-background text-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Blog;
