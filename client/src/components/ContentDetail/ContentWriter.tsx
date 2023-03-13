import styled from 'styled-components';

const ContentWriter = () => {
  return (
    <Container>
      <div>프로필 자리</div>
    </Container>
  );
};

export default ContentWriter;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

/* TODO:
1. 기본 구조
2. 작성자인지 아닌지 구분하여 버튼 내용 다르게 하기
2-1. onClick 이벤트도 다르게 하기
2-2. 프로필 이미지 불러오기
2-3. 배터리 게이지 표시
*/
