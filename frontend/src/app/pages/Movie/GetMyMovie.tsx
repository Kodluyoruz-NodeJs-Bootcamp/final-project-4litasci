import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DataListContainer from '../../components/MovieList';
const baseURL = 'http://127.0.0.1:3000';
export function GetMyMovie() {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [movieName, setMovieName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieThumbnail, setMovieThumbnail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [infoValue, setInfoValue] = useState('');
  useEffect(() => {
    getMyMovie();
  }, []);

  const getMyMovie = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/movies/my/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(json => {
        console.log(json);
        setMovieName(json.data.data.name);
        setMovieDescription(json.data.data.description);
        setMovieThumbnail(json.data.data.thumbnail);
        setIsVisible(json.data.data.isVisible);
      })
      .catch(err => {
        console.log(err.response.data);
        setInfoValue(err.response.data.message);
      });
  };
  const handleUpdateMovie = () => {
    const auth = localStorage.getItem('Authorization');
    const actorJson = {
      name: movieName,
      description: movieDescription,
      thumbnail: movieThumbnail,
      isVisible: isVisible,
    };
    axios
      .put(`${baseURL}/movies/${id}`, actorJson, {
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

  const handleDeleteMovie = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .delete(`${baseURL}/movies/${id}`, {
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

  const renderMovieState =
    infoValue.length > 0 ? (
      <>
        {' '}
        <Box
          sx={{
            color: 'red',
            textAlign: 'center',
          }}
        >
          {infoValue}
        </Box>
      </>
    ) : (
      <>
        <TextField
          id="name"
          label="Movie Name"
          variant="outlined"
          onChange={e => setMovieName(e.target.value)}
          value={movieName}
        />
        <TextField
          id="description"
          label="Movie Description"
          variant="outlined"
          onChange={e => setMovieDescription(e.target.value)}
          value={movieDescription}
        />
        <TextField
          id="thumbnail"
          label="Movie Thumbnail"
          variant="outlined"
          placeholder={movieThumbnail}
          onChange={e => setMovieThumbnail(e.target.value)}
          value={movieThumbnail}
        />
        <Switch
          checked={isVisible}
          onChange={e => setIsVisible(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Button
          variant="contained"
          title="Update Actor"
          onClick={handleUpdateMovie}
        >
          Update Movie
        </Button>
        <Button
          variant="contained"
          title="Update Movie"
          color="error"
          onClick={handleDeleteMovie}
        >
          Delete Movie
        </Button>
      </>
    );
  return (
    <>
      <Helmet>
        <title>Update My Movie</title>
        <meta name="description" content="Update My Movie" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <Stack spacing={5}>
          <Box></Box>
          {renderMovieState}
        </Stack>
      </Container>
    </>
  );
}
