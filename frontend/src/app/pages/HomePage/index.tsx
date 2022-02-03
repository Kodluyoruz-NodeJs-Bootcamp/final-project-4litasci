import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Container } from '@mui/material';
import axios from 'axios';
const baseURL = 'http://127.0.0.1:3000';
export function HomePage() {
  const [movieList, setMovies] = React.useState([]);
  React.useEffect(() => {
    console.log('opened');
    axios.get(`${baseURL}/movies`).then(response => {
      console.log(response.data.data);
      setMovies(response.data.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>MyHome</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="lg">
        <CustomPaginationActionsTable
          movieList={movieList.length > 0 ? movieList : []}
        />
      </Container>
    </>
  );
}
