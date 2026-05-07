import { useState, useCallback } from 'react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REQUEST_TIMEOUT = 15000;

function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
}

function getAuthHeaders() {
  const token = localStorage.getItem('adminToken');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const useAdminData = () => {
  const [leads, setLeads] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchAllData = useCallback(async () => {
    setIsLoading(true);
    const headers = getAuthHeaders();
    try {
      const [leadsRes, quotesRes, newslettersRes] = await Promise.all([
        fetchWithTimeout(`${BACKEND_URL}/api/leads/?limit=100`, { headers }),
        fetchWithTimeout(`${BACKEND_URL}/api/quotes/?limit=100`, { headers }),
        fetchWithTimeout(`${BACKEND_URL}/api/newsletter/?limit=100`, { headers }),
      ]);
      if (leadsRes.ok) setLeads(await leadsRes.json());
      if (quotesRes.ok) setQuotes(await quotesRes.json());
      if (newslettersRes.ok) setNewsletters(await newslettersRes.json());
    } catch (error) {
      if (error.name === 'AbortError') {
        toast.error('Request timed out');
      } else {
        toast.error('Failed to fetch data');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteLead = async (id) => {
    if (!window.confirm('Are you sure you want to delete this lead?')) return;
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/leads/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        toast.success('Lead deleted');
        setLeads(prev => prev.filter(lead => lead.id !== id));
      }
    } catch {
      toast.error('Failed to delete lead');
    }
  };

  const deleteQuote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote?')) return;
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/quotes/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        toast.success('Quote deleted');
        setQuotes(prev => prev.filter(q => q.id !== id));
      }
    } catch {
      toast.error('Failed to delete quote');
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/leads/${id}/status?status=${status}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        toast.success('Status updated');
        setLeads(prev => prev.map(lead => lead.id === id ? { ...lead, status } : lead));
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const updateQuoteStatus = async (id, status) => {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/quotes/${id}/status?status=${status}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
      });
      if (response.ok) {
        toast.success('Status updated');
        setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
      }
    } catch {
      toast.error('Failed to update status');
    }
  };

  const stats = {
    totalLeads: leads.length,
    newLeads: leads.filter(l => l.status === 'new').length,
    contacted: leads.filter(l => l.status === 'contacted').length,
    qualified: leads.filter(l => l.status === 'qualified').length,
    converted: leads.filter(l => l.status === 'converted').length,
    totalQuotes: quotes.length,
    pendingQuotes: quotes.filter(q => q.status === 'pending').length,
    totalSubscribers: newsletters.filter(n => n.status === 'active').length,
    conversionRate: leads.length > 0 ? ((leads.filter(l => l.status === 'converted').length / leads.length) * 100).toFixed(1) : 0
  };

  return {
    leads, quotes, newsletters, isLoading, stats,
    fetchAllData, deleteLead, deleteQuote, updateLeadStatus, updateQuoteStatus
  };
};

export const formatDate = (date) => {
  const d = new Date(date);
  const now = new Date();
  const diff = now - d;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) {
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours === 0) {
      const mins = Math.floor(diff / (1000 * 60));
      return mins <= 1 ? 'Just now' : `${mins}m ago`;
    }
    return `${hours}h ago`;
  }
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days}d ago`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const formatFullDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
};

export const StatusBadge = ({ status }) => {
  const styles = {
    new: 'bg-primary/10 text-primary',
    contacted: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    qualified: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    converted: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    pending: 'bg-muted text-muted-foreground',
    reviewed: 'bg-primary/10 text-primary',
    quoted: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    accepted: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    rejected: 'bg-destructive/10 text-destructive',
    active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    unsubscribed: 'bg-muted text-muted-foreground',
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium capitalize ${styles[status] || styles.pending}`}>
      {status}
    </span>
  );
};
