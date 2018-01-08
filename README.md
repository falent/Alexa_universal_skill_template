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

# 3 Node.js and NMP Installation

Install [Node.JS](https://nodejs.org/en/download/) 


# 4 Docker Containers 
Firstly, open a terminal and create a new Docker network:

`$ sudo docker network create myNetwork`

Run a _MongoDB_ Docker container:

`$ sudo docker run --name mongo_database -d --network myNetwork -p 27017:27017 mongo --noauth `

If you get an error because you have already installed MongoDB into your machine please keep in mind that docker MongoDb uses the same port. Please stop your mongoDb process to work with docker:

`$ sudo service mongod stop`


Run a _DynamoDB_ Docker container:

* On Linux:

  `$ sudo docker run -v "$PWD":/dynamodb_local_db --network myNetwork -p 8000:8000 --name dynamo_database cnadiminti/dynamodb-local:latest`

* On Windows:

  `$ docker run -v //c/temp:/dynamodb_local_db --network myNetwork -p 8000:8000 --name dynamo_database cnadiminti/dynamodb-local`

Open a second terminal tab and clone my git repository from Github:

`$ git clone https://github.com/falent/Alexa_universal_skill_template.git  ~/Desktop/Template/Alexa_universal_skill_template `

Go to the cloned git repository:

`$ cd ~/Desktop/Template/Alexa_universal_skill_template`

Install all npm modules:

`$ sudo npm install`

Run an _Alexa_ Docker container:

* On Linux:

  `$ sudo docker run -v ~/Desktop/Template/Alexa_universal_skill_template:/skill -it --network myNetwork --name alexa falent/alexa_http_server`
* On Windows:
  Replace the path with the absolute path to your cloned git repository, e.g. _//c/Users/john/Desktop/Alexa_universal_skill_template_ (:warning: Leading double slashes!!!).

  `$ docker run -v <ABSOLUTE_PATH_TO_CLONED_GIT_REPO>:/skill -it --network myNetwork --name alexa falent/alexa_http_server`
  
(it can happens that you wish to add more modules to your skill. In that case you need to rebuild your docker image. The docker file is available in this directory. I will show you how to do that)

Open a third terminal tab and run the _ngrok_ Docker container:

`$ sudo docker run --rm --network myNetwork -it wernight/ngrok ngrok http alexa:8001 `

Read through the console output of the ngrok Docker container and copy the *https address*. In my case it was `https://bb517728.ngrok.io`.


**Congratulations, you're now ready to test your skill using your personal address which should be similar to https://bb517728.ngrok.io**.

:warning: Please keep in mind that all 3 terminal tabs need to stay open all the time!


#Test your docker or VM environment

If you would like to test if your docker containers works fine
please use any api client

I will use a chrome extension postan
https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop

1. open postamn chrome app 

2. Near the top center of the screen is a box with the words "Enter request URL." Paste your ngrok address. In my case it was https://6b926c57.ngrok.io

3. Change the GET dropdown to POST.

4. Below the textbox, click the Headers tab. For the key, use "Content-Type", and for the value, use "application/json."

5. On the Body tab, choose "raw" from the radio buttons, and paste the folowing request. After that click send. You will get a response in your alexa skill container and in postman!


```javascript
{
  "session": {
    "new": true,
    "sessionId": "SessionId.c930f82d-19e2-41d8-b85e-19a82e3134f0",
    "application": {
      "applicationId": "amzn1.ask.skill.98529e64-b18d-4a1a-a1a5-5d0bfe27e861"
    },
    "attributes": {},
    "user": {
      "userId": "amzn1.ask.account.AHMKV5TN7HSUMPZRYVRCDGDFGVL2EHX77BXHTHNPE3GX6YMHYTOG2MBU2AL5XRGNT5R2FU4Z7YTJQEJLER3UOZPZ3HLCGVNIAEUPYOLE5RO6MSDVSF2LKHDKKV36BSD4OJVIMELQ3VJH7MBFSPAK4KBSAFQUAHW2QT2HXABRRXXD7QQSQ24J4FCWOCBP2U5X5J6RNIRTFQA4BTQ"
    }
  },
  "request": {
    "type": "IntentRequest",
    "requestId": "EdwRequestId.f0523c07-6bd3-46a8-ac95-3dbd6d7aaff1",
    "intent": {
      "name": "NameIntent",
      "slots": {
        "first_name": {
          "name": "first_name",
          "value": "ssdf"
        }
      }
    },
    "locale": "en-US",
    "timestamp": "2018-01-08T21:34:28Z"
  },
  "context": {
    "AudioPlayer": {
      "playerActivity": "IDLE"
    },
    "System": {
      "application": {
        "applicationId": "amzn1.ask.skill.98529e64-b18d-4a1a-a1a5-5d0bfe27e861"
      },
      "user": {
        "userId": "amzn1.ask.account.AHMKV5TN7HSUMPZRYVRCDGDFGVL2EHX77BXHTHNPE3GX6YMHYTOG2MBU2AL5XRGNT5R2FU4Z7YTJQEJLER3UOZPZ3HLCGVNIAEUPYOLE5RO6MSDVSF2LKHDKKV36BSD4OJVIMELQ3VJH7MBFSPAK4KBSAFQUAHW2QT2HXABRRXXD7QQSQ24J4FCWOCBP2U5X5J6RNIRTFQA4BTQ"
      },
      "device": {
        "supportedInterfaces": {}
      }
    }
  },
  "version": "1.0"
}
```


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

