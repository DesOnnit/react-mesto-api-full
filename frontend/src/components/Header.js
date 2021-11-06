import headerLogo from "../images/logo.svg";
import LogInfo from './LogInfo'
import { Link, withRouter, useLocation } from 'react-router-dom';
function Header({ loggedIn, email, onSignOut }) {
  const location = useLocation()
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="Место Россия" />
      {loggedIn ?
        <LogInfo
          loggedIn={loggedIn}
          email={email}
          onSignOut={onSignOut}
        /> :
        (<>
          {
            location.pathname === '/sign-in' ?
              <Link className='header__link transition' to='/sign-up'>Регистрация</Link> :
              <Link className='header__link transition' to='/sign-in'>Войти</Link>
          }
        </>)}
    </header>
  );
}

export default withRouter(Header);
