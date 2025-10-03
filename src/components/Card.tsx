import React, { type ReactNode } from 'react'
import '../assets/styles/components/Card.scss';

interface CardProps {
  title: string;
  color: string;
  children?: ReactNode;
}

const Card: React.FC<CardProps> = ({ title, color, children }) => {
  return (
    <article className="card" style={{ backgroundColor: color }}>
      <h2 className="card__title">{title}</h2>
      <div className="card__content">
        {children}
      </div>
    </article>
  )
}

export default Card
