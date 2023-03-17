import styled from 'styled-components';

export const ModalBG = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  z-index: 999;
  top: 0;
  left: 0;
`;

export const ModalContent = styled.div`
  width: 500px;
  height: 70vh;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding-top: 30px;
  overflow: hidden;

  @media screen and (max-width: 576px) {
    width: 80%;
  }
`;
