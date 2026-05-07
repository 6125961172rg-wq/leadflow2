import React from 'react';
import { Link } from 'react-router-dom';
import { companyInfo } from '../data/tradeflow';

const TradeFlowLogo = () => (
  <svg width="120" height="32" viewBox="0 0 120 32" className="flex-shrink-0">
    <rect x="0" y="0" width="30" height="30" rx="7" fill="#1F6FEB"/>
    <line x1="15" y1="7" x2="11" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="11" y1="15" x2="15" y2="15" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <line x1="15" y1="15" x2="11" y2="23" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M19 15 Q22 12 25 15 Q28 18 31 15" fill="none" stroke="#B5D4F4" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
    <text x="38" y="21" fontSize="16" fontWeight="600" fill="white" fontFamily="DM Sans, sans-serif">Trade</text>
    <text x="82" y="21" fontSize="16" fontWeight="600" fill="#1F6FEB" fontFamily="DM Sans, sans-serif">Flow</text>
  </svg>
);

const Footer = () => {
  return (
    <footer data-testid="main-footer" className="bg-white border-t border-gray-100">
      <div className="max-w-[1080px] mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[13px] text-[#6B7280]">
            &copy; {new Date().getFullYear()} {companyInfo.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link 
              to="/privacy" 
              className="text-[13px] text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-[13px] text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Terms
            </Link>
            <Link 
              to="/admin/login" 
              data-testid="footer-admin-link"
              className="text-[13px] text-[#6B7280] hover:text-[#111827] transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
