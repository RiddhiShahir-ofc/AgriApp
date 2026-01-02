import axios from 'axios';

const mandiApi = axios.create({
  baseURL: 'http://69.62.81.146:8000',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mandiApi;
