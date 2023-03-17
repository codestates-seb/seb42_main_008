import styled from 'styled-components';

const Loader = () => {
  return (
    // <LoaderStyle>
    //   <div className="lds-facebook">
    //     <div></div>
    //     <div></div>
    //     <div></div>
    //   </div>
    // </LoaderStyle>
    <StyledLoader>
      <div className="loading">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </StyledLoader>
  );
};

// const LoaderStyle = styled.div`
//   .lds-facebook {
//     display: inline-block;
//     position: relative;
//     width: 80px;
//     height: 80px;
//   }
//   .lds-facebook div {
//     display: inline-block;
//     position: absolute;
//     left: 8px;
//     width: 16px;
//     background: #5d62a0;
//     animation: lds-facebook 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
//   }
//   .lds-facebook div:nth-child(1) {
//     left: 8px;
//     animation-delay: -0.24s;
//   }
//   .lds-facebook div:nth-child(2) {
//     left: 32px;
//     animation-delay: -0.12s;
//   }
//   .lds-facebook div:nth-child(3) {
//     left: 56px;
//     animation-delay: 0;
//   }
//   @keyframes lds-facebook {
//     0% {
//       top: 8px;
//       height: 64px;
//     }
//     50%,
//     100% {
//       top: 24px;
//       height: 32px;
//     }
//   }
// `;

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
  margin-bottom: 50px;

  .loading {
    display: flex;
    gap: 12px;
  }

  .loading div {
    width: 35px;
    height: 35px;
    background: #feb35c;
    border-radius: 50%;
    box-shadow: 0 -0.4rem #5d61a044 inset;

    animation: cycle 1s ease-in-out infinite;
  }

  .loading div:nth-child(1) {
    animation-delay: 0;
  }

  .loading div:nth-child(2) {
    animation-delay: 0.2s;
  }

  .loading div:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes cycle {
    0% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(1rem);
    }

    100% {
      transform: translateY(0);
    }
  }
`;

export default Loader;
