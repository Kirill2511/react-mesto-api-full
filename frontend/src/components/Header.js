import React from 'react';
import { Link, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggingIn, userEmail, onSignOut }) {
  return (
    <header className="header">
      <img alt="Логотип «Mesto Russia»" className="header__logo" src={logo} />
      <div className="header__section">
        {loggingIn && (
          <Route exact path="/">
            <p className="header__email">{userEmail}</p>
            <Link
              to="/signin"
              className="header__button-logout"
              onClick={onSignOut}
            >
              Выйти
            </Link>
          </Route>
        )}
        <Route path="/signin">
          <Link to="/signup" className="header__link">
            Регистрация
          </Link>
        </Route>
        <Route path="/signup">
          <Link to="/signin" className="header__link">
            Вход
          </Link>
        </Route>
      </div>
    </header>
  );
}

export default Header;
