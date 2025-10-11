import React from "react";
import "../assets/styles/components/Button.scss";

type ButtonProps = {
  text: string;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  variant?: "primary" | "secondary" | "icon";
};

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick,
  type = "button",
  ariaLabel,
  variant = "primary",
}) => {
  if (link) {
    return (
      <a
        href={link}
        className={`button ${variant}`}
        aria-label={ariaLabel || text}
      >
        {text}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`button ${variant}`}
      aria-label={ariaLabel || text}
    >
      {text}
    </button>
  );
};

export default Button;
