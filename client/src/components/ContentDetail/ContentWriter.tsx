import customAxios from 'api/customAxios';
import { companionProps, partApply } from 'interfaces/ContentDetail.interface';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getScoreIcon } from 'utils/getScoreIcon';

const ContentWriter = ({
  detail,
  sub,
  setSub,
  part,
  setPart,
  handleChatModal,
}: companionProps) => {
  const { memberId, nickname } = useRecoilValue(userInfo);
  const params = useParams();
  const { contentId } = params;

  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/${contentId}/edit`);
  };

  const handleProfile = () => {
    navigate(`/${detail.memberId}/profile`);
  };

  const getSubList = () => {
    customAxios.get(`/companions/${contentId}/subscribers`).then(res => {
      setSub(res.data.data);
    });
  };

  useEffect(() => {
    getSubList();
  }, []);

  const getPartList = () => {
    customAxios.get(`/companions/${contentId}/participants`).then(res => {
      setPart(res.data.data);
    });
  };

  useEffect(() => {
    getPartList();
  }, []);

  const handleDelete = () => {
    Swal.fire({
      title: '삭제하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .delete(`/companions/${detail.companionId}`)
          .then(() => {
            Swal.fire('Deleted!', '동행글이 삭제되었습니다.', 'success');
          })
          .catch(error => console.log(error));
        navigate(-1);
      }
    });
  };

  const handleApply = async () => {
    Swal.fire({
      title: '동행신청 하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 신청합니다',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .post(`/companions/${contentId}/subscribers`, { memberId })
          .then(() => {
            Swal.fire('Applied!', '동행이 신청되었습니다!', 'success');
            setSub(sub);
            getSubList();
            const content = `작성하신 동행글 [${detail.title}] 에 [${nickname}] 님이 동행을 신청하였습니다.`;
            customAxios.post(`/messages`, {
              content,
              senderId: 1,
              receiverId: detail.memberId,
              companionId: contentId,
            });
          })
          .catch(() => {
            Swal.fire('Failed!', '이미 신청한 동행입니다!', 'error');
          });
      }
    });
  };

  return (
    <Container>
      <WriterInfo>
        <div
          className="img"
          style={{ backgroundImage: `url(${detail.profile})` }}
        ></div>
        <InfoWrapper>
          <div id="nickname">{detail.nickname}</div>
          <div id="battery">
            <img src={getScoreIcon(detail.score)} alt="score" />
            <div>{detail.score}%</div>
          </div>
        </InfoWrapper>
      </WriterInfo>
      <ButtonBox>
        {detail.memberId === memberId ? (
          <>
            {!detail.companionStatus ? (
              <Button onClick={handleUpdate}>동행글 수정</Button>
            ) : (
              <></>
            )}
            <Button onClick={handleDelete}>동행글 삭제</Button>
          </>
        ) : detail.companionStatus ? (
          <>
            <Button onClick={handleProfile}>프로필 보기</Button>
          </>
        ) : part &&
          part.length !== 0 &&
          part.some((part: partApply) => part.memberId === memberId) ? (
          <>
            <Button disabled>참가 신청 완료</Button>
            <Button onClick={handleProfile}>프로필 보기</Button>
          </>
        ) : (
          <>
            <Button onClick={handleApply}>동행 신청</Button>
            <Button onClick={handleProfile}>프로필 보기</Button>
          </>
        )}
      </ButtonBox>
      {(part && detail.memberId === memberId) ||
      part.some((part: partApply) => part.memberId === memberId) ? (
        <ButtonBox>
          <ChatButton onClick={handleChatModal}>채팅 참여하기</ChatButton>
        </ButtonBox>
      ) : null}
    </Container>
  );
};

export default ContentWriter;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50%;
  @media screen and (max-width: 992px) {
    width: 100%;
    height: 100%;
    @media (orientation: landscape) {
      height: 70%;
    }
  }
  @media screen and (max-width: 768px) {
    margin-top: 10px;
    @media (orientation: landscape) {
      height: 100%;
    }
  }
  @media screen and (max-width: 576px) {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

const WriterInfo = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  .img {
    background-color: #e7e7e7;
    width: 200px;
    height: 200px;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  @media screen and (max-width: 768px) {
    .img {
      width: 150px;
      height: 150px;
    }
  }
  @media screen and (max-width: 576px) {
    font-size: 0.5rem;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
  #nickname {
    font-size: 1.3rem;
  }
  #battery {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    > img {
      width: 60px;
      height: 50px;
      padding-right: 10px;
    }
  }
  @media screen and (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 10px 20px;
    #nickname {
      font-size: 1rem;
    }
    #battery {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      > img {
        width: 50px;
        height: 40px;
        padding-right: 5px;
      }
    }
  }
  @media screen and (max-width: 576px) {
    #nickname {
      font-size: 1rem;
    }
    #battery {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      > img {
        width: 50px;
        height: 40px;
        padding-right: 5px;
      }
    }
  }
`;
const ButtonBox = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  @media screen and (max-width: 576px) {
    > * {
      font-size: 0.5rem;
    }
  }
`;
const Button = styled.button`
  background-color: #b6b0b0;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.2s ease 0s;
  :disabled {
    cursor: default;
    :hover {
      box-shadow: none;
      background-color: #b6b0b0;
      color: white;
    }
  }
  &:hover {
    transition: all 0.2s ease 0s;
    color: black;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 768px) {
    background-color: #d9d9d9;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 30px;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;
const ChatButton = styled.button`
  color: white;
  background-color: #feb35c;
  border: none;
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  width: 80%;
  &:hover {
    transition: all 0.2s ease 0s;
    color: black;
    background-color: white;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  }
  @media screen and (max-width: 768px) {
    background-color: #feb35c;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 30px;
    font-size: 0.8rem;
    cursor: pointer;
  }
`;

/* TODO:
1. 기본 구조 * 
2. 작성자인지 아닌지 구분하여 버튼 내용 다르게 하기 *
2-1. onClick 이벤트도 다르게 하기 *
2-2. 프로필 이미지 불러오기 *
3. 참여자 탭에서 수락, 거절 버튼 안보이도록 수정 *
*/
