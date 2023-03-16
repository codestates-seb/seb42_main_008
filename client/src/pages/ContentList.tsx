import { useEffect, useRef, useState } from 'react';
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
import Loader from 'components/Loader';

const ContentList = () => {
  const { countryCode } = useParams();
  const preventRef = useRef(true); //중복 실행 방지
  const obsRef = useRef(null); //observer Element
  const endRef = useRef(false); //모든 글 로드 확인
  const [datas, setDatas] = useState<ListData[] | []>([]);
  const [searchDatas, setSearchDatas] = useState<ListData[] | null>(null);
  const [sortData, setSortData] = useState<SortBy>({
    value: '작성날짜 (최신순)',
    sortBy: 'createdAt',
    sortDir: 'DESC',
  });
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(3);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getContentData = async (page: number, size: number) => {
    const params: ListQueryString = {
      page,
      size,
      sortDir: sortData.sortDir,
      sortBy: sortData.sortBy,
      nationCode: countryCode,
    };

    await customAxios
      .get('/companions/nations', {
        params,
      })
      .then(resp => {
        setDatas([...datas, ...resp.data.data]);
        setIsLoading(false);
        preventRef.current = true;

        if (resp.data.pageInfo.totalPages === resp.data.pageInfo.page) {
          endRef.current = true;
        }
      });
  };

  const handleSize = () => {
    const width = window.innerWidth;
    if (width < 620) {
      setSize(3);
      setPage(1);
    } else if (width < 922) {
      setSize(3);
    } else if (width < 1200) {
      setSize(3);
    } else {
      setSize(3);
    }
  };

  useEffect(() => {
    if (searchDatas !== null) {
      setDatas(searchDatas);
    } else {
      getContentData(page, size);
    }
  }, [sortData, searchDatas, page]);

  useEffect(() => {
    window.addEventListener('resize', handleSize);
    handleSize();
    return () => {
      window.removeEventListener('resize', handleSize);
    };
  }, []);

  const obsHandler = (entries: any) => {
    const target = entries[0];
    console.log('observer');
    console.log(endRef.current, target.isIntersecting, preventRef.current);

    if (!endRef.current && target.isIntersecting && preventRef.current) {
      //옵저버 중복 실행 방지
      preventRef.current = false; //옵저버 중복 실행 방지
      setPage(prev => prev + 1); //페이지 값 증가
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, []);

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
      {isLoading && <Loader />}
      <div ref={obsRef}></div>
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
