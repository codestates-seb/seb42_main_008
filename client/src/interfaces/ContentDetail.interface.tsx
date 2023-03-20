interface contentsTab {
  tabName: string;
  content: profileList[];
}
[];

interface profileList {
  picture: string;
  name: string;
}

interface participantList {
  tabName: string;
  content: profileList[];
}

interface firstModal {
  detail: detailInfo;
  setFirstModal: (newValue: boolean) => void;
  reviewId: number;
}

interface secondModal {
  detail: detailInfo;
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
  reviewId: number;
}

interface thirdModal {
  detail: detailInfo;
  reviewId: number;
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
  setThirdModal: (newValue: boolean) => void;
}

interface detailInfo {
  companionId: number;
  memberId: number;
  nickname: string;
  score: number;
  title: string;
  content: string;
  date: string;
  address: string;
  lat: number;
  lng: number;
  tags: string[];
  createdAt: string;
  companionStatus: boolean;
}

interface detailProps {
  detail: detailInfo;
}

interface companionProps {
  detail: detailInfo;
  sub: subApply[];
  setSub: (newValue: subApply[]) => void;
  part: partApply[];
  setPart: (newValue: partApply[]) => void;
}

interface subProps {
  detail: detailInfo;
  sub: subApply[];
  setSub: (newValue: subApply[]) => void;
}

interface subApply {
  memberId: number;
  profile: string;
  nickname: string;
}

interface partApply {
  memberId: number;
  profile: string;
  nickname: string;
}

interface partProps {
  detail: detailInfo;
  part: partApply[];
  setPart: (newValue: partApply[]) => void;
}

export type {
  contentsTab,
  profileList,
  participantList,
  firstModal,
  secondModal,
  thirdModal,
  detailInfo,
  detailProps,
  subProps,
  partProps,
  companionProps,
};
