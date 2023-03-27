import {
  CompanionLoading,
  MemberCompanionsProps,
  MyCompanion,
} from 'interfaces/Profile.interface';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListComponent from './ListComponent';
import customAxios from 'api/customAxios';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userInfo } from 'states/userState';

const MemberCompanoins = ({ member }: MemberCompanionsProps) => {
  const { memberId } = useParams();
  const [subscribers, setSubscribers] = useState<MyCompanion[] | []>([]);
  const [participants, setParticipants] = useState<MyCompanion[] | []>([]);
  const [writers, setWriters] = useState<MyCompanion[] | []>([]);
  const [titleHead, setTitleHead] = useState<string>('');
  const [isLoading, setIsLoading] = useState<CompanionLoading>({
    subs: true,
    part: true,
    writ: true,
  });
  const loginUser = useRecoilValue(userInfo);

  const getData = async (dataType: string) => {
    await customAxios.get(`members/${memberId}/${dataType}`).then(resp => {
      if (dataType === 'subscribers') {
        setSubscribers(resp.data.data);
        setIsLoading(cur => ({
          ...cur,
          subs: false,
        }));
      } else if (dataType === 'participants') {
        setParticipants(resp.data.data);
        setIsLoading(cur => ({
          ...cur,
          part: false,
        }));
      } else {
        setWriters(resp.data.data);
        setIsLoading(cur => ({
          ...cur,
          writ: false,
        }));
      }
    });
  };

  useEffect(() => {
    getData('subscribers');
    getData('participants');
    getData('writers');
    setTitleHead(cur => {
      if (member) {
        return member.memberId === loginUser.memberId
          ? '내가 '
          : `${member.nickname}님이 `;
      }
      return cur;
    });
  }, []);

  return (
    <CompanoinsWrapper>
      <ListComponent
        datas={writers}
        titleHead={titleHead}
        titleBody="작성한 "
        isLoading={isLoading.writ}
      />
      <ListComponent
        datas={participants}
        titleHead={titleHead}
        titleBody="참여한 "
        isLoading={isLoading.part}
      />
      <ListComponent
        datas={subscribers}
        titleHead={titleHead}
        titleBody="신청한 "
        isLoading={isLoading.subs}
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
