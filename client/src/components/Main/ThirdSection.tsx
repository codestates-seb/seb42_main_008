import styled from 'styled-components';
import { SectionWrapper } from './SectionWrapper';

interface ServiceDesc {
  imgURL: string;
  title: string;
  desc: string;
}

const ThirdSection = () => {
  const descriptions: ServiceDesc[] = [
    {
      imgURL: 'https://i.esdrop.com/d/f/XWTMtUmtv1/gpGzHnf0Y7.png',
      title: '동행자 모집 기능',
      desc: 'Lorem Ipsum is simply dummy text ',
    },
    {
      imgURL: 'https://i.esdrop.com/d/f/XWTMtUmtv1/gpGzHnf0Y7.png',
      title: '프로필 페이지',
      desc: 'Lorem Ipsum is simply dummy text of the',
    },
    {
      imgURL: 'https://i.esdrop.com/d/f/XWTMtUmtv1/gpGzHnf0Y7.png',
      title: '메신저 기능',
      desc: 'Lorem Ipsum is simply dummy text of the print',
    },
  ];

  return (
    <ThirdWrapper>
      <DescList>
        {descriptions.map((item, idx) => (
          <DescArticle key={idx}>
            <img src={item.imgURL} alt={item.title} />
            <DescText>
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
            </DescText>
          </DescArticle>
        ))}
      </DescList>
    </ThirdWrapper>
  );
};

const ThirdWrapper = styled(SectionWrapper)`
  background-color: #5d62a0;

  @media screen and (max-width: 1280px) {
    background-color: red;
  }
  @media screen and (max-width: 992px) {
    background-color: orange;
  }
  @media screen and (max-width: 768px) {
    background-color: blue;
  }
  @media screen and (max-width: 576px) {
    background-color: green;
  }
`;

const DescList = styled.ul`
  width: 1280px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  @media screen and (max-width: 1280px) {
    width: 100%;
  }
  @media screen and (max-width: 992px) {
    padding: 70px 0;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    gap: 50px;
  }
`;

const DescArticle = styled.li`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 19%;
  color: #fff;

  > img {
    width: 100%;
    margin-bottom: 10px;
  }

  @media screen and (max-width: 768px) {
    padding: 0 23%;
  }
`;

const DescText = styled.div`
  width: 100%;
  padding: 0 20px;

  > h1 {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 992px) {
    h1 {
      font-size: 1rem;
    }
    p {
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.3rem;
    }
    p {
      font-size: 1rem;
    }
  }
`;
export default ThirdSection;
