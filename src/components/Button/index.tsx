import React from 'react';

interface ButtonProps {
  title: string;
  onClick: () => void;
}

const Button = ({ title, onClick }: ButtonProps) => (
  <button onClick={onClick}>{title}</button>
)

export default Button;
