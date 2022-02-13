import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Box,
  Button,
  Card,
  Container,
  Link,
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
const baseURL = 'https://myimdb-back.herokuapp.com';
export function GetMyActor() {
  const history = useHistory();
  let { id } = useParams<{ id: string }>();
  const [actorName, setActorName] = useState('');
  const [actorDescription, setActorDescription] = useState('');
  const [actorThumbnail, setActorThumbnail] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [infoValue, setInfoValue] = useState('');
  const [movieId, setMovieId] = useState(0);
  useEffect(() => {
    getMyActor();
  }, []);

  const getMyActor = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/actors/my/${id}`, {
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
        setIsVisible(json.data.data.isVisible);
      })
      .catch(err => {
        console.log(err.response.data);
        setInfoValue(err.response.data.message);
      });
  };
  const handleUpdateActor = () => {
    const auth = localStorage.getItem('Authorization');
    const actorJson = {
      fullName: actorName,
      description: actorDescription,
      thumbnail: actorThumbnail,
      isVisible: isVisible,
    };
    axios
      .put(`${baseURL}/actors/${id}`, actorJson, {
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
  const handleAddMovie = () => {
    const auth = localStorage.getItem('Authorization');
    const actorJson = {
      fullName: actorName,
      description: actorDescription,
      thumbnail: actorThumbnail,
      isVisible: isVisible,
      movieId: movieId,
    };
    axios
      .put(`${baseURL}/actors/movie/add/${id}`, actorJson, {
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

  const handleRemoveMovie = () => {
    const auth = localStorage.getItem('Authorization');
    const actorJson = {
      fullName: actorName,
      description: actorDescription,
      thumbnail: actorThumbnail,
      isVisible: isVisible,
      movieId: movieId,
    };
    axios
      .put(`${baseURL}/actors/movie/remove/${id}`, actorJson, {
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
  const handleDeleteActor = () => {
    const auth = localStorage.getItem('Authorization');
    axios
      .delete(`${baseURL}/actors/${id}`, {
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
  const publicUrl = isVisible ? (
    <>
      {' '}
      <Box
        sx={{
          color: 'red',
          textAlign: 'center',
        }}
      >
        <Link href={window.location.origin + '/actor/' + id}>
          {window.location.origin + '/actor/' + id}
        </Link>
      </Box>
    </>
  ) : (
    <Box
      sx={{
        color: 'red',
        textAlign: 'center',
      }}
    >
      To see public link, make actor visible...
    </Box>
  );
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
        <TextField
          id="name"
          label="Actor Name"
          variant="outlined"
          onChange={e => setActorName(e.target.value)}
          value={actorName}
        />
        <TextField
          id="description"
          label="Actor Description"
          variant="outlined"
          onChange={e => setActorDescription(e.target.value)}
          value={actorDescription}
        />
        <TextField
          id="thumbnail"
          label="Actor Thumbnail"
          variant="outlined"
          placeholder={actorThumbnail}
          onChange={e => setActorThumbnail(e.target.value)}
          value={actorThumbnail}
        />
        <Switch
          checked={isVisible}
          onChange={e => setIsVisible(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        {publicUrl}
        <Button
          variant="contained"
          title="Update Actor"
          onClick={handleUpdateActor}
        >
          Update Actor
        </Button>
        <Button
          variant="contained"
          title="Update Actor"
          color="error"
          onClick={handleDeleteActor}
        >
          Delete Actor
        </Button>
        <TextField
          id="description"
          label="Movie Id"
          variant="outlined"
          type="number"
          onChange={e => setMovieId(parseInt(e.target.value))}
          value={movieId}
        />
        <Button
          variant="contained"
          title="Update Actor"
          color="success"
          onClick={handleAddMovie}
        >
          Add Movie
        </Button>
        <Button
          variant="contained"
          title="Update Actor"
          color="error"
          onClick={handleRemoveMovie}
        >
          Remove Movie
        </Button>
      </>
    );
  return (
    <>
      <Helmet>
        <title>Update My Actor</title>
        <meta name="description" content="Update My Actor" />
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
