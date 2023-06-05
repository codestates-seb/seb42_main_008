import { CloseButton, ModalBG } from 'components/Profile/ModalStyles';
import { IoMdClose } from 'react-icons/io';
import styled from 'styled-components';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useState } from 'react';

interface ChatMessage {
  roomId: string;
  nickname: string;
  email: string;
  profile: string;
  message?: string;
  curTime?: string;
}
const ChatModal = ({ handleChatModal }: { handleChatModal: () => void }) => {
  const [chatDatas, setChatDatas] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sockClient, setSockClient] = useState<any>();

  useEffect(() => {
    const client = Stomp.over(() => {
      return new SockJS(`${process.env.REACT_APP_CHAT_SERVER}/ws/chat`);
    });
    client.connect({}, () => {
      client.subscribe('/sub/chat/room/1', (data: any) => {
        console.log('data: ' + data.body);
        setChatDatas(cur => [...cur, JSON.parse(data.body)]);
      });
      client.send(
        '/pub/chat/enter',
        {},
        JSON.stringify({
          roomId: '1',
          nickname: 'test',
          email: 'test@test.com',
          profile: 'dsfsdgs',
        })
      );
    });
    setSockClient(client);
  }, []);

  const handleSendMessage = () => {
    if (message !== '') {
      sockClient.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          roomId: '1',
          nickname: 'test',
          email: 'test@test.com',
          profile: 'dsfsdgs',
          message,
        })
      );
      setMessage('');
    }
  };

  useEffect(() => {
    console.log(chatDatas);
  }, [chatDatas]);

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
        <ChatContent>
          <div>
            <input
              type="text"
              value={message}
              onChange={e => {
                setMessage(e.target.value);
              }}
            />
            <button onClick={handleSendMessage}>전송</button>
          </div>
          {chatDatas.map(
            (chat, idx) => chat.message && <div key={idx}>{chat.message}</div>
          )}
        </ChatContent>
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
  flex-direction: column;
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

const ChatContent = styled.div`
  width: 100%;
  height: calc(100% - 4rem);
  display: flex;
  flex-direction: column;
`;

export default ChatModal;
