import { imgLinks } from 'components/Main/FirstSection';
import ImageFilter from 'styles/ImageFilter';
import styled from 'styled-components';

const BackGroundImage = () => {
  return (
    <BgWrapper>
      <ImageFilter></ImageFilter>
      <img src={imgLinks[2]} alt="profileBackground" />
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
