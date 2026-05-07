import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const AdminAuthContext = createContext();

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const REQUEST_TIMEOUT = 15000;

function fetchWithTimeout(url, options = {}, timeout = REQUEST_TIMEOUT) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  return fetch(url, { ...options, signal: controller.signal }).finally(() =>
    clearTimeout(timeoutId)
  );
}

export const AdminAuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminEmail, setAdminEmail] = useState(null);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      validateToken(token);
    } else {
      setIsLoading(false);
    }
  }, []);

  // Sync logout across tabs
  useEffect(() => {
    const handleStorage = (e) => {
      if (e.key === 'adminToken' && !e.newValue) {
        setIsAuthenticated(false);
        setAdminEmail(null);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const validateToken = async (token) => {
    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/admin/validate-token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        throw new Error('Token validation failed');
      }

      const data = await response.json();

      if (data.valid) {
        setIsAuthenticated(true);
        setAdminEmail(data.email);
      } else {
        localStorage.removeItem('adminToken');
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token validation error:', error);
      localStorage.removeItem('adminToken');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    if (isSubmittingRef.current) {
      return { success: false, error: 'Login in progress' };
    }
    isSubmittingRef.current = true;

    try {
      const response = await fetchWithTimeout(`${BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.detail || 'Login failed' };
      }

      if (data.success && data.token) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setAdminEmail(email);
        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      console.error('Login error:', error);
      if (error.name === 'AbortError') {
        return { success: false, error: 'Request timed out. Please try again.' };
      }
      return { success: false, error: 'Unable to connect to server. Please try again.' };
    } finally {
      isSubmittingRef.current = false;
    }
  };

  const logout = async () => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        await fetchWithTimeout(`${BACKEND_URL}/api/admin/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
      } catch (error) {
        console.error('Logout API error:', error);
      }
    }
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdminEmail(null);
  };

  return (
    <AdminAuthContext.Provider value={{
      isAuthenticated,
      isLoading,
      adminEmail,
      login,
      logout
    }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
