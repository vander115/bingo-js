'use client';
import { HeaderContainer } from './styles';
import bingoJsLogo from '../../assets/bingo-js-logo-gray.svg';
import Image from 'next/image';

export function Header() {
  console.log(bingoJsLogo);
  return (
    <HeaderContainer>
      <Image src={bingoJsLogo} alt="Logo do BingoJS" />
    </HeaderContainer>
  );
}
