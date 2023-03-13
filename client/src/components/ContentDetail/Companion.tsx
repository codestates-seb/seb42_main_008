import { useState } from 'react';
import styled from 'styled-components';

const Companion = () => {
  interface contentsTab {
    name: string;
    content: string[];
  }
  [];

  const [currentTab, setCurrentTab] = useState(0);

  const companionTabs: contentsTab[] = [
    { name: '신청자', content: ['윤두준', '양요섭'] },
    { name: '참여자', content: ['이기광', '손동운'] },
  ];

  const handleSelectTab = (index: number) => {
    setCurrentTab(index);
  };

  return (
    <Container>
      <TabBox>
        {companionTabs.map((el: contentsTab, index: number) => (
          <li
            key={index}
            className={`${currentTab === index ? `menu focused` : `menu`}`}
            onClick={() => handleSelectTab(index)}
          >
            {el.name}
          </li>
        ))}
      </TabBox>
      <Content>
        {companionTabs[currentTab].content.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </Content>
    </Container>
  );
};

export default Companion;

const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 10px;
`;

const TabBox = styled.ul`
  background-color: #dcdcdc;
  color: rgba(73, 73, 73, 0.5);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-items: center;
  align-items: center;
  list-style: none;
  margin-bottom: 5px;
  cursor: pointer;
  .menu {
    padding: 20px;
  }
  .focused {
    background-color: #d9506a;
    color: white;
  }
`;

const Content = styled.div`
  text-align: left;
  list-style: none;
`;

/* TODO:
1. 탭 만들기 *
2. 신청자 또는 참여자 탭별로 데이터 불러오기 * 
3. 작성자인지 아닌지 판단하여 버튼 다르게 띄우기
*/
