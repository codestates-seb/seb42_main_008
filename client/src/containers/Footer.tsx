import { GoMarkGithub } from 'react-icons/go';
import { RxNotionLogo } from 'react-icons/rx';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterBox>
      <div className="partypeople">Party People</div>
      <Names>
        <div className="name">조은선, 김상교, 장장미</div>
        <div className="name">이승철, 조국선, 홍수경</div>
      </Names>
      <IconLinks>
        <p className="link">
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
        <p className="link">
          <a
            className="notion"
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.notion.so/Main-Project-6b6a883620bd4a6ebeeca2c5338a38fa"
          >
            <NotionIcon />
            <span>notion 바로가기</span>
          </a>
        </p>
      </IconLinks>
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
    font-family: 'Lobster', cursive;
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
  .notion {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    > span {
      padding: 5px;
    }
  }
  @media screen and (max-width: 992px) {
    > * {
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 768px) {
    > * {
      font-size: 0.7rem;
    }
  }
  @media screen and (max-width: 576px) {
    height: 150px;
    > * {
      font-size: 0.5rem;
    }
    p > a {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
  }
`;
const GitIcon = styled(GoMarkGithub)`
  font-size: 20px;
`;
const NotionIcon = styled(RxNotionLogo)`
  font-size: 20px;
`;
const Names = styled.section`
  padding-left: 10px;
  padding-right: 10px;
  border-left: 1px solid white;
  border-right: 1px solid white;
  .name {
    padding: 3px;
  }
`;
const IconLinks = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
