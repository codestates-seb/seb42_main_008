import { imgLinks } from 'components/Main/FirstSection';
import ImageFilter from 'components/Main/ImageFilter';
import styled from 'styled-components';

const BackGroundImage = () => {
  const getRandomImg = () => {
    const randomIdx = Math.floor(Math.random() * 3);
    return imgLinks[randomIdx];
  };
  return (
    <BgWrapper>
      <ImageFilter></ImageFilter>
      <img src={getRandomImg()} alt="profileBackground" />
    </BgWrapper>
  );
};

const BgWrapper = styled.section`
  width: 100%;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default BackGroundImage;
