import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (data) => api.post('/auth/signup', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
};

// Problems API
export const problemsAPI = {
  getAll: async (params) => {
    const response = await api.get('/problems', { params });
    return response.data.problems || [];
  },
  getById: async (id) => {
    const response = await api.get(`/problems/${id}`);
    return response.data.problem;
  },
  submit: (data) => api.post('/problems/submit', data),
  getRecommended: async () => {
    const response = await api.get('/problems/user/recommended');
    // Return full response with problems, insights, and basedOn
    return response.data;
  },
};

// Progress API
export const progressAPI = {
  getAll: () => api.get('/progress'),
  getProgress: () => api.get('/progress'),
  getStats: () => api.get('/progress/stats'),
  getTopics: () => api.get('/progress/topics'),
};

// AI API
export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data),
  getHint: (data) => api.post('/ai/hint', data),
  reviewCode: (data) => api.post('/ai/review', data),
};

export default api;
