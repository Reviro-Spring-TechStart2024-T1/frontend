import axios from 'axios';

interface User {
  refresh: string;
  access: string;
  role: 'admin' | 'partner';
}

const drinkjoyApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const testApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TEST_API_URL,
});

drinkjoyApi.interceptors.request.use(
  async config => {
    const user = localStorage.getItem('current_user');

    if (user) {
      const parsedUser: User = JSON.parse(user);
      config.headers['Authorization'] = `Bearer ${parsedUser.access}`;
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
