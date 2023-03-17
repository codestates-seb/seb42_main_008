import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

// interface userInfoTypes {
//   key: string;
//   default: userInfoType;
//   effects_UNSTABLE: [];
// }

// interface userInfoType {
//   gender: string;
//   profile: string;
//   nickname: string;
//   memberStatus: string;
//   email: string;
//   memberId: number;
//   sub: string;
//   iat: number;
//   exp: number;
// }

// 로그인 상태
export const loginState = atom({
  key: 'loginState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 로그인 토큰 정보
export const userToken = atom({
  key: 'userToken',
  default: { authorization: '' },
  effects_UNSTABLE: [persistAtom],
});

// 유저 정보
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
    iat: 1679033173,
    exp: 1679033773,
  },
  effects_UNSTABLE: [persistAtom],
});

// export type { userInfoTypes, userInfoType };
