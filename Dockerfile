FROM node:slim
 
RUN npm install -g nodemon local-ipv4-address

WORKDIR /skill
COPY package.json .
RUN npm install

WORKDIR /skill/dist/app
 
EXPOSE 27017 8000 8001
 
ENTRYPOINT ["nodemon", "index.js"]
