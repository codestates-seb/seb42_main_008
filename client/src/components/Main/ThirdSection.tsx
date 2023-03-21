import { useScroll } from 'hooks/useScroll';
import styled from 'styled-components';
import { SectionWrapper } from './SectionWrapper';

interface ServiceDesc {
  imgURL: string;
  title: string;
  desc: string;
}

interface Article {
  len: number;
}

const ThirdSection = () => {
  const scrollY = useScroll();
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
          <DescArticle
            key={idx}
            len={idx + 1}
            className={scrollY >= 920 ? 'show' : 'notShow'}
          >
            <img src={item.imgURL} alt={item.title} />
            <DescText>
              <h1 className="third-title">{item.title}</h1>
              <p className="third-desc">{item.desc}</p>
            </DescText>
          </DescArticle>
        ))}
      </DescList>
    </ThirdWrapper>
  );
};

const ThirdWrapper = styled(SectionWrapper)`
  background-color: #5d62a0;

  .show {
    opacity: 1;
    transform: translateY(0);
    .third-title {
      animation: showup 0.5s linear;
    }
    .third-desc {
      animation: showup 0.5s linear;
      animation-delay: 0.1s;
    }
  }
  .notShow {
    opacity: 0;
    transform: translateY(60px);
  }

  @keyframes showup {
    from {
      opacity: 0;
      transform: translateY(60px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
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

const DescArticle = styled.li<Article>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 19%;
  color: #fff;
  transition: 0.7s;

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

  .third-title {
    font-size: 1.3rem;
    margin-bottom: 5px;
  }

  @media screen and (max-width: 992px) {
    .third-title {
      font-size: 1rem;
    }
    .third-desc {
      font-size: 0.9rem;
    }
  }
  @media screen and (max-width: 768px) {
    .third-title {
      font-size: 1.3rem;
    }
    .third-desc {
      font-size: 1rem;
    }
  }
`;

export default ThirdSection;
