import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React, { useState } from 'react';
import { FaCalendarDay } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
import { HiOutlineX } from 'react-icons/hi';

const ListSearch = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [inputValue, setInputValue] = useState<string>('');

  const handleDateChange = (date: Date) => {
    setStartDate(date);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setInputValue(value);
  };

  const handleClearClick = () => {
    setInputValue('');
  };

  const searchOptions: string[] = ['전체', '태그', '제목', '내용', '장소'];

  return (
    <SearchBox>
      <DateSearch>
        <label htmlFor="datePicker">
          <FaCalendarDay color="#fff" size={22} />
        </label>
        <DatePicker
          selected={startDate}
          onChange={handleDateChange}
          selectsStart
          id="datePicker"
        />
      </DateSearch>
      <Stroke></Stroke>
      <KeywordSearch>
        <select>
          {searchOptions.map((item, idx) => (
            <option key={idx}>{item}</option>
          ))}
        </select>
        <SearchInput>
          <input type="text" value={inputValue} onChange={handleInputChange} />
          {inputValue.length !== 0 && (
            <span className="clear" onClick={handleClearClick}>
              <HiOutlineX size={19} />
            </span>
          )}
          <span>
            <IoSearch size={21} />
          </span>
        </SearchInput>
      </KeywordSearch>
    </SearchBox>
  );
};

const SearchBox = styled.section`
  width: 80%;
  height: 60px;
  background-color: #feb35c;
  position: absolute;
  top: 36vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    height: fit-content;
    padding: 10px 30px;
    gap: 5px;
    top: 34vh;
    align-items: flex-start;
  }
`;

const DateSearch = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > label {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }

  .react-datepicker__input-container {
    width: 120px;
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
      :focus {
        outline: none;
        border-bottom: 1px solid #fff;
      }
    }
  }
`;

const Stroke = styled.div`
  width: 1px;
  height: 80%;
  background-color: #fff;
`;

const KeywordSearch = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > select {
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
    > select {
      width: 70px;
      font-size: 1rem;
    }
  }
`;

const SearchInput = styled.div`
  width: calc(100% - 100px);
  border-radius: 30px;
  border: 1px solid #fff;
  display: flex;
  align-items: center;
  text-align: center;
  background-color: transparent;
  color: #fff;
  position: relative;

  > span {
    position: absolute;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .clear {
    right: 35px;
    opacity: 0.7;
  }

  > input {
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

  @media screen and (max-width: 576px) {
    width: calc(100% - 80px);
  }
`;

export default ListSearch;
