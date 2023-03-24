import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// * 로그인 상태
export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// * 로그인 유저 정보
export const userInfo = atom({
  key: 'userInfo',
  default: {
    gender: '',
    profile: '',
    roles: ['USER'],
    nickname: '',
    memberStatus: '',
    email: '',
    memberId: 0,
    sub: '',
    iat: 0,
    exp: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

// * 구글 회원가입 정보
export const googleSignup = atom({
  key: 'googleSignup',
  default: true,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 토큰 정보
export const userToken = atom({
  key: 'userToken',
  default: { authorization: '' },
  effects_UNSTABLE: [persistAtom],
});

export const userRefreshToken = atom({
  key: 'userRefreshToken',
  default: '',
  effects_UNSTABLE: [persistAtom],
});

// 로그인 토큰 디코딩 정보
export const userDecodeToken = atom({
  key: 'userTokenLoading',
  default: false,
  effects_UNSTABLE: [persistAtom],
});
