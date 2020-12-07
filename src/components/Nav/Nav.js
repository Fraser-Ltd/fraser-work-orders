import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.css';
import mapStoreToProps from '../../redux/mapStoreToProps';

const Nav = (props) => {
  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (props.store.user.id != null) {
    loginLinkData.path = '/workorders';
    loginLinkData.text = 'Work Orders';
  }

  return (
    <div className="nav">
      <div className="column left">
        <Link to="/home">
          <img src="/Images/fraserLogo.jpg" alt="Fraser logo"></img>
        </Link>
      </div>

      <div className="column right">
        <Link className="nav-link" to={loginLinkData.path}>{loginLinkData.text}</Link>
          {/* Show this link if they are logged in or not,
          but call this link 'Home' if they are logged in,
          and call this link 'Login / Register' if they are not */}
          
        {/* Show the link to the info page and the logout button if the user is logged in */}
        {props.store.user.id && (
          <>
            {props.store.user.role > 1 && <Link className="nav-link" to="/info">
              Profile
            </Link>}
            {props.store.user.role < 2 && <>
              <Link className="nav-link" to="/admin/users">
                Users
            </Link>
            <Link className="nav-link" to="/admin/property">
                Properties
            </Link>
            <Link className="nav-link" to="/admin/reports">
                Reports
            </Link>
            </>
            }
            <Link className="nav-link" to='/' onClick={() => props.dispatch({ type: 'LOGOUT' })}>Log Out</Link>
          </>
        )}
        {/* Always show this link since the about page is not protected */}
        <Link className="nav-link" to="/help">Help</Link>
      </div>
    </div>
  );
};

export default connect(mapStoreToProps)(Nav);
