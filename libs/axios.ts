import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const fetchAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
  },
});

export { fetchAxios };
