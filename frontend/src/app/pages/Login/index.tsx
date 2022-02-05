import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const baseURL = 'http://127.0.0.1:3000';
export function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [googleUrl, setGoogleUrl] = useState('');
  useEffect(() => {
    getFacebookUrl();
    getGoogleUrl();
  }, []);

  const getFacebookUrl = () => {
    axios
      .get(`${baseURL}/social/facebook`)
      .then(json => {
        console.log(json.data.data);
        setFacebookUrl(json.data.data);
        //history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        //setInfoValue(err.response.data.message);
      });
  };

  const getGoogleUrl = () => {
    axios
      .get(`${baseURL}/social/google`)
      .then(json => {
        console.log(json.data.data);
        setGoogleUrl(json.data.data);
        //history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        //setInfoValue(err.response.data.message);
      });
  };

  const handleLogin = () => {
    const userJson = {
      email: email,
      password: password,
    };
    axios
      .post(`${baseURL}/login`, userJson, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(json => {
        console.log(json);
        localStorage.setItem('Authorization', json.data.data.token);
        history.push('/');
      })
      .catch(err => {
        console.log(err.response.data);
        setInfoValue(err.response.data.message);
      });
  };
  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login" />
      </Helmet>
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Box></Box>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            onChange={e => setPassword(e.target.value)}
          />
          <Box
            sx={{
              color: 'red',
              textAlign: 'center',
            }}
          >
            {infoValue}
          </Box>

          <Button variant="contained" title="Login" onClick={handleLogin}>
            Login
          </Button>
          <Button
            variant="contained"
            title="Login with Facebook"
            onClick={() => (window.location.href = facebookUrl)}
          >
            Login with Facebook
          </Button>
          <Button
            variant="contained"
            title="Login with Google"
            onClick={() => (window.location.href = googleUrl)}
          >
            Login with Google
          </Button>
        </Stack>
      </Container>
    </>
  );
}
