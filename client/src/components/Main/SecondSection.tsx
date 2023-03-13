import { useScroll } from 'hooks/useScroll';
import styled from 'styled-components';
import ImageFilter from './ImageFilter';
import { SectionWrapper } from './SectionWrapper';

const SecondSection = () => {
  const scrollY = useScroll();

  return (
    <SecondWrapper>
      <ContentBox className={scrollY > 300 ? 'showDesc' : 'notShowDesc'}>
        <Desc>
          {scrollY > 300 && (
            <>
              <h1>Party People</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled it to make a type specimen book. It
                has survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
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
      <ImageWrapper className={scrollY > 300 ? 'showImg' : 'notShowImg'}>
        <Filter2></Filter2>
        <img
          src="https://i.esdrop.com/d/f/XWTMtUmtv1/PpdEvGOnr2.png"
          alt="party"
        />
      </ImageWrapper>
    </SecondWrapper>
  );
};

const SecondWrapper = styled(SectionWrapper)`
  position: relative;
  justify-content: flex-end;
  align-items: flex-end;
  div {
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
    h1,
    p {
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
      transform: translateY(0);
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

  h1 {
    width: 100%;
    margin-bottom: 10px;
  }

  p {
    line-height: 1.7rem;
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

  .show {
    display: none;
  }
  .notShow {
    display: none;
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
