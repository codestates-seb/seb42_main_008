import axios from 'axios';
import { subProps } from 'interfaces/ContentDetail.interface';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import { getScoreIcon } from 'utils/getScoreIcon';

const ContentWriter = ({ detail, sub, setSub }: subProps) => {
  const { profile, memberId, nickname } = useRecoilValue(userInfo);
  const params = useParams();
  const { contentId } = params;

  const navigate = useNavigate();
  const handleUpdate = () => {
    navigate(`/${contentId}/edit`);
  };

  // 클릭 시 글 삭제 추가
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
        await axios
          .delete(
            `${process.env.REACT_APP_TEST_SERVER}/companions/${detail.companionId}`
          )
          .then(() => {
            Swal.fire('Deleted!', 'Your file has been deleted.', 'success');
            console.log('delete!');
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
        await axios
          .post(
            `${process.env.REACT_APP_SERVER}/companions/${contentId}/subscribers`,
            { memberId }
          )
          .then(() => {
            Swal.fire('Applied!', '동행이 신청되었습니다!', 'success');
            setSub(sub);
            getSubList();
            const content = `작성하신 동행글에 ${nickname} 님이 동행을 신청하였습니다.`;
            axios.post(`${process.env.REACT_APP_SERVER}/messages`, {
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

  const getSubList = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/companions/${contentId}/subscribers`
      )
      .then(res => {
        setSub(res.data.data);
      });
  };

  useEffect(() => {
    getSubList();
  }, []);

  const handleProfile = () => {
    navigate(`/${detail.memberId}/profile`);
  };

  return (
    <Container>
      <WriterInfo>
        <div
          className="img"
          style={{ backgroundImage: `url(${profile})` }}
        ></div>
        <div className="info-wrapper">
          <div id="nickname">{detail.nickname}</div>
          <div id="battery">
            <img src={getScoreIcon(detail.score)} alt="score" />
            <div>{detail.score}%</div>
          </div>
        </div>
      </WriterInfo>
      <ButtonBox>
        {detail.memberId === memberId ? (
          <>
            <button className="btn" onClick={handleUpdate}>
              동행글 수정
            </button>
            <button className="btn" onClick={handleDelete}>
              동행글 삭제
            </button>
          </>
        ) : detail.companionStatus ? (
          <>
            <button className="btn" onClick={handleProfile}>
              프로필 보기
            </button>
          </>
        ) : (
          <>
            <button className="btn" onClick={handleApply}>
              동행 신청
            </button>
            <button className="btn" onClick={handleProfile}>
              프로필 보기
            </button>
          </>
        )}
      </ButtonBox>
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
  .info-wrapper {
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
  }
  @media screen and (max-width: 768px) {
    .img {
      width: 150px;
      height: 150px;
    }
    .info-wrapper {
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
  }
  @media screen and (max-width: 576px) {
    font-size: 0.5rem;
    height: 100vh;
    .info-wrapper {
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
  }
`;

const ButtonBox = styled.section`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  padding: 10px 30px;
  .btn {
    background-color: #d9d9d9;
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 30px;
    font-size: 1.2rem;
    cursor: pointer;
  }
  .yellow {
    background: #feb35c;
  }
  @media screen and (max-width: 768px) {
    .btn {
      background-color: #d9d9d9;
      color: white;
      border: none;
      padding: 5px;
      border-radius: 30px;
      font-size: 0.7rem;
      cursor: pointer;
    }
    .yellow {
      background: #feb35c;
    }
  }
  @media screen and (max-width: 576px) {
    > * {
      font-size: 0.5rem;
    }
    .yellow {
      background: #feb35c;
    }
  }
`;

/* TODO:
1. 기본 구조 * 
2. 작성자인지 아닌지 구분하여 버튼 내용 다르게 하기
2-1. onClick 이벤트도 다르게 하기
2-2. 프로필 이미지 불러오기
2-3. 배터리 게이지 표시
3. 참여자 탭에서 수락, 거절 버튼 안보이도록 수정
*/
