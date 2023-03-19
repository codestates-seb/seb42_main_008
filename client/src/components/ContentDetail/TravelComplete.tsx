import FirstReviewModal from 'components/ContentDetail/FirstReviewModal';
import { participantList } from 'interfaces/ContentDetail.interface';
import { useState } from 'react';
import styled from 'styled-components';

const TravelComplete = () => {
  const companionTabs: participantList[] = [
    {
      tabName: '참여자',
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
  ];

  // 리뷰 작성 모달
  const [firstModal, setFirstModal] = useState<boolean>(false);
  const handleFirstModal = () => {
    setFirstModal(!firstModal);
  };

  return (
    <Container>
      <TabBox>
        <li className="menu focused">참여자</li>
      </TabBox>
      <Content>
        {companionTabs[0].content.map((el, index) => (
          <li key={index}>
            <div className="companion-info">
              <div>{el.picture}</div>
              <div>{el.name}</div>
              {/* 작성자ID === 현재 로그인ID ? 탭 안에 리뷰작성 버튼 : (여행 참여자ID === 현재 로그인ID ? : 리뷰작성 버튼 : null) */}
              {/* 리뷰 작성 완료 ? 완료 : 리뷰버튼 */}
              <div className="btn-wrapper">
                <button className="btn" onClick={handleFirstModal}>
                  리뷰
                </button>
              </div>
            </div>
          </li>
        ))}
        {firstModal ? <FirstReviewModal setFirstModal={setFirstModal} /> : null}
      </Content>
    </Container>
  );
};

export default TravelComplete;

const Container = styled.section`
  display: flex;
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
    * {
      font-size: 0.8rem;
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
    width: 100%;
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
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid #cccccc;
    font-size: 1.2rem;
    padding: 5px;
    .companion-info {
      width: 50%;
      text-align: center;
    }
    .btn-wrapper {
      padding: 5px;
      display: flex;
      justify-content: space-around;
      .btn {
        cursor: pointer;
        padding: 5px 10px;
        font-size: 1rem;
        color: white;
        border: none;
        border-radius: 15px;
        background-color: #feb35c;
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
