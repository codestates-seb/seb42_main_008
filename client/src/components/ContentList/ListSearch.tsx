import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useEffect, useState } from 'react';
import { FaCalendarDay } from 'react-icons/fa';
import { HiOutlineX } from 'react-icons/hi';
import {
  ListSearchProps,
  SearchOption,
  SearchQueryString,
} from 'interfaces/ContentList.interface';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';
import { getDateString } from 'utils/getDateString';
import { StyledButton } from 'styles/StyledButton';
import { CloseButton } from 'components/Profile/ModalStyles';
import { IoMdClose } from 'react-icons/io';

const ListSearch = ({
  searchDatas,
  setSearchDatas,
  size,
  searchPage,
  isSearch,
  setIsSearch,
  setIsLast,
  setSearchPage,
  setIsLoading,
  setDatas,
}: ListSearchProps) => {
  const { countryCode } = useParams();
  const [date, setDate] = useState<Date>(new Date());
  const [dateStr, setDateStr] = useState<string>('');
  const [isDateSearch, setIsDateSearch] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  const [condition, setCondition] = useState<string>('entire');

  const handleDateChange = (date: Date) => {
    setDate(date);
    setDateStr(getDateString(date).fullDateStr);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setKeyword(value);
  };

  const handleClearClick = () => {
    setKeyword('');
  };

  const handleChangeOption = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setCondition(value);
  };

  const handleSearchClick = (page: number) => {
    if (isSearch) {
      // ! 이미 검색된 상태에서 검색 버튼을 누른 경우
      setSearchDatas([]);
      setSearchPage(1);
    }
    setIsSearch(true);
    getSearchData(page);
  };

  const handleIsDateSearchChange = () => {
    setIsDateSearch(true);
    setDateStr(getDateString(date).fullDateStr);
  };

  const handleDateSearchCancel = () => {
    setIsDateSearch(false);
    setDateStr('');
  };

  const getSearchData = async (page: number) => {
    setIsLoading(true);
    const params: SearchQueryString = {
      page,
      size,
      sortBy: 'createdAt',
      sortDir: 'DESC',
      condition,
      keyword,
      date: dateStr,
      nationCode: countryCode,
    };

    await customAxios.get('/companions/search', { params }).then(resp => {
      setSearchDatas(cur => {
        if (resp.data.pageInfo.totalPages <= resp.data.pageInfo.page) {
          // ! 마지막 페이지일 경우
          setIsLast(true);
        }
        setIsLoading(false);
        if (cur !== undefined) {
          return [...cur, ...resp.data.data];
        }
        return resp.data.data;
      });
    });
  };

  useEffect(() => {
    if (searchDatas !== undefined) {
      getSearchData(searchPage);
    }
  }, [searchPage]);

  const handleClearSearch = () => {
    setSearchDatas(undefined);
    setKeyword('');
    setDate(new Date());
    setIsSearch(false);
    setDatas([]);
    setDateStr('');
    setIsDateSearch(false);
  };

  const searchOptions: SearchOption[] = [
    { value: '전체', field: 'entire' },
    { value: '태그', field: 'tags' },
    { value: '제목', field: 'title' },
    { value: '내용', field: 'content' },
    { value: '장소', field: 'address' },
  ];

  return (
    <SearchBox>
      <DateSearch>
        <label className="datepicker-label" htmlFor="datePicker">
          <FaCalendarDay color="#fff" size={22} />
        </label>
        {isDateSearch ? (
          <>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              id="datePicker"
            />
            <DateSearchCancel onClick={handleDateSearchCancel}>
              <IoMdClose />
            </DateSearchCancel>
          </>
        ) : (
          <DateSearchButton onClick={handleIsDateSearchChange}>
            날짜 지정하기
          </DateSearchButton>
        )}
      </DateSearch>
      <Stroke></Stroke>
      <KeywordSearch>
        <select className="search-condition" onChange={handleChangeOption}>
          {searchOptions.map((item, idx) => (
            <option key={idx} value={item.field}>
              {item.value}
            </option>
          ))}
        </select>
        <SearchInput>
          <input
            className="search-input"
            type="text"
            value={keyword}
            onChange={handleInputChange}
          />
          {keyword.length !== 0 && (
            <span className="clear" onClick={handleClearClick}>
              <HiOutlineX size={19} />
            </span>
          )}
        </SearchInput>
        <Buttons>
          <SearchButton onClick={() => handleSearchClick(searchPage)}>
            검색
          </SearchButton>
          {isSearch && (
            <ClearButton onClick={handleClearSearch}>초기화</ClearButton>
          )}
        </Buttons>
      </KeywordSearch>
    </SearchBox>
  );
};

const SearchBox = styled.section`
  width: 80%;
  height: 60px;
  background-color: #feb35c;
  position: absolute;
  top: 46vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  z-index: 5;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    padding: 10px;
    gap: 5px;
    top: 44vh;
    align-items: flex-start;
  }
`;

const DateSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 6;
  .datepicker-label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }

  .react-datepicker-wrapper {
    width: 120px;
  }

  .react-datepicker__input-container {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    > input {
      width: 110px;
      background-color: transparent;
      border: none;
      display: flex;
      align-items: center;
      font-size: 1.1rem;
      font-weight: 800;
      color: #fff;
      padding: 5px;
      :focus,
      :hover {
        outline: none;
        border-bottom: 1px solid #fff;
      }
    }
  }
`;

const Stroke = styled.div`
  width: 1px;
  height: 70%;
  background-color: #fff;
`;

const KeywordSearch = styled.div`
  z-index: 5;
  width: 70%;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  .search-condition {
    width: 90px;
    border-radius: 30px;
    border: 1px solid #fff;
    display: flex;
    align-items: center;
    text-align: center;
    padding: 5px;
    background-color: transparent;
    color: #fff;
    font-size: 1rem;
    font-weight: 800;
    :focus {
      outline: none;
    }
  }

  @media screen and (max-width: 768px) {
    width: 100%;
  }
  @media screen and (max-width: 576px) {
    .search-condition {
      width: 70px;
      font-size: 1rem;
    }
  }
`;

const SearchInput = styled.div`
  flex: 1;
  border-radius: 30px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
  color: #fff;
  position: relative;

  .clear {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    right: 10px;
    opacity: 0.7;
  }

  .search-input {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    border-radius: 30px;
    background-color: transparent;
    padding: 5px 15px;
    padding-right: 50px;
    font-size: 1rem;
    border: none;
    :focus {
      outline: none;
      box-shadow: 0px 0px 10px #fff;
    }
  }
`;

const Buttons = styled.div`
  height: 100%;
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    position: absolute;
    right: 10px;
    top: 10px;
    height: fit-content;
  }
`;

const SearchButton = styled(StyledButton)`
  height: 100%;
  background-color: #fff;
  color: #222;
  padding: 5px 20px;
  font-size: 1rem;

  :hover,
  :active {
    background-color: #feb35c;
    color: #fff;
    box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.7);
  }

  @media screen and (max-width: 768px) {
    font-size: 0.9rem;
    padding: 5px 10px;
  }
`;

const ClearButton = styled(SearchButton)`
  background-color: #aaa;
  color: #fff;
`;

const DateSearchButton = styled.div`
  color: #fff;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  :hover {
    text-decoration: underline;
  }
`;

const DateSearchCancel = styled(CloseButton)`
  border: 1px solid #fff;
  background-color: transparent;
  color: #fff;

  :hover,
  :active {
    background-color: #fff;
    color: #feb35c;
  }
`;

export default ListSearch;
