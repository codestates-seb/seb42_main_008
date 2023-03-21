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

  .modal-title-wrapper {
    width: 100%;
    padding: 0 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
  }
  .modal-title {
    font-size: 1.4rem;
  }

  @media screen and (max-width: 576px) {
    width: 80%;
  }
`;

export const CloseButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #666;
  color: #666;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover,
  :active {
    background-color: #666;
    color: #fff;
  }
`;
