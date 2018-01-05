It is a second way to set up enviroment to program Alexa skills locally during MeetUp 09.01.2018. If you dont like it [you can always use the first solution ](https://github.com/falent/Alexa_universal_skill_template_VM)               

# 1.

[Please register at amazon developer portal ](http://developer.amazon.com/)
It is free of charge. (if you are already registered amazon user you can use your credentials here). Without developer console you won't be able to write your skill 

# 2 Docker

[Please be sure you installed docker on your linux ](https://docs.docker.com/engine/installation/#cloud)

# 2.2.1 
Firstly open terminal tab and pull mongoDb image

`$ sudo docker pull mongo`

Run docker mongodb container:

`$ sudo docker run --name database -d -p 27017:27017 mongo --noauth --bind_ip=0.0.0.0`

Open a next terminal tab and create a directory, for next steps best would be:

`$ cd`

`$ mkdir ~/Desktop/Template/universal_skill`

Go to the directory

`$ cd ~/Desktop/Template/universal_skill`

Clone my template from my github

`$ git clone https://github.com/falent/Alexa_universal_skill_template.git `

Install npm modules

`$ sudo npm install  `
	
build alexa image

`$ sudo docker build -t alexa .`

create alexa container

`$ sudo docker run -v ~/Desktop/Template/universal_skill:/skill -it --link database:database --name alexa alexa`

copy your container ip address:

In my case 

`$ 172.17.0.3`

open a new terminal tab and run the ngrok container:

`$ sudo docker run --rm -it wernight/ngrok ngrok http [your alexa container ip]:8000 `

in my case it was:

`$ sudo docker run --rm -it wernight/ngrok ngrok http 172.17.0.3:8000`

Please copy the https adresse in my case it was: 

`$ https://bb517728.ngrok.io/api/alexa`

**Congratulations you can start testing your skill**

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

