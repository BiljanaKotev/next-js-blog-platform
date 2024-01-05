import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../pages/src/context/auth.context';
import '../styles/LoginPage.module.css';
import ClipLoader from 'react-spinners/ClipLoader';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5005';

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };
    setLoading(true);

    axios
      .post(`${API_URL}/auth/login`, requestBody, {
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      .then((response) => {
        setLoading(false);
        storeToken(response.data.authToken);
        if (response.data.profilePicUrl) {
          localStorage.setItem('profilePic', response.data.profilePicUrl);
        }
        authenticateUser();
        navigate('/dashboard');
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        setErrorMsg(errorDescription);
        setLoading(false);
      });
  };

  return (
    <main>
      {loading ? (
        <ClipLoader color='#0d86d3' loading={loading} size={50} aria-label='Loading Spinner' />
      ) : (
        <>
          <form className='auth-form' onSubmit={handleLoginSubmit}>
            <h1>Login</h1>

            <div className='email-container'>
              <label htmlFor='email'>Email</label>
              <input type='text' name='email' id='email' placeholder='ironhacker@gmail.com' value={email} onChange={handleEmail} />
            </div>

            <div className='password-container'>
              <label htmlFor='password'>Password</label>
              <input type='password' name='password' id='password' placeholder='******' value={password} onChange={handlePassword} autoComplete='currrent-password' />
            </div>
            <button type='submit'>Submit</button>
          </form>

          {errorMsg && (
            <div>
              <p className='login-error-msg'>{errorMsg}</p>
            </div>
          )}
          <p>Don't have an account yet?</p>
          <Link className='homepage-signup-link' to={'/signup'}>
            Signup
          </Link>
        </>
      )}
    </main>
  );
}

export default LoginPage;
