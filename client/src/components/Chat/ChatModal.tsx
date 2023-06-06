import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import { CloseButton, ModalBG } from 'components/Profile/ModalStyles';
import { useEffect, useState } from 'react';
import { IoMdClose, IoIosSend } from 'react-icons/io';
import { useRecoilValue } from 'recoil';
import SockJS from 'sockjs-client';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import ModalScrollDisable from 'utils/ModalScrollDisable';

interface ChatMessage {
  roomId: string;
  nickname: string;
  email: string;
  profile: string;
  message?: string;
  curTime?: string;
}

const ChatModal = ({
  handleChatModal,
  roomId,
}: {
  handleChatModal: () => void;
  roomId: number;
}) => {
  const [chatDatas, setChatDatas] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState<string>('');
  const [sockClient, setSockClient] = useState<any>();
  const loginUser = useRecoilValue(userInfo);

  const getChatData = () => {
    axios
      .get(`${process.env.REACT_APP_CHAT_SERVER}/chat/room/${roomId}`)
      .then(resp => {
        return JSON.stringify(resp.data.messages);
      })
      .then(resp => {
        setChatDatas(JSON.parse(resp));
      });
  };

  useEffect(() => {
    const client = Stomp.over(() => {
      return new SockJS(`${process.env.REACT_APP_CHAT_SERVER}/ws/chat`);
    });
    client.connect({}, () => {
      client.subscribe(`/sub/chat/room/${roomId}`, (data: any) => {
        console.log('data: ' + data.body);
        setChatDatas(cur => [...cur, JSON.parse(data.body)]);
      });
      client.send(
        '/pub/chat/enter',
        {},
        JSON.stringify({
          roomId,
          nickname: loginUser.nickname,
          email: loginUser.email,
          profile: loginUser.profile,
        })
      );
    });
    setSockClient(client);
    getChatData();
  }, []);

  const handleSendMessage = () => {
    if (message !== '') {
      sockClient.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          roomId,
          nickname: loginUser.nickname,
          email: loginUser.email,
          profile: loginUser.profile,
          message,
        })
      );
      setMessage('');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    console.log(chatDatas);
  }, [chatDatas]);

  return (
    <>
      <ModalScrollDisable />
      <ModalBG onClick={handleChatModal} />
      <ChatModalContainer>
        <ChatHeader>
          <h2 className="chat-title">채팅</h2>
          <CloseButton onClick={handleChatModal}>
            <IoMdClose />
          </CloseButton>
        </ChatHeader>
        <ChatContent>
          <ChatList></ChatList>
          <ChatRoom>
            <div className="chat-room-header">헤더</div>
            <ChatRoomContent>
              {chatDatas.map((chat, idx) =>
                chat.message === null ? (
                  <div className="chat-user-enter" key={idx}>
                    {chat.nickname}님이 입장하셨습니다.
                  </div>
                ) : (
                  <div
                    className={
                      chat.email === loginUser.email ? 'my-chat' : 'other-chat'
                    }
                    key={idx}
                  >
                    {chat.email !== loginUser.email && (
                      <img
                        className="chat-profile"
                        src={chat.profile}
                        alt={chat.nickname + 'profile'}
                      />
                    )}
                    <div className="chat-nickname-message">
                      {chat.email !== loginUser.email && (
                        <div className="chat-nickname">{chat.nickname}</div>
                      )}
                      <div className="chat-message">{chat.message}</div>
                    </div>
                  </div>
                )
              )}
            </ChatRoomContent>
            <ChatRoomInputWrapper>
              <input
                type="text"
                className="chat-room-input"
                value={message}
                onChange={e => {
                  setMessage(e.target.value);
                }}
                onKeyDown={event => {
                  handleKeyDown(event);
                }}
              />
              <button className="chat-room-send" onClick={handleSendMessage}>
                <IoIosSend size={20} />
              </button>
            </ChatRoomInputWrapper>
          </ChatRoom>
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
  flex-direction: row;
`;

const ChatList = styled.section`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
`;

const ChatRoom = styled.section`
  width: calc(100% - 15rem);
  height: 100%;
  flex-direction: column;

  .chat-room-header {
    width: 100%;
    height: 3.5rem;
    background-color: #ddd;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const ChatRoomContent = styled.div`
  width: 100%;
  height: calc(100% - 7.5rem);
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0.5rem;
  gap: 0.5rem;

  .chat-user-enter {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 0.8rem;
    border-radius: 1rem;
    padding: 0.2rem;
    width: fit-content;
    margin: 0 auto;
  }

  .chat-profile {
    border-radius: 50%;
    object-fit: cover;
    width: 4rem;
    height: 4rem;
    margin-right: 0.5rem;
  }

  .my-chat {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: end;

    .chat-message {
      background-color: #bdd791;
      border-radius: 1rem;
      padding: 0.5rem;
      margin-left: 5rem;
    }
  }

  .other-chat {
    display: flex;
    flex-direction: row;

    .chat-message {
      background-color: #ddd;
      border-radius: 1rem;
      padding: 0.5rem;
      margin-right: 5rem;
    }
  }

  .chat-nickname-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .chat-nickname {
    font-weight: 900;
  }
`;

const ChatRoomInputWrapper = styled.div`
  width: 100%;
  height: 4rem;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #feb35c;
  gap: 0.5rem;

  .chat-room-input {
    flex: 1;
    height: 2rem;
    border: none;
    border-radius: 2rem;
    padding: 0 1rem;
  }

  .chat-room-send {
    display: flex;
    width: 4rem;
    height: 2rem;
    align-items: center;
    justify-content: center;
    border-radius: 2rem;
    border: none;
    background-color: #fff;
    padding: 0.2rem;
    cursor: pointer;
  }
`;

export default ChatModal;
