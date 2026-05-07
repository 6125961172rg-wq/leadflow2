import React, { useState, useEffect } from 'react';
import { X, Mail, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Input } from './ui/input';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if user has already seen/dismissed the popup
    const hasSeenPopup = localStorage.getItem('newsletterPopupDismissed');
    const hasSubscribed = localStorage.getItem('newsletterSubscribed');
    
    if (!hasSeenPopup && !hasSubscribed) {
      // Show popup after 5 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupDismissed', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/newsletter/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.status === 409) {
        toast.info('You\'re already subscribed!');
      } else if (response.ok) {
        toast.success('Thank you for subscribing!');
        localStorage.setItem('newsletterSubscribed', 'true');
      } else {
        throw new Error('Subscription failed');
      }
      
      setIsOpen(false);
      setEmail('');
    } catch (error) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-primary" />
        </div>
        
        {/* Content */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Stay in the Loop!
          </h2>
          <p className="text-muted-foreground">
            Subscribe to our newsletter for the latest updates, insights, and exclusive offers.
          </p>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full"
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Subscribing...</>
            ) : (
              'Subscribe Now'
            )}
          </Button>
        </form>
        
        {/* Privacy note */}
        <p className="text-xs text-muted-foreground text-center mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
};

export default NewsletterPopup;
