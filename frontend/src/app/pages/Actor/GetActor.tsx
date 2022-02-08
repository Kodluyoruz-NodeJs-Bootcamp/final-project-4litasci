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
export function GetActor() {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [actorName, setActorName] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const [actorDescription, setActorDescription] = useState('');
  const [actorThumbnail, setActorThumbnail] = useState('');
  const [infoValue, setInfoValue] = useState('');
  const [movieList, setMovies] = React.useState([]);
  useEffect(() => {
    getActor();
  }, []);

  const getActor = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/actors/${id}`, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${auth}`,
        },
      })
      .then(json => {
        console.log(json);
        setActorName(json.data.data.fullName);
        setActorDescription(json.data.data.description);
        setActorThumbnail(json.data.data.thumbnail);
        setCreatorName(json.data.data.creatorName);
      })
      .catch(err => {
        console.log(err.response.data);
        setInfoValue(err.response.data.message);
      });
  };
  const renderActorState =
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
          <b>Name:</b> {actorName}
        </Typography>
        <Typography variant="h5" component="div" gutterBottom>
          <b>Description:</b> {actorDescription}
        </Typography>
        <Card variant="outlined">
          <img
            src={`${actorThumbnail}?w=164&h=164&fit=crop&auto=format`}
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
          dataList={movieList.length > 0 ? movieList : []}
          isMyLinked={true}
          isMovieList={true}
        />
      </>
    );
  return (
    <>
      <Helmet>
        <title>Add Actor</title>
        <meta name="description" content="Add Actor" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <Stack spacing={5}>
          <Box></Box>
          {renderActorState}
        </Stack>
      </Container>
    </>
  );
}
