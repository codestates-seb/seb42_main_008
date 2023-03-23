import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { useSetRecoilState } from 'recoil';
import { googleSignup } from 'states/userState';
import { useNavigate } from 'react-router-dom';
import { loginState, userInfo } from 'states/userState';
import styled from 'styled-components';
import { setCookie } from 'utils/userCookies';

const GoogleLogin = () => {
  const navigate = useNavigate();
  const setIsLogin = useSetRecoilState(loginState);
  const setUser = useSetRecoilState(userInfo);
  const setIsGoogleSignup = useSetRecoilState(googleSignup);
  const BASE_URL = process.env.REACT_APP_SERVER;
  const accessToken: string | null = new URL(
    window.location.href
  ).searchParams.get('access_token');
  const refreshToken: string | null = new URL(
    window.location.href
  ).searchParams.get('refresh_token');
  const googleJoin: string | null = new URL(
    window.location.href
  ).searchParams.get('google_join');

  const googleLoginHandler = () => {
    window.location.assign(`${BASE_URL}/members/login/google`);
  };

  const googleLoginAction = (accessToken: string) => {
    const base64Url = accessToken.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    const userData = JSON.parse(jsonPayload);
    setIsLogin(true);
    setUser(userData);
  };

  useEffect(() => {
    if (accessToken && refreshToken && googleJoin) {
      const parsedGoogleJoin = JSON.parse(googleJoin);
      setIsGoogleSignup(parsedGoogleJoin);
      setCookie('accessToken', 'Bearer ' + accessToken, {
        path: '/',
      });
      setCookie('refreshToken', refreshToken, {
        path: '/',
      });
      googleLoginAction(accessToken);
      navigate('/');
    }
  }, [accessToken, refreshToken, googleJoin]);

  return (
    <div className="btn-wrapper">
      <button id="btn-google" onClick={googleLoginHandler}>
        <GoogleLogo />
      </button>
    </div>
  );
};

const GoogleLogo = styled(FcGoogle)`
  width: 100%;
  height: 100%;
`;

export default GoogleLogin;
