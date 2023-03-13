// import { useState } from 'react';
import styled from 'styled-components';
// import { ListData } from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';

const ContentList = () => {
  // const [companions, setCompanions] = useState<ListData[] | []>([]);

  return (
    <Container>
      <ListTitle />
      <SearchBox></SearchBox>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SearchBox = styled.div`
  width: 80%;
  height: 60px;
  background-color: #feb35c;
  position: absolute;
  top: 36vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

export default ContentList;
