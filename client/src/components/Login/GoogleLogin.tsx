// import axios from 'axios';
// import { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import styled from 'styled-components';

const GoogleLogin = () => {
  // const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  // const clientSecret = process.env.REACT_APP_GOOGLE_CLIENT_SECRET;
  // const redirectURI = process.env.REACT_APP_REDIRECT_URI;
  // const googleOAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${clientId}&scope=openid%20profile%20email&redirect_uri=${redirectURI}`;
  // const code: string | null = new URL(window.location.href).searchParams.get(
  //   'code'
  // );

  const googleLoginHandler = () => {
    window.location.assign(
      'https://3ba2-1-237-37-135.jp.ngrok.io/members/login/google'
    );
  };

  // const googleLoginRequest = async () => {
  //   await axios
  //     .post(`${process.env.REACT_APP_TEST_SERVER}/members/google`, {
  //       client_id: clientId,
  //       client_secret: clientSecret,
  //       code: code,
  //       grant_type: 'authorization_code',
  //     })
  //     .then(resp => {
  //       console.log(resp);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
  // };

  // useEffect(() => {
  //   console.log(`code :  ${code}`);
  //   if (code) {
  //     googleLoginRequest();
  //   }
  // }, [code]);

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
