import React from 'react';
import { Mail } from 'lucide-react';
import { StatusBadge, formatDate } from '../../hooks/useAdminData';

const AdminNewsletter = ({ newsletters }) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/50 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/50">
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">Subscribed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/50">
            {newsletters.length === 0 ? (
              <tr><td colSpan={3} className="px-6 py-16 text-center">
                <Mail className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-light">No subscribers yet</p>
              </td></tr>
            ) : newsletters.map((sub) => (
              <tr key={sub.id} className="hover:bg-muted/30 transition-colors duration-300">
                <td className="px-6 py-4">
                  <a href={`mailto:${sub.email}`} className="text-sm text-foreground hover:text-primary transition-colors duration-300">{sub.email}</a>
                </td>
                <td className="px-6 py-4"><StatusBadge status={sub.status} /></td>
                <td className="px-6 py-4"><span className="text-sm text-muted-foreground">{formatDate(sub.created_at)}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminNewsletter;
