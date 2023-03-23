import styled from 'styled-components';
import { TbGenderFemale, TbGenderMale, TbMail } from 'react-icons/tb';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import { FollowRequest, MemberInfoProps } from 'interfaces/Profile.interface';
import { useState } from 'react';
import { getScoreIcon } from 'utils/getScoreIcon';
import { toast } from 'react-toastify';
import FollowModal from './FollowModal';
import customAxios from 'api/customAxios';
import { StyledButton } from 'styles/StyledButton';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';
import { getDateString } from 'utils/getDateString';
import ReplyNote from 'components/MessageModal/ReplyNote';
import { ModalBG } from './ModalStyles';
import Swal from 'sweetalert2';
import { MdReport } from 'react-icons/md';

const MemberInfo = ({ member, setMember, followerStatus }: MemberInfoProps) => {
  const [isFollow, setIsFollow] = useState<boolean>(followerStatus);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isFollower, setIsFollower] = useState<boolean>(true);
  const [isShowNoteModal, setIsShowNoteModal] = useState<boolean>(false);
  const loginUser = useRecoilValue(userInfo);
  const noteData = {
    messageId: 0,
    content: '',
    companionId: 1,
    createdAt: getDateString(new Date()).fullDateStr,
    read: false,
    sender: {
      id: member.memberId,
      nickname: member.nickname,
    },
  };

  const handleFollowButtonClick = async () => {
    const data: FollowRequest = {
      followerId: loginUser.memberId,
      followingId: member.memberId,
    };

    await customAxios.post('/members/follows', data).then(resp => {
      setIsFollow(resp.data.data.followerStatus);

      if (!resp.data.data.followerStatus) {
        toast.success('팔로우가 취소되었습니다');
        setMember({
          ...member,
          followerCount: member.followerCount - 1,
        });
      } else {
        toast.success('팔로우가 완료되었습니다');
        setMember({
          ...member,
          followerCount: member.followerCount + 1,
        });
      }
    });
  };

  const handleFollowListClick = (type: boolean) => {
    setIsShowModal(true);
    setIsFollower(type);
  };

  const handleNoteModal = () => {
    setIsShowNoteModal(true);
  };

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleReportClick = () => {
    Swal.fire({
      icon: 'info',
      title: '이 회원과 문제가 있나요?',
      text: '회원 신고 기능은 추후에 추가될 예정입니다! 🥲',
    });
  };

  return (
    <>
      {isShowModal && (
        <FollowModal
          setIsShowModal={setIsShowModal}
          isFollower={isFollower}
          member={member}
        />
      )}
      {isShowNoteModal && (
        <>
          <ModalBG onClick={() => setIsShowNoteModal(false)} />
          <ReplyNote
            note={noteData}
            handleOverlayClick={handleOverlayClick}
            handleReplyModal={() => setIsShowNoteModal(false)}
            setIsReplyOpen={setIsShowNoteModal}
          />
        </>
      )}
      <InfoContainer>
        <ImageWrapper>
          <div
            className="img"
            style={{ backgroundImage: `url(${member.profile})` }}
          ></div>
          <div className="score">
            <img src={getScoreIcon(member.score)} alt="score" />
            <span>{member.score}%</span>
          </div>
        </ImageWrapper>
        <ContentWrapper>
          <section className="name-and-button">
            <div className="nickname">
              <p>{member.nickname}</p>
              <span>
                {member.gender === 'female' ? (
                  <TbGenderFemale size={24} />
                ) : (
                  <TbGenderMale size={24} />
                )}
              </span>
            </div>
            {loginUser.memberId !== member.memberId && (
              <div className="buttons">
                <Button
                  status={isFollow ? isFollow : false}
                  onClick={handleFollowButtonClick}
                >
                  {isFollow ? (
                    <SlUserFollowing size={21} />
                  ) : (
                    <SlUserFollow size={21} />
                  )}
                  {isFollow ? '팔로잉' : '팔로우'}
                </Button>
                <Button status={false} onClick={handleNoteModal}>
                  <TbMail size={24} />
                  쪽지 보내기
                </Button>
              </div>
            )}
          </section>
          <section className="member-follow-and-report">
            <div className="follows">
              <span onClick={() => handleFollowListClick(true)}>
                팔로워 {member.followerCount}
              </span>
              <span onClick={() => handleFollowListClick(false)}>
                팔로잉 {member.followingCount}
              </span>
            </div>
            {loginUser.memberId !== member.memberId && (
              <div className="report">
                <span>
                  <MdReport />
                </span>
                <p onClick={handleReportClick}>회원 신고하기</p>
              </div>
            )}
          </section>
          <div className="content">
            <p className="content-text">{member.content}</p>
          </div>
        </ContentWrapper>
      </InfoContainer>
    </>
  );
};

const InfoContainer = styled.article`
  width: calc(100% - 40px);
  border: 1px solid #ddd;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 20px;
  margin: 20px;
  background-color: rgba(255, 255, 255, 1);
  position: relative;
  z-index: 1;
  top: 15vh;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  animation: slidein 0.3s linear;
  transition: 0.3s;

  @keyframes slidein {
    from {
      transform: translateY(20px);
    }
    to {
      transform: translateY(0);
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImageWrapper = styled.section`
  width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding-right: 10px;

  .img {
    border-radius: 50%;
    width: 80%;
    padding-bottom: 80%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-color: #aaa;
  }
  .score {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.2rem;
    font-weight: 800;
    > img {
      width: 40px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    margin-bottom: 5px;
    gap: 10px;
    .img {
      width: 35%;
      padding-bottom: 35%;
    }
  }
`;

const ContentWrapper = styled.section`
  width: 80%;
  display: flex;
  flex-direction: column;
  gap: 15px;

  * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name-and-button {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    gap: 20px;
    .nickname {
      gap: 10px;
      > p {
        font-size: 1.4rem;
        font-weight: 800;
      }
      > span {
        background-color: #888;
        border-radius: 50%;
        color: #fff;
        padding: 2px;
      }
    }
    .buttons {
      gap: 10px;
    }
  }
  .member-follow-and-report {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
  }
  .follows {
    gap: 20px;
    > span {
      cursor: pointer;
    }
  }
  .report {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 0.9rem;
    cursor: pointer;
    color: #d9506a;
  }
  .content {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .content-text {
      width: 100%;
      word-break: break-all;
      text-align: left;
      display: flex;
      justify-content: flex-start;
    }
  }

  @media screen and (max-width: 992px) {
    .content {
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
    gap: 10px;
    .name-and-button {
      flex-direction: column;
      gap: 10px;
    }
    .member-follow-and-report {
      justify-content: center;
      flex-direction: column;
    }
    .content {
      width: 90%;
      align-self: center;
    }
  }
  @media screen and (max-width: 576px) {
    .buttons {
      font-size: 0.9rem;
    }
  }
`;

const Button = styled(StyledButton)<{ status: boolean }>`
  padding: 5px 15px;
  background-color: ${props => (props.status ? '#9BB76A' : '#aaa')};
  font-weight: 800;
  font-size: 1rem;
  gap: 5px;
`;

export default MemberInfo;
