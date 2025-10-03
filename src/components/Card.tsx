import React from 'react'
import '../assets/styles/components/Card.scss';

interface CardProps {
  title: string;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, color }) => {
  return (
    <article className="card" style={{ backgroundColor: color }}>
      <h2 className="card__title">{title}</h2>
      <div className="card__content">
        {/* conteudo do card */}
      </div>
    </article>
  )
}

export default Card
