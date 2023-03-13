// import { useState } from 'react';
import styled from 'styled-components';
// import { ListData } from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';
import ListSearch from 'components/ContinentList/ListSearch';
import ListItems from 'components/ContinentList/ListItems';

const ContentList = () => {
  // const [companions, setCompanions] = useState<ListData[] | []>([]);

  return (
    <Container>
      <ListTitle />
      <ListSearch />
      <ListItems />
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

export default ContentList;
