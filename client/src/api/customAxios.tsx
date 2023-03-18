import axios from 'axios';
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL: 'https://6a7c-221-140-143-39.jp.ngrok.io',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default customAxios;
