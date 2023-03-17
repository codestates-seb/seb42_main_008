import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import ReadNote from './ReadNote';
import ReplyNote from './ReplyNote';

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

  const handelDeleteNote = async (event: any) => {
    event.preventDefault();
    if (window.confirm('쪽지를 삭제하시겠습니까?')) {
      try {
        await axios.delete(
          `${process.env.REACT_APP_TEST_SERVER}/messages/${note.messageId}`
        );
        alert('쪽지가 삭제되었어요');
        setIsNoteOpen(false);
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <MessageBox>
      <div className="message-info">
        <div className="info-left">
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
          <ReadNote
            note={note}
            handleCloseNote={handleCloseNote}
            handleReplyModal={handleReplyModal}
            handelDeleteNote={handelDeleteNote}
            handleOverlayClick={handleOverlayClick}
          />
        </div>
      ) : null}
      {isReplyOpen ? (
        <div className="overlay">
          <ReplyNote
            note={note}
            handleOverlayClick={handleOverlayClick}
            handleReplyModal={handleReplyModal}
            setIsReplyOpen={setIsReplyOpen}
          />
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
    width: 100%;

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
    width: 60%;
    justify-content: flex-start;
    align-items: center;
    height: 50%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (max-width: 576px) {
      width: 100%;
    }
  }
  .info-right {
    display: flex;
    width: 30%;
    justify-content: flex-start;
    align-items: center;
    height: 50%;

    @media screen and (max-width: 768px) {
      width: 100%;
    }
    @media screen and (max-width: 576px) {
      width: 100%;
    }
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

// 읽은 쪽지 #AAAAAA
// 안 읽은 쪽지 #f4f4f4
