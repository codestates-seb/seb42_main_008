import React from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbTrashXFilled } from 'react-icons/tb';
const Message = () => {
  return (
    <MessageBox>
      <div className="message-info">
        <div className="info-left">
          <FaRegEnvelope size="20px" />
          <div>2023/03/09</div>
        </div>
        <div className="info-right">
          <div>username</div>
          <TbTrashXFilled size="20px" color="#d9506a" />
        </div>
      </div>
      <div className="message-content">
        저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고
        싶습니다!저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고
        싶습니다!
      </div>
    </MessageBox>
  );
};

export default Message;

const MessageBox = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  background-color: #f4f4f4;
  border-radius: 5px;
  margin: 10px 0px 10px 0px;
  .message-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
  }
  .info-left {
    display: flex;
    width: 40%;
    justify-content: space-around;
    align-items: center;
  }
  .info-right {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
  }
  .message-content {
    padding-top: 10px;
  }
`;

// 읽은 쪽지 #AAAAAA
// 안 읽은 쪽지 #f4f4f4
