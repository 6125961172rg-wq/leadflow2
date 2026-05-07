import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Users, FileText, Mail, TrendingUp, Loader2, LogOut, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useAdminData } from '../hooks/useAdminData';
import AdminOverview from './admin/AdminOverview';
import AdminLeads from './admin/AdminLeads';
import AdminQuotes from './admin/AdminQuotes';
import AdminNewsletter from './admin/AdminNewsletter';
import { LeadDetailModal, QuoteDetailModal } from './admin/AdminModals';

const Admin = () => {
  const { isAuthenticated, isLoading: authLoading, adminEmail, logout } = useAdminAuth();
  const { leads, quotes, newsletters, isLoading, stats, fetchAllData, deleteLead, deleteQuote, updateLeadStatus, updateQuoteStatus } = useAdminData();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    if (isAuthenticated) fetchAllData();
  }, [isAuthenticated, fetchAllData]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAuthenticated) return <Navigate to="/admin/login" replace />;

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out successfully');
  };

  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: TrendingUp },
    { id: 'leads', label: 'Leads', icon: Users, count: stats.newLeads },
    { id: 'quotes', label: 'Quotes', icon: FileText, count: stats.pendingQuotes },
    { id: 'newsletter', label: 'Subscribers', icon: Mail, count: stats.totalSubscribers }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="admin-dashboard">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="text-xl font-bold text-foreground tracking-tight"><span className="text-[#111827]">Trade</span><span className="text-[#1F6FEB]">Flow</span></a>
              <span className="text-border">/</span>
              <span className="text-sm font-medium text-muted-foreground">Admin</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-full">
                <Shield className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{adminEmail}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout} data-testid="admin-logout-btn" className="text-muted-foreground hover:text-foreground rounded-full">
                <LogOut className="w-4 h-4 mr-2" />Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1 font-light">Manage your leads, quotes, and subscribers</p>
        </div>

        <div className="flex gap-1 mb-8 bg-muted/50 p-1 rounded-xl w-fit">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} data-testid={`admin-tab-${tab.id}`}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === tab.id ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              }`}>
              <tab.icon className="w-4 h-4" />{tab.label}
              {tab.count > 0 && (
                <span className={`px-2 py-0.5 text-xs rounded-full ${activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
        ) : (
          <>
            {activeTab === 'dashboard' && <AdminOverview stats={stats} leads={leads} quotes={quotes} newsletters={newsletters} onSelectLead={setSelectedLead} onSelectQuote={setSelectedQuote} onSwitchTab={setActiveTab} />}
            {activeTab === 'leads' && <AdminLeads leads={leads} searchQuery={searchQuery} setSearchQuery={setSearchQuery} statusFilter={statusFilter} setStatusFilter={setStatusFilter} onSelectLead={setSelectedLead} onDeleteLead={deleteLead} />}
            {activeTab === 'quotes' && <AdminQuotes quotes={quotes} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectQuote={setSelectedQuote} onDeleteQuote={deleteQuote} />}
            {activeTab === 'newsletter' && <AdminNewsletter newsletters={newsletters} />}
          </>
        )}
      </main>

      {selectedLead && <LeadDetailModal lead={selectedLead} onClose={() => setSelectedLead(null)} onUpdateStatus={updateLeadStatus} onDelete={deleteLead} />}
      {selectedQuote && <QuoteDetailModal quote={selectedQuote} onClose={() => setSelectedQuote(null)} onUpdateStatus={updateQuoteStatus} onDelete={deleteQuote} />}
    </div>
  );
};

export default Admin;
