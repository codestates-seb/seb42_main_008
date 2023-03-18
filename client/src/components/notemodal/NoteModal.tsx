import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FaChevronRight } from 'react-icons/fa';
import Message from './Message';
import axios from 'axios';

type Props = {
  noteModal: boolean;
  setNoteModal: (newValue: boolean) => void;
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

const NoteModal = ({ setNoteModal }: Props) => {
  const HandleModal = () => {
    setNoteModal(false);
  };

  const [allNotes, setAllNotes] = useState<NoteMessage[]>([]);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_TEST_SERVER}/messages?memberId=8`)
      .then(response => {
        setAllNotes(response.data.data);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SideBar>
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
              return <Message key={note.messageId} note={note} />;
            })}
        </ul>
      </div>
    </SideBar>
  );
};

export default NoteModal;

const SideBar = styled.nav`
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
`;
