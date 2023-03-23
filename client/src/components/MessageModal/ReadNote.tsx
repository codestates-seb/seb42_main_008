import React from 'react';
import { FaRegEnvelope } from 'react-icons/fa';
import { GrClose } from 'react-icons/gr';
import styled from 'styled-components';
import ModalScrollDisable from 'utils/ModalScrollDisable';

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
  handleCloseNote: React.MouseEventHandler<HTMLDivElement>;
  handleReplyModal: React.MouseEventHandler<HTMLButtonElement>;
  handelDeleteNote: React.MouseEventHandler<HTMLButtonElement>;
  handleOverlayClick: React.MouseEventHandler<HTMLDivElement>;
}

const ReadNote = ({
  note,
  handleCloseNote,
  handleReplyModal,
  handelDeleteNote,
  handleOverlayClick,
}: Props) => {
  return (
    <ReadBox onClick={handleOverlayClick}>
      <ModalScrollDisable />
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
        {note.sender.id !== 1 ? (
          <button className="reply" onClick={handleReplyModal}>
            답장하기
          </button>
        ) : null}
        <button className="delete" onClick={handelDeleteNote}>
          쪽지 삭제
        </button>
      </div>
    </ReadBox>
  );
};

export default ReadNote;

const ReadBox = styled.div`
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
    white-space: nowrap;
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
      cursor: pointer;
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
      cursor: pointer;
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
      cursor: pointer;
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
      cursor: pointer;
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
