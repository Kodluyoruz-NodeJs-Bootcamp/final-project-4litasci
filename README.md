



frontend----
heroku git:remote -a myimdb-front  
git subtree push --prefix frontend/ heroku main

backend---
heroku git:remote -a myimdb-back  
git subtree push --prefix backend/ heroku main