import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';

const TradeFlowLogo = () => (
  <svg width="140" height="36" viewBox="0 0 140 36" className="flex-shrink-0">
    <rect x="0" y="1" width="34" height="34" rx="8" fill="#1F6FEB"/>
    <line x1="17" y1="9" x2="12" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="12" y1="18" x2="17" y2="18" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="17" y1="18" x2="12" y2="27" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M22 18 Q25 14 28 18 Q31 22 34 18" fill="none" stroke="#B5D4F4" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
    <path d="M22 18 Q26 12 30 18 Q34 24 38 18" fill="none" stroke="#B5D4F4" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
    <path d="M22 18 Q27 10 32 18 Q37 26 42 18" fill="none" stroke="#B5D4F4" strokeWidth="2" strokeLinecap="round" opacity="1"/>
    <text x="44" y="25" fontSize="19" fontWeight="600" fill="#111827" fontFamily="DM Sans, sans-serif">Trade</text>
    <text x="96" y="25" fontSize="19" fontWeight="600" fill="#1F6FEB" fontFamily="DM Sans, sans-serif">Flow</text>
  </svg>
);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Pricing', path: '/pricing' },
  ];

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white border-b border-gray-100 shadow-sm' 
          : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-[72px]">
          <Link to="/" className="flex items-center" data-testid="nav-logo">
            <TradeFlowLogo />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                data-testid={`nav-${link.name.toLowerCase()}`}
                className={`text-sm font-normal transition-colors duration-200 ${
                  location.pathname === link.path
                    ? 'text-[#111827]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <Link to="/claim">
              <Button 
                data-testid="nav-claim-territory-btn"
                className="bg-[#1F6FEB] hover:bg-[#185FA5] text-white rounded-[10px] px-[22px] py-[10px] text-sm font-medium transition-all duration-150 hover:opacity-90 hover:-translate-y-0.5 active:scale-[0.98]"
              >
                Claim your territory
              </Button>
            </Link>
          </div>

          <div className="md:hidden">
            <button
              data-testid="mobile-menu-toggle"
              className="p-2 text-[#6B7280] hover:text-[#111827]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100" data-testid="mobile-menu">
          <div className="px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`block py-3 text-base font-normal transition-colors ${
                  location.pathname === link.path
                    ? 'text-[#111827]'
                    : 'text-[#6B7280]'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/claim" onClick={() => setIsMobileMenuOpen(false)}>
              <Button 
                data-testid="mobile-claim-territory-btn"
                className="w-full mt-4 bg-[#1F6FEB] hover:bg-[#185FA5] text-white rounded-[10px]"
              >
                Claim your territory
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
