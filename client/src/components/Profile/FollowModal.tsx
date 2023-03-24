import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Follow, FollowModalProps } from 'interfaces/Profile.interface';
import customAxios from 'api/customAxios';
import { useNavigate } from 'react-router-dom';
import ModalScrollDisable from 'utils/ModalScrollDisable';
import { CloseButton, ModalBG, ModalContent } from './ModalStyles';
import Loader from 'components/Loader';

const FollowModal = ({
  setIsShowModal,
  isFollower,
  member,
}: FollowModalProps) => {
  const navigate = useNavigate();
  const [followList, setFollowList] = useState<Follow[] | []>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const handleUserClick = (memberId: number) => {
    navigate(`/${memberId}/profile`);
    setIsShowModal(false);
  };

  const getFollowData = async () => {
    const listType = isFollower ? 'follower' : 'following';
    await customAxios
      .get(`/members/${member.memberId}/${listType}`)
      .then(resp => {
        setFollowList(resp.data.data);
        setIsLoading(false);
      });
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
        {isLoading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : followList.length !== 0 ? (
          <FollowList>
            {followList.map((follow, idx) => (
              <FollowUser
                key={idx}
                role="presentation"
                onClick={() => handleUserClick(follow.memberId)}
              >
                <img
                  className="user-profile"
                  src={follow.profile}
                  alt={follow.nickname + 'profile'}
                />
                <span className="user-nickname">{follow.nickname}</span>
              </FollowUser>
            ))}
          </FollowList>
        ) : (
          <EmptyFollowList>
            {isFollower ? '팔로워 ' : '팔로잉 '}리스트가 비어있습니다.
          </EmptyFollowList>
        )}
      </ModalContent>
    </>
  );
};

const LoaderContainer = styled.div`
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
