# MYimdb API with Ali Tasci

### Authentication
#### Google
https://myimdb-back.herokuapp.com/social/google
```
GET:
Response:
data: "Google Login Url with callback /social/google";

POST:
Request:
{
     authCode: "Auth Code From Google Login"
}

Response:
Authorization token from Server.
```
#### Facebook
https://myimdb-back.herokuapp.com/social/facebook
```
GET:
Response:
data: "Facebook Login Url with callback /social/facebook";

POST:
Request:
{
     authCode: "Auth Code From Facebook Login"
}

Response:
Authorization token from Server.
```
#### Email
Register: https://myimdb-back.herokuapp.com/signup
```

POST:
Request:
{
  email: email,
  password: password,
  fullName: fullName,
};

Response:
Register Result.
```
Login: https://myimdb-back.herokuapp.com/login
```

POST:
Request:
{
  email: email,
  password: password,
};

Response:
Register Result.
```
# Actors
```js
// 123 = :id(\\d+)
this.router.get(`/actors`, this.actorsController.getActors);
    //Returns all actors isVisible:true
this.router.get(`/actors/123`, this.actorsController.getActorById);
    //Returns actor if isVisible:true
this.router.get(`/actors/my/123`, authMiddleware, this.actorsController.getMyActorById);
    //Returns user's actor auth Required
this.router.get(`/actors/my`, authMiddleware, this.actorsController.getMyActors);
    //Returns user's all actors auth Required
this.router.post(`/actors`, authMiddleware, validationMiddleware(CreateActorDto, 'body'), this.actorsController.createActor);
    //Creates new actor
this.router.put(`/actors/123`, authMiddleware, validationMiddleware(CreateActorDto, 'body', true), this.actorsController.updateActor);
    //Updates actor
this.router.put(
    `/actors/movie/add/123`,
    authMiddleware,
    validationMiddleware(AddMovieActorDto, 'body', true),
    this.actorsController.addMovieToActor,
);
    //Adds movie to actor
this.router.put(
    `/actors/movie/remove/123`,
    authMiddleware,
    validationMiddleware(AddMovieActorDto, 'body', true),
    this.actorsController.removeMovieFromActor,
);
    //Deletes movie from actor
this.router.delete(`/actors/123`, authMiddleware, this.actorsController.deleteActor);
    //Deletes actor
```

# Movies
```js
// 123 = :id(\\d+)
this.router.get(`/movies`, this.moviesController.getMovies);
    //Returns all movies isVisible:true
this.router.get(`/movies/123`, this.moviesController.getMovieById);
    //Returns movie if isVisible:true
this.router.get(`/movies/my/123`, authMiddleware, this.moviesController.getMyMovieById);
    //Returns user's movie auth Required
this.router.get(`/movies/my`, authMiddleware, this.moviesController.getMyMovies);
    //Returns user's all movies auth Required
this.router.post(`/movies`, authMiddleware, validationMiddleware(CreateMovieDto, 'body'), this.moviesController.createMovie);
    //Creates new movie
this.router.post(`/movies/mock`, this.moviesController.createMockMovies);
    //Creates mock movies
this.router.put(`/movies/123`, authMiddleware, validationMiddleware(CreateMovieDto, 'body', true), this.moviesController.updateMovie);
    //Updates movie
this.router.put(
    `/movies/actor/add/123`,
    authMiddleware,
    validationMiddleware(AddActorMovieDto, 'body', true),
    this.moviesController.addActorToMovie,
);
    //Adds actor to movie
this.router.put(
    `/movies/actor/remove/123`,
    authMiddleware,
    validationMiddleware(AddActorMovieDto, 'body', true),
    this.moviesController.removeActorFromMovie,
);
    //Deletes actor from movie
this.router.delete(`/movies/123`, authMiddleware, this.moviesController.deleteMovie);
    //Deletes movie
```
# Deployments
/backend
```
heroku git:remote -a myimdb-back  
git subtree push --prefix backend/ heroku main
```

/frontend
```
heroku git:remote -a myimdb-front  
git subtree push --prefix frontend/ heroku main
```
