import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Lock, Mail, Loader2, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const { isAuthenticated, isLoading, login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast.success('Welcome back!');
    } else {
      setError(result.error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col" data-testid="admin-login-page">
      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      
      <header className="p-6 relative z-10">
        <a 
          href="/" 
          data-testid="admin-back-link"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to website
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 relative z-10">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-2xl mb-4">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">Admin Login</h1>
            <p className="text-sm text-muted-foreground mt-1 font-light">
              Enter your credentials to continue
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4" data-testid="admin-login-form">
            {error && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-xl" data-testid="login-error">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  data-testid="admin-email-input"
                  className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  data-testid="admin-password-input"
                  className="w-full pl-11 pr-4 py-3 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting} 
              data-testid="admin-login-submit"
              className="w-full py-3 rounded-xl shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>
        </div>
      </main>

      <footer className="p-6 text-center relative z-10">
        <p className="text-xs text-muted-foreground/60 font-light">
          Protected area. Unauthorized access is prohibited.
        </p>
      </footer>
    </div>
  );
};

export default AdminLogin;
