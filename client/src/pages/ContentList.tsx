import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  ListData,
  ListQueryString,
  SortBy,
} from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';
import ListSearch from 'components/ContinentList/ListSearch';
import ListItems from 'components/ContinentList/ListItems';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';

const ContentList = () => {
  const { countryCode } = useParams();
  const [datas, setDatas] = useState<ListData[] | []>([]);
  const [searchDatas, setSearchDatas] = useState<ListData[] | null>(null);
  const [sortData, setSortData] = useState<SortBy>({
    value: '작성날짜 (최신순)',
    sortBy: 'createdAt',
    sortDir: 'DESC',
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(12);

  const getContentData = async () => {
    const params: ListQueryString = {
      page,
      size,
      sortDir: sortData.sortDir,
      sortBy: sortData.sortBy,
      nationCode: countryCode,
    };

    await customAxios.get('/companions').then(resp => {
      setDatas(resp.data);
    });

    await customAxios
      .get('/companions/nations', {
        params,
      })
      .then(resp => {
        console.log(resp.data);
        setPage(1);
        setSize(12);
      });
  };

  const handleSize = () => {
    const width = window.innerWidth;
    if (width < 620) {
      setSize(3);
    } else if (width < 922) {
      setSize(6);
    } else if (width < 1200) {
      setSize(9);
    } else {
      setSize(12);
    }
  };

  useEffect(() => {
    if (searchDatas !== null) {
      setDatas(searchDatas);
    } else {
      getContentData();
    }

    window.addEventListener('resize', handleSize);
    handleSize();
    return () => window.removeEventListener('resize', handleSize);
  }, [sortData, searchDatas]);

  return (
    <Container>
      <ListTitle />
      <ListSearch
        searchDatas={searchDatas}
        setSearchDatas={setSearchDatas}
        page={page}
        size={size}
        sortData={sortData}
      />
      <ListItems listData={datas} setSortData={setSortData} />
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
