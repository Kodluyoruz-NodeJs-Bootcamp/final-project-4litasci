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
     authCode: "Auth Code From Google Login"
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
    //Returns user actor auth Required
this.router.get(`/actors/my`, authMiddleware, this.actorsController.getMyActors);
    //Returns users all actors auth Required
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
    //Adds movie to Actor
this.router.put(
    `/actors/movie/remove/123`,
    authMiddleware,
    validationMiddleware(AddMovieActorDto, 'body', true),
    this.actorsController.removeMovieFromActor,
);
    //Deletes movie from Actor
this.router.delete(`/actors/123`, authMiddleware, this.actorsController.deleteActor);
    //Deletes Actor
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
