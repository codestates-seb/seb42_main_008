// * 회원 정보
interface MemberProfile {
  memberId: number;
  email: string;
  nickname: string;
  profile: string;
  content: string;
  gender: string;
  score: number;
  followerCount: number;
  followingCount: number;
  memberStatus: string;
}

// * 신청/참여/작성한 글
interface MyCompanion {
  compainonId: number;
  address: string;
  lat: number;
  lng: number;
  date: string;
  companionStatus: boolean;
}

// * 리뷰
interface Review {
  score: number;
  content: string;
}

// * 팔로워, 팔로잉
interface Follow {
  memberID: number;
  profile: string;
  nickname: string;
}

// * 닉네임 중복체크용 body 데이터
interface Nickname {
  nickname: string;
}

// * 프로필 수정 body 데이터
interface ProfileEdit {
  proflie?: string;
  nickname?: string;
  content?: string;
  password: string;
}

// * 팔로워 등록/취소용 body 데이터
interface FollowRequest {
  followerId: number;
  followingId: number;
}

export type {
  MemberProfile,
  MyCompanion,
  Review,
  Follow,
  Nickname,
  ProfileEdit,
  FollowRequest,
};
