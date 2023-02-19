import logo from '../images/logo.svg';
import { Link, useNavigate} from "react-router-dom";
function Header({loggedIn, signOutClick, signOutText, email, navTo, navtext}) {
    return (
<header className="header">
  <img src={logo} alt="лого" className="header__logo" />
      {
        loggedIn?(<>
          <div className ="header__userinfo">
            <p className ="header__usermail">{email}</p>
            <button type ="button" className = "header__button" onClick ={signOutClick}>{signOutText}</button>
          </div>
        </>):(
          <Link to ={navTo} className ="header__link">
            {navtext}
          </Link>
        )

      }
</header>
  );
}

export default Header;