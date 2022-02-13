import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import Navbar from '../../components/Navbar';
const baseURL = 'https://myimdb-back.herokuapp.com';
export function HomePage() {
  const [movieList, setMovies] = React.useState([]);
  const [actorList, setActors] = React.useState([]);
  React.useEffect(() => {
    getMovies();
    getActors();
  }, []);
  const getMovies = () => {
    axios.get(`${baseURL}/movies`).then(response => {
      console.log(response.data.data);
      setMovies(response.data.data);
    });
  };

  const getActors = () => {
    axios.get(`${baseURL}/actors`).then(response => {
      console.log(response.data.data);
      setActors(response.data.data);
    });
  };
  return (
    <>
      <Helmet>
        <title>MyHome</title>
        <meta name="description" content="MYimdb Home" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <Typography variant="h4" component="div" gutterBottom>
          Public Movies
        </Typography>
        <CustomPaginationActionsTable
          dataList={movieList.length > 0 ? movieList : []}
          isMyLinked={false}
          isMovieList={true}
        />
        <Typography variant="h4" component="div" gutterBottom>
          Public Actors
        </Typography>
        <CustomPaginationActionsTable
          dataList={actorList.length > 0 ? actorList : []}
          isMyLinked={false}
          isMovieList={false}
        />
      </Container>
    </>
  );
}
