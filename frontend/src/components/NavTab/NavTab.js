function NavTab() {
  
  return (
    <nav>
        <ul className="navTab">
          <li>
            <a className="navTab__link" href="#section1">О проекте</a>
          </li>
          <li>
            <a className="navTab__link" href="#section2">Технологии</a>
          </li>
          <li>
            <a className="navTab__link" href="#section1">Студент</a>
          </li>
        </ul>
      </nav>
  );
}

export default NavTab;