import * as queryString from 'query-string';
import config from 'config';

const stringifiedParams = queryString.stringify({
  client_id: config.get('facebookAuthID'),
  redirect_uri: 'https://myimdb-front.herokuapp.com/authenticate/facebook/',
  scope: ['email', 'public_profile'].join(','), // comma seperated string
  response_type: 'code',
  auth_type: 'rerequest',
  display: 'popup',
});

export const facebookLoginUrl = `https://www.facebook.com/v4.0/dialog/oauth?${stringifiedParams}`;
