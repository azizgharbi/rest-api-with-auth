FROM node:14.15.1
WORKDIR /my-app
COPY package.json package.json
RUN apt update
RUN npm install
# Bundle app source
COPY . .
RUN npm run build
EXPOSE 5000