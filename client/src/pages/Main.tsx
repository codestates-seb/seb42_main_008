import FirstSection from 'components/Main/FirstSection';
import FourthSection from 'components/Main/FourthSection';
import GenderSelect from 'components/Main/GenderSelect';
import SecondSection from 'components/Main/SecondSection';
import ThirdSection from 'components/Main/ThirdSection';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';

const Main = () => {
  const [isShowModal, setIsShowModal] = useState(false);
  const loginUser = useRecoilValue(userInfo);

  const genderSelect = () => {
    if (loginUser && loginUser.gender === 'NONE') {
      setIsShowModal(true);
    }
  };

  useEffect(() => {
    genderSelect();
  }, []);

  return (
    <Container>
      {isShowModal && <GenderSelect setIsShowModal={setIsShowModal} />}
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

export default Main;
