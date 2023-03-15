import { contentsTab } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import styled from 'styled-components';

const Companion = () => {
  const [currentTab, setCurrentTab] = useState(0);

  const companionTabs: contentsTab[] = [
    {
      tabName: '신청자',
      content: [
        { picture: '사진', name: '윤두준' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
        { picture: '사진', name: '양요섭' },
      ],
    },
    {
      tabName: '참여자',
      content: [
        { picture: '사진', name: '이기광' },
        { picture: '사진', name: '손동운' },
      ],
    },
  ];

  const handleSelectTab = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <Container>
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
      <Content>
        {companionTabs[currentTab].content.map((el, index) => (
          <li key={index}>
            <div className="companion-info">
              <span>{el.picture}</span>
              <span>{el.name}</span>
            </div>
            {/* 작성자ID === 현재 로그인ID ? 수락, 거절 버튼 : (신청자ID === 현재 로그인ID ? 취소 버튼 : null) */}
            <div className="btn-wrapper">
              <button className="btn">수락</button>
              <button className="btn">거절</button>
            </div>
          </li>
        ))}
      </Content>
    </Container>
  );
};

export default Companion;

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

const Content = styled.ul`
  text-align: left;
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 100%;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    padding: 5px;
    .companion-info {
      width: 50%;
    }
    .btn-wrapper {
      padding: 5px;
      width: 50%;
      display: flex;
      justify-content: space-around;
      > :nth-child(1) {
        background-color: #81d05b;
      }
      > :nth-child(2) {
        background-color: #ff624d;
      }
      .btn {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 1rem;
        color: white;
        border: none;
        border-radius: 15px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

/* TODO:
1. 탭 만들기 *
2. 신청자 또는 참여자 탭별로 데이터 불러오기 * 
3. 작성자인지 아닌지 판단하여 버튼 다르게 띄우기
3-1. 작성자라면 수정, 삭제, 수락, 거절 버튼
3-2. 작성자가 아니라면 신청, 프로필보기, 신청자&참여자 목록에는 버튼 없음
3-3. 신청자라면 신청자 리스트에 본인 계정에 취소버튼 보이도록 추가
*/
