import React from 'react';
import { X, Mail, Phone, Building, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { formatFullDate } from '../../hooks/useAdminData';

export const LeadDetailModal = ({ lead, onClose, onUpdateStatus, onDelete }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-card rounded-2xl max-w-lg w-full shadow-2xl border border-border/50" onClick={e => e.stopPropagation()}>
      <div className="flex items-center justify-between p-6 border-b border-border/50">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Lead Details</h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-light">Submitted {formatFullDate(lead.created_at)}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-semibold text-primary">{lead.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
            {lead.company && <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5"><Building className="w-3.5 h-3.5" />{lead.company}</p>}
            <div className="flex items-center gap-3 mt-3">
              <a href={`mailto:${lead.email}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><Mail className="w-4 h-4" /> {lead.email}</a>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <a href={`tel:${lead.phone}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"><Phone className="w-4 h-4" /> {lead.phone}</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 border-y border-border/50">
          <span className="text-sm font-medium text-foreground">Status</span>
          <select value={lead.status} onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border-0 bg-muted text-foreground cursor-pointer focus:ring-2 focus:ring-primary">
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Message</h4>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-light">{lead.message}</p>
          </div>
        </div>
        <div className="flex gap-3 pt-2">
          <a href={`mailto:${lead.email}`} className="flex-1">
            <Button className="w-full rounded-xl shadow-lg shadow-primary/20"><Mail className="w-4 h-4 mr-2" /> Send Email</Button>
          </a>
          <a href={`tel:${lead.phone}`}><Button variant="outline" className="px-4 rounded-xl"><Phone className="w-4 h-4" /></Button></a>
          <Button variant="outline" onClick={() => onDelete(lead.id)} className="px-4 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  </div>
);

export const QuoteDetailModal = ({ quote, onClose, onUpdateStatus, onDelete }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-border/50" onClick={e => e.stopPropagation()}>
      <div className="sticky top-0 bg-card flex items-center justify-between p-6 border-b border-border/50">
        <div>
          <h2 className="text-lg font-semibold text-foreground">Quote Request</h2>
          <p className="text-sm text-muted-foreground mt-0.5 font-light">Submitted {formatFullDate(quote.created_at)}</p>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors"><X className="w-5 h-5 text-muted-foreground" /></button>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-semibold text-primary">{quote.name?.charAt(0).toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground">{quote.name}</h3>
            {quote.company && <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5"><Building className="w-3.5 h-3.5" /> {quote.company}</p>}
            <div className="flex items-center gap-3 mt-3">
              <a href={`mailto:${quote.email}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><Mail className="w-4 h-4" /> {quote.email}</a>
            </div>
            <div className="flex items-center gap-3 mt-1.5">
              <a href={`tel:${quote.phone}`} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"><Phone className="w-4 h-4" /> {quote.phone}</a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between py-4 border-y border-border/50">
          <span className="text-sm font-medium text-foreground">Status</span>
          <select value={quote.status} onChange={(e) => onUpdateStatus(quote.id, e.target.value)}
            className="px-3 py-1.5 text-sm font-medium rounded-lg border-0 bg-muted text-foreground cursor-pointer focus:ring-2 focus:ring-primary">
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="quoted">Quoted</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Service', value: quote.service_type },
            { label: 'Budget', value: quote.budget_range || '\u2014' },
            { label: 'Timeline', value: quote.timeline || '\u2014' },
          ].map((item) => (
            <div key={item.label} className="bg-muted/50 rounded-xl p-4">
              <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
              <p className="text-sm font-medium text-foreground">{item.value}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Project Description</h4>
          <div className="bg-muted/50 rounded-xl p-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-light">{quote.project_description}</p>
          </div>
        </div>
        {quote.additional_requirements && (
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Additional Requirements</h4>
            <div className="bg-muted/50 rounded-xl p-4">
              <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed font-light">{quote.additional_requirements}</p>
            </div>
          </div>
        )}
        <div className="flex gap-3 pt-2">
          <a href={`mailto:${quote.email}`} className="flex-1">
            <Button className="w-full rounded-xl shadow-lg shadow-primary/20"><Mail className="w-4 h-4 mr-2" /> Send Quote</Button>
          </a>
          <a href={`tel:${quote.phone}`}><Button variant="outline" className="px-4 rounded-xl"><Phone className="w-4 h-4" /></Button></a>
          <Button variant="outline" onClick={() => onDelete(quote.id)} className="px-4 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10"><Trash2 className="w-4 h-4" /></Button>
        </div>
      </div>
    </div>
  </div>
);
