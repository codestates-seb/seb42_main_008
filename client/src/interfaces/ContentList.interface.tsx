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

interface ListQueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  nationCode: string;
}

interface SearchQueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  condition: string;
  keyword: string;
  date?: string | Date;
}

interface CountryData {
  name: string;
  code: string;
}

interface CountryNames {
  en: string;
  ko: string;
}

interface ListItemProps {
  listData: ListData[];
}

interface SortBy {
  value: string;
  sortBy: string;
  sortDir: string;
}

export type {
  ListData,
  ListQueryString,
  SearchQueryString,
  CountryData,
  CountryNames,
  ListItemProps,
  SortBy,
};
