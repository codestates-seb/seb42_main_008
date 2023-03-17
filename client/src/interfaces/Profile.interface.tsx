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
interface Follow extends Nickname {
  memberId: number;
  profile: string;
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
  member: MemberProfile;
  setMember: React.Dispatch<React.SetStateAction<MemberProfile | null>>;
}

// * MemberContent 컴포넌트 props
interface MemberContentProps extends MemberSettingsProps {
  user: LoginUser;
  currentTab: number;
}

// * MemberCompanions 컴포넌트 props
interface MemberCompanionsProps extends MemberReviewProps {
  user: LoginUser;
}

// * MemberReview 컴포넌트 props
interface MemberReviewProps {
  member: MemberProfile;
}

// * MemberCompanions -> ListComponent 컴포넌트 props
interface ListComponentProps {
  datas: MyCompanion[] | [];
  titleHead: string;
  titleBody: string;
}

// * MemberSettings 컴포넌트 props
interface MemberSettingsProps extends MemberReviewProps {
  setCurrentTab: React.Dispatch<React.SetStateAction<number>>;
}

// * 팔로워/팔로잉 모달 컴포넌트 props
interface FollowModalProps extends MemberReviewProps {
  setIsShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  isFollower: boolean;
}

// * 회원정보 수정 컴포넌트 props
interface TextEditProps extends MemberReviewProps {
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
interface AccountDeleteModalProps extends MemberReviewProps {
  setIsShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
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
  MemberContentProps,
  MemberCompanionsProps,
  MemberSettingsProps,
  MemberReviewProps,
  ListComponentProps,
  FollowModalProps,
  TextEditProps,
  Validations,
  LoginUser,
  AccountDeleteModalProps,
};
