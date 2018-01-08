**There are two ways to set-up your environment for developing Alexa skills during our Meetup on January 9, 2018**:

![Local Docker installation or virtual box](buttons.png)

This README describes the local installation of Docker (**1**). With docker you'll need some extra time for setting up your environment (detailed tutorial).

If you don't want to install Docker yourself, then skip this tutorial and [follow the instructions of the other tutorial and use the existing VM](https://github.com/falent/Alexa_universal_skill_template_VM). If you use my VM, everything will be preinstalled and you don't have to do any extra work. My VM contains bash scripts so that the Alexa skill template can be updated any time. Though, the download of the VM might take some time (4.5 GB).



# 1 Amazon Developer Account

[Please register at the Amazon Developer Portal ](http://developer.amazon.com/)
It's free of charge. If you already have an Amazon account, then you don't have to register. You can use the credentials of your existing account. Without the Amazon Developer Console you won't be able to write an Alexa skill.



# 2 Docker Installation

Install [Docker CE (Community Edition)](https://docs.docker.com/engine/installation/#desktop) on your machine. To test your Docker installation execute the following command:

`$ sudo docker run hello-world`



# 3 Docker Containers 
Firstly, open a terminal and create a new Docker network:

`$ sudo docker network create myNetwork`

Run a _MongoDB_ Docker container:

`$ sudo docker run --name mongo_database -d --network myNetwork -p 27017:27017 mongo --noauth `

Run a _DynamoDB_ Docker container:

* On Linux:

  `$ sudo docker run -v "$PWD":/dynamodb_local_db --network myNetwork -p 8000:8000 --name dynamo_database cnadiminti/dynamodb-local:latest`

* On Windows:

  `$ docker run -v //c/temp:/dynamodb_local_db --network myNetwork -p 8000:8000 --name dynamo_database cnadiminti/dynamodb-local`

Open a second terminal tab and clone my git repository from Github:

`$ git clone https://github.com/falent/Alexa_universal_skill_template.git  ~/Desktop/Alexa_universal_skill_template `

Go to the cloned git repository:

`$ cd ~/Desktop/Alexa_universal_skill_template`

Install all npm modules:

`$ sudo npm install`

Run an _Alexa_ Docker container:

* On Linux:

  `$ sudo docker run -v ~/Desktop/Alexa_universal_skill_template:/skill -it --network myNetwork --name alexa falent/alexa_http_server`
* On Windows:
  Replace the path with the absolute path to your cloned git repository, e.g. _//c/Users/john/Desktop/Alexa_universal_skill_template_ (:warning: Leading double slashes!!!).

  `$ docker run -v <ABSOLUTE_PATH_TO_CLONED_GIT_REPO>:/skill -it --network myNetwork --name alexa falent/alexa_http_server`

Open a third terminal tab and run the _ngrok_ Docker container:

`$ sudo docker run --rm --network myNetwork -it wernight/ngrok ngrok http alexa:8001 `

Read through the console output of the ngrok Docker container and copy the *https address*. In my case it was `https://bb517728.ngrok.io`.


**Congratulations, you're now ready to test your skill using your personal address which should be similar to https://bb517728.ngrok.io**.

:warning: Please keep in mind that all 3 terminal tabs need to stay open all the time!




# Instructions for a quick deployment to Heroku

* Sign up for [Heroku](https://signup.heroku.com/dc) (it's for free).
* Execute the following shell commands:
  ```bash
  $ (wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh)
  heroku login
  heroku apps:create --region eu
  heroku config:set NPM_CONFIG_PRODUCTION=false
  git add .
  git commit -m "my first commit"
  git push heroku master
  heroku ps:scale web=1
  heroku logs --tail
  ```

