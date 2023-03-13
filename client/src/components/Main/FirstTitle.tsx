import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FirstTitle = () => {
  const [innerWidth, setInnerWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const resizeListener = () => {
      setInnerWidth(window.innerWidth);
    };
    window.addEventListener('resize', resizeListener);
  });

  return (
    <TitleWrapper>
      <svg
        width={innerWidth >= 576 ? 600 : 250}
        height={200}
        viewBox={innerWidth >= 576 ? '0 0 500 200' : '0 0 520 200'}
      >
        <text x="20" y="65%">
          P
        </text>
        <text x="65" y="60%">
          A
        </text>
        <text x="110" y="60%">
          R
        </text>
        <text x="155" y="60%">
          T
        </text>
        <text x="200" y="65%">
          Y
        </text>
        <text x="255" y="70%">
          P
        </text>
        <text x="300" y="66%">
          E
        </text>
        <text x="345" y="66%">
          O
        </text>
        <text x="390" y="70%">
          P
        </text>
        <text x="435" y="66%">
          L
        </text>
        <text x="470" y="62%">
          E
        </text>
      </svg>
    </TitleWrapper>
  );
};

const TitleWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;

  svg text {
    font-family: 'Anton', sans-serif;
    font-size: 6rem;
    stroke-width: 3px;
    stroke: #fff;
    fill: transparent;
    stroke-dashoffset: 750;
    stroke-dasharray: 750;
    animation: stroke 0.5s linear;
    animation-fill-mode: forwards;
  }

  text {
    :nth-child(1) {
      animation-delay: 0s;
    }
    :nth-child(2) {
      animation-delay: 0.5s;
    }
    :nth-child(3) {
      animation-delay: 1s;
    }
    :nth-child(4) {
      animation-delay: 1.5s;
    }
    :nth-child(5) {
      animation-delay: 2s;
    }
    :nth-child(6) {
      animation-delay: 2.5s;
    }
    :nth-child(7) {
      animation-delay: 3s;
    }
    :nth-child(8) {
      animation-delay: 3.5s;
    }
    :nth-child(9) {
      animation-delay: 4s;
    }
    :nth-child(10) {
      animation-delay: 4.5s;
    }
    :nth-child(11) {
      animation-delay: 5s;
    }
  }

  @keyframes stroke {
    0% {
      stroke-dashoffset: 750;
    }
    70% {
      fill: #fff;
    }
    100% {
      stroke-dashoffset: 0;
      fill: #fff;
    }
  }

  @media screen and (max-width: 768px) {
    svg text {
      font-size: 4rem;
    }
  }
  @media screen and (max-width: 576px) {
    svg text {
      font-size: 4rem;
    }
  }
`;

export default FirstTitle;
