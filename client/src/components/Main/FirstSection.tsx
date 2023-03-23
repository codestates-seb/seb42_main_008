import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SectionWrapper } from './SectionWrapper';
import FirstTitle from './FirstTitle';
import { useEffect, useState } from 'react';
import ImageFilter from '../../styles/ImageFilter';
import { useNavigate } from 'react-router-dom';
import { StyledButton } from 'styles/StyledButton';

export const imgLinks = [
  'https://i.esdrop.com/d/f/XWTMtUmtv1/U9cFP8N5cV.jpg',
  'https://i.esdrop.com/d/f/XWTMtUmtv1/Dn3bXiThp1.jpg',
  'https://i.esdrop.com/d/f/XWTMtUmtv1/xPUsj5Y6wu.jpg',
];

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
    arrows: false,
  };

  const handleButtonClick = () => {
    navigate('/continents');
  };

  useEffect(() => {
    setTimeout(() => setIsShowButton(true), 3000);
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
        {imgLinks.map((url, idx) => (
          <SlideContent key={idx}>
            <img src={url} alt={`travel${idx}`} />
          </SlideContent>
        ))}
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
  .slick-dots {
    position: absolute;
    bottom: 30px;
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

const FirstButton = styled(StyledButton)`
  position: absolute;
  z-index: 5;
  top: 60%;
  padding: 15px 20px;
  color: #fff;
  font-weight: 800;
  background-color: #feb35c;
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
