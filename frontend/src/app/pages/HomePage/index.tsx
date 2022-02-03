import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import CustomPaginationActionsTable from '../../components/MovieList';
import { Container } from '@mui/material';
const baseURL = "https://jsonplaceholder.typicode.com/posts";
export function HomePage() {
  const [movieList, setMovies] = React.useState(null);
  React.useEffect(() => {
    console.log('opened');
  });
  return (
    <>
      <Helmet>
        <title>MyHome</title>
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>
      <Container maxWidth="lg">
        <CustomPaginationActionsTable movieList={[]} />
      </Container>
    </>
  );
}
