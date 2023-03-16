// * 국가별 조회, 키워드검색 Response data
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

// * 국가별 조회시 필요한 Query String
interface ListQueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  nationCode: string | undefined;
}

// * 키워드 검색시 필요한 Query String
interface SearchQueryString {
  page: number;
  size: number;
  sortDir: string;
  sortBy: string;
  condition: string;
  keyword: string;
  date?: string | Date;
  nationCode: string;
}

// * 국가 정보
interface CountryData {
  name: string;
  code: string;
}

// * 국가 이름
interface CountryNames {
  en: string;
  ko: string;
}

// * ListItems 컴포넌트 Props data
interface ListItemProps {
  listData: ListData[];
  setSortData: React.Dispatch<React.SetStateAction<SortBy>>;
}

// * ListSearch 컴포넌트 props
interface ListSearchProps {
  setSearchDatas: React.Dispatch<React.SetStateAction<ListData[] | null>>;
}

// * 정렬 기준
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
  ListSearchProps,
  SortBy,
};
