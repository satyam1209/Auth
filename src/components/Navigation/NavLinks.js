import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Context/auth-context';

import './NavLinks.css';

const NavLinks = props => {
  const auth=useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          STATUS
        </NavLink>
      </li>
      {!auth.isLoggedIn && (
        <li>
          <NavLink exact to="/login">Login</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink exact to="/signup">Signup</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button exact onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
