import { useState } from 'react';
import '../assets/styles/components/Header.scss';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className='header'>
      <div className='header__logo'>
        <img src='/planner.svg' width={30} alt='Logo Candy Planner' />
        <span>Candy Planner</span>
      </div>

      <button
        className={`header__toggle ${menuOpen ? 'is-open' : ''}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label='Abrir menu'
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav className={`header__nav ${menuOpen ? 'is-open' : ''}`}>
        <ul className='header__list'>
          <li><a href='/' className='header__link --underline'>Home</a></li>
          <li><a href='/planner' className='header__link --underline'>Planner</a></li>
          <li><a href='/habitos' className='header__link --underline'>Hábitos</a></li>
          <li><a href='/sobre' className='header__link --underline'>Sobre</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
