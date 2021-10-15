import React, { useContext, useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import axios from 'axios';

const ProtectedRoute = (props) => {
  const { auth, user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = auth;
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;
  const [isLoading, setIsLoading] = useState(true);
  const [credentials, setCredentials] = useState([]);

  useEffect(() => {
    if (window.location.href.includes('?')) {
      const query = window.location.href.split('?');
      console.log(query[1].split('&'));
      const querySplit = query[1].split('&');
      setCredentials({
        email: querySplit[0],
        password: querySplit[1],
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(credentials).length) {
      console.log('attemping login');
      const payload = {
        email: credentials.email,
        password: credentials.password,
      };
      return axios
        .post(
          'https://intelly-auth-service.herokuapp.com/api/users/login-link',
          // 'http://localhost:5001/api/users/login-link',
          {
            payload,
          }
        )
        .then((response) => {
          if (response.data.token) {
            localStorage.setItem('user', JSON.stringify(response.data));
          }

          setIsAuth(true);
          console.log(response.data);
          setUserData({
            id: response.data.id,
            email: response.data.email,
            password: response.data.password,
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            roles: response.data.roles,
            access: response.data.access,
            brands: response.data.brands,
          });
          setIsLoading(false);
        });
    }
  }, [
    credentials.email,
    credentials.length,
    credentials.password,
    credentials,
    setCredentials,
    setIsAuth,
    setUserData,
  ]);

  if (isLoading === true) {
    return <h1>Loading</h1>;
  }

  if ((isLoading === false && isAuth) === true) {
    return <Route {...props} />;
  } else {
    return <Redirect to={'/login'} />;
  }
};

export default ProtectedRoute;
