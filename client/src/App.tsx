import { Footer, Header } from 'containers';
import GlobalStyle from 'GlobalStyle';
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
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { RecoilRoot } from 'recoil';
import ScrollToTop from 'utils/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ScrollToTop />
      <RecoilRoot>
        <Header />
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
