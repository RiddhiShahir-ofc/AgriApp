import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

//const BASE_URL = 'https://backend.farmbazaar.in'; // emulator -> host. Change to machine IP for physical device.
const BASE_URL = 'http://10.0.2.2:5227'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// attach access token to requests
api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('ACCESS_TOKEN');
  if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

// response interceptor -> refresh token on 401
let isRefreshing = false;
let failedQueue: Array<any> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // queue the request
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          return axios(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;
      try {
        const refreshToken = await AsyncStorage.getItem('REFRESH_TOKEN');
        if (!refreshToken) throw new Error('No refresh token');

        const resp = await axios.post(`${BASE_URL}/auth/refresh`, { refreshToken });
        const newAccessToken = resp.data.accessToken;
        const newRefreshToken = resp.data.refreshToken;

        await AsyncStorage.setItem('ACCESS_TOKEN', newAccessToken);
        await AsyncStorage.setItem('REFRESH_TOKEN', newRefreshToken);

        api.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        processQueue(null, newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        isRefreshing = false;
        return axios(originalRequest);
      } catch (refreshErr) {
        processQueue(refreshErr, null);
        isRefreshing = false;
        // optional: logout user
        await AsyncStorage.removeItem('ACCESS_TOKEN');
        await AsyncStorage.removeItem('REFRESH_TOKEN');
        throw refreshErr;
      }
    }

    throw err;
  }
);

export default api;
