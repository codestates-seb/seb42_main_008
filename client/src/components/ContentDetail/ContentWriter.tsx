// import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getScoreIcon } from 'utils/getScoreIcon';

const ContentWriter = () => {
  // 클릭 시 수정페이지로 이동 추가
  // const navigate = useNavigate();
  // const handleClick = () => {
  //   navigate(`${}/edit`)
  // }

  // 클릭 시 글 삭제 추가

  return (
    <Container>
      <WriterInfo>
        <div className="img-wrapper">
          <div>프로필 사진 자리</div>
        </div>
        <div className="info-wrapper">
          <div id="nickname">하이라이트 짱팬</div>
          <div id="battery">
            <img src={getScoreIcon(93)} alt="score" />
          </div>
        </div>
      </WriterInfo>
      <ButtonBox>
        {/* 여행완료? 리뷰작성 버튼 : (작성자ID === 현재 로그인ID ?  수정, 삭제 버튼 : 동행신청, 프로필보기 버튼) */}
        {/* 참여자 탭에서는 버튼 안보이도록 수정하기 */}
        <button className="btn">동행글 수정</button>
        <button className="btn">동행글 삭제</button>
      </ButtonBox>
    </Container>
  );
};

export default ContentWriter;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50%;
  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    @media (orientation: landscape) {
      height: 70%;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    @media (orientation: landscape) {
      height: 100%;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const WriterInfo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .img-wrapper {
    background-color: #e7e7e7;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-wrapper {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    #nickname {
      font-size: 1.3rem;
    }
  }
  @media screen and (max-width: 768px) {
    .img-wrapper {
      width: 150px;
      height: 150px;
    }
    .info-wrapper {
      display: flex;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      padding: 10px 20px;
      #nickname {
        font-size: 1rem;
      }
      #battery {
        > img {
          width: 50px;
          height: 40px;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    font-size: 0.5rem;
    height: 100vh;
    .info-wrapper {
      #nickname {
        font-size: 1rem;
      }
      #battery {
        > img {
          width: 50px;
          height: 40px;
        }
      }
    }
  }
`;

const ButtonBox = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  .btn {
    background-color: #d9d9d9;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    .btn {
      background-color: #d9d9d9;
      color: white;
      border: none;
      padding: 5px;
      border-radius: 30px;
      font-size: 0.7rem;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 576px) {
    > * {
      font-size: 0.5rem;
    }
  }
`;

/* TODO:
1. 기본 구조 * 
2. 작성자인지 아닌지 구분하여 버튼 내용 다르게 하기
2-1. onClick 이벤트도 다르게 하기
2-2. 프로필 이미지 불러오기
2-3. 배터리 게이지 표시
3. 참여자 탭에서 수락, 거절 버튼 안보이도록 수정
*/
