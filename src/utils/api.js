
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

// Response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/users/login/', credentials),
  register: (userData) => api.post('/auth/users/', userData),
  getProfile: () => api.get('/auth/users/me/'),
  updateProfile: (data) => api.patch('/auth/users/me/', data),
  logout: () => api.post('/auth/users/logout/')
};

// Tracking API
export const trackingAPI = {
  getCategories: () => api.get('/tracking/categories/'),
  createCategory: (data) => api.post('/tracking/categories/', data),
  updateCategory: (id, data) => api.put(`/tracking/categories/${id}/`, data),
  deleteCategory: (id) => api.delete(`/tracking/categories/${id}/`),
  
  getActivities: () => api.get('/tracking/activities/'),
  getActivity: (id) => api.get(`/tracking/activities/${id}/`),
  createActivity: (data) => api.post('/tracking/activities/', data),
  updateActivity: (id, data) => api.put(`/tracking/activities/${id}/`, data),
  deleteActivity: (id) => api.delete(`/tracking/activities/${id}/`)
};

// Projects API
export const projectsAPI = {
  getProjects: () => api.get('/projects/projects/'),
  getProject: (id) => api.get(`/projects/projects/${id}/`),
  createProject: (data) => api.post('/projects/projects/', data),
  updateProject: (id, data) => api.put(`/projects/projects/${id}/`, data),
  deleteProject: (id) => api.delete(`/projects/projects/${id}/`),
  
  getTasks: (projectId) => api.get('/projects/tasks/', { 
    params: projectId ? { project_id: projectId } : {} 
  }),
  createTask: (data) => api.post('/projects/tasks/', data),
  updateTask: (id, data) => api.put(`/projects/tasks/${id}/`, data),
  deleteTask: (id) => api.delete(`/projects/tasks/${id}/`)
};

// Courses API
export const coursesAPI = {
  getCategories: () => api.get('/courses/categories/'),
  getCourses: () => api.get('/courses/courses/'),
  getCourse: (id) => api.get(`/courses/courses/${id}/`),
  createCourse: (data) => api.post('/courses/courses/', data),
  updateCourse: (id, data) => api.put(`/courses/courses/${id}/`, data),
  deleteCourse: (id) => api.delete(`/courses/courses/${id}/`)
};

// Calendar API
export const calendarAPI = {
  getEvents: () => api.get('/calendar/events/'),
  getEvent: (id) => api.get(`/calendar/events/${id}/`),
  createEvent: (data) => api.post('/calendar/events/', data),
  updateEvent: (id, data) => api.put(`/calendar/events/${id}/`, data),
  deleteEvent: (id) => api.delete(`/calendar/events/${id}/`)
};

export default api;

