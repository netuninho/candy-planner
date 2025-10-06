import '../assets/styles/components/Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className='header__logo'>
        <img src='/planner.svg' width={30} alt='Logo Candy Planner' />
        <span>Candy Planner</span>
      </div>
      <nav className='header__nav'>
        <ul className='header__list'>
          <li className='header__list--item'>
            <a className='header__link --underline' id='home-link' href='/'>Home</a>
          </li>
          <li className='header__list--item'>
            <a className='header__link --underline' href='/planner' target='_blank'>Planner</a>
          </li>
          <li className='header__list--item'>
            <a className='header__link --underline' href='/habitos' target='_blank'>Hábitos</a>
          </li>
          <li className='header__list--item'>
            <a className='header__link --underline' href='/sobre' target='_blank'>Sobre</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header
