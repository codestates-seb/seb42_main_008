import { MyCompanion } from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memberData from 'profileTestData.json';

const MemberCompanoins = () => {
  const [companions, setCompanions] = useState<MyCompanion[] | []>([]);

  useEffect(() => {
    setCompanions(memberData.companions);
    console.log(companions);
  }, []);

  return <Container>Companion</Container>;
};

const Container = styled.section`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default MemberCompanoins;
