import { GoMarkGithub } from 'react-icons/go';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBox>
      <div className="partypeople">PartyPeople</div>
      <div className="names">
        <div className="name">FE: 조은선, 김상교, 장장미</div>
        <div className="name">BE: 이승철, 조국선, 홍수경</div>
      </div>
      <p>
        <a
          className="github"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/codestates-seb/seb42_main_008"
        >
          <GitIcon />
          <span>github 바로가기</span>
        </a>
      </p>
    </FooterBox>
  );
};

export default Footer;

const FooterBox = styled.footer`
  width: 100%;
  height: 200px;
  background-color: #5d62a0;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    color: white;
    padding: 10px;
  }
  .partypeople {
    font-size: 1.5rem;
  }
  .names {
    padding-left: 10px;
    padding-right: 10px;
    border-left: 1px solid white;
    border-right: 1px solid white;
    .name {
      padding: 3px;
    }
  }
  p > a {
    color: white;
  }
  .github {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    > span {
      padding: 5px;
    }
  }
`;
const GitIcon = styled(GoMarkGithub)`
  font-size: 20px;
`;
