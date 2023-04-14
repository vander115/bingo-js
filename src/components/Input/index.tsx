import { InputHTMLAttributes } from 'react';
import { InputContainer } from './styles';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ ...rest }) {
  return (
    <InputContainer>
      <input type="text" {...rest} />
    </InputContainer>
  );
}
