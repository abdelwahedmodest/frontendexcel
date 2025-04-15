
// frontend/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if user is already logged in
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        const response = await axios.get('/api/auth/users/me/', {
          headers: { Authorization: `Token ${token}` }
        });
        
        setUser(response.data);
        setIsAuthenticated(true);
        setError(null);
      } catch (err) {
        console.error('Auth check failed:', err);
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
        setError('Authentication failed. Please log in again.');
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  // Login user
  const login = async (username, password) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/users/login/', { username, password });
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthenticated(true);
      setError(null);
      return { success: true };
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.');
      return { success: false, error: err.response?.data?.error || 'Login failed' };
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/auth/users/', userData);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data || 'Registration failed');
      return { success: false, error: err.response?.data || 'Registration failed' };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (token) {
        await axios.post('/api/auth/users/logout/', {}, {
          headers: { Authorization: `Token ${token}` }
        });
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await axios.patch('/api/auth/users/me/', userData, {
        headers: { Authorization: `Token ${token}` }
      });
      
      setUser(response.data);
      return { success: true, data: response.data };
    } catch (err) {
      setError(err.response?.data || 'Profile update failed');
      return { success: false, error: err.response?.data || 'Profile update failed' };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

