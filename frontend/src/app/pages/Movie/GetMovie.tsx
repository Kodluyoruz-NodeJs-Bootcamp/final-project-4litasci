import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import DataListContainer from '../../components/MovieList';
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
const baseURL = 'http://127.0.0.1:3000';
interface RouteParams {
  id: string;
}
export function GetMovie() {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [movieName, setMovieName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [movieDescription, setMovieDescription] = useState('');
  const [movieThumbnail, setMovieThumbnail] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [actorList, setActorList] = React.useState([]);
  useEffect(() => {
    getMovie();
  }, []);

  const getMovie = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/movies/${id}`, {
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
        setCreatorName(json.data.data.creatorName);
        setActorList(json.data.data.actors);
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
        <Typography variant="h4" component="div" gutterBottom>
          <b>Name:</b> {movieName}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          <b>Description:</b> {movieDescription}
        </Typography>
        <Card variant="outlined">
          <img
            src={`${movieThumbnail}?w=164&h=164&fit=crop&auto=format`}
            width={200}
            height={200}
            loading="lazy"
          />
        </Card>{' '}
        <Typography variant="h5" component="div" gutterBottom>
          <b>Creator:</b> {creatorName}
        </Typography>
        <Typography variant="h3" component="div" gutterBottom>
          Actor Movies
        </Typography>
        <DataListContainer
          dataList={actorList.length > 0 ? actorList : []}
          isMyLinked={false}
          isMovieList={false}
        />
      </>
    );
  return (
    <>
      <Helmet>
        <title>Get Movie</title>
        <meta name="description" content="Get Movie" />
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
