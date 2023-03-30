import React, { useState } from 'react';
import styled from 'styled-components';
import ReadNote from './ReadNote';
import ReplyNote from './ReplyNote';
import customAxios from 'api/customAxios';
import Swal from 'sweetalert2';

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
  setNoteModal(value: boolean): void;
}

interface IMessageBoxProps {
  isRead: boolean;
}

const Message = ({ note, setNoteModal }: Props) => {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  //읽은 쪽지 안읽은 쪽지 상태 구분
  const [isRead, setIsRead] = useState<boolean>(note.read);

  const handleOpenNote = async (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    try {
      await customAxios.patch(`/messages/${note.messageId}`, { read: true });
      setIsNoteOpen(!isNoteOpen);
      setIsRead(true);
    } catch (error) {
      console.log(error);
    }
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

  const handelDeleteNote = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    Swal.fire({
      title: '쪽지를 삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .delete(`/messages/${note.messageId}`)
          .then(() => {
            Swal.fire('Deleted!', '쪽지가 삭제되었습니다!', 'success');
            setIsNoteOpen(false);
            setNoteModal(false);
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  return (
    <MessageBox isRead={isRead}>
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
            setIsNoteOpen={setIsNoteOpen}
            setNoteModal={setNoteModal}
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

const MessageBox = styled.div<IMessageBoxProps>`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  background-color: ${({ isRead }) => (isRead ? '#AAAAAA' : '#f4f4f4')};
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
