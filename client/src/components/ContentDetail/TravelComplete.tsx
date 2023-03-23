import customAxios from 'api/customAxios';
import { StyledTabBox } from 'components/ContentDetail/CompanionStyled';
import FirstReviewModal from 'components/ContentDetail/FirstReviewModal';
import { partProps } from 'interfaces/ContentDetail.interface';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';

const TravelComplete = ({ detail, part, setPart }: partProps) => {
  const params = useParams();
  const { contentId } = params;
  const { memberId } = useRecoilValue(userInfo);

  const [firstModal, setFirstModal] = useState<boolean>(false);
  const [reviewId, setReviewId] = useState(0);
  // * 리뷰 작성한 사람 모음
  const [reviewed, setReviewed] = useState<any>();

  const navigate = useNavigate();

  const handleFirstModal = (reviewMemberId: number) => {
    setFirstModal(!firstModal);
    setReviewId(reviewMemberId);
  };

  const getPartList = () => {
    customAxios.get(`/companions/${contentId}/participants`).then(res => {
      setPart(res.data.data);
    });
  };

  useEffect(() => {
    getPartList();
  }, []);

  const getReviewList = () => {
    customAxios
      .get(`/companions/${contentId}/reviewers`, {
        params: { memberId },
      })
      .then(res => {
        setReviewed(res.data.data);
      });
  };

  useEffect(() => {
    getReviewList();
  }, []);

  const handleMoveProfile = (partMemberId: number) => {
    navigate(`/${partMemberId}/profile`);
  };

  return (
    <Container>
      <TabBox>
        <li className="menu focused">참여자</li>
      </TabBox>
      <Content>
        {part && part.length !== 0 ? (
          part.map((el: any, index: number) => (
            <li key={index}>
              <CompanionInfo onClick={() => handleMoveProfile(el.memberId)}>
                <div
                  className="img"
                  style={{ backgroundImage: `url(${el.profile})` }}
                ></div>
                <div className="nickname">{el.nickname}</div>
              </CompanionInfo>
              {memberId !== el.memberId && detail.memberId !== memberId ? (
                <ButtonBox>
                  <button className="other"></button>
                </ButtonBox>
              ) : (reviewed &&
                  reviewed.length !== 0 &&
                  reviewed.some((rv: any) => rv.memberId === el.memberId)) ||
                (reviewed &&
                  reviewed.length !== 0 &&
                  reviewed.some(
                    (rv: any) => rv.memberId === detail.memberId
                  )) ? (
                <ButtonBox>
                  <button className="complete">리뷰 완료</button>
                </ButtonBox>
              ) : detail.memberId === memberId ? (
                <ButtonBox>
                  <button onClick={() => handleFirstModal(el.memberId)}>
                    참여자 리뷰
                  </button>
                </ButtonBox>
              ) : (memberId === el.memberId &&
                  reviewed &&
                  reviewed.length !== 0 &&
                  reviewed.some(
                    (rv: any) => rv.memberId === detail.memberId
                  )) ||
                (memberId === el.memberId &&
                  reviewed &&
                  reviewed.length !== 0 &&
                  reviewed.some(
                    (rv: any) => rv.memberId === el.memberId
                  )) ? null : (
                <ButtonBox>
                  <button onClick={() => handleFirstModal(el.memberId)}>
                    작성자 리뷰
                  </button>
                </ButtonBox>
              )}
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
      font-size: 1.2rem;
    }
  }
  @media screen and (max-width: 576px) {
    height: 100%;
    * {
      font-size: 0.8rem;
    }
  }
`;

const TabBox = styled(StyledTabBox)`
  li {
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
  grid-template-columns: repeat(2, 50%);
  grid-template-rows: repeat(2, 1fr);
  justify-items: center;
  align-items: center;
  overflow: scroll;
  padding: 10px 0px;
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
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    li {
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 576px) {
    li {
      font-size: 0.8rem;
    }
  }
`;
const CompanionInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .img {
    margin-right: 5px;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .nickname {
    white-space: nowrap;
    text-align: center;
    width: 100%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @media screen and (max-width: 768px) {
    .img {
      width: 30px;
      height: 30px;
    }
  }
  @media screen and (max-width: 576px) {
    .img {
      width: 30px;
      height: 30px;
    }
  }
`;
const ButtonBox = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-around;
  button {
    cursor: pointer;
    padding: 5px 15px;
    font-size: 1rem;
    color: white;
    border: none;
    border-radius: 15px;
    background-color: #feb35c;
    &.other {
      cursor: default;
      background-color: transparent;
      opacity: 0;
    }
  }
  .complete {
    cursor: default;
    background-color: #d9d9d9;
  }
  @media screen and (max-width: 768px) {
    button {
      font-size: 0.8rem;
    }
  }
  @media screen and (max-width: 576px) {
    button {
      font-size: 0.8rem;
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
