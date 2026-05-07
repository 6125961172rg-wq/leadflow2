import React from 'react';
import { Users, FileText, Mail, TrendingUp, MessageSquare, ChevronRight } from 'lucide-react';
import { formatDate } from '../../hooks/useAdminData';

const AdminOverview = ({ stats, leads, quotes, newsletters, onSelectLead, onSelectQuote, onSwitchTab }) => {
  const recentActivity = [
    ...leads.map(l => ({ ...l, type: 'lead', date: new Date(l.created_at) })),
    ...quotes.map(q => ({ ...q, type: 'quote', date: new Date(q.created_at) })),
    ...newsletters.map(n => ({ ...n, type: 'newsletter', date: new Date(n.created_at) }))
  ].sort((a, b) => b.date - a.date).slice(0, 8);

  const renderActivityIcon = (type) => {
    if (type === 'lead') return <Users className="w-4 h-4 text-primary" />;
    if (type === 'quote') return <FileText className="w-4 h-4 text-violet-600 dark:text-violet-400" />;
    return <Mail className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />;
  };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: Users, label: 'Total Leads', value: stats.totalLeads, badge: 'Total', badgeClass: 'text-xs text-muted-foreground', iconClass: 'bg-muted', iconColor: 'text-muted-foreground' },
          { icon: MessageSquare, label: 'New Leads', value: stats.newLeads, badge: 'New', badgeClass: 'px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded-full', iconClass: 'bg-primary/10', iconColor: 'text-primary' },
          { icon: FileText, label: 'Quote Requests', value: stats.totalQuotes, badge: 'Requests', badgeClass: 'text-xs text-muted-foreground', iconClass: 'bg-muted', iconColor: 'text-muted-foreground' },
          { icon: TrendingUp, label: 'Converted', value: stats.converted, badge: `${stats.conversionRate}%`, badgeClass: 'px-2 py-0.5 text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-full', iconClass: 'bg-emerald-500/10', iconColor: 'text-emerald-600 dark:text-emerald-400' },
        ].map((card) => (
          <div key={card.label} className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 ${card.iconClass} rounded-xl flex items-center justify-center`}>
                <card.icon className={`w-5 h-5 ${card.iconColor}`} />
              </div>
              <span className={card.badgeClass}>{card.badge}</span>
            </div>
            <p className="text-3xl font-bold text-foreground tracking-tight">{card.value}</p>
            <p className="text-sm text-muted-foreground mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Lead Pipeline */}
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-6">Lead Pipeline</h3>
          <div className="space-y-4">
            {[
              { label: 'New', count: stats.newLeads, color: 'bg-primary' },
              { label: 'Contacted', count: stats.contacted, color: 'bg-amber-500' },
              { label: 'Qualified', count: stats.qualified, color: 'bg-violet-500' },
              { label: 'Converted', count: stats.converted, color: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4">
                <div className="w-20 text-sm text-muted-foreground font-light">{item.label}</div>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${stats.totalLeads > 0 ? (item.count / stats.totalLeads) * 100 : 0}%` }} />
                </div>
                <div className="w-8 text-sm font-medium text-foreground text-right">{item.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card/50 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
            <button onClick={() => onSwitchTab('leads')}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors duration-300">
              View all <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          {recentActivity.length === 0 ? (
            <p className="text-muted-foreground text-center py-8 font-light">No recent activity</p>
          ) : (
            <div className="space-y-1">
              {recentActivity.map((item) => (
                <div key={`${item.type}-${item.id || item.email}`}
                  className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-xl transition-colors duration-300 cursor-pointer"
                  onClick={() => item.type === 'lead' ? onSelectLead(item) : item.type === 'quote' ? onSelectQuote(item) : null}>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    item.type === 'lead' ? 'bg-primary/10' : item.type === 'quote' ? 'bg-violet-500/10' : 'bg-emerald-500/10'
                  }`}>
                    {renderActivityIcon(item.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {item.type === 'newsletter' ? item.email : item.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.type === 'lead' ? 'New lead' : item.type === 'quote' ? item.service_type : 'Newsletter signup'}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{formatDate(item.date)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
