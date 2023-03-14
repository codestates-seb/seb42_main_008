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

export type { contentsTab, profileList, participantList };
