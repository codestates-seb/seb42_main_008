import {
  MemberCompanionsProps,
  MyCompanion,
} from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import memberData from 'profileTestData.json';

import ListComponent from './ListComponent';

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

export default MemberCompanoins;
