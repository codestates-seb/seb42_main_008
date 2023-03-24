// ! 전역 유저 정보
interface LoginUser {
  memberId: number;
  nickname: string;
  email: string;
  profile: string;
  memberStatus: string;
  gender: string;
}

// * 회원 정보
interface MemberProfile extends LoginUser {
  content: string;
  score: number;
  followerCount: number;
  followingCount: number;
  followerStatus: boolean;
}

// * 신청/참여/작성한 글
interface MyCompanion {
  companionId: number;
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
  nickname: string;
  memberId: number;
  profile: string;
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

// * MemberInfo 컴포넌트 props
interface MemberInfoProps {
  member: MemberProfile;
  setMember: React.Dispatch<React.SetStateAction<MemberProfile | null>>;
}

// * MemberSettings 컴포넌트 props
interface MemberSettingsProps {
  member: MemberProfile;
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

// * MemberContent 컴포넌트 props
interface MemberContentProps extends MemberSettingsProps {
  currentTab: number;
}

// * MemberCompanions 컴포넌트 props
interface MemberCompanionsProps {
  member: MemberProfile;
}

// * MemberCompanions -> ListComponent 컴포넌트 props
interface ListComponentProps {
  datas: MyCompanion[] | [];
  titleHead: string;
  titleBody: string;
  isLoading: boolean;
}

// * 팔로워/팔로잉 모달 컴포넌트 props
interface FollowModalProps {
  member: MemberProfile;
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isFollower: boolean;
}

// * 회원정보 수정 컴포넌트 props
interface TextEditProps {
  member: MemberProfile;
  setMemberData: React.Dispatch<any>;
  validation: Validations;
  setValidation: React.Dispatch<React.SetStateAction<Validations>>;
}

// * 회원정보 수정 유효성체크 타입
interface Validations {
  nicknameValid: boolean | undefined;
  contentValid: boolean | undefined;
  passwordValid: boolean | undefined;
  passwordCheckValid: boolean | undefined;
  totalValid: boolean | undefined;
  nicknameUnique?: boolean | undefined;
}

// * 회원탈퇴 모달 Props
interface AccountDeleteModalProps {
  setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

// * MemberCompanions isLoading State interface
interface CompanionLoading {
  subs: boolean;
  part: boolean;
  writ: boolean;
}

export type {
  MemberProfile,
  MyCompanion,
  Review,
  Follow,
  ProfileEdit,
  FollowRequest,
  MemberInfoProps,
  MemberContentProps,
  MemberCompanionsProps,
  MemberSettingsProps,
  ListComponentProps,
  FollowModalProps,
  TextEditProps,
  Validations,
  LoginUser,
  AccountDeleteModalProps,
  CompanionLoading,
};
