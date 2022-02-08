import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from './pages/HomePage/Loadable';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { useTranslation } from 'react-i18next';
import { RegisterPage } from './pages/Register/Loadable';
import { LoginPage } from './pages/Login/Loadable';
import { ProfilePage } from './pages/Profile/Loadable';
import { FacebookAuth } from './auth/facebook';
import { GoogleAuth } from './auth/google';
import { AddMovie } from './pages/Movie/AddMovie';
import { AddActor } from './pages/Actor/AddActor';
import { GetActor } from './pages/Actor/GetActor';
import { GetMyActor } from './pages/Actor/GetMyActor';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - MYimdb"
        defaultTitle="MYimdb"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="MYimdb" />
      </Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/profile/add/movie" component={AddMovie} />
        <Route exact path="/profile/add/actor" component={AddActor} />
        <Route exact path="/actor/:id" component={GetActor} />
        <Route exact path="/actor/my/:id" component={GetMyActor} />
        <Route exact path="/authenticate/facebook" component={FacebookAuth} />
        <Route exact path="/authenticate/google" component={GoogleAuth} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
