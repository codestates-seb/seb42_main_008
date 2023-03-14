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

export type { MemberProfile, MyCompanion, Review };
