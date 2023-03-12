import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SectionWrapper } from './SectionWrapper';
import FirstTitle from './FirstTitle';

const FirstSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 6000,
    cssEase: 'linear',
    pauseOnFocus: true,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <FirstWrapper>
      <FirstTitle />
      <ImageFilter></ImageFilter>
      <Slider {...settings}>
        <SlideContent>
          <img
            src="https://i.esdrop.com/d/f/XWTMtUmtv1/U9cFP8N5cV.jpg"
            alt="travel1"
          />
        </SlideContent>
        <SlideContent>
          <img
            src="https://i.esdrop.com/d/f/XWTMtUmtv1/Dn3bXiThp1.jpg"
            alt="travel2"
          />
        </SlideContent>
        <SlideContent>
          <img
            src="https://i.esdrop.com/d/f/XWTMtUmtv1/xPUsj5Y6wu.jpg"
            alt="travel3"
          />
        </SlideContent>
      </Slider>
    </FirstWrapper>
  );
};

const FirstWrapper = styled(SectionWrapper)`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  .slick-slider {
    width: 100%;
    overflow: hidden;
  }
  .slick-prev {
    left: 20px;
    z-index: 3;
  }
  .slick-next {
    right: 20px;
    z-index: 3;
  }
  ul {
    position: absolute;
    bottom: 30px;
    z-index: 3;
  }
`;

const ImageFilter = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  background-color: #000650;
  opacity: 0.25;
  z-index: 2;
  @media screen and (max-width: 1080px) {
    height: calc(100% - 10px);
  }
`;

const SlideContent = styled.div`
  width: 100%;
  max-height: calc(100vh - 60px);
  > img {
    width: 100%;
  }
`;

export default FirstSection;
