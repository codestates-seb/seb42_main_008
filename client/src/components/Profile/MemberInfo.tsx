import styled from 'styled-components';

import { TbGenderFemale, TbGenderMale, TbMail } from 'react-icons/tb';
import { SlUserFollow, SlUserFollowing } from 'react-icons/sl';
import memberData from 'profileTestData.json';
import { MemberInfoProps, MemberProfile } from 'interfaces/Profile.interface';
import { useState } from 'react';
import { getScoreIcon } from 'utils/getScoreIcon';
import { toast } from 'react-toastify';
import FollowModal from './FollowModal';

const MemberInfo = ({ user }: MemberInfoProps) => {
  const member: MemberProfile = memberData.members;
  const [isFollow, setIsFollow] = useState<boolean>(member.followerStatus);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<string>('');

  const handleFollowButtonClick = () => {
    setIsFollow(cur => !cur);
    if (isFollow) {
      toast.success('팔로우가 취소되었습니다');
    } else {
      toast.success('팔로우가 완료되었습니다');
    }
  };

  const handleFollowListClick = (type: string) => {
    setIsShowModal(true);
    setModalType(type);
  };

  return (
    <>
      {isShowModal && (
        <FollowModal setIsShowModal={setIsShowModal} modalType={modalType} />
      )}
      <InfoContainer>
        <ImageWrapper>
          <img src={member.profile} alt="profile" />
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
            {user.memberId !== member.memberId && (
              <div className="buttons">
                <Button status={isFollow} onClick={handleFollowButtonClick}>
                  {isFollow ? (
                    <SlUserFollowing size={21} />
                  ) : (
                    <SlUserFollow size={21} />
                  )}
                  {isFollow ? '팔로잉' : '팔로우'}
                </Button>
                <Button status={false}>
                  <TbMail size={24} />
                  쪽지 보내기
                </Button>
              </div>
            )}
          </section>
          <section className="follows">
            <span onClick={() => handleFollowListClick('follower')}>
              팔로워 {member.followerCount}
            </span>
            <span onClick={() => handleFollowListClick('following')}>
              팔로잉 {member.followingCount}
            </span>
          </section>
          <section className="content">
            <p>{member.content}</p>
          </section>
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

  > img {
    border-radius: 50%;
    width: 80%;
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
    > img {
      width: 35%;
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
  .follows {
    justify-content: flex-start;
    gap: 20px;
    > span {
      cursor: pointer;
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
    .follows {
      justify-content: center;
    }
  }
  @media screen and (max-width: 576px) {
    .buttons {
      font-size: 0.9rem;
    }
  }
`;

const Button = styled.div<{ status: boolean }>`
  padding: 5px 15px;
  background-color: ${props => (props.status ? '#9BB76A' : '#aaa')};
  color: #fff;
  font-weight: 800;
  cursor: pointer;
  border-radius: 20px;
  gap: 5px;
`;

export default MemberInfo;
