import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ListData, ListQueryString } from 'interfaces/ContentList.interface';
import ListTitle from 'components/ContinentList/ListTitle';
import ListSearch from 'components/ContinentList/ListSearch';
import ListItems from 'components/ContinentList/ListItems';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';
import Loader from 'components/Loader';

const ContentList = () => {
  const { countryCode } = useParams();
  const preventRef = useRef(true); // * (무한스크롤) 중복 실행 방지
  const obsRef = useRef(null); // * (무한스크롤) observer Element
  const [isLast, setIsLast] = useState<boolean>(false); // * (무한스크롤) 모든 글 로드 확인
  const [datas, setDatas] = useState<ListData[] | []>([]);
  const [searchDatas, setSearchDatas] = useState<ListData[] | undefined>(
    undefined
  );
  const [searchPage, setSearchPage] = useState<number>(1);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSearch, setIsSearch] = useState<boolean>(false);

  const handleSize = () => {
    const width = window.innerWidth;
    if (width < 620) {
      return 3;
    } else if (width < 922) {
      return 4;
    } else if (width < 1200) {
      return 6;
    } else {
      return 8;
    }
  };

  const [size, setSize] = useState<number>(handleSize());

  const handleWindowResize = () => {
    setSize(handleSize());
  };

  const getContentData = async (page: number, size: number) => {
    setIsLoading(true);
    const params: ListQueryString = {
      page,
      size,
      sortDir: 'DESC',
      sortBy: 'createdAt',
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

        if (resp.data.pageInfo.totalPages <= resp.data.pageInfo.page) {
          setIsLast(true);
        }
      });
  };

  const obsHandler = (entries: any) => {
    const target = entries[0];

    if (!isLast && target.isIntersecting && preventRef.current) {
      // ! 옵저버를 만났을 때 마지막 페이지가 아니고, 중복 실행이 아닐 경우
      if (!isSearch) {
        // ! 검색 데이터가 아닐경우
        preventRef.current = false; // * 옵저버 중복 실행 방지
        setPage(prev => prev + 1); // * 페이지 값 증가
      } else {
        // ! 검색 데이터일 경우
        preventRef.current = false; // * 옵저버 중복 실행 방지
        setSearchPage(prev => prev + 1);
      }
    }
  };

  useEffect(() => {
    if (searchDatas !== undefined) {
      // ! 검색 데이터가 있다면
      if (searchPage === 1) {
        // ! 첫 페이지일 경우 isLast 초기화
        setIsLast(false);
      }
      preventRef.current = true;
      setDatas([...searchDatas]);
      setPage(1);
    } else {
      // ! 검색 데이터가 없다면 (일반 데이터)
      if (page === 1) {
        // ! 첫 페이지일 경우 isLast 초기화
        setIsLast(false);
      }
      setSearchPage(1);
      getContentData(page, size);
    }
  }, [searchDatas, page, searchPage]);

  useEffect(() => {
    // ! 윈도우 사이즈별 호출 데이터 개수 변경
    window.addEventListener('resize', handleWindowResize);
    handleSize();
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  useEffect(() => {
    // ! 옵저버 핸들러 호출 (종속성배열: 검색 관련 데이터로 바뀔때 재시동)
    const observer = new IntersectionObserver(obsHandler, { threshold: 0.5 });
    if (obsRef.current) observer.observe(obsRef.current);
    return () => {
      observer.disconnect();
    };
  }, [isSearch, isLast, datas.length !== 0]);

  return (
    <Container>
      <ListTitle />
      <ListSearch
        searchDatas={searchDatas}
        setSearchDatas={setSearchDatas}
        size={size}
        searchPage={searchPage}
        isSearch={isSearch}
        setIsSearch={setIsSearch}
        setIsLast={setIsLast}
        setSearchPage={setSearchPage}
        setIsLoading={setIsLoading}
        setDatas={setDatas}
      />
      <ListItems listData={datas} />
      {isLoading && <Loader />}
      {datas.length !== 0 && (
        <Observer ref={obsRef}>{/* 무한스크롤용 옵저버 */}</Observer>
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: calc(100vh - 60px);
`;

const Observer = styled.div`
  position: absolute;
  width: 100%;
  bottom: -30px;
`;

export default ContentList;
