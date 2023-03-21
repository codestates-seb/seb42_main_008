import Slider from 'react-slick';
import styled from 'styled-components';
import { Address, FlagText, ListItem } from 'components/ContentList/ListItems';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getDateString } from 'utils/getDateString';
import ImageFilter from 'styles/ImageFilter';
import { ListComponentProps } from 'interfaces/Profile.interface';
import { useNavigate } from 'react-router-dom';

const ListComponent = ({ datas, titleHead, titleBody }: ListComponentProps) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    speed: 500,
    draggable: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleClickItem = (id: number) => {
    navigate(`/companions/${id}`);
  };

  return (
    <ListWrapper>
      <h1>{titleHead + titleBody}동행</h1>
      {datas.length !== 0 ? (
        <Slider {...settings}>
          {datas.map((item, idx) => (
            <MemberListItem
              key={idx}
              onClick={() => handleClickItem(item.companionId)}
            >
              {item.companionStatus && <DoneItem></DoneItem>}
              <h1 className="item-date">
                {getDateString(item.date).shortDateStr}
              </h1>
              <ItemAddress>
                <span className="marker-icon">
                  <FaMapMarkerAlt size={25} />
                </span>
                <p className="item-address">{item.address}</p>
              </ItemAddress>
              <Flag isDone={item.companionStatus}></Flag>
              <ItemFlagText>
                {item.companionStatus ? '모집완료' : '모집중'}
              </ItemFlagText>
            </MemberListItem>
          ))}
        </Slider>
      ) : (
        <EmptyList>{titleBody} 동행이 없습니다.</EmptyList>
      )}
    </ListWrapper>
  );
};

const ListWrapper = styled.section`
  width: 95%;
  display: flex;
  flex-direction: column;

  > h1 {
    font-size: 1.2rem;
  }

  .slick-prev,
  .slick-prev::before,
  .slick-next,
  .slick-next::before {
    color: #5d62a0;
  }
  .slick-disabled,
  .slick-disabled::before {
    opacity: 0;
    cursor: default;
  }

  .slick-slide {
    padding: 12px;
  }

  .slick-track {
    margin-left: 0;
  }
`;

const MemberListItem = styled(ListItem)`
  width: 20px;
  height: 150px;
  padding-left: 0;

  .item-date {
    display: flex;
    justify-content: flex-end;
    font-size: 1.7rem;
  }
  :hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }

  .slick-slide {
    > div {
      background-color: red;
    }
  }

  @media screen and (max-width: 576px) {
    height: 150px;
  }
`;

const ItemAddress = styled(Address)`
  font-size: 1rem;
  padding-left: 20px;
`;

const Flag = styled.div<{ isDone: boolean }>`
  width: 0px;
  height: 0px;
  border-bottom: 35px solid transparent;
  border-top: 35px solid ${props => (props.isDone ? '#D9506A' : '#9BB76A')};
  border-left: 35px solid ${props => (props.isDone ? '#D9506A' : '#9BB76A')};
  border-right: 35px solid transparent;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

const ItemFlagText = styled(FlagText)`
  top: 15px;
  left: 5px;
  font-size: 0.8rem;
`;

const DoneItem = styled(ImageFilter)`
  background-color: black;
  opacity: 0.2;
`;

const EmptyList = styled.div`
  width: 100%;
  height: 50px;
  font-size: 0.9rem;
  color: #666;
  display: flex;
  align-items: center;
`;

export default ListComponent;
