import React from 'react';
import { MapPin, Phone, Mail } from 'lucide-react';
import { googleMapsConfig } from '../data/extendedMock';

const GoogleMap = ({ embedUrl, address, phone, email }) => {
  const mapUrl = embedUrl || googleMapsConfig.embedUrl;
  const mapAddress = address || googleMapsConfig.address;
  const mapPhone = phone || googleMapsConfig.phone;
  const mapEmail = email || googleMapsConfig.email;

  return (
    <div className="bg-card border border-border rounded-2xl overflow-hidden" data-testid="google-map">
      <div className="relative" style={{ minHeight: '400px' }}>
        <iframe
          src={mapUrl}
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Location Map"
          className="w-full"
          data-testid="google-map-iframe"
        />
      </div>
      <div className="p-5 md:p-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground">Address</span>
              <p className="text-sm text-foreground break-words">{mapAddress}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground">Phone</span>
              <p className="text-sm text-foreground break-words">{mapPhone}</p>
            </div>
          </div>
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Mail className="w-4 h-4 text-primary" />
            </div>
            <div className="min-w-0">
              <span className="text-xs text-muted-foreground">Email</span>
              <p className="text-sm text-foreground break-all">{mapEmail}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleMap;
