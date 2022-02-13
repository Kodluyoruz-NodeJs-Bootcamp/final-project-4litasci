import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const baseURL = 'https://myimdb-back.herokuapp.com';
export function AddMovie() {
  const history = useHistory();
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieThumbnail, setMovieThumbnail] = useState(
    'https://images-na.ssl-images-amazon.com/images/S/pv-target-images/9964546b0ba1f6e14a6045e34b341f8ca2a3569752c5afed95b89682fcde1a68._RI_V_TTW_.jpg',
  );
  const [infoValue, setInfoValue] = useState('');
  useEffect(() => {}, []);

  const handleAddMovie = () => {
    const auth = localStorage.getItem('Authorization');
    const movieJson = {
      name: movieName,
      description: movieDescription,
      thumbnail: movieThumbnail,
      isVisible: false,
    };
    axios
      .post(`${baseURL}/movies`, movieJson, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(json => {
        console.log(json);
        history.push('/profile');
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
        <Navbar />
        <Stack spacing={5}>
          <Box></Box>
          <TextField
            id="name"
            label="Movie Name"
            variant="outlined"
            onChange={e => setMovieName(e.target.value)}
          />
          <TextField
            id="description"
            label="Movie Description"
            variant="outlined"
            onChange={e => setMovieDescription(e.target.value)}
          />
          <TextField
            id="thumbnail"
            label="Movie Thumbnail"
            variant="outlined"
            placeholder={movieThumbnail}
            onChange={e => setMovieThumbnail(e.target.value)}
          />
          <Box
            sx={{
              color: 'red',
              textAlign: 'center',
            }}
          >
            {infoValue}
          </Box>

          <Button
            variant="contained"
            title="Add Movie"
            onClick={handleAddMovie}
          >
            Add Movie
          </Button>
        </Stack>
      </Container>
    </>
  );
}
