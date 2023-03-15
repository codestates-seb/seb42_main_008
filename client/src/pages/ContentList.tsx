import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ListData } from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';
import ListSearch from 'components/ContinentList/ListSearch';
import ListItems from 'components/ContinentList/ListItems';
import customAxios from 'api/customAxios';

const ContentList = () => {
  const [datas, setDatas] = useState<ListData[] | []>([]);

  const getContentData = async () => {
    await customAxios.get('/companions').then(resp => {
      setDatas(resp.data);
    });
  };

  useEffect(() => {
    getContentData();
  }, []);

  return (
    <Container>
      <ListTitle />
      <ListSearch />
      <ListItems listData={datas} />
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
