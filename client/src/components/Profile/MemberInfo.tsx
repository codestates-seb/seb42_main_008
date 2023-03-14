import styled from 'styled-components';
import Battery1 from 'assets/icons/battery1.svg';
import Battery2 from 'assets/icons/battery2.svg';
import Battery3 from 'assets/icons/battery3.svg';
import Battery4 from 'assets/icons/battery4.svg';
import Battery5 from 'assets/icons/battery5.svg';

import memberData from 'profileTestData.json';

const MemberInfo = () => {
  const member = memberData.members;

  const getScoreIcon = (score: number) => {
    if (score >= 0 && score < 21) {
      return Battery1;
    } else if (score > 20 && score < 41) {
      return Battery2;
    } else if (score > 40 && score < 61) {
      return Battery3;
    } else if (score > 60 && score < 81) {
      return Battery4;
    }
    return Battery5;
  };

  return (
    <InfoContainer>
      <ImageWrapper>
        <img src={member.profile} alt="profile" />
        <div className="score">
          <img src={getScoreIcon(member.score)} alt="score" />
          <span>{member.score}%</span>
        </div>
      </ImageWrapper>
      <ContentWrapper>
        <h1>{member.nickname}</h1>
      </ContentWrapper>
    </InfoContainer>
  );
};

const InfoContainer = styled.article`
  width: 100%;
  border: 1px solid #ddd;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 20px;
`;

const ImageWrapper = styled.section`
  width: 20%;
  > img {
    border-radius: 50%;
    width: 150px;
  }
`;

const ContentWrapper = styled.section`
  width: 80%;
`;

export default MemberInfo;
