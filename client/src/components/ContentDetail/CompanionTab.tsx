import Participants from 'components/ContentDetail/Tab//Participants';
import Companion from 'components/ContentDetail/Tab/Companion';
import { contentsTab, subProps } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import styled from 'styled-components';

const CompanionTab = ({ detail, sub, setSub }: subProps) => {
  const [currentTab, setCurrentTab] = useState(0);
  const companionTabs: contentsTab[] = [
    {
      tabName: '신청자',
      content: [],
    },
    {
      tabName: '참여자',
      content: [],
    },
  ];

  const handleSelectTab = (index: number) => {
    setCurrentTab(index);
  };
  return (
    <Container>
      {/* 만약 현재 선택된 탭이 신청자라면 ? <Companion /> : <Participants /> */}
      <TabBox>
        {companionTabs.map((el: contentsTab, index: number) => (
          <li
            key={index}
            className={`${currentTab === index ? `menu focused` : `menu`}`}
            onClick={() => handleSelectTab(index)}
          >
            {el.tabName}
          </li>
        ))}
      </TabBox>
      <Companion detail={detail} sub={sub} setSub={setSub} />
      <Participants detail={detail} sub={sub} setSub={setSub} />
    </Container>
  );
};

export default CompanionTab;

const Container = styled.section`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  padding: 10px;
  width: 100%;
  height: 50%;
  @media screen and (max-width: 992px) {
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 100%;
    @media (orientation: landscape) {
      * {
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 576px) {
    height: 100%;
  }
`;

const TabBox = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  width: 100%;
  cursor: pointer;
  > li {
    width: 50%;
    text-align: center;
  }
  .menu {
    padding: 15px;
  }
  .focused {
    background-color: #d9506a;
    color: white;
  }
  @media screen and (max-width: 768px) {
    .menu {
      padding: 10px;
    }
  }
  @media screen and (max-width: 576px) {
    .menu {
      padding: 10px;
    }
  }
`;
