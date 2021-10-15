import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const { auth, user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = auth;
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;
  const [query, setQuery] = useState({});

  useEffect(() => {
    Object.keys(userData).length &&
      setQuery({
        email: userData.email,
        password: 'admin',
      });
  }, [userData]);

  return (
    <div>
      <h1>You're Here!</h1>
      <h2>Choose where to go from here</h2>
      {Object.keys(query).length && (
        <a href={`http://localhost:3001/?${query.email}&${query.password}`}>
          Start a Field Session
        </a>
      )}
    </div>
  );
};

export default Dashboard;
