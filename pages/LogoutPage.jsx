import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './src/context/auth.context';

function LogoutPage() {
  const { logOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('profilePic');
    logOutUser();
    navigate('/');
  };

  return (
    <div>
      <button className='logout-btn' onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default LogoutPage;
