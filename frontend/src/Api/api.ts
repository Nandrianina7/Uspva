import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
  timeout: 1000,
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: any) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      console.warn('Token expired. Attempting refresh...');

      try {
        await axios.post(
          'http://localhost:5000/api/refresh',
          {},
          { withCredentials: true },
        );
        console.log('Token refreshed');
        return api(originalRequest);
      } catch (err) {
        console.error('Refresh failed', err);
        window.location.href = '/';
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  },
);

export default api;
