// import Companion from 'components/ContentDetail/Companion';
import ContentWriter from 'components/ContentDetail/ContentWriter';
import Participants from 'components/ContentDetail/Participants';
import SearchMap from 'components/ContentDetail/SearchMap';

import styled from 'styled-components';

const ContentDetail = () => {
  const tags = ['계획적', '음주선호', '맛집', '쇼핑', '힐링'];
  return (
    <Container>
      <ContentDetailBox>
        <LeftBox>
          <div className="top-box">
            <h1>3/9 ~ 3/30</h1>
            <h3>음악방송</h3>
          </div>
          <div className="bottom-box">
            <h2>하이라이트 응원하러 가실 분 구합니다!!</h2>
            <h4>작성날짜 : 2023/03/09</h4>
            <SearchMap />
            <div id="content">
              하이라이트 최고입니다 나도 하이라이트랑 여행가고 싶어요 수료하고
              나면 여행갈거임하이라이트 최고입니다 나도 하이라이트랑 여행가고
              싶어요 수료하고 나면 여행갈거임하이라이트 최고입니다 나도
              하이라이트랑 여행가고 싶어요 수료하고 나면 여행갈거임하이라이트
              최고입니다 나도 하이라이트랑 여행가고 싶어요 수료하고 나면
              여행갈거임하이라이트 최고
            </div>
            <div id="tag-box">
              {tags.map((el, index) => (
                <li key={index}>{el}</li>
              ))}
            </div>
          </div>
        </LeftBox>
        <RightBox>
          <ContentWriter />
          {/* 여행완료 ? Participants : Companion */}
          {/* <Companion /> */}
          <Participants />
        </RightBox>
      </ContentDetailBox>
    </Container>
  );
};

export default ContentDetail;

const Container = styled.main`
  background-color: #5d62a0;
`;
const ContentDetailBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 1280px;
  height: 860px;
  padding: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
`;

const LeftBox = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 66%;
  height: 100%;
  flex-direction: column;
  border-right: 2px solid #cccccc;
  padding-right: 20px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  .top-box {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    border-bottom: 30px solid #feb35c;
    h1 {
      font-size: 2.8rem;
      padding-right: 30px;
    }
    h3 {
      font-size: 1.5rem;
    }
  }
  .bottom-box {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    h2 {
      font-size: 2.5rem;
    }
    h4 {
      color: #666666;
      font-weight: bold;
    }
    #content {
      width: 100%;
      height: 100%;
      font-size: 1.3rem;
      padding-bottom: 10px;
    }
    #tag-box {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      list-style: none;
      width: 100%;
      li {
        width: calc(100% / 5);
        text-align: center;
        font-size: 1.2rem;
        background-color: #5d62a0;
        border-radius: 50px;
        padding: 5px;
        color: white;
        margin-right: 10px;
      }
    }
  }
`;

const RightBox = styled.section`
  width: 34%;
  height: 100%;
`;

/* TODO:
1. 기본 구조
2. 지도 API
3. 태그 리스트 불러오기
4. 반응형
5. 스크롤 * 
*/
