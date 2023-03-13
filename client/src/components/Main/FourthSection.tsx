import { ContinentSelect } from 'pages';
import styled from 'styled-components';
import { SectionWrapper } from './SectionWrapper';

const FourthSection = () => {
  return (
    <FourthWrapper>
      <ContinentSelect />
    </FourthWrapper>
  );
};

const FourthWrapper = styled(SectionWrapper)`
  position: relative;
  section {
    :last-of-type {
      display: none;
    }
  }
  > div > div {
    top: 2%;
  }
  @media screen and (max-width: 768px) {
    section {
      :last-of-type {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 576px) {
  }
`;

export default FourthSection;
