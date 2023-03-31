import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import Message from './Message';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import customAxios from 'api/customAxios';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { css } from 'styled-components';

type Props = {
  setNoteModal: (newValue: boolean) => void;
  animationMode: boolean;
  setAnimationMode: (newValue: boolean) => void;
  notRead: number;
};

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

const NoteModal = ({
  animationMode,
  setAnimationMode,
  setNoteModal,
  notRead,
}: Props) => {
  const HandleModal = () => {
    setAnimationMode(false);
    setTimeout(() => setNoteModal(false), 290);
  };

  // * 노트모달 애니메이션 적용용 코드
  const [noteRender, setNoteRender] = useState(animationMode);
  useEffect(() => {
    if (animationMode) setNoteRender(true);
  }, [animationMode]);

  const [allNotes, setAllNotes] = useState<NoteMessage[]>([]);
  // 멤버아이디
  const user = useRecoilValue(userInfo);

  useEffect(() => {
    customAxios
      .get(`/messages?memberId=${user.memberId}`)
      .then(response => {
        setAllNotes(response.data.data);
      })
      .catch(error => console.log(error));
  }, [notRead]);

  return (
    <>
      {noteRender && (
        <SideBar animationMode={animationMode}>
          <ModalScrollDisable />
          <div className="modal-contents">
            <div className="note-menu">
              <FaChevronRight
                onClick={HandleModal}
                className="outmodal"
                size="2rem"
                cursor="pointer"
                color="#555555"
              />
              <div>내쪽지함</div>
            </div>
            <ul className="notes">
              {allNotes
                .sort((a, b) => b.messageId - a.messageId)
                .map(note => {
                  return (
                    <Message
                      key={note.messageId}
                      note={note}
                      setNoteModal={setNoteModal}
                    />
                  );
                })}
            </ul>
          </div>
        </SideBar>
      )}
    </>
  );
};

export default NoteModal;

const SideBar = styled.nav<{ animationMode: boolean }>`
  display: flex;
  flex-direction: column;
  position: fixed;
  width: 40%;
  height: 100%;
  right: 0;
  top: 60px;
  z-index: 100;
  background-color: white;
  border-left: 1px solid black;
  color: black;
  overflow: auto;
  transition: 0.3s;

  .modal-contents {
    position: relative;
    padding: 20px;
    overflow-y: auto;
  }
  .note-menu {
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #555555;
    height: 40px;
    font-size: 20px;

    .outmodal {
      margin-right: 10px;
    }
  }
  .notes {
    margin-top: 10px;
    margin-bottom: 100px;
  }

  animation: ${props =>
    props.animationMode
      ? css`
          ${slideIn} ease-in-out 0.3s
        `
      : css`
          ${slideOut} ease-in-out 0.4s
        `};

  @media screen and (max-width: 768px) {
    width: 60%;
  }
  @media screen and (max-width: 576px) {
    width: 70%;
  }
`;

const slideIn = keyframes`
from {
  transform: translateX(500px)
}
to {
  transform: translateX(0)
}
`;
const slideOut = keyframes`
from {
  transform: translateX(0)
}
to {
  transform: translateX(500px)
}
`;
