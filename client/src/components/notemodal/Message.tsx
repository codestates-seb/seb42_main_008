import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import { TbTrashXFilled } from 'react-icons/tb';
import { GrClose } from 'react-icons/gr';
const Message = () => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const noteContent =
    '저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고 싶습니다!저도 참여하고 싶습니다!';

  const handleOpenNote = () => {
    setIsNoteOpen(!isNoteOpen);
  };
  const handleCloseNote = () => {
    setIsNoteOpen(false);
  };
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };
  const handleReplyModal = () => {
    setIsNoteOpen(false);
    setIsReplyOpen(!isReplyOpen);
  };

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
      <div className="message-content" onClick={handleOpenNote}>
        {noteContent}
      </div>
      {isNoteOpen ? (
        <div className="overlay">
          <NoteModal onClick={handleOverlayClick}>
            <div className="note-box">
              <div className="note-top">
                <div className="note-title">
                  <FaRegEnvelope />
                  보낸사람 | 닉네임
                </div>
                <div onClick={handleCloseNote}>
                  <GrClose />
                </div>
              </div>
              <div className="note-content">{noteContent}</div>
            </div>
            <div className="note-button">
              <button className="reply" onClick={handleReplyModal}>
                답장하기
              </button>
              <button className="delete">쪽지 삭제</button>
            </div>
          </NoteModal>
        </div>
      ) : null}
      {isReplyOpen ? (
        <div className="overlay">
          <NoteModal onClick={handleOverlayClick}>
            <div className="note-box">
              <div className="note-top">
                <div className="note-title">
                  <FaRegEnvelope />
                  받는사람 | 닉네임
                </div>
                <div onClick={handleReplyModal}>
                  <GrClose />
                </div>
              </div>
              <textarea className="note-content" />
            </div>
            <div className="note-button">
              <button className="submit">전송</button>
              <button className="cancel" onClick={handleReplyModal}>
                취소
              </button>
            </div>
          </NoteModal>
        </div>
      ) : null}
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
    display: flex;
    text-align: start;
    cursor: pointer;
  }
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

const NoteModal = styled.div`
  display: flex;
  width: 600px;
  height: 400px;
  border-radius: 20px;
  background-color: white;
  position: fixed;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  flex-direction: column;

  .note-box {
    padding: 30px;
  }
  .note-top {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid black;
    justify-content: space-between;
    padding-bottom: 15px;
  }
  .note-title {
    display: flex;
    align-items: center;
    width: 30%;
    justify-content: space-around;
  }
  .note-content {
    display: flex;
    background-color: #d9d9d9;
    margin-top: 15px;
    height: 200px;
    width: 100%;
    padding: 10px;
  }
  .note-button {
    display: flex;
    width: 100%;
    justify-content: space-around;
    .reply {
      background-color: #9bb76a;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
    }
    .delete {
      background-color: #d9506a;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
    }
    .submit {
      background-color: #feb35c;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
    }
    .cancel {
      background-color: #bababa;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
    }
  }
`;

// 읽은 쪽지 #AAAAAA
// 안 읽은 쪽지 #f4f4f4
