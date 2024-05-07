import axios from 'axios';

interface Token {
  refresh: string;
  access: string;
}

const drinkjoyApi = axios.create({
  baseURL: 'https://backend-gvhy.onrender.com/api/v1',
});

const testApi = axios.create({
  baseURL: 'http://localhost:5000',
});

drinkjoyApi.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');

    if (token) {
      const parsedToken: Token = JSON.parse(token);
      config.headers['Authorization'] = `Bearer ${parsedToken.access}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

testApi.interceptors.request.use(
  async config => {
    return config;
  },
  error => Promise.reject(error),
);

export { drinkjoyApi, testApi };
