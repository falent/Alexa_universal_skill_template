FROM node:slim
 
RUN npm install -g nodemon local-ipv4-address
COPY package.json /skill/package.json

 
WORKDIR /skill/
RUN npm install
WORKDIR /skill/dist/app/
 
EXPOSE 8000
EXPOSE 27017
 
ENTRYPOINT ["nodemon", "index.js"]
