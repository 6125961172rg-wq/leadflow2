import React from 'react';
import { Users, Search, Eye, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { StatusBadge, formatDate } from '../../hooks/useAdminData';

const AdminLeads = ({ leads, searchQuery, setSearchQuery, statusFilter, setStatusFilter, onSelectLead, onDeleteLead }) => {
  const filteredLeads = leads.filter(lead => {
    const matchesSearch =
      lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.message?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search leads..." value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} data-testid="leads-search-input"
            className="w-full pl-10 pr-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} data-testid="leads-status-filter"
          className="px-4 py-2.5 bg-muted/50 border border-border/50 rounded-xl text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50">
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Contact</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Message</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {filteredLeads.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-16 text-center">
                  <Users className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground font-light">No leads found</p>
                </td></tr>
              ) : filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-muted/30 transition-colors duration-300">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-semibold text-primary">{lead.name?.charAt(0).toUpperCase()}</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4"><p className="text-sm text-muted-foreground truncate max-w-xs font-light">{lead.message}</p></td>
                  <td className="px-6 py-4"><StatusBadge status={lead.status} /></td>
                  <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{formatDate(lead.created_at)}</span></td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => onSelectLead(lead)} data-testid={`view-lead-${lead.id}`} className="text-muted-foreground hover:text-foreground rounded-full"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => onDeleteLead(lead.id)} className="text-muted-foreground hover:text-destructive rounded-full"><Trash2 className="w-4 h-4" /></Button>
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

export default AdminLeads;
