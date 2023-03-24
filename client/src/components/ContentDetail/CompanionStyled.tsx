import styled from 'styled-components';

export const StyledCompanionList = styled.ul`
  text-align: left;
  list-style: none;
  width: 100%;
  height: 100%;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 100%;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    padding: 5px;
    cursor: pointer;
    transition: all 0.2s ease 0s;
    &:hover {
      color: black;
      background-color: white;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
    }
    .companion-info {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        object-fit: scale-down;
      }
    }
    .btn-wrapper {
      width: 30%;
      display: flex;
      justify-content: space-around;
      > :nth-child(1) {
        background-color: #81d05b;
      }
      > :nth-child(2) {
        background-color: #ff624d;
      }
      .btn {
        cursor: pointer;
        padding: 0px 6px;
        font-size: 1rem;
        color: white;
        border: none;
        border-radius: 15px;
        transition: all 0.2s ease 0s;
        &:hover {
          color: black;
          background-color: white;
          box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

export const StyledTabBox = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  width: 100%;
  cursor: pointer;
  .menu {
    padding: 15px;
  }
  .focused {
    background-color: #d9506a;
    color: white;
  }
  @media screen and (max-width: 768px) {
    .menu {
      padding: 10px;
    }
  }
  @media screen and (max-width: 576px) {
    .menu {
      padding: 10px;
    }
  }
`;
export const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: white;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  text-align: center;
  border-radius: 30px;
  padding: 30px 40px;
`;
