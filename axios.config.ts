import axios from 'axios';
import { AxiosErrorResponse } from './src/common/interfaces/axios-error.interface';

const AxiosInstance = axios.create({
  //baseURL: 'http://192.168.0.21:3000',
  baseURL: 'https://ahorrosmart-finsyncbc-production.up.railway.app',
  timeout: 5000,
  withCredentials: true,
});

// AxiosInstance.interceptors.request.use(
//   (config) => {
//     console.warn('REQUEST');
//     console.log(JSON.stringify(config, null, 2));
//     return config;
//   },
//   (error) => {
//     return Promise.reject(JSON.stringify(error, null, 2));
//   },
// );

AxiosInstance.interceptors.response.use(
  (response) => {
    console.log('RESPONSE');
    console.log(JSON.stringify(response.data, null, 2));
    return response;
  },
  (error: AxiosErrorResponse) => {
    console.error('RESPONSE ERROR');
    console.log(JSON.stringify(error.response.data, null, 2));
    return Promise.reject(error);
  },
);

export { AxiosInstance};
