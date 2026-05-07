import React from 'react';
import { Calendar } from 'lucide-react';
import { calendlyConfig } from '../data/extendedMock';

const CalendlyEmbed = ({ url, headline, subheadline }) => {
  const calUrl = url || calendlyConfig.url;
  const calHeadline = headline || calendlyConfig.headline;
  const calSubheadline = subheadline || calendlyConfig.subheadline;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden" data-testid="calendly-embed">
      <div className="p-6 md:p-8 border-b border-border">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{calHeadline}</h3>
            <p className="text-sm text-muted-foreground">{calSubheadline}</p>
          </div>
        </div>
      </div>
      <div className="relative" style={{ minHeight: '650px' }}>
        <iframe
          src={calUrl}
          width="100%"
          height="650"
          frameBorder="0"
          title="Schedule Appointment"
          className="w-full"
          data-testid="calendly-iframe"
        />
      </div>
    </div>
  );
};

export default CalendlyEmbed;
