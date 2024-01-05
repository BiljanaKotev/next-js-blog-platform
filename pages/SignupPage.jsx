import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignupPage.module.css';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5005';

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMsg(errorDescription);
      });
  };

  const handleName = (e) => setName(e.target.value);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  return (
    <main>
      <form className='auth-form' onSubmit={handleSignupSubmit}>
        <h1>Signup</h1>
        <div className='name-container'>
          <label htmlFor='name'>Name</label>
          <input type='text' name='name' id='name' value={name} onChange={handleName} />
        </div>
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
          <p className='signup-error-msg'>{errorMsg}</p>
        </div>
      )}
      <p>Already have an account?</p>
      <Link className='homepage-login-link' to={'/login'}>
        Login
      </Link>
    </main>
  );
}

export default SignupPage;
