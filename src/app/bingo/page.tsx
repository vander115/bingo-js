'use client';

import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BingoContainer, CurrentBall } from './styles';

import { inter } from '../layout';
import { ArrowCounterClockwise } from 'phosphor-react';
import { PATH_TOKEN } from '@/services/sessionService';
import { Header } from '@/containers/Header';
import { useSession } from '@/hooks/session';

export default function Bingo() {
  const { push } = useRouter();

  const {
    token,
    balls,
    currentBall,
    updateBalls,
    updateCurrentBall,
    resetGame,
  } = useSession();

  if (!localStorage.getItem(PATH_TOKEN)) {
    push('/');
  }

  const [maxBalls, setMaxBalls] = useState<number>(75);
  // const [currentBall, setCurrentBall] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emptyBallsIndicator = useMemo(() => {
    return Array.from({ length: maxBalls }, (_, i) => i + 1);
  }, [maxBalls]);

  const sortRandomBall = useCallback(() => {
    return Math.floor(Math.random() * maxBalls + 1);
  }, [maxBalls]);

  const handleSortNewBall = useCallback(async () => {
    setIsLoading(true);
    setTimeout(() => {
      let ball = sortRandomBall();

      while (balls.includes(ball)) {
        ball = sortRandomBall();
      }
      updateBalls(ball);
      updateCurrentBall(ball);
      setIsLoading(false);
    }, 2000);
  }, [sortRandomBall, balls, updateCurrentBall, updateBalls]);

  const isButtonDisabled = useMemo(() => {
    return balls.length === maxBalls || isLoading;
  }, [balls, isLoading, maxBalls]);

  return (
    <>
      <Header />
      <BingoContainer>
        <CurrentBall isEmpty={!balls.length} isLoading={isLoading}>
          <div className="ball-content">
            <span>{currentBall}</span>
          </div>
        </CurrentBall>
        <div className="button-container">
          <button
            className={inter.className}
            onClick={handleSortNewBall}
            disabled={isButtonDisabled}
          >
            Sortear Bola
          </button>
          <button
            className="reset"
            disabled={isButtonDisabled}
            onClick={resetGame}
          >
            <ArrowCounterClockwise weight="bold" />
          </button>
        </div>
        <div className={'balls-already-called'}>
          {emptyBallsIndicator.map((ball) => {
            const wasCalled = balls.includes(ball);
            return (
              <div
                className={
                  (wasCalled ? 'ball called ' : 'ball ') + inter.className
                }
                key={ball}
              >
                {ball}
              </div>
            );
          })}
        </div>
      </BingoContainer>
    </>
  );
}
