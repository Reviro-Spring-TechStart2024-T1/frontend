import axios from 'axios';

const drinkjoyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

drinkjoyApi.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

export { drinkjoyApi };
