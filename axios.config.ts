import axios from 'axios';

const AxiosInstance = axios.create({
  // baseURL: 'http://192.168.89.207:3000',
  baseURL: 'https://ahorrosmart-finsyncbc-production.up.railway.app',
  timeout: 5000,
  withCredentials: true,
});

export { AxiosInstance};
