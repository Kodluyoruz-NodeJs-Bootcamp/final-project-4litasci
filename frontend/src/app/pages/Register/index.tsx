import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const baseURL = 'https://myimdb-back.herokuapp.com';
export function RegisterPage() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [infoValue, setInfoValue] = useState('');
  useEffect(() => {}, []);

  const handleRegister = () => {
    const userJson = {
      email: email,
      password: password,
      fullName: fullName,
    };
    axios
      .post(`${baseURL}/signup`, userJson, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then(json => {
        console.log(json);
        history.push('/login');
      })
      .catch(err => {
        console.log(err.response.data);
        setInfoValue(err.response.data.message);
      });
  };
  return (
    <>
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register" />
      </Helmet>
      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Box></Box>
          <TextField
            id="fullname"
            label="Full Name"
            variant="outlined"
            onChange={e => setFullName(e.target.value)}
          />
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
          <Button variant="contained" title="Register" onClick={handleRegister}>
            Register
          </Button>
        </Stack>
      </Container>
    </>
  );
}
