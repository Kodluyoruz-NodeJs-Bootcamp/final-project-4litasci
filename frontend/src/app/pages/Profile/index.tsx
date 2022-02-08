import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import MovieListContainer from '../../components/MovieList';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import { useHistory } from 'react-router-dom';
const baseURL = 'http://127.0.0.1:3000';
export function ProfilePage() {
  const history = useHistory();
  const [movieList, setMovies] = React.useState([]);
  const [actorList, setActors] = React.useState([]);

  React.useEffect(() => {
    checkAuthIsValid();
    getUserMovies();
    getUserActors();
  }, []);

  const checkAuthIsValid = () => {
    let authToken = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/uservalid`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
        localStorage.removeItem('Authorization');
        history.push('/login');
      });
  };

  const getUserMovies = () => {
    const authToken = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/movies/my`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        console.log(response.data.data);
        setMovies(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const getUserActors = () => {
    const authToken = localStorage.getItem('Authorization');
    axios
      .get(`${baseURL}/actors/my`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then(response => {
        console.log(response.data.data);
        setActors(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Helmet>
        <title>MyHome</title>
        <meta name="description" content="Profile" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <Typography variant="h3" component="div" gutterBottom>
          My Movies
        </Typography>
        <MovieListContainer
          dataList={movieList.length > 0 ? movieList : []}
          isMyLinked={true}
          isMovieList={true}
        />
        <Typography variant="h3" component="div" gutterBottom>
          My Actors
        </Typography>
        <MovieListContainer
          dataList={actorList.length > 0 ? actorList : []}
          isMyLinked={true}
          isMovieList={false}
        />
      </Container>
    </>
  );
}
