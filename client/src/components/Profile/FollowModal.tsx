import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Follow, FollowModalProps } from 'interfaces/Profile.interface';
import customAxios from 'api/customAxios';
import { useNavigate } from 'react-router-dom';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { CloseButton, ModalBG, ModalContent } from './ModalStyles';

const FollowModal = ({
  setIsShowModal,
  isFollower,
  member,
}: FollowModalProps) => {
  const navigate = useNavigate();
  const [followerList, setFollowerList] = useState<Follow[] | []>([]);
  const [followingList, setFollowingList] = useState<Follow[] | []>([]);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleUserClick = (memberId: number) => {
    navigate(`/${memberId}/profile`);
    setIsShowModal(false);
  };

  const getFollowData = async () => {
    if (isFollower) {
      await customAxios
        .get(`/members/${member.memberId}/follower`)
        .then(resp => {
          setFollowerList(resp.data.data);
        });
    } else {
      await customAxios
        .get(`/members/${member.memberId}/following`)
        .then(resp => {
          setFollowingList(resp.data.data);
        });
    }
  };

  useEffect(() => {
    getFollowData();
  }, []);

  return (
    <>
      <ModalScrollDisable />
      <ModalBG onClick={handleModalClose}></ModalBG>
      <ModalContent>
        <div className="modal-title-wrapper">
          <h1 className="modal-title">{isFollower ? '팔로워' : '팔로잉'}</h1>
          <CloseButton onClick={handleModalClose}>
            <IoMdClose />
          </CloseButton>
        </div>
        {isFollower ? (
          followerList.length !== 0 ? (
            <FollowList>
              {followerList.map((follower, idx) => (
                <FollowUser
                  key={idx}
                  role="presentation"
                  onClick={() => handleUserClick(follower.memberId)}
                >
                  <img
                    className="user-profile"
                    src={follower.profile}
                    alt={follower.nickname + 'profile'}
                  />
                  <span className="user-nickname">{follower.nickname}</span>
                </FollowUser>
              ))}
            </FollowList>
          ) : (
            <EmptyFollowList>팔로워 리스트가 비어있습니다.</EmptyFollowList>
          )
        ) : followingList.length !== 0 ? (
          <FollowList>
            {followingList.map((following, idx) => (
              <FollowUser
                key={idx}
                role="presentation"
                onClick={() => handleUserClick(following.memberId)}
              >
                <img
                  className="user-profile"
                  src={following.profile}
                  alt={following.nickname + 'profile'}
                />
                <span className="user-nickname">{following.nickname}</span>
              </FollowUser>
            ))}
          </FollowList>
        ) : (
          <EmptyFollowList>팔로잉 리스트가 비어있습니다.</EmptyFollowList>
        )}
      </ModalContent>
    </>
  );
};

const FollowList = styled.ul`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  padding: 0 30px;
  color: #222;
`;

const FollowUser = styled.li`
  width: 100%;
  padding: 10px 5px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #fff;
  cursor: pointer;

  .user-profile {
    width: 40px;
    height: 40px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
  :hover {
    filter: brightness(0.9);
  }
`;

const EmptyFollowList = styled.p`
  width: fit-content;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #666;

  @media screen and (max-width: 576px) {
    font-size: 0.9rem;
  }
`;

export default FollowModal;
