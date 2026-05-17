import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;

export const authApi = {
  login: (email: string, password: string) => api.post('/auth/login', { email, password }),
  me: () => api.get('/auth/me'),
};

export const doctorApi = {
  list: (params?: Record<string, string>) => api.get('/doctors', { params }),
  bySlug: (slug: string) => api.get(`/doctors/${slug}`),
  adminAll: (params?: Record<string, string>) => api.get('/doctors/admin/all', { params }),
  create: (data: FormData) => api.post('/doctors', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/doctors/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: string) => api.delete(`/doctors/${id}`),
};

export const departmentApi = {
  list: (params?: Record<string, string>) => api.get('/departments', { params }),
  bySlug: (slug: string) => api.get(`/departments/${slug}`),
  adminAll: () => api.get('/departments/admin/all'),
  create: (data: FormData) => api.post('/departments', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/departments/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: string) => api.delete(`/departments/${id}`),
};

export const appointmentApi = {
  create: (data: unknown) => api.post('/appointments', data),
  list: (params?: Record<string, string>) => api.get('/appointments', { params }),
  updateStatus: (id: string, status: string) => api.patch(`/appointments/${id}/status`, { status }),
  remove: (id: string) => api.delete(`/appointments/${id}`),
};

export const blogApi = {
  list: (params?: Record<string, string>) => api.get('/blogs', { params }),
  bySlug: (slug: string) => api.get(`/blogs/${slug}`),
  adminAll: () => api.get('/blogs/admin/all'),
  create: (data: FormData) => api.post('/blogs', data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  update: (id: string, data: FormData) => api.put(`/blogs/${id}`, data, { headers: { 'Content-Type': 'multipart/form-data' } }),
  remove: (id: string) => api.delete(`/blogs/${id}`),
};

export const careerApi = {
  list: () => api.get('/careers'),
  adminAll: () => api.get('/careers/admin/all'),
  create: (data: unknown) => api.post('/careers', data),
  update: (id: string, data: unknown) => api.put(`/careers/${id}`, data),
  remove: (id: string) => api.delete(`/careers/${id}`),
};

export const dashboardApi = {
  stats: () => api.get('/dashboard/stats'),
};

export const contentApi = {
  get: (key: string) => api.get(`/content/${key}`),
  all: () => api.get('/content'),
  upsert: (data: unknown) => api.post('/content', data),
};
