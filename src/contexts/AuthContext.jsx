import React, { createContext, useState, useContext, useEffect } from 'react';
import AuthService from '../services/authServices';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    try {
      if (AuthService.isAuthenticated()) {
        const storedUser = AuthService.getUser();
        if (storedUser) {
          const result = await AuthService.getCurrentUser();
          if (result.success) {
            setUser(result.user);
            setIsAuthenticated(true);
          } else {
            AuthService.logout();
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization error:', error);
      AuthService.logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const result = await AuthService.login(email, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const result = await AuthService.register(name, email, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'An unexpected error occurred'
      };
    }
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    isAdmin
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};