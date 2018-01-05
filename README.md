It is a second way to set up enviroment to program Alexa skills locally during MeetUp 09.01.2018. If you dont like it [you can always use the first solution ](https://github.com/falent/Alexa_universal_skill_template_VM)               

# 1.

[Please register at amazon developer portal ](http://developer.amazon.com/)
It is free of charge. (if you are already registered amazon user you can use your credentials here). Without developer console you won't be able to write your skill 

# 2 Docker

[Please be sure you installed docker on your linux ](https://docs.docker.com/engine/installation/#cloud)

# 2.2.1 
Firstly open terminal and create docker network



`$ sudo docker network create myNetwork`

open terminal tab and pull mongoDb image

`$ sudo docker pull mongo`

Run docker mongodb container:

`$ sudo docker run --name mongo_database -d -p 27017:27017 mongo --noauth --network myNetwork`

open a next terminal tab and pull dynamoDB image

`$ docker pull dwmkerr/dynamodb`

Run docker dynamoDB container:


`$ sudo docker run -v "$PWD":/dynamodb_local_db --network myNetwork -p 8000:8000 --name dynamo_database cnadiminti/dynamodb-local:latest`

Open a next terminal tab and create a directory, for next steps best would be:

`$ cd`

`$ mkdir ~/Desktop/Template/Alexa_universal_skill_template`

Go to the directory

`$ cd ~/Desktop/Template/Alexa_universal_skill_template`

Clone my template from my github

`$ git clone https://github.com/falent/Alexa_universal_skill_template.git `

Install npm modules

`$ sudo npm install  `
	
create alexa container

`$ sudo docker run -v ~/Desktop/Template/Alexa_universal_skill_template:/skill -it --network myNetwork --name alexa philenius/alexa_http_server`

open a new terminal tab and run the ngrok container:

`$ sudo docker run --rm --network myNetwork -it wernight/ngrok ngrok http alexa:8001 `

Please copy the https address from ngrok in my case it was: 

`$ https://bb517728.ngrok.io`


**Congratulations you can start testing your skill using your personal address which should be similar to https://bb517728.ngrok.io/api/alexa**

Please keep in mind all 3 terminal's tabs need to be opened all the time!



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

