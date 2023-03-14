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
  score?: number | null;
}

interface QueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  nationCode: string;
}

interface CountryData {
  name: string;
  code: string;
}

interface CountryNames {
  en: string;
  ko: string;
}

export type { ListData, QueryString, CountryData, CountryNames };
