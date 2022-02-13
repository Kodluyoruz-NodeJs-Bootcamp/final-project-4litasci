import * as queryString from 'query-string';
import config from 'config';

const stringifiedParams = queryString.stringify({
  client_id: config.get('googleClientID'),
  redirect_uri: 'https://myimdb-front.herokuapp.com/authenticate/google/',
  scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'].join(' '),
  response_type: 'code',
  access_type: 'offline',
  prompt: 'consent',
});

export const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
