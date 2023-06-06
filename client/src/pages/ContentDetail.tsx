import customAxios from 'api/customAxios';
import ChatModal from 'components/Chat/ChatModal';
import CompanionTab from 'components/ContentDetail/CompanionTab';
import ContentWriter from 'components/ContentDetail/ContentWriter';
import SearchMap from 'components/ContentDetail/SearchMap';
import TravelComplete from 'components/ContentDetail/TravelComplete';
import Loader from 'components/Loader';
import {
  detailInfo,
  partApply,
  subApply,
} from 'interfaces/ContentDetail.interface';
import { useEffect, useState } from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getDateString } from 'utils/getDateString';

const ContentDetail = () => {
  const { contentId } = useParams<{ contentId: string }>();
  const [sub, setSub] = useState<subApply[]>([]);
  const [part, setPart] = useState<partApply[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isShowChatModal, setIsShowChatModal] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const [detail, setDetail] = useState<detailInfo>({
    companionId: 0,
    memberId: 0,
    nickname: '',
    profile: '',
    score: 0,
    title: '',
    content: '',
    date: '',
    address: '',
    lat: 37,
    lng: 126,
    tags: [],
    createdAt: '',
    companionStatus: false,
  });

  // * 글 세부조회
  useEffect(() => {
    customAxios
      .get(`/companions/${contentId}`)
      .then(res => {
        setDetail(res.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, [contentId]);

  const handleChatModal = () => {
    setIsShowChatModal(!isShowChatModal);
  };

  return (
    <>
      {isShowChatModal && (
        <ChatModal
          handleChatModal={handleChatModal}
          roomId={Number(contentId)}
        />
      )}
      <Container>
        <BackSpace>
          <button onClick={handleBack}>
            <MdArrowBackIosNew />
            <div>목록으로</div>
          </button>
        </BackSpace>
        <ContentDetailBox>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <LeftBox>
                <TopBox>
                  <h1>{getDateString(detail.date).shortDateStr}</h1>
                  <h3>{detail.address}</h3>
                </TopBox>
                <BottomBox>
                  <h2>{detail.title}</h2>
                  <h4>작성날짜: {detail.createdAt}</h4>
                  <SearchMap detail={detail} />
                  <div
                    id="content"
                    dangerouslySetInnerHTML={{ __html: detail.content }}
                  ></div>
                  <div id="tag-box">
                    {detail &&
                      detail.tags.map((el, index: number) => (
                        <li key={index}>{el}</li>
                      ))}
                  </div>
                </BottomBox>
              </LeftBox>
              <RightBox>
                <ContentWriter
                  detail={detail}
                  sub={sub}
                  setSub={setSub}
                  part={part}
                  setPart={setPart}
                  handleChatModal={handleChatModal}
                />
                {detail.companionStatus ? (
                  <TravelComplete
                    detail={detail}
                    part={part}
                    setPart={setPart}
                  />
                ) : (
                  <CompanionTab
                    detail={detail}
                    sub={sub}
                    setSub={setSub}
                    part={part}
                    setPart={setPart}
                  />
                )}
              </RightBox>
            </>
          )}
        </ContentDetailBox>
      </Container>
    </>
  );
};

export default ContentDetail;

const Container = styled.main`
  background-color: #5d62a0;
`;
const BackSpace = styled.div`
  width: 100%;
  position: absolute;
  top: 75px;
  left: 0px;
  display: flex;
  padding: 0px 20px;
  justify-content: flex-start;
  align-items: center;
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    background-color: transparent;
    cursor: pointer;
    color: white;
    font-size: 1.3rem;
    transition: all 0.3s ease 0s;
    opacity: 1;
    :hover {
      transition: all 0.3s ease 0s;
      transform: translateX(-5px);
      color: #d4d4d4;
    }
  }
`;
const ContentDetailBox = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 1280px;
  height: 900px;
  padding: 30px;
  box-shadow: 5px 5px 10px 5px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  position: relative;
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 100%;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (orientation: landscape) {
      /* Landscape 모드일 때 적용할 CSS */
      height: 100%;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    overflow: scroll;
    height: 100%;
    ::-webkit-scrollbar {
      display: none;
    }
    @media (orientation: landscape) {
      /* Landscape 모드일 때 적용할 CSS */
      height: 100%;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 100%;
  }
`;

const LeftBox = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 66%;
  height: 100%;
  flex-direction: column;
  border-right: 2px solid #cccccc;
  padding-right: 20px;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    border: none;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    width: 100%;
    border: none;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
    @media screen and (max-width: 576px) {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
`;
const TopBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  width: 100%;
  border-bottom: 30px solid #feb35c;
  h1 {
    font-size: 2.8rem;
    padding-right: 30px;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    width: 100%;
    border-bottom: 30px solid #feb35c;
    h1 {
      font-size: 2rem;
      padding-right: 30px;
    }
    @media (orientation: landscape) {
      display: flex;
      justify-content: flex-start;
      align-items: flex-end;
      width: 100%;
      border-bottom: 30px solid #feb35c;
      h1 {
        font-size: 2rem;
        padding-right: 30px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    border-bottom: 10px solid #feb35c;
    h1 {
      font-size: 2rem;
      padding-right: 30px;
    }
  }
`;
const BottomBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
  padding-top: 20px;
  padding-bottom: 20px;
  h2 {
    font-size: 2.5rem;
  }
  h4 {
    color: #666666;
    font-weight: bold;
  }
  #content {
    width: 100%;
    height: 100%;
    font-size: 1.3rem;
    padding-bottom: 10px;
    p {
      width: 100%;
      word-break: break-all;
      img {
        width: 500px;
        max-height: 500px;
        display: block;
        object-fit: scale-down;
        word-break: break-all;
      }
    }
  }
  #tag-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    width: 100%;
    li {
      width: calc(100% / 5);
      text-align: center;
      font-size: 1.2rem;
      background-color: #5d62a0;
      border-radius: 50px;
      padding: 5px;
      color: white;
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    h2 {
      font-size: 1.5rem;
    }
    h4 {
      color: #666666;
      font-weight: bold;
      font-size: 0.8rem;
    }
    #content {
      font-size: 1rem;
    }
    #tag-box {
      li {
        width: calc(100% / 5);
        text-align: center;
        font-size: 0.7rem;
        padding: 5px;
        color: white;
      }
    }
    @media (orientation: landscape) {
      .bottom-box {
        h2 {
          font-size: 1.5rem;
        }
        h4 {
          color: #666666;
          font-weight: bold;
          font-size: 0.8rem;
        }
        #content {
          font-size: 1rem;
        }
        #tag-box {
          li {
            width: calc(100% / 5);
            text-align: center;
            font-size: 0.7rem;
            padding: 5px;
            color: white;
          }
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    h2 {
      font-size: 1.5rem;
    }
    h4 {
      color: #666666;
      font-weight: bold;
      font-size: 0.8rem;
    }
    #content {
      font-size: 1rem;
      p {
        width: 100%;
        word-break: break-all;
        img {
          width: 300px;
          max-height: 400px;
          display: block;
          object-fit: scale-down;
          word-break: break-all;
        }
      }
    }
    #tag-box {
      li {
        width: calc(100% / 5);
        text-align: center;
        padding: 3px;
        color: white;
      }
    }
  }
`;
const RightBox = styled.section`
  width: 34%;
  height: 100%;
  @media screen and (max-width: 992px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
`;

/* TODO:
1. 기본 구조 * 
2. 지도 API * 
3. 태그 리스트 불러오기 *
4. 반응형 *
5. 스크롤 * 
*/
