import styled from 'styled-components';

export const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #feb35c;
  color: #fff;
  border-radius: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: 0.3s;
  border: none;
  cursor: pointer;

  :hover,
  :active {
    background-color: #fff;
    color: #222;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    transition: 0.3s;
  }
`;
