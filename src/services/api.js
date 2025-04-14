
// frontend/src/services/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with base URL
const api = axios.create({
  baseURL: `${API_URL}/api`,
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth services
export const authService = {
  login: (credentials) => api.post('/token-auth/', credentials),
  register: (userData) => api.post('/auth/users/', userData),
  getProfile: () => api.get('/auth/users/me/'),
  updateProfile: (data) => api.patch('/auth/users/me/', data),
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Activity tracking services
export const categoryService = {
  getAll: () => api.get('/tracking/categories/'),
  getById: (id) => api.get(`/tracking/categories/${id}/`),
  create: (data) => api.post('/tracking/categories/', data),
  update: (id, data) => api.put(`/tracking/categories/${id}/`, data),
  delete: (id) => api.delete(`/tracking/categories/${id}/`)
};

export const activityService = {
  getAll: (params = {}) => api.get('/tracking/activities/', { params }),
  getById: (id) => api.get(`/tracking/activities/${id}/`),
  create: (data) => api.post('/tracking/activities/', data),
  update: (id, data) => api.put(`/tracking/activities/${id}/`, data),
  delete: (id) => api.delete(`/tracking/activities/${id}/`)
};

export const checkpointService = {
  getAll: (activityId) => api.get('/tracking/checkpoints/', { params: { activity_id: activityId } }),
  getById: (id) => api.get(`/tracking/checkpoints/${id}/`),
  create: (data) => api.post('/tracking/checkpoints/', data),
  update: (id, data) => api.put(`/tracking/checkpoints/${id}/`, data),
  delete: (id) => api.delete(`/tracking/checkpoints/${id}/`)
};

export const resourceService = {
  getAll: (activityId) => api.get('/tracking/resources/', { params: { activity_id: activityId } }),
  getById: (id) => api.get(`/tracking/resources/${id}/`),
  create: (formData) => api.post('/tracking/resources/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  update: (id, formData) => api.put(`/tracking/resources/${id}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }),
  delete: (id) => api.delete(`/tracking/resources/${id}/`)
};

// Project services
export const projectService = {
  getAll: (params = {}) => api.get('/projects/projects/', { params }),
  getById: (id) => api.get(`/projects/projects/${id}/`),
  create: (data) => api.post('/projects/projects/', data),
  update: (id, data) => api.put(`/projects/projects/${id}/`, data),
  delete: (id) => api.delete(`/projects/projects/${id}/`)
};

export const projectTaskService = {
  getAll: (projectId) => api.get('/projects/tasks/', { params: { project_id: projectId } }),
  getById: (id) => api.get(`/projects/tasks/${id}/`),
  create: (data) => api.post('/projects/tasks/', data),
  update: (id, data) => api.put(`/projects/tasks/${id}/`, data),
  delete: (id) => api.delete(`/projects/tasks/${id}/`)
};

// Course services
export const courseService = {
  getAll: (params = {}) => api.get('/courses/courses/', { params }),
  getById: (id) => api.get(`/courses/courses/${id}/`),
  create: (data) => api.post('/courses/courses/', data),
  update: (id, data) => api.put(`/courses/courses/${id}/`, data),
  delete: (id) => api.delete(`/courses/courses/${id}/`)
};

// Calendar services
export const calendarService = {
  getAll: (params = {}) => api.get('/calendar/events/', { params }),
  getById: (id) => api.get(`/calendar/events/${id}/`),
  create: (data) => api.post('/calendar/events/', data),
  update: (id, data) => api.put(`/calendar/events/${id}/`, data),
  delete: (id) => api.delete(`/calendar/events/${id}/`)
};

// Utility to fetch API root to display available endpoints
export const getApiRoot = () => axios.get(`${API_URL}/api/`);
