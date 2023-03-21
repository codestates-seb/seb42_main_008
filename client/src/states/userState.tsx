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
