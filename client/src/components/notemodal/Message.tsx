import React, { useState } from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import axios from 'axios';

interface NoteMessage {
  messageId: number;
  content: string;
  companionId: number;
  createdAt: string;
  read: boolean;
  sender: {
    id: number;
    nickname: string;
  };
}
interface Props {
  note: NoteMessage;
}

const Message = ({ note }: Props) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);

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

  const handelDeleteNote = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_TEST_SERVER}/messages/${note.messageId}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MessageBox>
      <div className="message-info">
        <div className="info-left">
          <FaRegEnvelope className="envelope" />
          <div>{note.createdAt}</div>
        </div>
        <div className="info-right">
          <div>{note.sender.nickname}</div>
        </div>
      </div>
      <div className="message-content" onClick={handleOpenNote}>
        {note.content}
      </div>
      {isNoteOpen ? (
        <div className="overlay">
          <NoteModal onClick={handleOverlayClick}>
            <div className="note-box">
              <div className="note-top">
                <div className="note-title">
                  <FaRegEnvelope />
                  보낸사람 | {note.sender.nickname}
                </div>
                <div className="modal-out" onClick={handleCloseNote}>
                  <GrClose />
                </div>
              </div>
              <div className="note-content">{note.content}</div>
            </div>
            <div className="note-button">
              <button className="reply" onClick={handleReplyModal}>
                답장하기
              </button>
              <button className="delete" onClick={handelDeleteNote}>
                쪽지 삭제
              </button>
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
  @media screen and (max-width: 768px) {
    height: 140px;
  }
  @media screen and (max-width: 576px) {
    height: 140px;
  }

  .message-info {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid black;
    height: 40%;
    align-items: center;

    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
      flex-direction: column-reverse;
      align-items: flex-start;
    }
    @media screen and (max-width: 576px) {
      font-size: 0.8rem;
      flex-direction: column-reverse;
      align-items: flex-start;
    }
    .envelope {
      width: 2rem;
      height: 2rem;
      @media screen and (max-width: 768px) {
        width: 1.3rem;
        height: 1.3rem;
      }
      @media screen and (max-width: 576px) {
        width: 0.8rem;
        height: 0.8rem;
      }
    }
  }
  .info-left {
    display: flex;
    width: 40%;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    margin-left: 15px;
  }
  .info-right {
    display: flex;
    width: 30%;
    justify-content: space-around;
    align-items: center;
    height: 50%;
    margin-left: 15px;
  }
  .message-content {
    padding-top: 10px;
    display: flex;
    text-align: start;
    cursor: pointer;
    height: 60%;
    overflow: hidden;
    @media screen and (max-width: 768px) {
      font-size: 0.8rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 0.8rem;
    }
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
  @media screen and (max-width: 768px) {
    width: 500px;
    height: 360px;
  }
  @media screen and (max-width: 576px) {
    width: 400px;
    height: 300px;
  }

  .note-box {
    padding: 30px;
    height: 80%;
  }
  .note-top {
    display: flex;
    align-items: center;
    width: 100%;
    height: 20%;
    border-bottom: 1px solid black;
    justify-content: space-between;
    padding-bottom: 15px;
    font-size: 1.5rem;
    @media screen and (max-width: 768px) {
      font-size: 1.5rem;
    }
    @media screen and (max-width: 576px) {
      font-size: 1.2rem;
    }
  }
  .note-title {
    display: flex;
    align-items: center;
    width: 50%;
    justify-content: space-around;
  }
  .modal-out {
    display: flex;
    align-items: center;
  }
  .note-content {
    display: flex;
    background-color: #d9d9d9;
    margin-top: 15px;
    height: 80%;
    width: 100%;
    padding: 10px;
  }
  .note-button {
    display: flex;
    width: 100%;
    height: 20%;
    justify-content: space-around;
    .reply {
      background-color: #9bb76a;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
      @media screen and (max-width: 768px) {
        width: 120px;
        height: 45px;
      }
      @media screen and (max-width: 576px) {
        width: 120px;
        height: 45px;
      }
    }
    .delete {
      background-color: #d9506a;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
      @media screen and (max-width: 768px) {
        width: 120px;
        height: 45px;
      }
      @media screen and (max-width: 576px) {
        width: 120px;
        height: 45px;
      }
    }
    .submit {
      background-color: #feb35c;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
      @media screen and (max-width: 768px) {
        width: 120px;
        height: 45px;
      }
      @media screen and (max-width: 576px) {
        width: 120px;
        height: 45px;
      }
    }
    .cancel {
      background-color: #bababa;
      width: 160px;
      height: 45px;
      border-radius: 30px;
      border: none;
      @media screen and (max-width: 768px) {
        width: 120px;
        height: 45px;
      }
      @media screen and (max-width: 576px) {
        width: 120px;
        height: 45px;
      }
    }
  }
`;

// 읽은 쪽지 #AAAAAA
// 안 읽은 쪽지 #f4f4f4
