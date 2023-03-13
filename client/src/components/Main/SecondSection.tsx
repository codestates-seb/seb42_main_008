import styled from 'styled-components';
import { SectionWrapper } from './SectionWrapper';

const SecondSection = () => {
  return (
    <SecondWrapper>
      <div>
        <img
          src="https://i.esdrop.com/d/f/XWTMtUmtv1/PpdEvGOnr2.png"
          alt="party"
        />
      </div>
    </SecondWrapper>
  );
};

const SecondWrapper = styled(SectionWrapper)``;

export default SecondSection;
