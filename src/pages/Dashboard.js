import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const ButtonMain = styled(Button)({
  boxShadow: 'none',
  display: 'block',
  margin: '20px auto 20px',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#fff',
  borderColor: '#0063cc',
  width: '280px',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

const Dashboard = () => {
  const { auth, user } = useContext(AuthContext);
  // eslint-disable-next-line no-unused-vars
  const [isAuth, setIsAuth] = auth;
  // eslint-disable-next-line no-unused-vars
  const [userData, setUserData] = user;
  const [query, setQuery] = useState({});
  const [access, setAccess] = useState([]);

  useEffect(() => {
    if (Object.keys(userData).length) {
      setQuery({
        // email: userData.email,
        // password: userData.password,
        token: userData.token,
      });
      const services = userData.access.split(',');
      setAccess(services);
    }
  }, [userData]);

  return (
    <div>
      {userData.first_name ? (
        <h1 style={{ textAlign: 'center' }}>Welcome, {userData.first_name}!</h1>
      ) : null}
      <h2 style={{ textAlign: 'center' }}>Choose where to go from here</h2>
      {query.token && access.length ? (
        <Grid style={{ marginTop: '60px' }}>
          {access.includes('retail-data') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://happy-saha-7828d3.netlify.app/?${query.token}`}
                style={{ textDecoration: 'none' }}
              >
                Retail Data
              </a>
            </ButtonMain>
          )}
          {access.includes('pdf') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://priceless-mclean-105c0c.netlify.app/?${query.token}`}
                style={{ textDecoration: 'none' }}
              >
                Invoices
              </a>
            </ButtonMain>
          )}
          {access.includes('reports') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://quirky-leavitt-055b45.netlify.app/?${query.token}`}
                style={{
                  textDecoration: 'none',
                  '&visited': { color: '#1976d2' },
                }}
              >
                Field Visit
              </a>
            </ButtonMain>
          )}
          {access.includes('events-data') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://focused-tesla-b57f37.netlify.app/?${query.token}`}
                style={{ textDecoration: 'none' }}
              >
                Field Data
              </a>
            </ButtonMain>
          )}
        </Grid>
      ) : null}
    </div>
  );
};

export default Dashboard;
