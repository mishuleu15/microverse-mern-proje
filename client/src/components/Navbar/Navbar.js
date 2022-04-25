import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Typography, Toolbar, Button, Avatar } from '@material-ui/core';
import usestyles from './styles';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { microverse } from '../../images/microverse.png';

const Navbar = () => {
  const classes = usestyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = user?.token;

  const logout = () => {
    dispatch({ type: 'LOGOUT' });

    navigate('/auth');

    setUser(null);
  };

  useEffect(() => {
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location, token]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to='/'
          variant='h2'
          align='center'
        >
          Microverse
        </Typography>
        <img
          className={classes.image}
          src={microverse}
          alt='microverse'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.userLoggedIn.name}
              src={user.userLoggedIn.imageUrl}
            >
              {user.userLoggedIn.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant='h6'>
              {user.userLoggedIn.name}
            </Typography>
            <Button
              variant='contained'
              className={classes.logout}
              color='secondary'
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to='/auth'
            variant='contained'
            color='primary'
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
