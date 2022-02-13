# MYimdb API with Ali Tasci

# Api Documentation

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
