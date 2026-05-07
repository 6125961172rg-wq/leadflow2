import React from 'react';
import { FileText, Search, Eye, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { StatusBadge, formatDate } from '../../hooks/useAdminData';

const AdminQuotes = ({ quotes, searchQuery, setSearchQuery, onSelectQuote, onDeleteQuote }) => {
  const filteredQuotes = quotes.filter(quote => {
    return quote.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.service_type?.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input type="text" placeholder="Search quotes..." value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} data-testid="quotes-search-input"
          className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
      </div>

      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Budget</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredQuotes.length === 0 ? (
                <tr><td colSpan={6} className="px-6 py-16 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-light">No quote requests found</p>
                </td></tr>
              ) : filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-muted/30 transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">{quote.name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{quote.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{quote.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><p className="text-sm text-foreground">{quote.service_type}</p></td>
                  <td className="px-6 py-4"><p className="text-sm text-muted-foreground">{quote.budget_range || '\u2014'}</p></td>
                  <td className="px-6 py-4"><StatusBadge status={quote.status} /></td>
                  <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{formatDate(quote.created_at)}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onSelectQuote(quote)} className="text-muted-foreground hover:text-foreground rounded-full"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteQuote(quote.id)} className="text-muted-foreground hover:text-destructive rounded-full"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminQuotes;
