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
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecoilRoot } from 'recoil';
import ScrollToTop from 'utils/ScrollToTop';

const App = () => {
  const [isShowChatModal, setIsShowChatModal] = useState(false);

  const handleChatModal = () => {
    setIsShowChatModal(!isShowChatModal);
    console.log(isShowChatModal);
  };

  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <RecoilRoot>
        <Header />
        <ChatButton
          handleChatModal={handleChatModal}
          isShowChatModal={isShowChatModal}
        />
        {isShowChatModal && (
          <ChatModal handleChatModal={handleChatModal} roomId={-1} />
        )}
        <main>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/continents" element={<ContinentSelect />} />
            <Route path="/:continent" element={<CountrySelect />} />
            <Route path="/:continent/:countryCode" element={<ContentList />} />
            <Route path="/companions/:contentId" element={<ContentDetail />} />
            <Route path="/add" element={<ContentAdd />} />
            <Route path="/:contentId/edit" element={<ContentEdit />} />
            <Route path="/:memberId/profile" element={<Profile />} />
          </Routes>
          <ToastContainer />
        </main>
        <Footer />
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
