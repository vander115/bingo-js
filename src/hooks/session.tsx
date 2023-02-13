'use client';

import { v4 } from 'uuid';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { sessionSevices } from '@/services/sessionService';
import { PATH_TOKEN } from '@/services/sessionService';

interface ISessionContext {
  token: string;
  generateNewGame: () => void;
  resetGame: () => void;
  deleteGame: () => void;
  balls: number[];
  currentBall: number | string;
  updateBalls: (newBall: number) => void;
  updateCurrentBall: (newBall: number | string) => void;
}

const TOKEN_KEY = '#BJS';

const SessionContext = createContext<ISessionContext>({} as ISessionContext);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string>('');
  const [balls, setBalls] = useState<number[]>([]);
  const [currentBall, setCurrentBall] = useState<number | string>('');

  const getLocalGame = useCallback(() => {
    const token: string | null = localStorage.getItem(PATH_TOKEN);
    if (token) {
      const localBalls = sessionSevices().list();
      const localCurrentBall = sessionSevices().listCurrent();
      setBalls(localBalls);
      setCurrentBall(localCurrentBall);
      setToken(token);
    }
  }, []);

  const generateNewGame = useCallback(() => {
    const tokenSufix = v4().substring(0, 6).toUpperCase();
    const fullToken = `${TOKEN_KEY + tokenSufix}`;
    sessionSevices().create(fullToken);
    setToken(token);
  }, [token]);

  const updateBalls = useCallback(async (newBall: number) => {
    setBalls((previousBalls) => {
      const newBallsData = [...previousBalls, newBall].sort((a, b) => a - b);
      sessionSevices().update(newBallsData);
      return newBallsData;
    });
  }, []);

  const updateCurrentBall = useCallback((newBall: number | string) => {
    setCurrentBall(newBall);
    sessionSevices().updateCurrent(newBall);
  }, []);

  const resetGame = useCallback(() => {
    setBalls([]);
    setCurrentBall('');
    sessionSevices().update([]);
    sessionSevices().updateCurrent('');
  }, []);

  const deleteGame = useCallback(() => {
    sessionSevices().delete();
  }, []);

  const value = useMemo(
    () => ({
      token,
      balls,
      currentBall,
      updateBalls,
      generateNewGame,
      resetGame,
      deleteGame,
      updateCurrentBall,
    }),
    [
      token,
      balls,
      currentBall,
      updateBalls,
      updateCurrentBall,
      generateNewGame,
      deleteGame,
      resetGame,
    ],
  );

  useEffect(() => {
    getLocalGame();
  }, [getLocalGame]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): ISessionContext {
  const context = useContext(SessionContext);

  if (!context) {
    throw new Error('useSession must be used within an AppProvider');
  }

  return context;
}
