interface contentsTab {
  tabName: string;
  content: profileList[];
}
[];

interface profileList {
  picture: string;
  name: string;
}

export type { contentsTab, profileList };
