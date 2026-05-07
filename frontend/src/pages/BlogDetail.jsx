import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin, ArrowRight } from 'lucide-react';
import DOMPurify from 'dompurify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { blogData } from '../data/extendedMock';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogData.posts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <ArrowLeft className="w-6 h-6 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-4">Article Not Found</h1>
            <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
              data-testid="blog-detail-back"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const relatedPosts = blogData.posts.filter(p => p.category === post.category && p.id !== post.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
        {/* Back Link */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            data-testid="blog-detail-back-link"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
        </div>

        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide" data-testid="blog-detail-category">
                {post.category}
              </span>
              <span className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight" data-testid="blog-detail-title">
              {post.title}
            </h1>
            <div className="flex items-center gap-5 text-muted-foreground">
              <div className="flex items-center gap-3">
                <img src={post.authorImage} alt={post.author} className="w-11 h-11 rounded-full object-cover border-2 border-border" />
                <div>
                  <p className="font-medium text-foreground text-sm">{post.author}</p>
                  <div className="flex items-center gap-1 text-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="mb-10 rounded-2xl overflow-hidden border border-border">
            <img src={post.image} alt={post.title} className="w-full aspect-video object-cover" data-testid="blog-detail-image" />
          </div>

          {/* Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none mb-10 prose-headings:font-bold prose-headings:tracking-tight prose-p:text-muted-foreground prose-p:leading-relaxed prose-a:text-primary"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content) }}
            data-testid="blog-detail-content"
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8" data-testid="blog-detail-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="bg-muted text-muted-foreground text-xs px-3 py-1.5 rounded-full font-medium">#{tag}</span>
            ))}
          </div>

          {/* Share */}
          <div className="border-t border-b border-border py-5 mb-10">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground flex items-center gap-2 text-sm">
                <Share2 className="w-4 h-4" /> Share this article
              </span>
              <div className="flex gap-3">
                {[
                  { icon: Facebook, url: `https://www.facebook.com/sharer/sharer.php?u=${typeof window !== 'undefined' ? window.location.href : ''}` },
                  { icon: Twitter, url: `https://twitter.com/intent/tweet?url=${typeof window !== 'undefined' ? window.location.href : ''}&text=${post.title}` },
                  { icon: Linkedin, url: `https://www.linkedin.com/shareArticle?mini=true&url=${typeof window !== 'undefined' ? window.location.href : ''}&title=${post.title}` },
                ].map(({ icon: Icon, url }, i) => (
                  <a key={i} href={url} target="_blank" rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors">
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-12">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <img src={post.authorImage} alt={post.author} className="w-14 h-14 rounded-xl object-cover flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">{post.author}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Expert in {post.category.toLowerCase()} with years of experience helping businesses grow and succeed through innovative strategies and solutions.
                </p>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-foreground">Related Articles</h2>
              <Link to="/blog" className="text-sm text-primary font-medium flex items-center gap-1 hover:gap-2 transition-all">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.slug}`}
                  data-testid={`related-post-${relatedPost.slug}`}
                  className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-video overflow-hidden">
                    <img src={relatedPost.image} alt={relatedPost.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wide">{relatedPost.category}</span>
                    <h3 className="text-base font-semibold text-foreground mt-2 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <span className="text-xs text-muted-foreground">{relatedPost.readTime}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default BlogDetail;
