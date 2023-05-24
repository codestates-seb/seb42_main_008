import { CloseButton, ModalBG } from 'components/Profile/ModalStyles';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';

const ChatModal = ({ handleChatModal }: { handleChatModal: () => void }) => {
  return (
    <>
      <ModalBG onClick={handleChatModal} />
      <ChatModalContainer>
        <ChatHeader>
          <h2 className="chat-title">채팅</h2>
          <CloseButton onClick={handleChatModal}>
            <IoMdClose />
          </CloseButton>
        </ChatHeader>
      </ChatModalContainer>
    </>
  );
};

const ChatModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  background-color: white;
  width: 80vw;
  height: 80vh;
  border-radius: 1rem;
  overflow: hidden;
  z-index: 1000;
`;

const ChatHeader = styled.div`
  background-color: #5d62a0;
  width: 100%;
  height: 4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;

  .chat-title {
    color: #fff;
  }
`;

export default ChatModal;
