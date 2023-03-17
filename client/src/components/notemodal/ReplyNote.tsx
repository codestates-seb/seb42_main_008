import React from 'react';
import styled from 'styled-components';
import { FaRegEnvelope } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';

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
  handleOverlayClick: React.MouseEventHandler<HTMLDivElement>;
  handleReplyModal: any;
}
const ReplyNote = ({ note, handleOverlayClick, handleReplyModal }: Props) => {
  return (
    <ReplyBox onClick={handleOverlayClick}>
      <div className="note-box">
        <div className="note-top">
          <div className="note-title">
            <FaRegEnvelope />
            받는사람 | {note.sender.nickname}
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
    </ReplyBox>
  );
};

export default ReplyNote;

const ReplyBox = styled.div`
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
