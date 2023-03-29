import customAxios from 'api/customAxios';
import { StyledCompanionList } from 'components/ContentDetail/CompanionStyled';
import { companionProps, subApply } from 'interfaces/ContentDetail.interface';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import styled from 'styled-components';
import Swal from 'sweetalert2';

const Companion = ({ detail, sub, setSub, setPart }: companionProps) => {
  const params = useParams();
  const { contentId } = params;
  const { memberId, nickname } = useRecoilValue(userInfo);

  const navigate = useNavigate();

  const handleMoveProfile = (subMemberId: number) => {
    navigate(`/${subMemberId}/profile`);
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

  const handleAccept = async (memberId: number) => {
    Swal.fire({
      title: '동행신청을 수락하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 수락합니다',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .patch(`/companions/${contentId}/subscribers`, { memberId })
          .then(() => {
            Swal.fire('Accepted!', '확인되었습니다', 'success');
            setSub(sub);
            getSubList();
            const content = `신청하신 동행글 [${detail.title}] 에 [${detail.nickname}] 님이 동행을 수락하였습니다.`;
            customAxios.post(`/messages`, {
              content,
              senderId: 1,
              receiverId: memberId,
              companionId: contentId,
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  const handleReject = async (memberId: number) => {
    Swal.fire({
      title: '동행신청을 거절하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 거절합니다',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .delete(`/companions/${contentId}/subscribers`, {
            data: { memberId },
          })
          .then(() => {
            Swal.fire('Deleted!', '거절되었습니다', 'success');
            setSub(sub);
            getSubList();
            const content = `신청하신 동행글 [${detail.title}] 에 [${detail.nickname}] 님이 동행을 거절하였습니다.`;
            customAxios.post(`/messages`, {
              content,
              senderId: 1,
              receiverId: memberId,
              companionId: contentId,
            });
          })
          .catch(error => console.log(error));
      }
    });
  };

  const handleCancel = async () => {
    Swal.fire({
      title: '동행신청을 취소하시겠습니까?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '네, 취소합니다',
    }).then(async result => {
      if (result.isConfirmed) {
        await customAxios
          .delete(`/companions/${contentId}/subscribers`, {
            data: { memberId },
          })
          .then(() => {
            Swal.fire('Deleted!', '취소되었습니다', 'success');
            setSub(sub);
            getSubList();
            const content = `작성하신 동행글 [${detail.title}] 에 [${nickname}] 님이 동행신청을 취소하였습니다.`;
            customAxios.post(`/messages`, {
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

  return (
    <Container>
      <StyledCompanionList>
        {sub && sub.length !== 0 ? (
          sub.map((el: subApply, index: number) => (
            <li key={index}>
              <div
                className="companion-info"
                onClick={() => handleMoveProfile(el.memberId)}
              >
                <div
                  className="img"
                  style={{ backgroundImage: `url(${el.profile})` }}
                ></div>
                <div>{el.nickname}</div>
              </div>
              {detail.memberId === memberId ? (
                <div className="btn-wrapper">
                  <button
                    className="btn"
                    onClick={() => handleAccept(el.memberId)}
                  >
                    수락
                  </button>
                  <button
                    className="btn"
                    onClick={() => handleReject(el.memberId)}
                  >
                    거절
                  </button>
                </div>
              ) : memberId === el.memberId ? (
                <div className="btn-wrapper">
                  <button className="btn" onClick={handleCancel}>
                    취소
                  </button>
                </div>
              ) : null}
            </li>
          ))
        ) : (
          <li>동행 신청자가 없습니다.</li>
        )}
      </StyledCompanionList>
    </Container>
  );
};

export default Companion;

const Container = styled.section`
  display: flex;
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

/* TODO:
1. 탭 만들기 *
2. 신청자 또는 참여자 탭별로 데이터 불러오기 * 
3. 작성자인지 아닌지 판단하여 버튼 다르게 띄우기 * 
3-1. 작성자라면 수정, 삭제, 수락, 거절 버튼 * 
3-2. 작성자가 아니라면 신청, 프로필보기, 신청자&참여자 목록에는 버튼 없음 *
3-3. 신청자라면 신청자 리스트에 본인 계정에 취소버튼 보이도록 추가 *
4. 신청 수락/거절 시 쪽지 보내기 *
*/
