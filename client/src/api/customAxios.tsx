import axios from 'axios';
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_TEST_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default customAxios;
