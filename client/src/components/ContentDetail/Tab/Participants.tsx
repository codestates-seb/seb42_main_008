import axios from 'axios';
import { partProps } from 'interfaces/ContentDetail.interface';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Participants = ({ detail, setSub, part, setPart }: partProps) => {
  const params = useParams();
  const { contentId } = params;
  const { memberId, nickname } = useRecoilValue(userInfo);

  const handleCancel = async () => {
    Swal.fire({
      title: '동행참여를 취소하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 취소합니다',
    }).then(async result => {
      if (result.isConfirmed) {
        await axios
          .delete(
            `${process.env.REACT_APP_TEST_SERVER}/companions/${contentId}/participants`,
            { data: { memberId } }
          )
          .then(() => {
            Swal.fire('Deleted!', '취소되었습니다', 'success');
            setPart(part);
            getPartList();
            const content = `작성하신 동행글에 ${nickname} 님이 동행참여를 취소하였습니다.`;
            axios.post(`${process.env.REACT_APP_SERVER}/messages`, {
              content,
              senderId: 1,
              receiverId: detail.memberId,
              companionId: contentId,
            });
          })
          .catch(error => console.log(error));
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

  const getPartList = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/companions/${contentId}/participants`
      )
      .then(res => {
        setPart(res.data.data);
      });
  };

  useEffect(() => {
    getPartList();
  }, []);

  return (
    <Container>
      <Content>
        {part && part.length !== 0 ? (
          part.map((el: any, index: number) => (
            <li key={index}>
              <div className="companion-info">
                <div
                  className="img"
                  style={{ backgroundImage: `url(${el.profile})` }}
                ></div>
                <div>{el.nickname}</div>
              </div>
              {memberId === el.memberId ? (
                <div className="btn-wrapper">
                  <button className="btn" onClick={handleCancel}>
                    취소
                  </button>
                </div>
              ) : null}
            </li>
          ))
        ) : (
          <li>동행 참여자가 없습니다. 🥲</li>
        )}
      </Content>
    </Container>
  );
};

export default Participants;

const Container = styled.section`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 50%;
  @media screen and (max-width: 992px) {
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    height: 100%;
    @media (orientation: landscape) {
      * {
        font-size: 0.8rem;
      }
    }
  }
  @media screen and (max-width: 576px) {
    height: 100%;
  }
`;

const Content = styled.ul`
  text-align: left;
  list-style: none;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  overflow: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  li {
    width: 100%;
    border: 1px solid #cccccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
    padding: 5px;
    .companion-info {
      width: 50%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .img {
        margin-right: 5px;
        width: 30px;
        height: 30px;
        border-radius: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
    }
    .btn-wrapper {
      width: 50%;
      display: flex;
      justify-content: space-around;
      > :nth-child(1) {
        background-color: #81d05b;
      }
      > :nth-child(2) {
        background-color: #ff624d;
      }
      .btn {
        cursor: pointer;
        padding: 0px 10px;
        font-size: 1rem;
        color: white;
        border: none;
        border-radius: 15px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
  @media screen and (max-width: 576px) {
    > li {
      font-size: 0.8rem;
      .btn-wrapper {
        .btn {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

/* TODO:
1. 탭 만들기 *
2. 신청자 또는 참여자 탭별로 데이터 불러오기 * 
3. 작성자인지 아닌지 판단하여 버튼 다르게 띄우기
3-1. 작성자라면 수정, 삭제, 수락, 거절 버튼 * 
3-2. 작성자가 아니라면 신청, 프로필보기, 신청자&참여자 목록에는 버튼 없음 * 
3-3. 신청자라면 신청자 리스트에 본인 계정에 취소버튼 보이도록 추가 * 
*/
