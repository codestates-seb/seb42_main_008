import styled from 'styled-components';

const ContentWriter = () => {
  return (
    <Container>
      <WriterInfo>
        <div className="img-wrapper">
          <div>프로필 사진 자리</div>
        </div>
        <div className="info-wrapper">
          <div id="nickname">하이라이트 짱팬</div>
          <div id="battery">배터리 자리</div>
        </div>
      </WriterInfo>
      <ButtonBox>
        {/* 작성자ID === 현재 로그인ID ?  수정, 삭제 버튼 : 동행신청, 프로필보기 버튼 */}
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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50%;
`;

const WriterInfo = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .img-wrapper {
    background-color: #e7e7e7;
    width: 50%;
    height: 50%;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .info-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 10px 50px;
    #nickname {
      font-size: 1.3rem;
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
    padding: 10px 30px;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
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
