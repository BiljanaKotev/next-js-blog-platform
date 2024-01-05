import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5005';

const AuthContext = React.createContext({
  isLoggedIn: false,
  isLoading: true,
  user: null,
  storeToken: () => {},
  authenticateUser: () => {},
  logOutUser: () => {},
  fetchUserPosts: () => {},
});

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem('authToken', token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem('authToken');

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, { headers: { Authorization: `Bearer ${storedToken}` } })
        .then((response) => {
          console.log('logout', response);
          const user = response.data;

          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          console.log('logout-error', error);
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    console.log('removetoken');
    localStorage.removeItem('authToken');
  };

  const logOutUser = () => {
    console.log('logout from context');
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  // USED IN DASHBOARD PAGE
  const fetchUserPosts = () => {
    const storedToken = localStorage.getItem('authToken');

    return axios
      .get(`${API_URL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  return <AuthContext.Provider value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOutUser, fetchUserPosts }}>{props.children}</AuthContext.Provider>;
}

export { AuthProviderWrapper, AuthContext };
