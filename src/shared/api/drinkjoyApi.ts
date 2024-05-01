import axios from 'axios';

const drinkjoyApi = axios.create({
  baseURL: 'https://backend-gvhy.onrender.com/api/v1',
});

drinkjoyApi.interceptors.request.use(
  async config => {
    const access_token =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE1MTg2MjM2LCJpYXQiOjE3MTQ1ODE0MzYsImp0aSI6ImQ3OGRiMzVmZmUxYzRmMGY4Mzk4NmQzZWI2NDQ5ZTNhIiwidXNlcl9pZCI6N30.osXOE0EFtBIi--uiWOlhCaNgpsV8FL9H--J2FlfEBQ8';
    if (access_token) {
      config.headers['Authorization'] = access_token;
    }
    return config;
  },
  error => Promise.reject(error),
);

export { drinkjoyApi };
