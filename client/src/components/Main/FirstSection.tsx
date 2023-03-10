import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SectionWrapper } from './SectionWrapper';
import FirstTitle from './FirstTitle';
import { useEffect, useState } from 'react';
import ImageFilter from './ImageFilter';
import { useNavigate } from 'react-router-dom';

const FirstSection = () => {
  const navigate = useNavigate();
  const [isShowButton, setIsShowButton] = useState(false);
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
    draggable: false,
  };

  const handleButtonClick = () => {
    navigate('/continents');
  };

  useEffect(() => {
    setTimeout(() => setIsShowButton(true), 5000);
  }, []);

  return (
    <FirstWrapper>
      <FirstTitle />
      {isShowButton && (
        <FirstButton onClick={handleButtonClick}>
          동행자 구하러 가기
        </FirstButton>
      )}
      <Filter></Filter>
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

  div {
    width: 100%;
    height: 100%;
  }

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
  .slick-dots {
    position: absolute;
    bottom: 30px;
    z-index: 3;
  }
  .slick-dots li button:before {
    color: #fff;
  }

  @media screen and (max-width: 992px) {
    height: 80vh;
  }
`;

const Filter = styled(ImageFilter)`
  z-index: 2;
`;

const SlideContent = styled.div`
  width: 100%;
  max-height: calc(100vh - 60px);
  > img {
    width: 110%;
    height: 100%;
    object-fit: cover;
  }
`;

const FirstButton = styled.button`
  position: absolute;
  z-index: 5;
  top: 60%;
  padding: 15px 20px;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  color: #fff;
  font-weight: 800;
  background-color: #feb35c;
  border: none;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  animation: fadein 0.5s linear;

  @keyframes fadein {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 992px) {
    font-size: 1rem;
  }
  @media screen and (max-width: 576px) {
    font-size: 0.8rem;
  }
`;

export default FirstSection;
