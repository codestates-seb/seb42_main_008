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

interface modalProps {
  reviewModal: boolean;
  setReviewModal: (newValue: boolean) => void;
}

export type { contentsTab, profileList, participantList, modalProps };
