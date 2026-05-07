import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { useEffect } from "react";

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Pages
import Homepage from "@/pages/Homepage";
import Pricing from "@/pages/Pricing";
import ClaimTerritory from "@/pages/ClaimTerritory";
import Admin from "@/pages/Admin";
import AdminLogin from "@/pages/AdminLogin";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

function App() {
  return (
    <AdminAuthProvider>
      <div className="App">
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/claim" element={<ClaimTerritory />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
      </div>
    </AdminAuthProvider>
  );
}

export default App;
