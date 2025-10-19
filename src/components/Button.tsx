import React from "react";
import Icon from "./Icon";
import "../assets/styles/components/Button.scss";

type ButtonProps = {
  text?: string;
  link?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
  variant?: "primary" | "secondary" | "icon";
  icon?: "edit" | "save" | "delete";
};

const Button: React.FC<ButtonProps> = ({
  text,
  link,
  onClick,
  type = "button",
  ariaLabel,
  variant = "primary",
  icon,
}) => {
  const content = (
    <>
      {icon && <Icon name={icon} />}
      {text && <span>{text}</span>}
    </>
  );

  if (link) {
    return (
      <a href={link} className={`button ${variant}`} aria-label={ariaLabel || text}>
        {content}
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
      {content}
    </button>
  );
};

export default Button;
