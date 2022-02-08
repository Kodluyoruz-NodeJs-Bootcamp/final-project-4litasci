import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Box, Button, Container, Stack, TextField } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
const baseURL = 'http://127.0.0.1:3000';
export function AddActor() {
  const history = useHistory();
  const [actorName, setActorName] = useState('');
  const [actorDescription, setActorDescription] = useState('');
  const [actorThumbnail, setActorThumbnail] = useState(
    'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Leonardo_DiCaprio_2014.jpg/200px-Leonardo_DiCaprio_2014.jpg',
  );
  const [infoValue, setInfoValue] = useState('');
  useEffect(() => {}, []);

  const handleAddActor = () => {
    const auth = localStorage.getItem('Authorization');
    const actorJson = {
      fullName: actorName,
      description: actorDescription,
      thumbnail: actorThumbnail,
      isVisible: false,
    };
    axios
      .post(`${baseURL}/actors`, actorJson, {
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
        <title>Add Actor</title>
        <meta name="description" content="Add Actor" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <Stack spacing={5}>
          <Box></Box>
          <TextField
            id="name"
            label="Actor Name"
            variant="outlined"
            onChange={e => setActorName(e.target.value)}
          />
          <TextField
            id="description"
            label="Actor Description"
            variant="outlined"
            onChange={e => setActorDescription(e.target.value)}
          />
          <TextField
            id="thumbnail"
            label="Actor Thumbnail"
            variant="outlined"
            placeholder={actorThumbnail}
            onChange={e => setActorThumbnail(e.target.value)}
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
            title="Add Actor"
            onClick={handleAddActor}
          >
            Add Actor
          </Button>
        </Stack>
      </Container>
    </>
  );
}
