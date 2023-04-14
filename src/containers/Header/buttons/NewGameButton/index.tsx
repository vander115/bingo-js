import { ButtonHTMLAttributes } from 'react';
import { Button } from './styles';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

export function NewGameButton({ ...rest }: IButtonProps) {
  return <Button {...rest}>Novo Jogo</Button>;
}
