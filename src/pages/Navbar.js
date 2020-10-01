import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
// import { AuthContext } from '../contexts/AuthContext';

const Links = () => {
  // const { auth } = useContext(AuthContext)
  return (
    <ul>
      <li><Link to="/">Home</Link></li>
      {/* {auth.user ? null : <React.Fragment>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
      </React.Fragment>}
      {auth.user ? <React.Fragment>
        <li><Link to="/posts">Posts</Link></li>
        <li><Link to="/signout">Sign Out</Link></li>
      </React.Fragment> : null} */}
    </ul>
  )
}

const Navbar = () => {
  return (
    <div>
      <nav className="purple">
        <div className="container">
          <a href="/" className="brand-logo">Helina Abye</a>
          <a href="." className="sidenav-trigger" data-target="mobile-menu">
            <i className="material-icons">menu</i>
          </a>
          <div className="right hide-on-med-and-down">
            <Links />
          </div>
        </div>
      </nav>
      <div className="sidenav purple lighten-2" id="mobile-menu">
        <Links />
      </div>
    </div>
  )
}

export default Navbar;