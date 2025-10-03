import React from 'react'
import '../assets/styles/components/Button.scss'

type ButtonProps = {
  text: string;
  link: string;
};

const Button: React.FC<ButtonProps> = ({ text, link }) => {
  return (
    <a className="button" href={link}>
      {text}
    </a>
  );
};

export default Button;
