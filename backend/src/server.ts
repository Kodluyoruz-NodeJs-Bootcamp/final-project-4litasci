import 'dotenv/config';
import '@/index';
import App from '@/app';
import validateEnv from '@utils/validateEnv';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import ActorsRoute from '@routes/actors.route';
import MoviesRoute from '@routes/movies.route';
import SocialRoute from '@routes/social.auth.route';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new ActorsRoute(), new MoviesRoute(), new SocialRoute()]);

app.listen();
