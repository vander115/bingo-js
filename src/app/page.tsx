'use client';

import { PATH_TOKEN } from '@/services/sessionService';
import { Inter } from '@next/font/google';
import { useRouter } from 'next/navigation';
import { useSession } from '@/hooks/session';
import Image from 'next/image';

import BingoJsLogo from '../assets/bingo-js-logo-gray.svg';
import { Container } from './styles';
import { Input } from '@/components/Input';
import { NewGameButton } from '@/containers/Header/buttons/NewGameButton';
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
      <div className="logo-container">
        <figure>
          <Image
            width={500}
            height={100}
            style={{ height: 'auto' }}
            alt={'BingJS logotip'}
            src={BingoJsLogo}
          />
        </figure>
      </div>
      <form>
        <div className="inputs-container">
          <Input />
        </div>
        <div className="buttons-container">
          <NewGameButton onClick={handleGenerateNewGame}>
            Novo Jogo
          </NewGameButton>
        </div>
      </form>
    </Container>
  );
}
