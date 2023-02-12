import styled from 'styled-components';

interface ICurrentBallProps {
  isEmpty: boolean;
  isLoading: boolean;
}

export const BingoContainer = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 4rem 4rem 4rem;

  .currentBall {
    width: 100%;
    height: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    .ball-content {
      width: 15rem;
      height: 15rem;
      border-radius: 50%;
      background: red;
      display: flex;
      justify-content: center;
      align-items: center;
      background: var(--grayGradientLight);
      box-shadow: var(--boxShadow);
      animation: rotation 1s infinite;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 6rem;
        font-weight: 900;
        background: var(--grayGradientBold);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .button-container {
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 1rem;
    button {
      font-size: 1.2rem;
      font-weight: 700;
      padding: 0 1rem;
      height: 4rem;
      border-radius: 40rem;
      background-color: transparent;
      border: 0;
      color: var(--gray500);
      box-shadow: var(--boxShadow);
      z-index: 3;
      position: relative;
      overflow: hidden;
      transition: all 0.3s ease;
      &::after {
        content: '';
        transition: all 0.2s ease;
        position: absolute;
        top: 0;
        left: 0;
        background: var(--grayGradientBold);
        height: 100%;
        width: 0;
        z-index: -1;
        border-radius: 40rem;
      }
      &:not(:disabled):hover {
        &::after {
          width: 100%;
        }
        color: white;
      }
      :active {
        box-shadow: var(--innerBoxShadow);
      }
      :disabled {
        box-shadow: var(--innerBoxShadow);
        opacity: 0.5;
      }

      &.reset {
        height: 4rem;
        width: 4rem;
        padding: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
      }
    }
  }

  .balls-already-called {
    padding: 0 2rem;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(15, 1fr);
    grid-gap: 1rem;
    margin-top: 2rem;
    .ball {
      transition: all 0.5s ease;
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: var(--smallInnerBoxShadow);
      color: var(--gray500);
      font-weight: 700;
      opacity: 0.5;
      &.called {
        opacity: 1;
        box-shadow: var(--smallBoxShadow);
        background-color: var(--grayGradientLight);
      }
    }
  }
`;

export const CurrentBall = styled.div<ICurrentBallProps>`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  width: 100%;
  height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .ball-content {
    width: 15rem;
    height: 15rem;
    border-radius: 50%;
    background: red;
    display: flex;
    justify-content: center;
    align-items: center;
    background: var(--grayGradientLight);
    box-shadow: ${({ isEmpty }) =>
      isEmpty ? 'var(--innerBoxShadow)' : 'var(--boxShadow)'};
    animation: ${({ isLoading }) =>
      isLoading ? 'rotation 1s infinite' : 'none'};
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 6rem;
      font-weight: 900;
      background: var(--grayGradientBold);
      transition: all 0.5s ease;
      opacity: ${({ isLoading }) => (isLoading ? '0' : '1')};
      transform: rotateY(${({ isLoading }) => (isLoading ? '180deg' : '0deg')});
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`;
