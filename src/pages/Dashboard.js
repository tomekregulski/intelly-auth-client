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
  color: 'rgba(0, 180, 249, 0.872)',
  borderColor: 'rgba(0, 180, 249, 0.872)',
  width: ['280px'].join(','),
  '&:hover': {
    backgroundColor: 'rgba(0, 180, 249, 0.872)',
    borderColor: 'rgba(0, 180, 249, 0.872)',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: 'rgba(0, 180, 249, 0.872)',
    borderColor: 'rgba(0, 180, 249, 0.872)',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0, 180, 249, 0.872)',
  },
  '&visited': {
    textDecoration: 'none',
    color: 'rgba(0, 180, 249, 0.872)',
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
        token: userData.token,
      });
      const services = userData.access.split(',');
      setAccess(services);
    }
  }, [userData]);

  return (
    <div style={{ marginTop: '85px' }}>
      {userData.first_name ? (
        <p style={{ fontWeight: '400', fontSize: '28px', textAlign: 'center' }}>
          Welcome, {userData.first_name}!
        </p>
      ) : null}
      <p style={{ fontWeight: '400', fontSize: '18px', textAlign: 'center' }}>
        Choose where to go from here
      </p>
      {query.token && access.length ? (
        <Grid style={{ marginTop: '60px' }}>
          {access.includes('retail-data') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://happy-saha-7828d3.netlify.app/?${query.token}`}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 180, 249, 0.872)',
                }}
              >
                Retail Data
              </a>
            </ButtonMain>
          )}
          {access.includes('pdf') && userData.first_name === 'Tomek' && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://priceless-mclean-105c0c.netlify.app/?${query.token}`}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 180, 249, 0.872)',
                }}
              >
                Database Uploads
              </a>
            </ButtonMain>
          )}
          {access.includes('reports') && (
            <ButtonMain variant='outlined' fullWidth>
              <a
                href={`https://quirky-leavitt-055b45.netlify.app/?${query.token}`}
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 180, 249, 0.872)',
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
                style={{
                  textDecoration: 'none',
                  color: 'rgba(0, 180, 249, 0.872)',
                }}
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
