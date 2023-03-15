import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { Follow, FollowModalProps } from 'interfaces/Profile.interface';
import customAxios from 'api/customAxios';

const FollowModal = ({ setIsShowModal, isFollower }: FollowModalProps) => {
  const [followerList, setFollowerList] = useState<Follow[] | []>([]);
  const [followingList, setFollowingList] = useState<Follow[] | []>([]);

  const handleModalClose = () => {
    setIsShowModal(false);
  };

  const getFollowData = async () => {
    if (isFollower) {
      await customAxios.get('/follows').then(resp => {
        setFollowerList(resp.data);
      });
    } else {
      await customAxios.get('/follows').then(resp => {
        setFollowingList(resp.data);
      });
    }
  };

  useEffect(() => {
    getFollowData();

    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  return (
    <>
      <ModalBG className="MODAL" onClick={handleModalClose}></ModalBG>
      <ModalContent>
        <div>
          <h1>{isFollower ? '팔로워' : '팔로잉'}</h1>
          <CloseButton onClick={handleModalClose}>
            <IoMdClose />
          </CloseButton>
        </div>
        {isFollower ? (
          <FollowList>
            {followerList.map(follower => (
              <FollowUser key={follower.memberID}>
                <img
                  src={follower.profile}
                  alt={follower.nickname + 'profile'}
                />
                <span>{follower.nickname}</span>
              </FollowUser>
            ))}
          </FollowList>
        ) : (
          <FollowList>
            {followingList.map(following => (
              <FollowUser key={following.memberID}>
                <img
                  src={following.profile}
                  alt={following.nickname + 'profile'}
                />
                <span>{following.nickname}</span>
              </FollowUser>
            ))}
          </FollowList>
        )}
      </ModalContent>
    </>
  );
};

const ModalBG = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  background-color: black;
  opacity: 0.5;
  z-index: 999;
  top: 0;
  left: 0;
`;

const ModalContent = styled.div`
  width: 500px;
  height: 70vh;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding-top: 30px;
  overflow: hidden;

  > div {
    width: 100%;
    padding: 0 30px;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    > h1 {
      font-size: 1.4rem;
    }
  }

  @media screen and (max-width: 576px) {
    width: 80%;
  }
`;

const FollowList = styled.ul`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  overflow: auto;
  padding: 0 30px;
`;

const FollowUser = styled.li`
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 10px;

  > img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
  }
`;

const CloseButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #fff;
  border: 1px solid #666;
  color: #666;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  :hover,
  :active {
    background-color: #666;
    color: #fff;
  }
`;

export default FollowModal;
