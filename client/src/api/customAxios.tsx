import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userToken } from 'states/userState';

const authToken = useRecoilValue(userToken);
axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_TEST_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    Authorization: authToken,
  },
});

export default customAxios;
