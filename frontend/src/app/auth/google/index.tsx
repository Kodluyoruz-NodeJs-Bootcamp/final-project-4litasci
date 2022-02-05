import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container } from '@mui/material';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';

export function GoogleAuth(props) {
  const history = useHistory();
  React.useEffect(() => {
    const params = queryString.parse(props.location.search);
    if (params.code) {
      console.log(params.code);
      const authJson = {
        authCode: params.code,
      };
      axios
        .post(`${baseURL}/social/google`, authJson, {
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
          history.push('/login');
        });
    } else {
      history.push('/login');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>Google Auth</title>
        <meta name="description" content="MYimdb Google" />
      </Helmet>
      <Container maxWidth="lg"></Container>
    </>
  );
}
