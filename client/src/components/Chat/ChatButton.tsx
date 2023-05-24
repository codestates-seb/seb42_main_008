import { TbMessageChatbot } from 'react-icons/tb';
import styled from 'styled-components';

const ChatButton = ({
  handleChatModal,
  isShowChatModal,
}: {
  handleChatModal: () => void;
  isShowChatModal: boolean;
}) => {
  return (
    <StyledChatButton
      className={isShowChatModal ? 'modal-open' : undefined}
      onClick={handleChatModal}
    >
      <TbMessageChatbot className="smile-chat" size={45} />
    </StyledChatButton>
  );
};

const StyledChatButton = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 998;
  bottom: 1.5rem;
  right: 1.5rem;
  border-radius: 50%;
  width: 4.5rem;
  height: 4.5rem;
  background-color: white;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: 0.2s;

  .smile-chat {
    color: #5d62a0;
    transition: 0.2s;
  }
  &:hover,
  &.modal-open {
    background-color: #5d62a0;
    transition: 0.2s;
    .smile-chat {
      color: white;
      transition: 0.2s;
    }
  }
`;

export default ChatButton;
