FROM node:14.15.1
WORKDIR /my-app
COPY package.json package.json
RUN apt-get update
RUN npm install
# Bundle app source
COPY . .
EXPOSE 5000