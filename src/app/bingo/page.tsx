'use client';

import { useCallback, useMemo, useState } from 'react';
import { BingoContainer, CurrentBall } from './styles';

import { inter } from '../layout';
import { ArrowCounterClockwise } from 'phosphor-react';

export default function Bingo() {
  const [maxBalls, setMaxBalls] = useState<number>(75);
  const [amountOfBalls, setAmountOfBalls] = useState<number[]>([]);
  const [currentBall, setCurrentBall] = useState<number | string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const emptyBallsIndicator = useMemo(() => {
    return Array.from({ length: maxBalls }, (_, i) => i + 1);
  }, [maxBalls]);

  const sortRandomBall = useCallback(() => {
    return Math.floor(Math.random() * maxBalls + 1);
  }, [maxBalls]);

  const handleSortNewBall = useCallback(async () => {
    setCurrentBall('');
    setIsLoading(true);
    setTimeout(() => {
      let ball = sortRandomBall();

      while (amountOfBalls.includes(ball)) {
        ball = sortRandomBall();
      }
      setAmountOfBalls((previousBalls) =>
        [...previousBalls, ball].sort((a, b) => a - b),
      );
      setIsLoading(false);
      setCurrentBall(ball);
    }, 2000);
  }, [sortRandomBall, amountOfBalls]);

  const resetBalls = useCallback(() => {
    setAmountOfBalls([]);
    setCurrentBall('');
  }, []);

  return (
    <BingoContainer>
      <CurrentBall isEmpty={!amountOfBalls.length} isLoading={isLoading}>
        <div className="ball-content">
          <span>{currentBall}</span>
        </div>
      </CurrentBall>
      <div className="button-container">
        <button
          className={inter.className}
          onClick={handleSortNewBall}
          disabled={amountOfBalls.length === maxBalls ? true : false}
        >
          Sortear Bola
        </button>
        <button className="reset" onClick={resetBalls}>
          <ArrowCounterClockwise weight="bold" />
        </button>
      </div>
      <div className={'balls-already-called'}>
        {emptyBallsIndicator.map((ball) => {
          const wasCalled = amountOfBalls.includes(ball);
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
  );
}
