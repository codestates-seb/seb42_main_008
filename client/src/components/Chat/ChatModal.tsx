import axios from 'axios';
import { CloseButton, ModalBG } from 'components/Profile/ModalStyles';
import { useEffect, useRef, useState } from 'react';
import { BsPersonFill } from 'react-icons/bs';
import { IoIosSend, IoMdClose } from 'react-icons/io';
import { TbMessageChatbot } from 'react-icons/tb';
import { FaChevronLeft } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  roomId: string;
  nickname: string;
  email: string;
  profile: string;
  message?: string;
  curTime?: string;
}

interface ChatRoomData {
  lastTime: string;
  number: number;
  roomId: string;
  title: string;
  notRead: number;
}

const ChatModal = ({
  handleChatModal,
  currentRoomId,
  handleChangeRoomId,
  handleChatRoomOut,
  sockClient,
  chatLists,
}: {
  handleChatModal: () => void;
  currentRoomId: number;
  handleChangeRoomId: (roomId: number) => void;
  handleChatRoomOut: () => void;
  sockClient: any;
  chatLists: ChatRoomData[];
}) => {
  const [chatDatas, setChatDatas] = useState<ChatMessage[]>([]);
  // const [chatLists, setChatLists] = useState<ChatRoomData[]>([]);
  const [message, setMessage] = useState<string>('');
  // const [currentRoomId, setCurrentRoomId] = useState<number>(roomId);
  const loginUser = useRecoilValue(userInfo);
  const chatRoomRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();

  const getChatData = () => {
    axios
      .get(`${process.env.REACT_APP_CHAT_SERVER}/chat/room/${currentRoomId}`)
      .then(res => {
        return JSON.stringify(res.data.messages);
      })
      .then(res => {
        setChatDatas(JSON.parse(res));
      });
  };

  // const getChatList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_CHAT_SERVER}/chat/rooms`, {
  //       params: { email: loginUser.email },
  //     })
  //     .then(res => {
  //       setChatLists(res.data);
  //     })
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    if (currentRoomId !== -1) {
      sockClient.subscribe(`/sub/chat/room/${currentRoomId}`, (data: any) => {
        const respData = JSON.parse(data.body);
        setChatDatas(cur => [...cur, respData]);

        if (
          chatLists.length === 0 &&
          respData.message === null &&
          respData.email === loginUser.email
        ) {
          // getChatList();
        }
      });
      sockClient.send(
        '/pub/chat/enter',
        {},
        JSON.stringify({
          roomId: currentRoomId,
          nickname: loginUser.nickname,
          email: loginUser.email,
          profile: loginUser.profile,
        })
      );
      getChatData();
    }
    // } else {
    //   getChatList();
    // }
  }, [currentRoomId]);

  const handleSendMessage = () => {
    if (message !== '') {
      sockClient.send(
        '/pub/chat/message',
        {},
        JSON.stringify({
          roomId: currentRoomId,
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

  const autoScroll = () => {
    if (chatRoomRef.current !== null) {
      chatRoomRef.current.scrollTop = chatRoomRef.current.scrollHeight;
    }
  };

  const handleLinkMyPage = () => {
    navigate(`/${loginUser.memberId}/profile`);
    handleChatModal();
  };

  useEffect(() => {
    autoScroll();
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
          {chatLists.length === 0 ? (
            <div className="chat-list-empty">
              <h2>참여중인 채팅이 없습니다</h2>
              <p className="empty-desc">
                내가 참여한 동행글에서
                <br />
                채팅을 시작해보세요 !
              </p>
              <button className="mypage-button" onClick={handleLinkMyPage}>
                마이페이지로 이동
              </button>
            </div>
          ) : (
            <>
              <ChatList isShowList={currentRoomId === -1}>
                {chatLists.map(item => (
                  <div
                    key={item.roomId}
                    className={`room-wrapper ${
                      Number(item.roomId) === currentRoomId
                        ? 'room-selected'
                        : undefined
                    } `}
                    onClick={() => handleChangeRoomId(Number(item.roomId))}
                  >
                    <div className="room-title">
                      {item.title.length > 10
                        ? item.title.substring(0, 10) + ' …'
                        : item.title}
                    </div>
                    <div className="room-participants">
                      {currentRoomId !== Number(item.roomId) &&
                        item.notRead !== 0 && (
                          <span className="chat-not-read">{item.notRead}</span>
                        )}
                      <BsPersonFill />
                      {item.number}
                    </div>
                  </div>
                ))}
              </ChatList>
              {currentRoomId !== -1 ? (
                <ChatRoom isShowList={currentRoomId === -1}>
                  {chatLists.length !== 0 && (
                    <div className="chat-room-header">
                      <FaChevronLeft
                        size={25}
                        onClick={handleChatRoomOut}
                        className="chat-room-out"
                      />
                      <p className="chat-room-name">
                        {
                          chatLists.filter(
                            item =>
                              Number(item.roomId) === Number(currentRoomId)
                          )[0].title
                        }
                      </p>
                    </div>
                  )}
                  <ChatRoomContent ref={chatRoomRef}>
                    {chatDatas.map((chat, idx) =>
                      chat.message === null ? (
                        <div className="chat-user-enter" key={idx}>
                          {chat.nickname}님이 입장하셨습니다.
                        </div>
                      ) : (
                        <div
                          className={
                            chat.email === loginUser.email
                              ? 'my-chat'
                              : 'other-chat'
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
                              <div className="chat-nickname">
                                {chat.nickname}
                              </div>
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
                    <button
                      className="chat-room-send"
                      onClick={handleSendMessage}
                    >
                      <IoIosSend size={20} />
                    </button>
                  </ChatRoomInputWrapper>
                </ChatRoom>
              ) : (
                <div className="chat-room-empty">
                  <TbMessageChatbot />
                </div>
              )}
            </>
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
  flex-direction: row;

  .chat-room-empty {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% - 15rem);
    background-color: #ddd;
    font-size: 20rem;
    color: #5d62a0;
  }

  .chat-list-empty {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    text-align: center;

    .empty-desc {
      margin: 1rem 0 3rem 0;
      color: #888;
    }

    .mypage-button {
      background-color: #feb35c;
      border: none;
      color: white;
      padding: 1rem;
      cursor: pointer;
      border-radius: 1rem;
      font-size: 1rem;
    }
  }

  @media screen and (max-width: 768px) {
    .chat-room-empty {
      display: none;
    }
  }
`;

const ChatList = styled.section<{ isShowList: boolean }>`
  width: 15rem;
  height: 100%;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  display: flex;
  align-items: center;
  flex-direction: column;

  .room-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    border-bottom: 1px solid #ddd;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.3);
      color: #fff;
    }
    .chat-not-read {
      background-color: #d9506a;
      border-radius: 50%;
      color: #fff;
      width: 1.5rem;
      height: 1.5rem;
      margin-right: 0.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 0.9rem;
    }
  }

  .room-selected {
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
  }

  .room-participants {
    display: flex;
    align-items: center;
    gap: 0.2rem;
  }

  @media screen and (max-width: 768px) {
    display: ${props => (props.isShowList ? 'flex' : 'none')};
    width: 100%;
  }
`;

const ChatRoom = styled.section<{ isShowList: boolean }>`
  width: calc(100% - 15rem);
  height: 100%;
  flex-direction: column;
  display: flex;

  .chat-room-header {
    width: 100%;
    height: 3.5rem;
    background-color: #ddd;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 1rem;
  }

  .chat-room-out {
    cursor: pointer;
  }

  .chat-room-name {
    font-size: 1.2rem;
    padding-left: 1rem;
    font-weight: 900;
  }

  @media screen and (max-width: 768px) {
    display: ${props => (props.isShowList ? 'none' : 'flex')};
    width: 100%;
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

/* TODO:
1. 최신 메시지로 가리키기 * 
2. 참여중인 채팅목록 불러오기 *
3. 참여중인 채팅목록에서 채팅방 눌렀을 때 채팅 보여주기
*/
