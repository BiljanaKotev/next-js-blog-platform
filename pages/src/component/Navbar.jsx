import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import logo from '../assets/images/travel-hub-logo-2.png';
import '../component/Navbar.module.css';
import LogoutPage from '../../../styles/LoginPage.module.css';

function Navbar({ color, navLinkColor }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const { isLoggedIn } = useContext(AuthContext);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <div>
      <nav style={{ background: color }} className='nav blog-nav'>
        <div className='logo-wrapper'>
          <div className='logo-container'>
            {isLoggedIn ? (
              <NavLink to='/dashboard'>
                <img className='logo' src={logo} alt='logo' />
              </NavLink>
            ) : (
              <NavLink to='/'>
                <img className='logo' src={logo} alt='logo' />
              </NavLink>
            )}
          </div>
        </div>

        <div className='navbar-wrapper'>
          <div onClick={handleShowNavbar}>
            <i className='fa-solid fa-bars'></i>
          </div>
          <div className='mobile-close-menu'>
            <i class='fa-solid fa-xmark'></i>
          </div>
          {showNavbar && (
            <div className='nav-links-container'>
              {!isLoggedIn ? (
                <>
                  <NavLink style={{ color: navLinkColor }} className='nav-link login-link' to='/login'>
                    Login
                  </NavLink>
                  <NavLink style={{ color: navLinkColor }} className='nav-link signup-link' to='/signup'>
                    Signup
                  </NavLink>
                </>
              ) : (
                <div className='dashboard-links-container'>
                  <NavLink to='/blog-feed' className='blogfeed-link create-post-link'>
                    Blog Feed
                  </NavLink>
                  <NavLink to='/create-post' className='create-post-link'>
                    + Create Post
                  </NavLink>
                  <NavLink to='/dashboard' className='dashboard-btn-link'>
                    Dashboard
                  </NavLink>
                  <LogoutPage />
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
