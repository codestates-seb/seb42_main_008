import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FaLongArrowAltRight, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { ListItemProps } from 'interfaces/ContentList.interface';
import { getDateString } from 'utils/getDateString';
import { useRecoilValue } from 'recoil';
import { loginState } from 'states/userState';

const ListItems = ({ listData, isLoading }: ListItemProps) => {
  const { continent, countryCode } = useParams();
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState);

  const handleItemClick = (id: number) => {
    if (!isLogin) {
      Swal.fire({
        icon: 'question',
        title: '아직 로그인하지 않으셨나요?',
        text: '동행글을 자세히 보시고싶다면 로그인 해주세요🥲',
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: '로그인 하러가기',
        denyButtonText: `회원가입 하러가기`,
        denyButtonColor: '#FEB35C',
        confirmButtonColor: '#5D62A0',
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.isDenied) {
          navigate('/signup');
        }
      });
      return;
    }
    navigate(`/companions/${id}`);
  };

  const handleAddTextClick = () => {
    if (isLogin) {
      navigate('/add', {
        state: {
          continent,
          countryCode,
        },
      });
    } else {
      Swal.fire({
        icon: 'question',
        title: '아직 로그인하지 않으셨나요?',
        text: '동행글을 작성하고 싶으시다면 로그인 해주세요🥲',
        showDenyButton: true,
        showCloseButton: true,
        confirmButtonText: '로그인 하러가기',
        denyButtonText: `회원가입 하러가기`,
        denyButtonColor: '#FEB35C',
        confirmButtonColor: '#5D62A0',
      }).then(result => {
        if (result.isConfirmed) {
          navigate('/login');
        } else if (result.isDenied) {
          navigate('/signup');
        }
      });
    }
  };

  return (
    <ItemListsContainer>
      {listData.length !== 0
        ? listData.map((item, idx) => (
            <ListItem
              key={idx}
              onClick={() => handleItemClick(item.companionId)}
            >
              <h1 className="item-date">
                {getDateString(item.date).shortDateStr}
              </h1>
              <Address>
                <span className="marker-icon">
                  <FaMapMarkerAlt size={25} />
                </span>
                <p className="item-address">{item.address}</p>
              </Address>
              <h2 className="item-title">{item.title}</h2>
              <TagsList>
                {item.tags.map((tag, idx) => (
                  <Tag key={idx}>{tag}</Tag>
                ))}
              </TagsList>
              <Flag isDone={item.companionStatus}></Flag>
              <FlagText isDone={item.companionStatus}>
                {item.companionStatus ? '완료' : '모집중'}
              </FlagText>
              {item.companionStatus && <DoneItem></DoneItem>}
            </ListItem>
          ))
        : !isLoading && (
            <EmptyList>
              아직 아무도 동행을 찾고있지 않아요 😢
              <div className="content-add-text" onClick={handleAddTextClick}>
                직접 작성해 보세요!
                <span className="icon">
                  <FaLongArrowAltRight />
                </span>
              </div>
            </EmptyList>
          )}
    </ItemListsContainer>
  );
};

const ItemListsContainer = styled.section`
  width: 80%;
  height: fit-content;
  min-height: calc(100% - 40vh);
  padding: 50px 20px;
  padding-top: 70px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  color: #222;
  position: relative;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 922px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    padding-top: 100px;
  }
  @media screen and (max-width: 620px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ListItem = styled.article`
  width: 100%;
  height: 250px;
  padding: 20px 20px;
  background-color: #f2f2f4;
  border-radius: 10px;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
  position: relative;
  transition: 0.3s;
  overflow: hidden;
  cursor: pointer;

  .item-date {
    font-size: 2.3rem;
  }
  .item-title {
    width: 100%;
    font-size: 1.1rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  :hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  }

  @media screen and (max-width: 576px) {
    height: 200px;
  }
`;

export const Address = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  text-align: right;

  .marker-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 7px;
  }
  .item-address {
    font-weight: 600;
    font-size: 0.9rem;
    text-overflow: ellipsis;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  @media screen and (max-width: 576px) {
    .item-address {
      -webkit-line-clamp: 2;
    }
  }
`;

const TagsList = styled.ul`
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 3px;
`;

const Tag = styled.li`
  height: 20px;
  font-size: 0.8rem;
  background-color: #5d62a0;
  border-radius: 10px;
  color: #fff;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Flag = styled.div<{ isDone: boolean }>`
  border-bottom: 45px solid transparent;
  border-top: 45px solid ${props => (props.isDone ? '#D9506A' : '#9BB76A')};
  border-left: 45px solid ${props => (props.isDone ? '#D9506A' : '#9BB76A')};
  border-right: 45px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const FlagText = styled.p<{ isDone: boolean }>`
  position: absolute;
  /* top: 20px; */
  top: ${props => (props.isDone ? '18px' : '19px')};
  left: ${props => (props.isDone ? '16px' : '11px')};
  /* left: 10px; */
  color: #fff;
  font-weight: 800;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  z-index: 3;
`;

const DoneItem = styled.div`
  background-color: black;
  opacity: 0.2;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

const EmptyList = styled.div`
  height: 20vh;
  width: 100%;
  grid-column: 1/5;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 1.2rem;
  * {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .content-add-text {
    color: #5d62a0;
    gap: 3px;
    cursor: pointer;
    :hover {
      .icon {
        position: relative;
        left: 5px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

export default ListItems;
