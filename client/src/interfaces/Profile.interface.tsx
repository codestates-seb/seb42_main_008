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
  followerStatus: boolean;
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
  gender?: string;
  content?: string;
  password: string;
}

// * 팔로워 등록/취소용 body 데이터
interface FollowRequest {
  followerId: number;
  followingId: number;
}

// * MemberInfo 컴포넌트 props
interface MemberInfoProps {
  user: LoginUser;
  member: MemberProfile | null;
}

// * MemberCompanions 컴포넌트 props
interface MemberCompanionsProps {
  member: MemberProfile | null;
  user: LoginUser;
}

// * MemberCompanions -> ListComponent 컴포넌트 props
interface ListComponentProps {
  datas: MyCompanion[] | [];
  titleHead: string;
  titleBody: string;
}

// * MemberSettings 컴포넌트 props
interface MemberSettingsProps {
  member: MemberProfile | null;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

interface FollowModalProps {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isFollower: boolean;
}

interface TextEditProps {
  setMemberData: React.Dispatch<any>;
  member: MemberProfile | null;
  validation: Validations;
  setValidation: React.Dispatch<React.SetStateAction<Validations>>;
}

interface Validations {
  nicknameValid: boolean | undefined;
  contentValid: boolean | undefined;
  passwordValid: boolean | undefined;
  passwordCheckValid: boolean | undefined;
  totalValid: boolean | undefined;
  nicknameUnique?: boolean | undefined;
}

// ! 전역 유저 정보
interface LoginUser {
  memberId: number;
  nickname: string;
  email: string;
  profile: string;
  memberStatus: string;
  gender: string;
}

export type {
  MemberProfile,
  MyCompanion,
  Review,
  Follow,
  Nickname,
  ProfileEdit,
  FollowRequest,
  MemberInfoProps,
  MemberCompanionsProps,
  MemberSettingsProps,
  ListComponentProps,
  FollowModalProps,
  TextEditProps,
  Validations,
  LoginUser,
};
