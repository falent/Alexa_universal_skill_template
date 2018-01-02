# quickly deploy to heroku
https://signup.heroku.com/dc
(wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh)
heroku login
heroku apps:create --region eu
heroku config:set NPM_CONFIG_PRODUCTION=false
git add .
git commit -m "my first commit"
git push heroku master
heroku ps:scale web=1
heroku logs --tail
