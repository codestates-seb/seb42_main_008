import styled from 'styled-components';
import { MemberContentProps } from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import MemberReviews from './MemberReviews';
import MemberCompanoins from './MemberCompanoins';
import MemberSettings from './MemberSettings';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import { useParams } from 'react-router-dom';

const MemberContent = ({
  member,
  currentTab,
  setCurrentTab,
}: MemberContentProps) => {
  const { memberId } = useParams();
  const [tabList, setTabList] = useState<string[]>([]);
  const loginUser = useRecoilValue(userInfo);

  const handleTabList = () => {
    if (memberId === loginUser.memberId.toString()) {
      setTabList(['평가 모아보기', `내 동행글`, '계정 관리']);
    } else {
      setTabList(['평가 모아보기', `동행글 보기`]);
    }
  };

  useEffect(() => {
    handleTabList();
    setCurrentTab(0);
  }, [memberId]);

  const handleTabClick = (idx: number) => {
    setCurrentTab(idx);
  };

  return (
    <Container>
      <Tabs>
        {tabList.map((item, idx) => (
          <li
            key={idx}
            role="presentation"
            onClick={() => handleTabClick(idx)}
            className={`content-tab ${
              currentTab === idx ? 'active' : undefined
            }`}
          >
            {item}
          </li>
        ))}
      </Tabs>
      {currentTab === 0 && <MemberReviews />}
      {currentTab === 1 && <MemberCompanoins member={member} />}
      {currentTab === 2 && (
        <MemberSettings member={member} setCurrentTab={setCurrentTab} />
      )}
    </Container>
  );
};

const Container = styled.section`
  width: calc(100% - 40px);
  margin: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 18vh;
`;

const Tabs = styled.ul`
  width: 100%;
  display: flex;
  margin-bottom: 30px;

  .content-tab {
    flex: 1;
    border: 2px solid #feb35c;
    padding: 12px;
    font-size: 1.1rem;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    cursor: pointer;
    :hover {
      filter: brightness(0.9);
    }
    :first-of-type {
      border-radius: 10px 0px 0px 10px;
      border-right: none;
    }
    :last-of-type {
      border-radius: 0px 10px 10px 0px;
      border-left: none;
    }
  }
  .active {
    background-color: #feb35c;
    color: #fff;
    :hover {
      filter: brightness(1);
    }
  }

  @media screen and (max-width: 576px) {
    .content-tab {
      font-size: 0.8rem;
    }
  }
`;

export default MemberContent;
