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
  setSecondModal: (newValue: boolean) => void;
}

interface thirdModal {
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
