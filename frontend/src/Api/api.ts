import axios from "axios";

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalReq = error.config;
    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const {data} = await axios.post('http://localhost/api/refresh', {}, {withCredentials: true});
        localStorage.setItem('access_token', data.access_token);
        // originalReq.headers.Authorization = `Bearer ${data.access_token}`;
        return api(originalReq);
      }
      catch (error){
        localStorage.removeItem('access_token');
        window.location.href = ('/')
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)

  }
)
export default api;