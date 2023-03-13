import styled from 'styled-components';

export const SectionWrapper = styled.section`
  width: 100%;
  height: calc(100vh - 60px);

  @media screen and (max-width: 992px) {
    height: fit-content;
  }
`;
