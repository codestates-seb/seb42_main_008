import {
  ListComponentProps,
  MemberCompanionsProps,
  MyCompanion,
} from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memberData from 'profileTestData.json';
import Slider from 'react-slick';
import {
  Address,
  FlagText,
  ListItem,
} from 'components/ContinentList/ListItems';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { getDateString } from 'utils/getDateString';
import ImageFilter from 'components/Main/ImageFilter';

const MemberCompanoins = ({ member, user }: MemberCompanionsProps) => {
  const [subscribers, setSubscribers] = useState<MyCompanion[] | []>([]);
  const [participants, setParticipants] = useState<MyCompanion[] | []>([]);
  const [writters, setWritters] = useState<MyCompanion[] | []>([]);
  const [titleHead, setTitleHead] = useState<string>('');

  useEffect(() => {
    setSubscribers(memberData.companions);
    setParticipants(memberData.companions);
    setWritters(memberData.companions);
    setTitleHead(cur => {
      if (member) {
        return member.memberId === user.memberId
          ? '내가 '
          : `${member.nickname}님이 `;
      }
      return cur;
    });
  }, [user]);

  return (
    <CompanoinsWrapper>
      {writters.length !== 0 && (
        <ListComponent
          datas={writters}
          titleHead={titleHead}
          titleBody="작성한 "
        />
      )}
      {participants.length !== 0 && (
        <ListComponent
          datas={participants}
          titleHead={titleHead}
          titleBody="참여한 "
        />
      )}
      {subscribers.length !== 0 && (
        <ListComponent
          datas={subscribers}
          titleHead={titleHead}
          titleBody="신청한 "
        />
      )}
    </CompanoinsWrapper>
  );
};

const ListComponent = ({ datas, titleHead, titleBody }: ListComponentProps) => {
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: false,
    speed: 500,
    draggable: true,
  };

  return (
    <ListWrapper>
      <h1>{titleHead + titleBody}동행</h1>
      <Slider {...settings}>
        {datas.map(item => (
          <MemberListItem key={item.compainonId}>
            {item.companionStatus && <DoneItem></DoneItem>}
            <h1>{getDateString(item.date).shortDateStr}</h1>
            <ItemAddress>
              <span>
                <FaMapMarkerAlt size={25} />
              </span>
              <p>{item.address}</p>
            </ItemAddress>
            <Flag isDone={item.companionStatus}></Flag>
            <ItemFlagText>
              {item.companionStatus ? '모집완료' : '모집중'}
            </ItemFlagText>
          </MemberListItem>
        ))}
      </Slider>
    </ListWrapper>
  );
};

const CompanoinsWrapper = styled.section`
  width: 100%;
  padding: 20px;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

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
`;

const MemberListItem = styled(ListItem)`
  height: 150px;
  padding-left: 0;

  > h1 {
    display: flex;
    justify-content: flex-end;
  }
  :hover {
    transform: translateY(-3px);
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  }
`;

const ItemAddress = styled(Address)`
  font-size: 1rem;
  padding-left: 20px;
`;

const Flag = styled.div<{ isDone: boolean }>`
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

export default MemberCompanoins;
