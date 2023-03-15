import axios from 'axios';

const customAxios = axios.create({
  baseURL: 'http://localhost:3001',
});

export default customAxios;
