// frontend/src/utils/api.js
import axios from 'axios';

// Create axios instance with defaults
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include auth token
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Specific API modules
export const authAPI = {
  login: (credentials) => api.post('/auth/users/login/', credentials),
  register: (userData) => api.post('/auth/users/', userData),
  getProfile: () => api.get('/auth/users/me/'),
  updateProfile: (data) => api.patch('/auth/users/me/', data),
  logout: () => api.post('/auth/users/logout/')
};

export const trackingAPI = {
  getCategories: () => api.get('/tracking/categories/'),
  createCategory: (data) => api.post('/tracking/categories/', data),
  updateCategory: (id, data) => api.put(`/tracking/categories/${id}/`, data),
  deleteCategory: (id) => api.delete(`/tracking/categories/${id}/`),
  
  getActivities: () => api.get('/tracking/activities/'),
  getActivity: (id) => api.get(`/tracking/activities/${id}/`),
  createActivity: (data) => api.post('/tracking/activities/', data),
  updateActivity: (id, data) => api.put(`/tracking/activities/${id}/`, data),
  deleteActivity: (id) => api.delete(`/
