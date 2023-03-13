interface ListData {
  companionId: number;
  memberId: number;
  nickname: string;
  address: string;
  lat: number;
  lng: number;
  title: string;
  content: string;
  date: string;
  tags: string[];
  companionStatus: boolean;
  score: number;
}

interface QueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  nationCode: string;
}

export type { ListData, QueryString };
