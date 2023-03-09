import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Header, Footer } from 'containers';
import GlobalStyle from 'GlobalStyle';
import {
  Main,
  Login,
  SignUp,
  ContentAdd,
  ContentDetail,
  ContentEdit,
  ContentList,
  ContinentSelect,
  CountrySelect,
  Profile,
} from 'pages';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/continents" element={<ContinentSelect />} />
          <Route path="/countries" element={<CountrySelect />} />
          <Route path="/:contryCode" element={<ContentList />} />
          <Route path="/:contryCode/:contentId" element={<ContentDetail />} />
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
