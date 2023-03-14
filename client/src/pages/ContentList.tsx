// import { useState } from 'react';
import styled from 'styled-components';
// import { ListData } from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';
import ListSearch from 'components/ContinentList/ListSearch';
import ListItems from 'components/ContinentList/ListItems';
import listTestData from 'ListTestData.json';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';

const ContentList = () => {
  // const { countryCode } = useParams();
  // const [datas, setDatas] = useState<ListData[] | []>([]);

  return (
    <Container>
      <ListTitle />
      <ListSearch />
      <ListItems listData={listTestData.jpn} />
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
