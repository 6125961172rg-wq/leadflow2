import React from 'react';
import { MessageCircle } from 'lucide-react';
import { contactData } from '../data/mock';

const FloatingWhatsApp = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hi! I would like to know more about your services.');
    window.open(`https://wa.me/${contactData.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-20 right-6 z-40 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle size={28} />
    </button>
  );
};

export default FloatingWhatsApp;
