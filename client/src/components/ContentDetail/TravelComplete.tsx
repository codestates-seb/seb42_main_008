import axios from 'axios';
import { StyledTabBox } from 'components/ContentDetail/CompanionStyled';
import FirstReviewModal from 'components/ContentDetail/FirstReviewModal';
import { partProps } from 'interfaces/ContentDetail.interface';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { reviewInfo, userInfo } from 'states/userState';
import styled from 'styled-components';

const TravelComplete = ({ detail, part, setPart }: partProps) => {
  const params = useParams();
  const { contentId } = params;
  const { memberId } = useRecoilValue(userInfo);
  const review = useRecoilValue(reviewInfo);

  // 리뷰 작성 모달
  const [firstModal, setFirstModal] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState(0);
  const handleFirstModal = (reviewMemberId: number) => {
    setFirstModal(!firstModal);
    setReviewId(reviewMemberId);
  };

  const getPartList = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/companions/${contentId}/participants`
      )
      .then(res => {
        setPart(res.data.data);
      });
  };

  useEffect(() => {
    getPartList();
  }, []);

  return (
    <Container>
      <TabBox>
        <li className="menu focused">참여자</li>
      </TabBox>
      <Content>
        {part && part.length !== 0 ? (
          part.map((el: any, index: number) => (
            <li key={index}>
              <div className="companion-info">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${el.profile})` }}
                ></div>
                <div>{el.nickname}</div>
              </div>
              {/* 작성자ID === 현재 로그인ID ? 탭 안에 리뷰작성 버튼 : (여행 참여자ID === 현재 로그인ID ? : 리뷰작성 버튼 : null) */}
              {/* 리뷰 작성 완료 ? 완료 : 리뷰버튼 */}
              {review ? (
                <div className="btn-wrapper">
                  <button className="btn">완료</button>
                </div>
              ) : detail.memberId === memberId ? (
                <div className="btn-wrapper">
                  <button
                    className="btn"
                    onClick={() => handleFirstModal(el.memberId)}
                  >
                    리뷰
                  </button>
                </div>
              ) : memberId === el.memberId ? (
                <div className="btn-wrapper">
                  <button
                    className="btn"
                    onClick={() => handleFirstModal(el.memberId)}
                  >
                    작성자 리뷰
                  </button>
                </div>
              ) : null}
            </li>
          ))
        ) : (
          <li>동행 참여자가 없습니다. 🥲</li>
        )}
      </Content>
      {firstModal ? (
        <FirstReviewModal
          detail={detail}
          setFirstModal={setFirstModal}
          reviewId={reviewId}
        />
      ) : null}
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

const TabBox = styled(StyledTabBox)`
  > li {
    width: 100%;
    text-align: center;
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
    font-size: 1.2rem;
    padding: 5px;
    flex-direction: column;
    .companion-info {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      .img {
        margin-right: 5px;
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .btn-wrapper {
      padding: 5px;
      display: flex;
      justify-content: space-around;
      .btn {
        cursor: pointer;
        padding: 5px 15px;
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
      .companion-info {
        .img {
          width: 30px;
          height: 30px;
        }
      }
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
      .companion-info {
        .img {
          width: 30px;
          height: 30px;
        }
      }
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
