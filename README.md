Hi guys, 


Firstly thank you very much that you decided to register for our event.

I'm sending you what you need to participate in the event. Please prepare everything before you come. If you have any problems please don't hesitate to contact me. I will be 1 hour before our meeting at the office available so I could help you also from here.
Unfortunately we won't waste time for set up environments if you come unprepared :P 

We will play around with Docker or heroku with MongoDB.  Please use Linux!! I'm not familiar with Windows and I hope you are also Linux fan (or you become one;) Of course you can do everything with Windows but my support will be limited.

# 1.

[Please register at amazon developer portal ](http://developer.amazon.com/)
It is free of charge. (if you are already registered amazon user you can use your credentials here). Without developer console you won't be able to write your skill 

# 2.

You have 3 choices to start developing your skills. I'm going to describe all of them. Up to you what  you choose. I will do everything with docker. Please keep in mind that my solution is only for testing/learning how to write skills. At the end of this file you will find a solution how to publish your ready skill :) Yes, you will fully use what you prepared locally!

# 2.1 Virtual Machine

Download and start my VM with Virtualbox. When you start my VM  everything is going to be opened for you. No work from your side!

Link to the VM: **SOON AVAILABLE!**

# 2.2 Docker
(if you don't want to use my VM or you would like to get know docker by doing something)

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

`$ git clone https://github.com/falent/AlexaTemplateHerokuSkill.git `

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

`$ https://b01408f.ngrok.io`

**Congratulations you can start testing your skill**

Please keep in mind all 3 terminal tabs need to be opened!

TO BE CONTINUED 

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

