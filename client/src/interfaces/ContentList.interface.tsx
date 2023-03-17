import React from 'react';

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
interface SearchQueryString extends ListQueryString {
  condition: string;
  keyword: string;
  date?: string | Date;
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
  searchDatas: ListData[] | undefined;
  setSearchDatas: React.Dispatch<React.SetStateAction<ListData[] | undefined>>;
  size: number;
  sortData: SortBy;
  searchPage: number;
  isSearch: boolean;
  setIsSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLast: React.Dispatch<React.SetStateAction<boolean>>;
}

// * 정렬 기준
interface SortBy {
  value: string;
  sortBy: string;
  sortDir: string;
}

// * Api 호출시 response pageInfo
interface PageInfo {
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

// * ListSearch 컴포넌트에서 사용할 interface
interface SearchOption {
  value: string;
  field: string;
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
  PageInfo,
  SearchOption,
};
