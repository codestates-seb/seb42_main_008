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
  setFirstModal: (newValue: boolean) => void;
}

interface secondModal {
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
}

interface thirdModal {
  setFirstModal: (newValue: boolean) => void;
  setSecondModal: (newValue: boolean) => void;
  setThirdModal: (newValue: boolean) => void;
}

export type {
  contentsTab,
  profileList,
  participantList,
  firstModal,
  secondModal,
  thirdModal,
};
