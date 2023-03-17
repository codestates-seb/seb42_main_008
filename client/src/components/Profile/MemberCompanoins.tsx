import {
  MemberCompanionsProps,
  MyCompanion,
} from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListComponent from './ListComponent';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';

const MemberCompanoins = ({ member, user }: MemberCompanionsProps) => {
  const { memberId } = useParams();
  const [subscribers, setSubscribers] = useState<MyCompanion[] | []>([]);
  const [participants, setParticipants] = useState<MyCompanion[] | []>([]);
  const [writers, setWriters] = useState<MyCompanion[] | []>([]);
  const [titleHead, setTitleHead] = useState<string>('');

  const getData = async (dataType: string) => {
    await customAxios.get(`members/${memberId}/${dataType}`).then(resp => {
      if (dataType === 'subscribers') {
        setSubscribers(resp.data.data);
      } else if (dataType === 'participants') {
        setParticipants(resp.data.data);
      } else {
        setWriters(resp.data.data);
      }
    });
  };

  useEffect(() => {
    getData('subscribers');
    getData('participants');
    getData('writers');
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
      <ListComponent
        datas={writers}
        titleHead={titleHead}
        titleBody="작성한 "
      />
      <ListComponent
        datas={participants}
        titleHead={titleHead}
        titleBody="참여한 "
      />
      <ListComponent
        datas={subscribers}
        titleHead={titleHead}
        titleBody="신청한 "
      />
    </CompanoinsWrapper>
  );
};

const CompanoinsWrapper = styled.section`
  width: 100%;
  padding: 20px 0;
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

export default MemberCompanoins;
