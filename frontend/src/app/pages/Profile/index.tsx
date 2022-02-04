import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Container } from '@mui/material';
import axios from 'axios';
import Navbar from "../../components/Navbar";
const baseURL = 'http://127.0.0.1:3000';
export function ProfilePage() {
  const [movieList, setMovies] = React.useState([]);
  React.useEffect(() => {
    axios.get(`${baseURL}/movies`).then(response => {
      console.log(response.data.data);
      setMovies(response.data.data);
    });
  }, []);
  return (
    <>
      <Helmet>
        <title>MyHome</title>
        <meta name="description" content="Profile" />
      </Helmet>
      <Container maxWidth="lg">
        <Navbar />
        <CustomPaginationActionsTable
          movieList={movieList.length > 0 ? movieList : []}
        />
      </Container>
    </>
  );
}
