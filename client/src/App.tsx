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
import { loginState } from 'states/userState';

const App = () => {
  const [isShowChatModal, setIsShowChatModal] = useState(false);
  const [sockClient, setSockClient] = useState<any>();
  const isLogin = useRecoilValue(loginState);

  const handleChatModal = () => {
    setIsShowChatModal(!isShowChatModal);
  };

  useEffect(() => {
    if (isLogin) {
      const client = Stomp.over(() => {
        return new SockJS(`${process.env.REACT_APP_CHAT_SERVER}/ws/chat`);
      });

      client.connect({}, () => {
        setSockClient(client);
      });
    }
  }, []);

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
            element={<ContentDetail sockClient={sockClient} />}
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
