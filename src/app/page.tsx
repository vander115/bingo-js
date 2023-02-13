'use client';

import { PATH_TOKEN } from '@/services/sessionService';
import { Inter } from '@next/font/google';
import { Container } from './styles';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/session';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const { push } = useRouter();

  const { generateNewGame } = useSession();

  if (localStorage.getItem(PATH_TOKEN)) {
    push('/bingo');
  }

  function handleGenerateNewGame() {
    generateNewGame();
    push('/bingo');
  }

  return (
    <Container>
      <div className="logo-container"></div>
      <div className="buttons-container">
        <button className="new-game-button" onClick={handleGenerateNewGame}>
          Novo Jogo
        </button>
      </div>
    </Container>
  );
}
