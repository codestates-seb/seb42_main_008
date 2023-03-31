import axios from 'axios';
import Swal from 'sweetalert2';
import { getCookie, setCookie } from 'utils/userCookies';

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: true,
});

customAxios.interceptors.request.use(config => {
  const storageData = localStorage.getItem('recoil-persist');
  if (!storageData) {
    config.headers['Authorization'] = null;
    config.headers['refresh'] = null;
    return config;
  }
  const accessToken = getCookie('accessToken');
  const refreshToken = getCookie('refreshToken');
  config.headers['Authorization'] = accessToken;
  config.headers['refresh'] = refreshToken;
  return config;
});

customAxios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const {
      config,
      response: { status },
    } = error;
    if (status === 401) {
      // & AccessToken 만료시 재발급
      if (
        error.response.data.message.slice(0, 11) === 'JWT expired' ||
        error.response.data.message === 'Access Token Expired Error'
      ) {
        const originalRequest = config;
        const refreshToken = await getCookie('refreshToken');
        await customAxios
          .post(
            `/members/reissue`,
            {},
            { headers: { refresh: `${refreshToken}` } }
          )
          .then(resp => {
            setCookie('accessToken', resp.headers.authorization, {
              path: '/',
            });
          });
        const newAccessToken = getCookie('accessToken');
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
      // & Refresh Token 만료시 로그아웃
      else if (
        error.response.data.message === 'Token Expired Error' ||
        error.response.data.message === '유효한 토큰이 아닙니다.' ||
        error.response.data.message === 'Unauthorized' ||
        error.response.data.message ===
          'Full authentication is required to access this resource'
      ) {
        Swal.fire({
          title: '로그인 시간이 만료되었습니다',
          text: '다시 로그인 해주세요! 🥲',
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: '확인',
        }).then(() => {
          localStorage.clear();
          const originLocation = location.origin;
          location.assign(`${originLocation}/login`);
        });
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
