import GlobalStyle from 'GlobalStyle';
import ChatButton from 'components/Chat/ChatButton';
import ChatModal from 'components/Chat/ChatModal';
import { Footer, Header } from 'containers';
import {
  ContentAdd,
  ContentDetail,
  ContentEdit,
  ContentList,
  ContinentSelect,
  CountrySelect,
  Login,
  Main,
  Profile,
  SignUp,
} from 'pages';
import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRecoilValue } from 'recoil';
import ScrollToTop from 'utils/ScrollToTop';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { loginState, userInfo } from 'states/userState';
import axios from 'axios';

interface ChatRoomData {
  lastTime: string;
  number: number;
  roomId: string;
  title: string;
}
const App = () => {
  const [isShowChatModal, setIsShowChatModal] = useState(false);
  const [sockClient, setSockClient] = useState<any>();
  const [chatLists, setChatLists] = useState<ChatRoomData[]>([]);
  // const [chatRoomIdArr, setChatRoomIdArr] = useState<number[]>([]);
  const isLogin = useRecoilValue(loginState);
  const loginUser = useRecoilValue(userInfo);

  const handleChatModal = () => {
    setIsShowChatModal(!isShowChatModal);
  };

  // const getChatList = () => {
  //   axios
  //     .get(`${process.env.REACT_APP_CHAT_SERVER}/chat/rooms`, {
  //       params: { email: loginUser.email },
  //     })
  //     .then(res => {
  //       setChatLists(res.data);
  //       // setChatRoomIdArr(res.data.map((item: ChatRoomData) => item.roomId));
  //     })
  //     .catch(err => console.log(err));
  // };

  useEffect(() => {
    if (isLogin) {
      const client = Stomp.over(() => {
        return new SockJS(`${process.env.REACT_APP_CHAT_SERVER}/ws/chat`);
      });
      // getChatList();

      axios
        .get(`${process.env.REACT_APP_CHAT_SERVER}/chat/rooms`, {
          params: { email: loginUser.email },
        })
        .then(res => {
          setChatLists(res.data);
          return res.data;
        })
        .then(res => {
          const chatListResp: ChatRoomData[] = res;

          client.connect({}, () => {
            setSockClient(client);

            const chatRoomIdArr = chatListResp.map(item => item.roomId);
            console.log(
              res,
              chatListResp.map(item => item.roomId)
            );

            chatRoomIdArr.map(roomId => {
              client.subscribe(`/sub/chat/room/${roomId}`, (data: any) => {
                const respData = JSON.parse(data.body);
                console.log(JSON.parse(data.body));
                if (respData.message !== null) {
                  console.log('inner');
                  const copiedArr = chatListResp.slice(0);
                  console.log(copiedArr);

                  // 룸 아이디가 같은 idx
                  const dataIdx = copiedArr.findIndex(
                    item => item.roomId === respData.roomId
                  );

                  // splice
                  const newChat = copiedArr.splice(dataIdx, 1)[0];

                  // count

                  // unshift
                  setChatLists([newChat, ...copiedArr]);
                }
              });
            });
          });
        })
        .catch(err => console.log(err));
    }
  }, [isLogin]);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <Header />
      {isLogin && (
        <ChatButton
          handleChatModal={handleChatModal}
          isShowChatModal={isShowChatModal}
        />
      )}
      {isShowChatModal && (
        <ChatModal
          handleChatModal={handleChatModal}
          roomId={-1}
          sockClient={sockClient}
          chatLists={chatLists}
        />
      )}
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/continents" element={<ContinentSelect />} />
          <Route path="/:continent" element={<CountrySelect />} />
          <Route path="/:continent/:countryCode" element={<ContentList />} />
          <Route
            path="/companions/:contentId"
            element={
              <ContentDetail sockClient={sockClient} chatLists={chatLists} />
            }
          />
          <Route path="/add" element={<ContentAdd />} />
          <Route path="/:contentId/edit" element={<ContentEdit />} />
          <Route path="/:memberId/profile" element={<Profile />} />
        </Routes>
        <ToastContainer />
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
