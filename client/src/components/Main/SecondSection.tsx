import { useScroll } from 'hooks/useScroll';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { loginState } from 'states/userState';
import styled from 'styled-components';
import ImageFilter from '../../styles/ImageFilter';
import { SectionWrapper } from './SectionWrapper';

const SecondSection = () => {
  const navigate = useNavigate();
  const scrollY = useScroll();
  const isLogin = useRecoilState(loginState);

  const handleButtonClick = () => {
    if (isLogin) {
      navigate('/continents');
    } else {
      navigate('/signup');
    }
  };

  return (
    <SecondWrapper>
      <ContentBox className={scrollY > 200 ? 'showDesc' : 'notShowDesc'}>
        <Desc>
          {scrollY > 200 && (
            <>
              <h1 className="second-title">
                온라인에서 오프라인까지
                <br />
                즐거운 동행을 시작해보세요!
              </h1>
              <p className="second-desc">
                Party People은 홀로 여행하는 여행자들을 위해 함께 동행할 수 있는
                동행자를 찾는 서비스입니다.
                <br />
                새로운 여행, 함께 할 동행자를 찾고 있나요? 함께하는 즐거움을
                더해줄 파트너를 만나보세요!
              </p>
            </>
          )}
        </Desc>
        <Filter1></Filter1>
        <img
          src="https://i.esdrop.com/d/f/XWTMtUmtv1/3ZaGK6Rhnu.jpg"
          alt="party"
        />
      </ContentBox>
      <ImageWrapper className={scrollY > 200 ? 'showImg' : 'notShowImg'}>
        <Filter2></Filter2>
        <img
          src="https://i.esdrop.com/d/f/XWTMtUmtv1/PpdEvGOnr2.png"
          alt="party"
        />
      </ImageWrapper>
      <JoinButton
        className={scrollY > 200 ? 'showDesc' : 'notShowDesc'}
        onClick={handleButtonClick}
      >
        함께하기
      </JoinButton>
    </SecondWrapper>
  );
};

const SecondWrapper = styled(SectionWrapper)`
  position: relative;
  justify-content: flex-end;
  align-items: flex-end;

  div,
  button {
    transition: 0.7s;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .showDesc {
    opacity: 1;
    transform: translateX(0);
    .second-title,
    .second-desc {
      animation: slidein 0.3s linear;
      animation-delay: 0.1s;
    }
  }
  .notShowDesc {
    opacity: 0;
    transform: translateX(-60px);
  }

  .showImg {
    opacity: 1;
  }
  .notShowImg {
    opacity: 0;
  }

  @keyframes slidein {
    from {
      opacity: 0;
      transform: translateX(-60px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideup {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 992px) {
    padding: 70px 0;
  }
  @media screen and (max-width: 768px) {
    height: 70vh;
    justify-content: center;
    align-items: center;
    padding: 0;

    .showDesc {
      opacity: 1;
      transform: translateY(0);
      .second-title,
      .second-desc {
        animation: slideup 0.3s linear;
        animation-delay: 0.1s;
      }
    }
    .notShowDesc {
      opacity: 0;
      transform: translateY(60px);
    }
  }
`;

const ContentBox = styled.div`
  width: 30%;
  padding-bottom: 30%;
  position: absolute;
  z-index: 3;
  top: 10%;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  > img {
    position: absolute;
    top: 0;
  }

  @media screen and (max-width: 1280px) {
    width: 35%;
    padding-bottom: 35%;
  }
  @media screen and (max-width: 768px) {
    position: relative;
    padding-bottom: 0;
    width: 80%;
    height: 70%;
    top: 0;
  }
`;

const Desc = styled.div`
  position: absolute;
  z-index: 4;
  width: 100%;
  top: 0;
  height: 100%;
  padding: 10%;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .second-title {
    width: 100%;
    margin-bottom: 10px;
    font-size: 1.8rem;
    font-family: 'Do Hyeon', sans-serif;
  }

  .second-desc {
    line-height: 1.7rem;
  }

  @media screen and (max-width: 1280px) {
    .second-desc {
      line-height: 1.5rem;
    }
  }
  @media screen and (max-width: 992px) {
    .second-title {
      font-size: 1.5rem;
    }
    .second-desc {
      line-height: 1.4rem;
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    .second-title {
      font-size: 1.8rem;
    }
    .second-desc {
      line-height: 1.7rem;
      font-size: 1rem;
    }
  }
  @media screen and (max-width: 576px) {
    .second-title {
      font-size: 1.5rem;
    }
    .second-desc {
      line-height: 1.4rem;
    }
  }
`;

const ImageWrapper = styled.div`
  width: 75%;
  height: fit-content;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px 0;
  margin-right: 5%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const JoinButton = styled.button`
  position: absolute;
  z-index: 5;
  padding: 15px 30px;
  bottom: 5%;
  right: 3%;
  font-size: 1.2rem;
  cursor: pointer;
  color: #fff;
  font-weight: 800;
  background-color: #feb35c;
  border: none;

  @media screen and (max-width: 992px) {
    bottom: 15%;
  }
  @media screen and (max-width: 768px) {
    bottom: 10%;
    right: 5%;
  }
  @media screen and (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

const Filter1 = styled(ImageFilter)`
  z-index: 3;
  background-color: #5d62a0;
  opacity: 0.9;
`;

const Filter2 = styled(ImageFilter)`
  z-index: 2;
`;

export default SecondSection;
